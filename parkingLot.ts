import { Car } from "./car.js";

export class ParkingLot {
    private cars: Car[] = [];
    private maxCapacity: number = 50;
    private openingTime: string = "08:30";
    private closingTime: string = "23:00";

    constructor() {
        this.loadFromStorage();
    }

    addCar(car: Car): boolean {
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

    removeCar(licensePlate: string): void {
        this.cars = this.cars.filter(car => car.getLicensePlate() !== licensePlate);
        this.saveToStorage();
    }

    getCars(): Car[] {
        return this.cars;
    }

    getAvailableSpots(): number {
        return this.maxCapacity - this.cars.length;
    }

    getMaxCapacity(): number {
        return this.maxCapacity;
    }

    setMaxCapacity(capacity: number): void {
        this.maxCapacity = capacity;
        this.saveToStorage();
    }
    getOpeningTime(): string {
        return this.openingTime;
    }
    getClosingTime(): string {
        return this.closingTime;
    }
    setOperatingHours(openingTime: string, closingTime: string): void {
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.saveToStorage();
    }
    iswithinOperatingHours(): boolean {
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes()}`;
        return currentTime >= this.openingTime && currentTime <= this.closingTime;
    }

    private saveToStorage(): void {
        localStorage.setItem("parkingLot", JSON.stringify({ cars: this.cars, maxCapacity: this.maxCapacity
            , openingTime: this.openingTime, closingTime: this.closingTime
         }));
    }

    private loadFromStorage(): void {
        const data = localStorage.getItem("parkingLot");
        if (data) {
            const parsed = JSON.parse(data);
            this.cars = parsed.cars.map((carData: any) => new Car(carData.licensePlate, carData.owner, carData.entryTime)) || [];
            this.maxCapacity = parsed.maxCapacity || 50;
            this.openingTime = parsed.openingTime || "08:30";
            this.closingTime = parsed.closingTime || "23:00";
        }
    }
}