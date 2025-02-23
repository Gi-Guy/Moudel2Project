import { ParkingLot } from "./parkingLot.js";
import { Car } from "./car.js";

const parkingLot = new ParkingLot();

export function addCarToParking(licensePlate: string, owner?: string): void {
    console.log("Adding car:", licensePlate, owner);
    
    const car = new Car(licensePlate, owner);
    if (parkingLot.addCar(car)) {
        alert("Car added successfully!");
        renderCarList(); 
    }
}

export function removeCarFromParking(licensePlate: string): void {
    console.log("Removing car:", licensePlate);
    
    parkingLot.removeCar(licensePlate);
    renderCarList();
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

export function renderCarList(): void {
    console.log("Rendering car list...");

    const usedSlots = document.getElementById("usedSlots");
    const availableSlots = document.getElementById("availableSlots");
    const maxSlots = document.getElementById("maxSlots");
    const carList = document.getElementById("carList");

    if (!usedSlots || !availableSlots || !maxSlots || !carList) {
        console.warn("renderCarList() skipped: Elements not found (probably add-car.html)");
        return;
    }

    const info = getParkingInfo();
    usedSlots.innerText = `${info.used}`;
    availableSlots.innerText = `${info.available}`;
    maxSlots.innerText = `${info.total}`;

    carList.innerHTML = "";
    getCarList().forEach(car => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${car.licensePlate}</strong> - ${car.owner}
            <br> <small>Entered: ${car.entryTime}</small>
        `;
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.onclick = () => removeCarFromParking(car.licensePlate);
        li.appendChild(removeButton);
        carList.appendChild(li);
    });

    console.log("Car list rendered.");
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Document ready, rendering car list...");
    renderCarList();
});
