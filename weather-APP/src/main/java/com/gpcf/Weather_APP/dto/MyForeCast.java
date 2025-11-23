package com.gpcf.Weather_APP.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MyForeCast {

//    @JsonProperty("weatherResponse")
    private WeatherResponse weatherResponse;

//    @JsonProperty("dayTem")
    private List<DayTem> dayTem;

    public WeatherResponse getWeatherResponse() {
        return weatherResponse;
    }

    public void setWeatherResponse(WeatherResponse weatherResponse) {
        this.weatherResponse = weatherResponse;
    }

    public List<DayTem> getDayTem() {
        return dayTem;
    }

    public void setDayTem(List<DayTem> dayTem) {
        this.dayTem = dayTem;
    }
}
