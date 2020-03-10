package com.flightapp.database.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import javax.swing.text.View;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "flight")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fligthStart;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fligthEnd;

    private int seats;

    private int takenSeatss;

    private double ticketPrice;

    @ManyToMany(mappedBy = "flights", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("flights")
    private Set<Tourist> tourists;

    public Flight(){}

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

    public Set<Tourist> getTourists() {
        return tourists;
    }

    public void setTourists(Set<Tourist> tourists) {
        this.tourists = tourists;
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
