"use strict";
exports.__esModule = true;
exports.ParkingLot = void 0;
var ParkingLot = /** @class */ (function () {
    function ParkingLot() {
        this.cars = [];
        this.maxCapacity = 50;
        this.loadFromStorage();
    }
    ParkingLot.prototype.addCar = function (car) {
        if (this.cars.length >= this.maxCapacity) {
            alert("Parking lot is full.");
            return false;
        }
        var carExists = this.cars.some(function (existingCar) { return existingCar.getLicensePlate() === car.getLicensePlate(); });
        if (carExists) {
            alert("Car with this license plate already exists in the parking lot");
            return false;
        }
        this.cars.push(car);
        this.saveToStorage();
        return true;
    };
    ParkingLot.prototype.removeCar = function (licensePlate) {
        this.cars = this.cars.filter(function (car) { return car.getLicensePlate() !== licensePlate; });
        this.saveToStorage();
    };
    ParkingLot.prototype.getCars = function () {
        return this.cars;
    };
    ParkingLot.prototype.getAvailableSpots = function () {
        return this.maxCapacity - this.cars.length;
    };
    ParkingLot.prototype.getMaxCapacity = function () {
        return this.maxCapacity;
    };
    ParkingLot.prototype.setMaxCapacity = function (capacity) {
        this.maxCapacity = capacity;
        this.saveToStorage();
    };
    ParkingLot.prototype.saveToStorage = function () {
        localStorage.setItem("parkingLot", JSON.stringify(this));
    };
    ParkingLot.prototype.loadFromStorage = function () {
        var data = localStorage.getItem("parkingLot");
        if (data) {
            var parsed = JSON.parse(data);
            this.cars = parsed.cars || [];
            this.maxCapacity = parsed.maxCapacity || 50;
        }
    };
    return ParkingLot;
}());
exports.ParkingLot = ParkingLot;
