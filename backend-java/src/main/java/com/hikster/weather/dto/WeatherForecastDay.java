package com.hikster.weather.dto;

import java.time.LocalDate;

public record WeatherForecastDay(
        LocalDate date,
        int temperatureMin,
        int temperatureMax,
        String condition,
        int humidity,
        int windSpeed
) {
}
