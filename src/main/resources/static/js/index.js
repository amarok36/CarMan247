const cars_count = document.getElementById('s_cars_count');
const available_cars_count = document.getElementById('s_available_cars_count');

document.addEventListener('DOMContentLoaded', async function () {
    await GetCarsCount();
    await GetAvailableCarsCount();
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