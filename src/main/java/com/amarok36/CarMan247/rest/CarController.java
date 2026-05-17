package com.amarok36.CarMan247.rest;

import com.amarok36.CarMan247.dto.CarDto;
import com.amarok36.CarMan247.service.CarService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Page<CarDto>> findAllCars(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(carService.getCarListPaginated(page, size));
    }

    @GetMapping("/count/available")
    public ResponseEntity<Long> getAvailableCarsCount() {
        return ResponseEntity.ok(carService.getAvailableCarsCount());
    }

    @GetMapping("/count/rented")
    public ResponseEntity<Long> getRentedCarsCount() {
        return ResponseEntity.ok(carService.getRentedCarsCount());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Integer id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
