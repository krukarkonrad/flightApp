package com.flightapp.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.flightapp.database.model.Flight;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class FlightPayload {

    String[] temp = new String[2];

    public FlightPayload(Flight flight){
        this.id = flight.getId();
        this.fligthStartDate = flight.getFligthStart().toLocalDate();
        this.fligthStartTime = flight.getFligthStart().toLocalTime();
        this.fligthEndDate = flight.getFligthEnd().toLocalDate();
        this.fligthEndTime = flight.getFligthEnd().toLocalTime();
        this.seats = flight.getSeats();
        this.availableSeats = flight.getSeats() - flight.getTakenSeatss();
        this.ticketPrice = flight.getTicketPrice();
    }

    private Long id;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate fligthStartDate;

    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime fligthStartTime;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate fligthEndDate;

    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime fligthEndTime;

    private int seats;

    private int availableSeats;

    private double ticketPrice;

    public String[] getTemp() {
        return temp;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getFligthStartDate() {
        return fligthStartDate;
    }

    public LocalTime getFligthStartTime() {
        return fligthStartTime;
    }

    public LocalDate getFligthEndDate() {
        return fligthEndDate;
    }

    public LocalTime getFligthEndTime() {
        return fligthEndTime;
    }

    public int getSeats() {
        return seats;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }
}
