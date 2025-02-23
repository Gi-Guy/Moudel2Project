import { Car } from "./car";

export class ParkingLot {
    private cars: Car[] = [];
    private maxCapacity: number = 50;

    constructor() {
        this.loadFromStorage();
    }

    addCar(car: Car): boolean {
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

    private saveToStorage(): void {
        localStorage.setItem("parkingLot", JSON.stringify(this));
    }

    private loadFromStorage(): void {
        const data = localStorage.getItem("parkingLot");
        if (data) {
            const parsed = JSON.parse(data);
            this.cars = parsed.cars || [];
            this.maxCapacity = parsed.maxCapacity || 50;
        }
    }
}
