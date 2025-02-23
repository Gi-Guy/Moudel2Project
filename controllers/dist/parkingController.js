"use strict";
exports.__esModule = true;
exports.renderCarList = exports.getCarList = exports.getParkingInfo = exports.removeCarFromParking = exports.addCarToParking = void 0;
var parkingLot_1 = require("../models/parkingLot");
var car_1 = require("../models/car");
var parkingLot = new parkingLot_1.ParkingLot();
function addCarToParking(licensePlate, owner) {
    console.log("Adding car:", licensePlate, owner);
    var car = new car_1.Car(licensePlate, owner);
    if (parkingLot.addCar(car)) {
        alert("Car added successfully!");
        renderCarList();
    }
}
exports.addCarToParking = addCarToParking;
function removeCarFromParking(licensePlate) {
    console.log("Removing car:", licensePlate);
    parkingLot.removeCar(licensePlate);
    renderCarList();
}
exports.removeCarFromParking = removeCarFromParking;
function getParkingInfo() {
    return {
        total: parkingLot.getMaxCapacity(),
        used: parkingLot.getCars().length,
        available: parkingLot.getAvailableSpots()
    };
}
exports.getParkingInfo = getParkingInfo;
function getCarList() {
    return parkingLot.getCars().map(function (car) { return ({
        licensePlate: car.getLicensePlate(),
        owner: car.getOwner() || "Unknown",
        entryTime: car.getEntryTime()
    }); });
}
exports.getCarList = getCarList;
function renderCarList() {
    console.log("Rendering car list...");
    var info = getParkingInfo();
    document.getElementById("usedSlots").innerText = "" + info.used;
    document.getElementById("availableSlots").innerText = "" + info.available;
    document.getElementById("maxSlots").innerText = "" + info.total;
    var carList = document.getElementById("carList");
    if (!carList) {
        console.error("Element #carList not found!");
        return;
    }
    carList.innerHTML = "";
    getCarList().forEach(function (car) {
        var li = document.createElement("li");
        li.innerHTML = "\n            <strong>" + car.licensePlate + "</strong> - " + car.owner + "\n            <br> <small>Entered: " + car.entryTime + "</small>\n        ";
        var removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.onclick = function () { return removeCarFromParking(car.licensePlate); };
        li.appendChild(removeButton);
        carList.appendChild(li);
    });
    console.log("Car list rendered.");
}
exports.renderCarList = renderCarList;
// Register `renderCarList()` to run automatically when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready, rendering car list...");
    renderCarList();
});
addCarToParking("123-ABC", "Alice");
addCarToParking("456-DEF", "Bob");
