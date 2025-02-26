import { getCarList, removeCarFromParking } from "./parkingController.js";
document.addEventListener("DOMContentLoaded", () => {
    const selectedLicensePlate = localStorage.getItem("selectedCar");
    if (!selectedLicensePlate) {
        alert("No car selected for payment.");
        location.href = "index.html";
        return;
    }
    const car = getCarList().find(c => c.licensePlate === selectedLicensePlate);
    if (!car) {
        alert("Car not found.");
        location.href = "index.html";
        return;
    }
    document.getElementById("licensePlate").textContent = car.licensePlate;
    document.getElementById("entryTime").textContent = car.entryTime;
    document.getElementById("paymentAmount").textContent = `$${car.feeDue}`;
    document.getElementById("paymentForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const paymentData = {
            licensePlate: car.licensePlate,
            amountPaid: car.feeDue,
            cardNumber: document.getElementById("cardNumber").value,
            expiryDate: document.getElementById("expiryDate").value,
            cvv: document.getElementById("cvv").value,
            timestamp: new Date().toISOString()
        };
        savePaymentToStorage(paymentData);
        alert("Payment Successful!");
        removeCarFromParking(car.licensePlate);
        location.href = "index.html";
    });
});
function savePaymentToStorage(paymentData) {
    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    payments.push(paymentData);
    localStorage.setItem("payments", JSON.stringify(payments));
}
