import { ParkingLot } from "./parkingLot.js";
import { Car } from "./car.js";
const parkingLot = new ParkingLot();
export function addCarToParking(licensePlate, owner) {
    try {
        if (!parkingLot.iswithinOperatingHours()) {
            alert("Parking is closed. You cannot add cars at this time.");
            return false;
        }
        const car = new Car(licensePlate, owner);
        if (parkingLot.addCar(car)) {
            alert("Car added successfully!");
            updateParkingStatus();
            return true;
        }
    }
    catch (error) {
        console.error("Error adding car:", error);
        alert("An error occurred while adding the car. Please try again.");
    }
    return false;
}
export function removeCarFromParking(licensePlate) {
    try {
        parkingLot.removeCar(licensePlate);
        alert("Car removed successfully!");
        updateParkingStatus();
    }
    catch (error) {
        console.error("Error removing car:", error);
        alert("An error occurred while removing the car. Please try again.");
    }
}
export function getParkingInfo() {
    return {
        total: parkingLot.getMaxCapacity(),
        used: parkingLot.getCars().length,
        available: parkingLot.getAvailableSpots()
    };
}
export function getCarList() {
    return parkingLot.getCars().map(car => ({
        licensePlate: car.getLicensePlate(),
        owner: car.getOwner() || "Unknown",
        entryTime: car.getEntryTime()
    }));
}
function updateParkingStatus() {
    try {
        const usedSlots = document.getElementById("usedSlots");
        const availableSlots = document.getElementById("availableSlots");
        const carList = document.getElementById("carList");
        const maxCapacity = document.getElementById("maxCapacity");
        const openingTime = document.getElementById("openingTime");
        const closingTime = document.getElementById("closingTime");
        if (!usedSlots || !availableSlots || !carList || !openingTime || !closingTime || !maxCapacity) {
            console.error("Parking status elements not found!");
            return;
        }
        const info = getParkingInfo();
        usedSlots.textContent = info.used.toString();
        availableSlots.textContent = info.available.toString();
        maxCapacity.textContent = info.total.toString();
        openingTime.textContent = parkingLot.getOpeningTime();
        closingTime.textContent = parkingLot.getClosingTime();
        renderCarList();
    }
    catch (error) {
        console.error("Error updating parking status:", error);
    }
}
export function renderCarList() {
    try {
        const carList = document.getElementById("carList");
        if (!carList) {
            console.error("Element #carList not found!");
            return;
        }
        carList.innerHTML = "";
        const cars = getCarList();
        if (cars.length === 0) {
            carList.innerHTML = "<li>No cars in the parking lot.</li>";
            return;
        }
        cars.forEach(car => {
            const li = document.createElement("li");
            li.classList.add("car-item");
            const carInfo = document.createElement("div");
            carInfo.classList.add("car-info");
            carInfo.innerHTML = `<strong>${car.licensePlate}</strong> - ${car.owner}`;
            const carMeta = document.createElement("div");
            carMeta.classList.add("car-meta");
            const entryTime = document.createElement("span");
            entryTime.classList.add("entry-time");
            entryTime.innerText = `Entered: ${car.entryTime}`;
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-car");
            removeButton.innerText = "Remove";
            removeButton.onclick = () => removeCarFromParking(car.licensePlate);
            carMeta.appendChild(entryTime);
            carMeta.appendChild(removeButton);
            li.appendChild(carInfo);
            li.appendChild(carMeta);
            carList.appendChild(li);
        });
    }
    catch (error) {
        console.error("Error rendering car list:", error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    updateParkingStatus();
});
