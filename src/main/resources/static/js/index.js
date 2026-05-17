const cars_count = document.getElementById('s_cars_count');
const available_cars_count = document.getElementById('s_available_cars_count');
const rented_cars_count = document.getElementById('s_rented_cars_count');

const deleteButton = document.getElementById('delete-car'); // Добавлено

const cars_table_body = document.getElementById('cars-table-body');

const previousButton = document.getElementById('previous-page');
const nextButton = document.getElementById('next-page');

let selectedCarId = null;
let currentPage = 1;
let totalPages = 1;
const rowsPerPage = 20;

document.addEventListener('DOMContentLoaded', async function () {
    await getCarsCount();
    await getAvailableCarsCount();
    await getRentedCarsCount();
    await loadCarsPage();
    doPaginationControls();

    if(deleteButton) {
        deleteButton.addEventListener('click', deleteSelectedCar);
    }
})

async function getCarsCount() {
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

async function getAvailableCarsCount() {
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

async function getRentedCarsCount() {
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

function renderTable(cars) {
    if (cars.length === 0) {
        cars_table_body.innerHTML = '<tr><td colspan="16">Нет данных</td></tr>';
        return;
    }

    cars_table_body.innerHTML = cars.map(car => ` 
    <tr data-car-id="${car.id}">
        <td>${car.id}</td>
        <td>${car.statusTitle}</td>
        <td>${car.serviceClassTitle}</td>
        <td>${car.modelTitle}</td>
        <td>${car.yearManufacture}</td>
        <td>${car.color}</td>
        <td>${car.fuelTypeTitle}</td>
        <td>${car.engineCapacity || '-'}</td>
        <td>${car.transmissionTitle}</td>
        <td>${car.vehicleDriveTitle}</td>
        <td>${car.currentMileage.toLocaleString()}</td>
        <td>${formatDate(car.maintenanceDate)}</td>
        <td>${formatBoolean(car.airConditioner)}</td>
        <td>${formatBoolean(car.heatSeats)}</td>
        <td>${formatBoolean(car.navigator)}</td>
        <td>${car.options}</td>
    </tr>
    `).join('');

    selectRow();
}

function updateButtonsState() {
    if (currentPage === 1) {
        previousButton.disabled = true;
    } else {
        previousButton.disabled = false;
    }

    if (currentPage === totalPages) {

        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }

    if (totalPages === 0) {
        nextButton.disabled = true;
    }
}

async function loadCarsPage() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/cars?page=${currentPage - 1}&size=${rowsPerPage}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const pageData = await response.json();

        const cars = pageData.content;
        totalPages = pageData.totalPages;
        currentPage = pageData.number + 1;

        renderTable(cars);
        updateButtonsState();

        selectedCarId = null;
        if(deleteButton) {
            deleteButton.disabled = true;
        }
    } catch (error) {
        console.error("Ошибка выполнения запроса: " + error);
        cars_table_body.innerHTML = '<tr><td colspan="16">Ошибка загрузки данных</td></tr>';
    }
}

async function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        await loadCarsPage();
    }
}

async function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        await loadCarsPage();
    }
}

function doPaginationControls() {
    previousButton.addEventListener('click', goToPreviousPage);
    nextButton.addEventListener('click', goToNextPage);
}

function formatBoolean(value) {
    if (value) return 'да';
    else return 'нет';
}

function formatDate(value) {
    const date = new Date(value)
    return date.toLocaleDateString('ru-RU')
}

function selectRow() {
    let rows = document.querySelectorAll('#cars-table-body tr');
    for (let i = 0; i < rows.length; i++) {
        let currentRow = rows[i];

        currentRow.addEventListener('click', function () {

            for (let j = 0; j < rows.length; j++) {
                let clearRow = rows[j];
                clearRow.classList.remove('selected');
            }
            currentRow.classList.add('selected')

            selectedCarId = parseInt(currentRow.getAttribute('data-car-id'));

            if(deleteButton) {
                deleteButton.disabled = false;
            }
        });
    }
}

async function  deleteSelectedCar() {

    const confirmed = confirm(`Вы уверены, что хотите удалить автомобиль ${selectedCarId}?`);
    if (!confirmed) return;

    try{
        const response = await fetch(`http://localhost:8080/api/v1/cars/${selectedCarId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert(`Автомобиль ${selectedCarId} удален`);

        await getCarsCount();
        await getAvailableCarsCount();
        await getRentedCarsCount();

        selectedCarId = null;
        if (deleteButton) {
            deleteButton.disabled = true;
        }

        await loadCarsPage();
    } catch (error) {
        console.error("Ошибка выполнения запроса (удаление автомобиля): " + error);
        alert(`Ошибка удаления автомобиля: ${error.message}`);
    }
}