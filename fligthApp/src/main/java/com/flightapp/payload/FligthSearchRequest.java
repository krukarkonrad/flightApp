package com.flightapp.payload;

import java.time.LocalDate;

public class FligthSearchRequest {
    LocalDate startDate;
    LocalDate endDate;

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }
}
