import { Car } from "./car.js";
export class ParkingLot {
    constructor() {
        this.cars = [];
        this.maxCapacity = 50;
        this.openingTime = "08:30";
        this.closingTime = "23:00";
        this.loadFromStorage();
    }
    addCar(car) {
        if (!this.iswithinOperatingHours()) {
            alert("Parking lot is closed.");
            return false;
        }
        if (this.cars.length >= this.maxCapacity) {
            alert("Parking lot is full.");
            return false;
        }
        const carExists = this.cars.some(existingCar => existingCar.getLicensePlate() === car.getLicensePlate());
        if (carExists) {
            alert("Car with this license plate already exists in the parking lot");
            return false;
        }
        this.cars.push(car);
        this.saveToStorage();
        return true;
    }
    removeCar(licensePlate) {
        this.cars = this.cars.filter(car => car.getLicensePlate() !== licensePlate);
        this.saveToStorage();
    }
    getCars() {
        return this.cars;
    }
    getAvailableSpots() {
        return this.maxCapacity - this.cars.length;
    }
    getMaxCapacity() {
        return this.maxCapacity;
    }
    setMaxCapacity(capacity) {
        this.maxCapacity = capacity;
        this.saveToStorage();
    }
    getOpeningTime() {
        return this.openingTime;
    }
    getClosingTime() {
        return this.closingTime;
    }
    setOperatingHours(openingTime, closingTime) {
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.saveToStorage();
    }
    iswithinOperatingHours() {
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes()}`;
        return currentTime >= this.openingTime && currentTime <= this.closingTime;
    }
    saveToStorage() {
        localStorage.setItem("parkingLot", JSON.stringify({ cars: this.cars, maxCapacity: this.maxCapacity,
            openingTime: this.openingTime, closingTime: this.closingTime
        }));
    }
    loadFromStorage() {
        const data = localStorage.getItem("parkingLot");
        if (data) {
            const parsed = JSON.parse(data);
            this.cars = parsed.cars.map((carData) => new Car(carData.licensePlate, carData.owner, carData.entryTime)) || [];
            this.maxCapacity = parsed.maxCapacity || 50;
            this.openingTime = parsed.openingTime || "08:30";
            this.closingTime = parsed.closingTime || "23:00";
        }
    }
}
