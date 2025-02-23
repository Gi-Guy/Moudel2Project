import { ParkingLot } from "../models/parkingLot";
import { Car } from "../models/car";

const parkingLot = new ParkingLot();

export function addCarToParking(licensePlate: string, owner?: string): void {
    const car = new Car(licensePlate, owner);
    if (parkingLot.addCar(car)) {
        alert("Car added successfully!");
        updateUI();
    }
}

export function removeCarFromParking(licensePlate: string): void {
    parkingLot.removeCar(licensePlate);
    updateUI();
}

export function getParkingInfo() {
    return {
        total: parkingLot.getMaxCapacity(),
        used: parkingLot.getCars().length,
        available: parkingLot.getAvailableSpots()
    };
}

export function updateUI(): void {
    const info = getParkingInfo();
    document.getElementById("usedSlots")!.innerText = `${info.used}`;
    document.getElementById("availableSlots")!.innerText = `${info.available}`;
    document.getElementById("maxSlots")!.innerText = `${info.total}`;
    
    const carList = document.getElementById("carList")!;
    carList.innerHTML = "";
    parkingLot.getCars().forEach(car => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${car.getLicensePlate()}</strong> - ${car.getOwner() || "Unknown"}
            <br> <small>Entered: ${car.getEntryTime()}</small>
        `;
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.onclick = () => removeCarFromParking(car.getLicensePlate());
        li.appendChild(removeButton);
        carList.appendChild(li);
    });
}

// Ensure UI updates on page load
window.addEventListener("load", updateUI);
