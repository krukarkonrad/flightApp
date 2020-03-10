package com.flightapp.database.helpermodels;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class FligthNoTourist {
    private Long id;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fligthStart;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fligthEnd;

    private int seats;

    private int takenSeatss;

    private double ticketPrice;

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

    public int getTakenSeatss() {
        return takenSeatss;
    }

    public void setTakenSeatss(int takenSeatss) {
        this.takenSeatss = takenSeatss;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
