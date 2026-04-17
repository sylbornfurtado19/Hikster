package com.hikster.weather.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.hikster.weather.dto.WeatherForecastDay;
import com.hikster.weather.dto.WeatherResponse;
import com.hikster.weather.exception.WeatherNotFoundException;
import com.hikster.weather.exception.WeatherServiceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class WeatherService {
    private static final Duration CACHE_TTL = Duration.ofMinutes(10);

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String weatherApiUrl;
    private final Map<String, CachedWeather> cache = new ConcurrentHashMap<>();

    public WeatherService(RestTemplateBuilder restTemplateBuilder,
                          @Value("${weather.api.key}") String apiKey,
                          @Value("${weather.api.url}") String weatherApiUrl) {
        this.restTemplate = restTemplateBuilder
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofSeconds(5))
                .build();
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        this.weatherApiUrl = weatherApiUrl == null ? "" : weatherApiUrl.trim();
    }

    public WeatherResponse getWeatherByLocation(String location) {
        String normalizedLocation = normalizeLocation(location);
        if (normalizedLocation.isBlank()) {
            throw new IllegalArgumentException("Location is required.");
        }

        String cacheKey = normalizedLocation.toLowerCase(Locale.ROOT);
        CachedWeather cachedWeather = cache.get(cacheKey);
        if (cachedWeather != null && !cachedWeather.isExpired()) {
            return cachedWeather.response();
        }

        WeatherResponse response = fetchWeather(normalizedLocation);
        cache.put(cacheKey, new CachedWeather(response, Instant.now()));
        return response;
    }

    private WeatherResponse fetchWeather(String location) {
        if (!apiKey.isBlank() && !weatherApiUrl.isBlank()) {
            try {
                JsonNode currentWeatherNode = fetchJson(buildWeatherUri(location), location);
                JsonNode forecastNode = fetchJson(buildForecastUri(location), location);

                String resolvedLocation = textOrFallback(currentWeatherNode.path("name").asText(), location);
                int temperature = roundToInt(currentWeatherNode.path("main").path("temp").asDouble(Double.NaN));
                String condition = normalizeCondition(
                        currentWeatherNode.path("weather").path(0).path("description").asText(currentWeatherNode.path("weather").path(0).path("main").asText("Unknown"))
                );
                int humidity = currentWeatherNode.path("main").path("humidity").asInt(0);
                int windSpeed = convertMsToKmh(currentWeatherNode.path("wind").path("speed").asDouble(0.0));

                List<WeatherForecastDay> forecast = buildForecast(forecastNode);
                return new WeatherResponse(resolvedLocation, temperature, condition, humidity, windSpeed, forecast);
            } catch (WeatherServiceException | WeatherNotFoundException ignored) {
                // Fall through to alternate provider for better uptime.
            }
        }

        return fetchWeatherFromWttr(location);
    }

    private WeatherResponse fetchWeatherFromWttr(String location) {
        JsonNode root = fetchJsonFromWttr(buildWttrUri(location), location);

        JsonNode current = root.path("current_condition").path(0);
        if (current.isMissingNode()) {
            throw new WeatherNotFoundException("No weather data found for location: " + location);
        }

        int temperature = parseIntSafely(current.path("temp_C").asText(), 0);
        String condition = normalizeCondition(
                current.path("weatherDesc").path(0).path("value").asText("Unknown")
        );
        int humidity = parseIntSafely(current.path("humidity").asText(), 0);
        int windSpeed = parseIntSafely(current.path("windspeedKmph").asText(), 0);

        List<WeatherForecastDay> forecast = buildWttrForecast(root.path("weather"));
        return new WeatherResponse(location, temperature, condition, humidity, windSpeed, forecast);
    }

    private JsonNode fetchJson(URI uri, String location) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            return Objects.requireNonNull(restTemplate.exchange(uri, HttpMethod.GET, entity, JsonNode.class).getBody(), "Weather API returned an empty response body.");
        } catch (HttpClientErrorException.NotFound ex) {
            throw new WeatherNotFoundException(buildNotFoundMessage(location, ex.getResponseBodyAsString()));
        } catch (HttpClientErrorException ex) {
            if (ex.getStatusCode().value() == 400) {
                throw new WeatherNotFoundException(buildNotFoundMessage(location, ex.getResponseBodyAsString()));
            }
            throw new WeatherServiceException("Weather API rejected the request: " + extractApiMessage(ex.getResponseBodyAsString(), ex.getStatusText()), ex);
        } catch (org.springframework.web.client.ResourceAccessException ex) {
            throw new WeatherServiceException("Weather service is temporarily unavailable. Please try again.", ex);
        } catch (Exception ex) {
            throw new WeatherServiceException("Failed to load weather data.", ex);
        }
    }

    private URI buildWeatherUri(String location) {
        return UriComponentsBuilder.fromHttpUrl(weatherApiUrl)
                .queryParam("q", location)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .build(true)
                .toUri();
    }

    private URI buildForecastUri(String location) {
        return UriComponentsBuilder.fromHttpUrl(resolveForecastUrl())
                .queryParam("q", location)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .queryParam("cnt", 40)
                .build(true)
                .toUri();
    }

    private URI buildWttrUri(String location) {
        return UriComponentsBuilder
                .fromUriString("https://wttr.in/{location}")
                .queryParam("format", "j1")
                .buildAndExpand(location)
                .encode(StandardCharsets.UTF_8)
                .toUri();
    }

    private String resolveForecastUrl() {
        if (weatherApiUrl.endsWith("/weather")) {
            return weatherApiUrl.substring(0, weatherApiUrl.length() - "/weather".length()) + "/forecast";
        }
        if (weatherApiUrl.contains("/weather")) {
            return weatherApiUrl.replace("/weather", "/forecast");
        }
        return weatherApiUrl.endsWith("/") ? weatherApiUrl + "forecast" : weatherApiUrl + "/forecast";
    }

    private JsonNode fetchJsonFromWttr(URI uri, String location) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            JsonNode body = restTemplate.exchange(uri, HttpMethod.GET, entity, JsonNode.class).getBody();
            if (body == null || body.isEmpty()) {
                throw new WeatherNotFoundException("No weather data found for location: " + location);
            }
            return body;
        } catch (HttpClientErrorException.NotFound ex) {
            throw new WeatherNotFoundException("No weather data found for location: " + location);
        } catch (HttpClientErrorException ex) {
            throw new WeatherServiceException("Fallback weather provider rejected the request.", ex);
        } catch (org.springframework.web.client.ResourceAccessException ex) {
            throw new WeatherServiceException("Weather service is temporarily unavailable. Please try again.", ex);
        } catch (Exception ex) {
            throw new WeatherServiceException("Failed to load weather data.", ex);
        }
    }

    private List<WeatherForecastDay> buildForecast(JsonNode forecastNode) {
        JsonNode entries = forecastNode.path("list");
        if (!entries.isArray() || entries.isEmpty()) {
            return List.of();
        }

        Map<LocalDate, List<JsonNode>> groupedByDate = new LinkedHashMap<>();
        for (JsonNode entry : entries) {
            LocalDate date = parseForecastDate(entry.path("dt_txt").asText(null));
            if (date == null) {
                continue;
            }
            groupedByDate.computeIfAbsent(date, key -> new ArrayList<>()).add(entry);
        }

        return groupedByDate.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .limit(3)
                .map(entry -> summarizeForecast(entry.getKey(), entry.getValue()))
                .filter(Objects::nonNull)
                .toList();
    }

    private WeatherForecastDay summarizeForecast(LocalDate date, List<JsonNode> entries) {
        if (entries == null || entries.isEmpty()) {
            return null;
        }

        double minTemp = entries.stream()
                .mapToDouble(node -> node.path("main").path("temp_min").asDouble(Double.NaN))
                .filter(value -> !Double.isNaN(value))
                .min()
                .orElse(Double.NaN);
        double maxTemp = entries.stream()
                .mapToDouble(node -> node.path("main").path("temp_max").asDouble(Double.NaN))
                .filter(value -> !Double.isNaN(value))
                .max()
                .orElse(Double.NaN);

        double avgHumidity = entries.stream()
                .mapToInt(node -> node.path("main").path("humidity").asInt(0))
                .average()
                .orElse(0.0);
        double avgWind = entries.stream()
                .mapToDouble(node -> node.path("wind").path("speed").asDouble(0.0))
                .average()
                .orElse(0.0);

        String condition = entries.stream()
                .map(node -> normalizeCondition(node.path("weather").path(0).path("description").asText(node.path("weather").path(0).path("main").asText("Unknown"))))
                .collect(java.util.stream.Collectors.groupingBy(value -> value, java.util.stream.Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.<String, Long>comparingByValue().thenComparing(Map.Entry.comparingByKey()))
                .map(Map.Entry::getKey)
                .orElse("Unknown");

        return new WeatherForecastDay(
                date,
                roundToInt(Double.isNaN(minTemp) ? 0.0 : minTemp),
                roundToInt(Double.isNaN(maxTemp) ? 0.0 : maxTemp),
                condition,
                (int) Math.round(avgHumidity),
                (int) Math.round(convertMsToKmh(avgWind))
        );
    }

    private List<WeatherForecastDay> buildWttrForecast(JsonNode weatherNode) {
        if (!weatherNode.isArray() || weatherNode.isEmpty()) {
            return List.of();
        }

        List<WeatherForecastDay> days = new ArrayList<>();
        for (JsonNode day : weatherNode) {
            if (days.size() == 3) {
                break;
            }
            LocalDate date = parseWttrDate(day.path("date").asText(null));
            if (date == null) {
                continue;
            }
            int min = parseIntSafely(day.path("mintempC").asText(), 0);
            int max = parseIntSafely(day.path("maxtempC").asText(), 0);

            JsonNode hourly = day.path("hourly");
            String condition = "Unknown";
            int humidity = 0;
            int wind = 0;

            if (hourly.isArray() && !hourly.isEmpty()) {
                JsonNode representative = hourly.path(Math.min(4, hourly.size() - 1));
                condition = normalizeCondition(representative.path("weatherDesc").path(0).path("value").asText("Unknown"));
                humidity = averageInt(hourly, "humidity");
                wind = averageInt(hourly, "windspeedKmph");
            }

            days.add(new WeatherForecastDay(date, min, max, condition, humidity, wind));
        }
        return days;
    }

    private LocalDate parseForecastDate(String dtText) {
        if (dtText == null || dtText.isBlank()) {
            return null;
        }
        try {
            return LocalDateTime.parse(dtText.replace(' ', 'T')).atZone(ZoneId.systemDefault()).toLocalDate();
        } catch (Exception ex) {
            return null;
        }
    }

    private LocalDate parseWttrDate(String dateText) {
        if (dateText == null || dateText.isBlank()) {
            return null;
        }
        try {
            return LocalDate.parse(dateText);
        } catch (Exception ex) {
            return null;
        }
    }

    private String normalizeLocation(String location) {
        return location == null ? "" : location.trim();
    }

    private String normalizeCondition(String condition) {
        if (condition == null || condition.isBlank()) {
            return "Unknown";
        }
        String cleaned = condition.trim().toLowerCase(Locale.ROOT);
        return Character.toUpperCase(cleaned.charAt(0)) + cleaned.substring(1);
    }

    private int roundToInt(double value) {
        return (int) Math.round(Double.isNaN(value) ? 0.0 : value);
    }

    private int parseIntSafely(String value, int fallback) {
        if (value == null || value.isBlank()) {
            return fallback;
        }
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException ex) {
            return fallback;
        }
    }

    private int averageInt(JsonNode nodes, String field) {
        if (!nodes.isArray() || nodes.isEmpty()) {
            return 0;
        }
        List<Integer> values = new ArrayList<>();
        for (JsonNode node : nodes) {
            int parsed = parseIntSafely(node.path(field).asText(), Integer.MIN_VALUE);
            if (parsed != Integer.MIN_VALUE) {
                values.add(parsed);
            }
        }
        if (values.isEmpty()) {
            return 0;
        }
        return (int) Math.round(values.stream().mapToInt(Integer::intValue).average().orElse(0));
    }

    private int convertMsToKmh(double speedMs) {
        return (int) Math.round(speedMs * 3.6);
    }

    private String textOrFallback(String candidate, String fallback) {
        return candidate == null || candidate.isBlank() ? fallback : candidate;
    }

    private String extractApiMessage(String body, String fallback) {
        if (body == null || body.isBlank()) {
            return fallback;
        }
        return body.lines().collect(Collectors.joining(" "));
    }

    private String buildNotFoundMessage(String location, String body) {
        String apiMessage = extractApiMessage(body, "City not found.");
        return "No weather data found for location: " + location + " (" + apiMessage + ")";
    }

    private record CachedWeather(WeatherResponse response, Instant fetchedAt) {
        private boolean isExpired() {
            return fetchedAt.plus(CACHE_TTL).isBefore(Instant.now());
        }
    }
}
