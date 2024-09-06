package com.example.meteo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Map;
import java.util.List;


@RestController
public class MeteoController {
    @Autowired
    private RestTemplate restTemplate;
    private final String API_KEY = "6995cf41609b47b5b0f150348241405";

    @GetMapping("/cities")
    public List<String> getCities() {
        return Arrays.asList("yaounde", "douala", "dschang", "buea");
    }

    @PostMapping("/meteo")
    public Map<String, Object> getWeather(@RequestParam("city") String city) {
        String url = String.format("http://api.weatherapi.com/v1/current.json?key=%s&q=%s&aqi=no", API_KEY, city);
        return restTemplate.getForObject(url, Map.class);
    }

}