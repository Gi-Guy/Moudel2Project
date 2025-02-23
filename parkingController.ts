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
    
    const info = getParkingInfo();
    document.getElementById("usedSlots")!.innerText = `${info.used}`;
    document.getElementById("availableSlots")!.innerText = `${info.available}`;
    document.getElementById("maxSlots")!.innerText = `${info.total}`;
    
    const carList = document.getElementById("carList");
    if (!carList) {
        console.error("Element #carList not found!");
        return;
    }

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

// Register `renderCarList()` to run automatically when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Document ready, rendering car list...");
    renderCarList();
});

addCarToParking("123-ABC", "Alice");
addCarToParking("456-DEF", "Bob");