const car_count = document.getElementById('s_car_count');

document.addEventListener('DOMContentLoaded', async function () {
    await GetCarCount();
})

async function GetCarCount() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/cars/count');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        car_count.innerText = await response.json();
    } catch (error) {
        console.error("Ошибка выполнения запроса (счётчик автомобилей): " + error);
    }
}