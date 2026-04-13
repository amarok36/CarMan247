package com.amarok36.CarMan247.rest;

import com.amarok36.CarMan247.dto.CarDto;
import com.amarok36.CarMan247.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import java.awt.*;

@RestController
@RequestMapping("/api/v1/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCarCount() {
        return ResponseEntity.ok(carService.getCarCount());
    }

    @GetMapping()
    public ResponseEntity<List<CarDto>> findAllCars() {
        return ResponseEntity.ok(carService.getCarList());
    }

    @GetMapping("/count/available")
    public ResponseEntity<Long> getAvailableCarsCount() {
        return ResponseEntity.ok(carService.getAvailableCarsCount());
    }
}
