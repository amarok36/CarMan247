const cars_count = document.getElementById('s_cars_count');
const available_cars_count = document.getElementById('s_available_cars_count');
const rented_cars_count = document.getElementById('s_rented_cars_count');
const cars_table_body = document.getElementById('cars-table-body');

document.addEventListener('DOMContentLoaded', async function () {
    await GetCarsCount();
    await GetAvailableCarsCount();
    await GetRentedCarsCount();
    await LoadCarsTable();
})

async function GetCarsCount() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/cars/count');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        cars_count.innerText = await response.json();
    } catch (error) {
        console.error("Ошибка выполнения запроса (счётчик автомобилей): " + error);
    }
}

async function GetAvailableCarsCount() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/cars/count/available');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        available_cars_count.innerText = await response.json();
    } catch (error) {
        console.error("Ошибка выполнения запроса (счётчик доступных автомобилей): " + error);
    }
}

async function GetRentedCarsCount() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/cars/count/rented');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        rented_cars_count.innerText = await response.json();
    } catch (error) {
        console.error("Ошибка выполнения запроса (счётчик арендованных автомобилей): " + error);
    }
}

async function LoadCarsTable(){
    try{
        const response = await fetch('http://localhost:8080/api/v1/cars')

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const cars = await response.json();

        if (cars.length === 0) {
            cars_table_body.innerHTML = '<tr><td colspan="16">Нет данных</td></tr>';
            return;
        }

        cars_table_body.innerHTML = cars.map(car => `
             <tr>
                <td>${car.id}</td>
                <td>${car.statusTitle}</td>
                <td>${car.serviceClassTitle}</td>
                <td>${car.modelTitle}</td>
                <td>${car.yearManufacture}</td>
                <td>${car.color}</td>
                <td>${car.fuelTypeTitle}</td>
                <td>${car.engineCapacity}</td>
                <td>${car.transmissionTitle}</td>
                <td>${car.vehicleDriveTitle}</td>
                <td>${car.currentMileage.toLocaleString()}</td>
                <td>${FormatDate(car.maintenanceDate)}</td>
                <td>${FormatBoolean(car.airConditioner)}</td>
                <td>${FormatBoolean(car.heatSeats)}</td>
                <td>${FormatBoolean(car.navigator)}</td>
                <td>${car.options}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Ошибка выполнения запроса (таблица автомобилей): " + error);
        tableBody.innerHTML = '<tr><td colspan="16">Ошибка загрузки данных</td></tr>';
    }
}

function FormatBoolean(value) {
    if(value === true) return 'да';
    else return 'нет';
}

function FormatDate(value){
    const date = new Date(value)
    return date.toLocaleDateString('ru-RU')
}