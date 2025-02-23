"use strict";
exports.__esModule = true;
exports.updateUI = exports.getParkingInfo = exports.removeCarFromParking = exports.addCarToParking = void 0;
var parkingLot_1 = require("../models/parkingLot");
var car_1 = require("../models/car");
var parkingLot = new parkingLot_1.ParkingLot();
function addCarToParking(licensePlate, owner) {
    var car = new car_1.Car(licensePlate, owner);
    if (parkingLot.addCar(car)) {
        alert("Car added successfully!");
        updateUI();
    }
}
exports.addCarToParking = addCarToParking;
function removeCarFromParking(licensePlate) {
    parkingLot.removeCar(licensePlate);
    updateUI();
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
function updateUI() {
    var info = getParkingInfo();
    document.getElementById("usedSlots").innerText = "" + info.used;
    document.getElementById("availableSlots").innerText = "" + info.available;
    document.getElementById("maxSlots").innerText = "" + info.total;
    var carList = document.getElementById("carList");
    carList.innerHTML = "";
    parkingLot.getCars().forEach(function (car) {
        var li = document.createElement("li");
        li.innerHTML = "\n            <strong>" + car.getLicensePlate() + "</strong> - " + (car.getOwner() || "Unknown") + "\n            <br> <small>Entered: " + car.getEntryTime() + "</small>\n        ";
        var removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.onclick = function () { return removeCarFromParking(car.getLicensePlate()); };
        li.appendChild(removeButton);
        carList.appendChild(li);
    });
}
exports.updateUI = updateUI;
// Ensure UI updates on page load
window.addEventListener("load", updateUI);
