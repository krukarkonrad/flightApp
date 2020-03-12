package com.flightapp.payload;

import com.flightapp.database.model.Flight;

import java.time.LocalDateTime;

public class FlightPayload {

    String[] temp = new String[2];

    public FlightPayload(Flight flight){
        this.id = flight.getId();
        this.fligthStart = flight.getFligthStart();
        this.fligthEnd = flight.getFligthEnd();
        this.seats = flight.getSeats();
        this.availableSeats = flight.getSeats() - flight.getTakenSeatss();
        this.ticketPrice = flight.getTicketPrice();
    }

    private Long id;

    private LocalDateTime fligthStart;

    private LocalDateTime fligthEnd;

    private int seats;

    private int availableSeats;

    private double ticketPrice;

    public String[] getTemp() {
        return temp;
    }

    public void setTemp(String[] temp) {
        this.temp = temp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFligthStart() {
        return fligthStart;
    }

    public void setFligthStart(LocalDateTime fligthStart) {
        this.fligthStart = fligthStart;
    }

    public LocalDateTime getFligthEnd() {
        return fligthEnd;
    }

    public void setFligthEnd(LocalDateTime fligthEnd) {
        this.fligthEnd = fligthEnd;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
