package com.amarok36.CarMan247.dto;

import com.amarok36.CarMan247.entity.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {

    private Integer id;
    private String statusTitle;
    private String serviceClassTitle;
    private String modelTitle;
    private Integer yearManufacture;
    private String color;
    private String fuelTypeTitle;
    private Double engineCapacity;
    private String transmissionTitle;
    private String vehicleDriveTitle;
    private Integer currentMileage;
    private Date maintenanceDate;
    private Boolean airConditioner;
    private Boolean heatSeats;
    private Boolean navigator;
    private String options;
}
