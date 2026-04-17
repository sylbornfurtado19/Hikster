package com.hikster.weather.controller;

import com.hikster.weather.dto.WeatherErrorResponse;
import com.hikster.weather.exception.WeatherNotFoundException;
import com.hikster.weather.exception.WeatherServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WeatherExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<WeatherErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new WeatherErrorResponse("Invalid request", ex.getMessage(), null));
    }

    @ExceptionHandler(WeatherNotFoundException.class)
    public ResponseEntity<WeatherErrorResponse> handleNotFound(WeatherNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new WeatherErrorResponse("Weather not found", ex.getMessage(), null));
    }

    @ExceptionHandler(WeatherServiceException.class)
    public ResponseEntity<WeatherErrorResponse> handleServiceFailure(WeatherServiceException ex) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(new WeatherErrorResponse("Weather service error", ex.getMessage(), null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<WeatherErrorResponse> handleUnexpected(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new WeatherErrorResponse("Unexpected error", "Unable to load weather data.", null));
    }
}
