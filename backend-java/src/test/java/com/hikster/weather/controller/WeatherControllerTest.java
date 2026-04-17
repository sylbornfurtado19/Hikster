package com.hikster.weather.controller;

import com.hikster.weather.dto.WeatherForecastDay;
import com.hikster.weather.dto.WeatherResponse;
import com.hikster.weather.exception.WeatherNotFoundException;
import com.hikster.weather.service.WeatherService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = WeatherController.class)
@Import(WeatherExceptionHandler.class)
class WeatherControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WeatherService weatherService;

    @Test
    void shouldReturnWeatherForLocation() throws Exception {
        WeatherResponse response = new WeatherResponse(
                "Manali",
                12,
                "Cloudy",
                65,
                10,
                List.of(
                        new WeatherForecastDay(LocalDate.now().plusDays(1), 8, 15, "Rain", 70, 12),
                        new WeatherForecastDay(LocalDate.now().plusDays(2), 7, 14, "Cloudy", 68, 10),
                        new WeatherForecastDay(LocalDate.now().plusDays(3), 6, 13, "Clear", 60, 8)
                )
        );

        when(weatherService.getWeatherByLocation("Manali")).thenReturn(response);

        mockMvc.perform(get("/api/weather")
                        .param("location", "Manali")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.location").value("Manali"))
                .andExpect(jsonPath("$.temperature").value(12))
                .andExpect(jsonPath("$.condition").value("Cloudy"))
                .andExpect(jsonPath("$.humidity").value(65))
                .andExpect(jsonPath("$.windSpeed").value(10))
                .andExpect(jsonPath("$.forecast.length()").value(3));
    }

    @Test
    void shouldReturnBadRequestWhenLocationMissing() throws Exception {
        when(weatherService.getWeatherByLocation(nullable(String.class)))
                .thenThrow(new IllegalArgumentException("Location is required."));

        mockMvc.perform(get("/api/weather")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Invalid request"))
                .andExpect(jsonPath("$.message").value("Location is required."));
    }

    @Test
    void shouldReturnNotFoundForInvalidCity() throws Exception {
        when(weatherService.getWeatherByLocation("InvalidCity"))
                .thenThrow(new WeatherNotFoundException("No weather data found for location: InvalidCity"));

        mockMvc.perform(get("/api/weather")
                        .param("location", "InvalidCity")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Weather not found"));
    }
}
