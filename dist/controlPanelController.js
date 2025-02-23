import { ParkingLot } from "./parkingLot.js";
const parkingLot = new ParkingLot();
document.addEventListener("DOMContentLoaded", () => {
    const maxCapacityInput = document.getElementById("maxCapacity");
    const capacityForm = document.getElementById("capacityForm");
    maxCapacityInput.value = parkingLot.getMaxCapacity().toString();
    capacityForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newCapacity = parseInt(maxCapacityInput.value, 10);
        if (newCapacity < 1 || isNaN(newCapacity)) {
            alert("Please enter a valid number.");
            return;
        }
        parkingLot.setMaxCapacity(newCapacity);
        alert(`Max capacity updated to ${newCapacity}`);
        location.href = "../index.html";
    });
});
