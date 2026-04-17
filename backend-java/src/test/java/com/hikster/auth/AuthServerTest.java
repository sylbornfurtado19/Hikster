package com.hikster.auth;

import com.google.gson.JsonObject;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AuthServerTest {

    @Test
    void normalizeReturnsTrimmedString() throws Exception {
        String result = (String) invokeStatic("normalize", new Class<?>[]{String.class}, "  Alice  ");
        assertEquals("Alice", result);
    }

    @Test
    void normalizeHandlesNullAsEmptyString() throws Exception {
        String result = (String) invokeStatic("normalize", new Class<?>[]{String.class}, new Object[]{null});
        assertEquals("", result);
    }

    @Test
    void isValidNameAcceptsExpectedFormats() throws Exception {
        boolean validSimple = (boolean) invokeStatic("isValidName", new Class<?>[]{String.class}, "Alice Smith");
        boolean validApostrophe = (boolean) invokeStatic("isValidName", new Class<?>[]{String.class}, "O'Neil");
        boolean validHyphen = (boolean) invokeStatic("isValidName", new Class<?>[]{String.class}, "Anne-Marie");

        assertTrue(validSimple);
        assertTrue(validApostrophe);
        assertTrue(validHyphen);
    }

    @Test
    void isValidNameRejectsInvalidFormats() throws Exception {
        boolean blank = (boolean) invokeStatic("isValidName", new Class<?>[]{String.class}, "   ");
        boolean hasDigit = (boolean) invokeStatic("isValidName", new Class<?>[]{String.class}, "Alice2");

        assertFalse(blank);
        assertFalse(hasDigit);
    }

    @Test
    void isValidEmailAcceptsStandardEmail() throws Exception {
        boolean result = (boolean) invokeStatic("isValidEmail", new Class<?>[]{String.class}, "user.test+01@example.com");
        assertTrue(result);
    }

    @Test
    void isValidEmailRejectsInvalidEmail() throws Exception {
        boolean missingAt = (boolean) invokeStatic("isValidEmail", new Class<?>[]{String.class}, "user.example.com");
        boolean missingDomainSuffix = (boolean) invokeStatic("isValidEmail", new Class<?>[]{String.class}, "user@example");

        assertFalse(missingAt);
        assertFalse(missingDomainSuffix);
    }

    @Test
    void generateOtpCreatesSixDigitNumericCode() throws Exception {
        String otp = (String) invokeStatic("generateOtp", new Class<?>[]{}, new Object[]{});

        assertNotNull(otp);
        assertTrue(otp.matches("\\d{6}"));
    }

    @Test
    void errorCreatesExpectedPayload() throws Exception {
        JsonObject payload = (JsonObject) invokeStatic("error", new Class<?>[]{String.class}, "Invalid OTP.");

        assertFalse(payload.get("ok").getAsBoolean());
        assertEquals("Invalid OTP.", payload.get("message").getAsString());
    }

    private static Object invokeStatic(String methodName, Class<?>[] parameterTypes, Object... args) throws Exception {
        Method method = AuthServer.class.getDeclaredMethod(methodName, parameterTypes);
        method.setAccessible(true);
        return method.invoke(null, args);
    }
}
