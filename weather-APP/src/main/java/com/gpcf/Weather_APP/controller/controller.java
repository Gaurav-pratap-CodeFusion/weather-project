package com.gpcf.Weather_APP.controller;


import com.gpcf.Weather_APP.dto.MyForeCast;
import com.gpcf.Weather_APP.dto.WeatherResponse;
import com.gpcf.Weather_APP.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
@CrossOrigin
public class controller {

    @Autowired
    private WeatherService service;

    @GetMapping("/my/{city}")
    public WeatherResponse getWeather(@PathVariable String city) {
        return service.getData(city);
    }


    @GetMapping("/forecast")
    public MyForeCast getForecast(@RequestParam String city, @RequestParam String days) {
        return service.getforeCast(city,days);
    }
}