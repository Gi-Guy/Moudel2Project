import { ParkingLot } from "./parkingLot.js";
const parkingLot = new ParkingLot();
document.addEventListener("DOMContentLoaded", () => {
    const maxCapacityInput = document.getElementById("maxCapacity");
    const capacityForm = document.getElementById("capacityForm");
    const openingTimeInput = document.getElementById("openingTime");
    const closingTimeInput = document.getElementById("closingTime");
    const hoursForm = document.getElementById("hoursForm");
    const resetButton = document.getElementById("resetSettings");
    // Load stored values from ParkingLot class
    maxCapacityInput.value = parkingLot.getMaxCapacity().toString();
    openingTimeInput.value = parkingLot.getOpeningTime();
    closingTimeInput.value = parkingLot.getClosingTime();
    // Update max capacity
    capacityForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newCapacity = parseInt(maxCapacityInput.value, 10);
        if (newCapacity < 1 || isNaN(newCapacity)) {
            alert("Please enter a valid number.");
            return;
        }
        parkingLot.setMaxCapacity(newCapacity);
        alert(`Max capacity updated to ${newCapacity}`);
    });
    // Update opening and closing times
    hoursForm.addEventListener("submit", (event) => {
        event.preventDefault();
        parkingLot.setOperatingHours(openingTimeInput.value, closingTimeInput.value);
        alert("Parking hours updated.");
    });
    // Reset settings to default
    resetButton.addEventListener("click", () => {
        parkingLot.setMaxCapacity(50);
        parkingLot.setOperatingHours("08:30", "23:00");
        alert("Settings reset to default values.");
        location.reload();
    });
});
