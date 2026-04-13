package com.amarok36.CarMan247.service;

import com.amarok36.CarMan247.dto.CarDto;
import com.amarok36.CarMan247.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public long getCarCount() {
        return carRepository.count();
    }

    public List<CarDto> getCarList() {
        return carRepository.getAllCars();
    }

    public long getAvailableCarsCount() {
        return carRepository.getAvailableCarsCount();
    }
}
