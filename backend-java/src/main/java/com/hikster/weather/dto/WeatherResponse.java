package com.hikster.weather.dto;

import java.util.List;

public record WeatherResponse(
        String location,
        int temperature,
        String condition,
        int humidity,
        int windSpeed,
        List<WeatherForecastDay> forecast
) {
}
