package com.hikster.auth;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

public final class AuthServer {
    private static final Gson GSON = new Gson();
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final Pattern NAME_PATTERN = Pattern.compile("^[A-Za-z]+(?:[\\s'-][A-Za-z]+)*$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final long OTP_VALID_SECONDS = 10 * 60;
    private static final int PORT = 8081;

    private static final Map<String, PendingOtp> OTP_STORE = new ConcurrentHashMap<>();

    private AuthServer() {
    }

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.createContext("/api/auth/request-otp", new RequestOtpHandler());
        server.createContext("/api/auth/resend-otp", new ResendOtpHandler());
        server.createContext("/api/auth/verify-otp", new VerifyOtpHandler());
        server.setExecutor(null);
        server.start();

        System.out.println("Hikster Java Auth server running on http://localhost:" + PORT);
        System.out.println("Configure SMTP with env vars HIKSTER_SMTP_HOST, HIKSTER_SMTP_PORT, HIKSTER_SMTP_USER, HIKSTER_SMTP_PASS, HIKSTER_SMTP_FROM");
        System.out.println("Set HIKSTER_DEV_OTP_LOG=true to log OTP to console in dev mode");
    }

    private static final class RequestOtpHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (handlePreflight(exchange)) {
                return;
            }
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJson(exchange, 405, error("Method not allowed"));
                return;
            }

            JsonObject body = parseBody(exchange);
            String name = normalize(getString(body, "name"));
            String email = normalize(getString(body, "email")).toLowerCase();

            if (!isValidName(name)) {
                sendJson(exchange, 400, error("Full name must contain only letters, spaces, apostrophes, or hyphens."));
                return;
            }
            if (!isValidEmail(email)) {
                sendJson(exchange, 400, error("Please enter a valid email address."));
                return;
            }

            String otp = generateOtp();
            long expiresAt = Instant.now().plusSeconds(OTP_VALID_SECONDS).getEpochSecond();
            OTP_STORE.put(email, new PendingOtp(name, otp, expiresAt));

            try {
                sendOtpEmail(name, email, otp);
            } catch (MessagingException ex) {
                sendJson(exchange, 500, error("Failed to send OTP email. Check SMTP configuration."));
                return;
            }

            JsonObject response = new JsonObject();
            response.addProperty("ok", true);
            response.addProperty("message", "OTP sent to your email.");
            sendJson(exchange, 200, response);
        }
    }

    private static final class ResendOtpHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (handlePreflight(exchange)) {
                return;
            }
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJson(exchange, 405, error("Method not allowed"));
                return;
            }

            JsonObject body = parseBody(exchange);
            String email = normalize(getString(body, "email")).toLowerCase();
            PendingOtp existing = OTP_STORE.get(email);
            if (existing == null) {
                sendJson(exchange, 404, error("No pending signup found for this email."));
                return;
            }

            String otp = generateOtp();
            long expiresAt = Instant.now().plusSeconds(OTP_VALID_SECONDS).getEpochSecond();
            OTP_STORE.put(email, new PendingOtp(existing.name(), otp, expiresAt));

            try {
                sendOtpEmail(existing.name(), email, otp);
            } catch (MessagingException ex) {
                sendJson(exchange, 500, error("Failed to resend OTP email. Check SMTP configuration."));
                return;
            }

            JsonObject response = new JsonObject();
            response.addProperty("ok", true);
            response.addProperty("message", "OTP resent.");
            sendJson(exchange, 200, response);
        }
    }

    private static final class VerifyOtpHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (handlePreflight(exchange)) {
                return;
            }
            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJson(exchange, 405, error("Method not allowed"));
                return;
            }

            JsonObject body = parseBody(exchange);
            String email = normalize(getString(body, "email")).toLowerCase();
            String otp = normalize(getString(body, "otp"));

            PendingOtp pending = OTP_STORE.get(email);
            if (pending == null) {
                sendJson(exchange, 404, error("No pending OTP found for this email."));
                return;
            }
            if (Instant.now().getEpochSecond() > pending.expiresAt()) {
                OTP_STORE.remove(email);
                sendJson(exchange, 400, error("OTP expired. Request a new code."));
                return;
            }
            if (!pending.code().equals(otp)) {
                sendJson(exchange, 400, error("Invalid OTP."));
                return;
            }

            OTP_STORE.remove(email);
            JsonObject response = new JsonObject();
            response.addProperty("ok", true);
            response.addProperty("message", "Email verified successfully.");
            response.addProperty("email", email);
            response.addProperty("name", pending.name());
            sendJson(exchange, 200, response);
        }
    }

    private record PendingOtp(String name, String code, long expiresAt) {
    }

    private static JsonObject parseBody(HttpExchange exchange) throws IOException {
        InputStream inputStream = exchange.getRequestBody();
        String payload = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        if (payload.isBlank()) {
            return new JsonObject();
        }
        return GSON.fromJson(payload, JsonObject.class);
    }

    private static String getString(JsonObject obj, String key) {
        if (obj == null || !obj.has(key) || obj.get(key).isJsonNull()) {
            return "";
        }
        return obj.get(key).getAsString();
    }

    private static String normalize(String value) {
        return value == null ? "" : value.trim();
    }

    private static boolean isValidName(String name) {
        return !name.isBlank() && NAME_PATTERN.matcher(name).matches();
    }

    private static boolean isValidEmail(String email) {
        return !email.isBlank() && EMAIL_PATTERN.matcher(email).matches();
    }

    private static String generateOtp() {
        int number = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(number);
    }

    private static void sendOtpEmail(String name, String email, String otp) throws MessagingException {
        String smtpHost = env("HIKSTER_SMTP_HOST");
        String smtpPort = env("HIKSTER_SMTP_PORT", "587");
        String smtpUser = env("HIKSTER_SMTP_USER");
        String smtpPass = env("HIKSTER_SMTP_PASS");
        String smtpFrom = env("HIKSTER_SMTP_FROM", smtpUser);
        boolean logOtp = Boolean.parseBoolean(env("HIKSTER_DEV_OTP_LOG", "false"));

        if (smtpHost.isBlank() || smtpUser.isBlank() || smtpPass.isBlank() || smtpFrom.isBlank()) {
            if (logOtp) {
                System.out.println("[DEV OTP] " + email + " -> " + otp);
                return;
            }
            throw new MessagingException("SMTP env vars are missing");
        }

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", smtpHost);
        properties.put("mail.smtp.port", smtpPort);

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(smtpUser, smtpPass);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(smtpFrom));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        message.setSubject("Your Hikster verification code");
        message.setText("Hi " + name + ",\n\nYour Hikster OTP is: " + otp + "\nIt expires in 10 minutes.\n\nIf this was not you, ignore this email.");

        Transport.send(message);
    }

    private static String env(String key) {
        return System.getenv(key) == null ? "" : System.getenv(key).trim();
    }

    private static String env(String key, String fallback) {
        String value = env(key);
        return value.isBlank() ? fallback : value;
    }

    private static boolean handlePreflight(HttpExchange exchange) throws IOException {
        if (!"OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            return false;
        }
        Headers headers = exchange.getResponseHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "POST, OPTIONS");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        exchange.sendResponseHeaders(204, -1);
        return true;
    }

    private static JsonObject error(String message) {
        JsonObject error = new JsonObject();
        error.addProperty("ok", false);
        error.addProperty("message", message);
        return error;
    }

    private static void sendJson(HttpExchange exchange, int status, JsonObject payload) throws IOException {
        byte[] responseBytes = GSON.toJson(payload).getBytes(StandardCharsets.UTF_8);
        Headers headers = exchange.getResponseHeaders();
        headers.add("Content-Type", "application/json; charset=UTF-8");
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "POST, OPTIONS");
        headers.add("Access-Control-Allow-Headers", "Content-Type");

        exchange.sendResponseHeaders(status, responseBytes.length);
        try (OutputStream outputStream = exchange.getResponseBody()) {
            outputStream.write(responseBytes);
        }
    }
}
