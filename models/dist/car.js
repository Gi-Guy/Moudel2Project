"use strict";
exports.__esModule = true;
exports.Car = void 0;
var Car = /** @class */ (function () {
    function Car(licensePlate, owner, entryTime) {
        if (entryTime === void 0) { entryTime = new Date().toLocaleString("he-IL"); }
        this.licensePlate = licensePlate;
        this.owner = owner;
        this.entryTime = entryTime;
    }
    Car.prototype.getLicensePlate = function () {
        return this.licensePlate;
    };
    Car.prototype.getOwner = function () {
        return this.owner;
    };
    Car.prototype.getEntryTime = function () {
        return this.entryTime;
    };
    Car.prototype.setentryTime = function (entryTime) {
        this.entryTime = entryTime;
    };
    return Car;
}());
exports.Car = Car;
