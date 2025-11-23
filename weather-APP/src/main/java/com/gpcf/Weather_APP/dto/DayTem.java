package com.gpcf.Weather_APP.dto;

import java.time.LocalDate;

public class DayTem {

    private String  date;

    private Double minTem;

    private Double avgTemp;

    private  Double maxTemp;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getMinTem() {
        return minTem;
    }

    public void setMinTem(Double minTem) {
        this.minTem = minTem;
    }

    public Double getAvgTemp() {
        return avgTemp;
    }

    public void setAvgTemp(Double avgTemp) {
        this.avgTemp = avgTemp;
    }

    public Double getMaxTemp() {
        return maxTemp;
    }

    public void setMaxTemp(Double maxTemp) {
        this.maxTemp = maxTemp;
    }
}
