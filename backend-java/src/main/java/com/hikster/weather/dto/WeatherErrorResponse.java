package com.hikster.weather.dto;

public record WeatherErrorResponse(
        String error,
        String message,
        String location
) {
}
