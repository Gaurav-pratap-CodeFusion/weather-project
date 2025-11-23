package com.gpcf.Weather_APP.service;


import com.gpcf.Weather_APP.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.forecast.url}")
    private String apiforecastUrl;

    private RestTemplate template = new RestTemplate();

    public WeatherResponse getData(String city){
        String url= apiUrl+"?key="+apiKey+"&q="+city;
        Root forObject = template.getForObject(url, Root.class);
        WeatherResponse weatherResponser = new WeatherResponse();

        weatherResponser.setCity(forObject.getLocation().getName());
        weatherResponser.setCountry(forObject.getLocation().getCountry());
        weatherResponser.setRegion(forObject.getLocation().getRegion());

        weatherResponser.setTemperature(forObject.getCurrent().getTemp_c());
        String condition = forObject.getCurrent().getCondition().getText();
        weatherResponser.setCondition(condition);

        return weatherResponser ;
    }


    public MyForeCast getforeCast(String city, String days){



        MyForeCast foreCast = new MyForeCast();
        WeatherResponse data = getData(city);
        foreCast.setWeatherResponse(data);

        List<DayTem> dl = new ArrayList<>();
        String url= apiforecastUrl+"?key="+apiKey+"&q="+city+"&days="+days;
        Root apiResponse = template.getForObject(url, Root.class);
        Forecast forecast = apiResponse.getForecast();
        ArrayList<Forecastday> forecastday = forecast.getForecastday();

        for(Forecastday day: forecastday){

            DayTem d=new DayTem();
            d.setDate(day.getDate());
            d.setMinTem(day.getDay().mintemp_c);
            d.setAvgTemp(day.getDay().avgtemp_c);
            d.setMaxTemp(day.getDay().getMaxtemp_c());
            dl.add(d);
        }

        foreCast.setDayTem(dl);
        return foreCast;

    }
}
