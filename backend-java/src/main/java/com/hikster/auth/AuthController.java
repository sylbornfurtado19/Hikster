package com.hikster.auth;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final Pattern NAME_PATTERN = Pattern.compile("^[A-Za-z]+(?:[\\s'-][A-Za-z]+)*$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final long OTP_VALID_SECONDS = 10 * 60;

    private static final Map<String, PendingOtp> OTP_STORE = new ConcurrentHashMap<>();

    @PostMapping("/request-otp")
    public ResponseEntity<Map<String, Object>> requestOtp(@RequestBody(required = false) OtpRequest request) {
        String name = normalize(request == null ? "" : request.name());
        String email = normalize(request == null ? "" : request.email()).toLowerCase();

        if (!isValidName(name)) {
            return error(HttpStatus.BAD_REQUEST, "Full name must contain only letters, spaces, apostrophes, or hyphens.");
        }
        if (!isValidEmail(email)) {
            return error(HttpStatus.BAD_REQUEST, "Please enter a valid email address.");
        }

        String otp = generateOtp();
        long expiresAt = Instant.now().plusSeconds(OTP_VALID_SECONDS).getEpochSecond();
        OTP_STORE.put(email, new PendingOtp(name, otp, expiresAt));

        try {
            DeliveryMode deliveryMode = sendOtpEmail(name, email, otp);
            String message = deliveryMode == DeliveryMode.DEV_LOG
                    ? "OTP generated in dev mode. Check backend logs for the code."
                    : "OTP sent to your email.";
            return ok(HttpStatus.OK, message);
        } catch (MessagingException ex) {
            return error(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send OTP email. Check SMTP configuration.");
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<Map<String, Object>> resendOtp(@RequestBody(required = false) OtpResendRequest request) {
        String email = normalize(request == null ? "" : request.email()).toLowerCase();
        PendingOtp existing = OTP_STORE.get(email);

        if (existing == null) {
            return error(HttpStatus.NOT_FOUND, "No pending signup found for this email.");
        }

        String otp = generateOtp();
        long expiresAt = Instant.now().plusSeconds(OTP_VALID_SECONDS).getEpochSecond();
        OTP_STORE.put(email, new PendingOtp(existing.name(), otp, expiresAt));

        try {
            DeliveryMode deliveryMode = sendOtpEmail(existing.name(), email, otp);
            String message = deliveryMode == DeliveryMode.DEV_LOG
                    ? "OTP regenerated in dev mode. Check backend logs for the code."
                    : "OTP resent.";
            return ok(HttpStatus.OK, message);
        } catch (MessagingException ex) {
            return error(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to resend OTP email. Check SMTP configuration.");
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody(required = false) OtpVerifyRequest request) {
        String email = normalize(request == null ? "" : request.email()).toLowerCase();
        String otp = normalize(request == null ? "" : request.otp());

        PendingOtp pending = OTP_STORE.get(email);
        if (pending == null) {
            return error(HttpStatus.NOT_FOUND, "No pending OTP found for this email.");
        }
        if (Instant.now().getEpochSecond() > pending.expiresAt()) {
            OTP_STORE.remove(email);
            return error(HttpStatus.BAD_REQUEST, "OTP expired. Request a new code.");
        }
        if (!pending.code().equals(otp)) {
            return error(HttpStatus.BAD_REQUEST, "Invalid OTP.");
        }

        OTP_STORE.remove(email);
        Map<String, Object> payload = okPayload("Email verified successfully.");
        payload.put("email", email);
        payload.put("name", pending.name());
        return ResponseEntity.ok(payload);
    }

    private ResponseEntity<Map<String, Object>> ok(HttpStatus status, String message) {
        return new ResponseEntity<>(okPayload(message), status);
    }

    private ResponseEntity<Map<String, Object>> error(HttpStatus status, String message) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("ok", false);
        payload.put("message", message);
        return new ResponseEntity<>(payload, status);
    }

    private Map<String, Object> okPayload(String message) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("ok", true);
        payload.put("message", message);
        return payload;
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }

    private boolean isValidName(String name) {
        return !name.isBlank() && NAME_PATTERN.matcher(name).matches();
    }

    private boolean isValidEmail(String email) {
        return !email.isBlank() && EMAIL_PATTERN.matcher(email).matches();
    }

    private String generateOtp() {
        int number = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(number);
    }

    private DeliveryMode sendOtpEmail(String name, String email, String otp) throws MessagingException {
        String smtpHost = env("HIKSTER_SMTP_HOST");
        String smtpPort = env("HIKSTER_SMTP_PORT", "587");
        String smtpUser = env("HIKSTER_SMTP_USER");
        String smtpPass = env("HIKSTER_SMTP_PASS");
        String smtpFrom = env("HIKSTER_SMTP_FROM", smtpUser);
        boolean logOtp = Boolean.parseBoolean(env("HIKSTER_DEV_OTP_LOG", "false"));

        if (smtpHost.isBlank() || smtpUser.isBlank() || smtpPass.isBlank() || smtpFrom.isBlank()) {
            if (logOtp) {
                System.out.println("[DEV OTP] " + email + " -> " + otp);
                return DeliveryMode.DEV_LOG;
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
        return DeliveryMode.SMTP;
    }

    private String env(String key) {
        String value = System.getenv(key);
        return value == null ? "" : value.trim();
    }

    private String env(String key, String fallback) {
        String value = env(key);
        return value.isBlank() ? fallback : value;
    }

    private record PendingOtp(String name, String code, long expiresAt) {
    }

    private record OtpRequest(String name, String email) {
    }

    private record OtpResendRequest(String email) {
    }

    private record OtpVerifyRequest(String email, String otp) {
    }

    private enum DeliveryMode {
        SMTP,
        DEV_LOG
    }
}