package com.amarok36.CarMan247.repository;

import com.amarok36.CarMan247.dto.CarDto;
import com.amarok36.CarMan247.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Integer> {

    long count();

    @Query("""
              SELECT NEW com.amarok36.CarMan247.dto.CarDto(
                    c.id,
                    c.status.title,
                    c.serviceClass.title,
                    c.model.title,
                    c.yearManufacture,
                    c.color,
                    c.fuelType.title,
                    c.engineCapacity,
                    c.transmission.title,
                    c.vehicleDrive.title,
                    c.currentMileage,
                    c.maintenanceDate,
                    c.airConditioner,
                    c.heatSeats,
                    c.navigator,
                    c.options
                    )
                FROM Car c
            """)
    List<CarDto> getAllCars();

    @Query("""
              SELECT COUNT(c)
              FROM Car c
              WHERE c.status.id = 1
            """)
    Long getAvailableCarsCount();

    @Query("""
              SELECT COUNT(c)
              FROM Car c
              WHERE c.status.id = 2
            """)
    Long getRentedCarsCount();

}