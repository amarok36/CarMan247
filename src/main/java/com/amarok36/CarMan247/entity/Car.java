package com.amarok36.CarMan247.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private ServiceClass serviceClass;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @Column(name = "year_manufacture")
    private Integer yearManufacture;

    private String color;

    @ManyToOne
    @JoinColumn(name = "fuel_type_id")
    private FuelType fuelType;

    @Column(name = "engine_capacity")
    private Double engineCapacity;

    @ManyToOne
    @JoinColumn(name = "transmission_id")
    private Transmission transmission;

    @ManyToOne
    @JoinColumn(name = "vehicle_drive_id")
    private VehicleDrive vehicleDrive;

    @Column(name = "current_mileage")
    private Integer currentMileage;

    @Column(name = "maintenance_date")
    private Date maintenanceDate;

    @Column(name = "air_conditioner")
    private Boolean airConditioner;

    @Column(name = "heated_seats")
    private Boolean heatSeats;

    private Boolean navigator;

    private String options;
}