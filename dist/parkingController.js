import { ParkingLot } from "./parkingLot.js";
import { Car } from "./car.js";
import { Subscriptions } from "./Subscriptions.js";
const parkingLot = new ParkingLot();
const subscriptions = new Subscriptions();
const HOURLY_RATE = 5;
export function addCarToParking(licensePlate, owner) {
    try {
        if (!parkingLot.iswithinOperatingHours()) {
            alert("Parking is closed. You cannot add cars at this time.");
            return false;
        }
        const car = new Car(licensePlate, owner);
        if (parkingLot.addCar(car)) {
            alert("Car added successfully!");
            updateParkingStatus();
            return true;
        }
    }
    catch (error) {
        console.error("Error adding car:", error);
        alert("An error occurred while adding the car. Please try again.");
    }
    return false;
}
export function calculateParkingFee(entryTime) {
    const entryDate = new Date(entryTime);
    const now = new Date();
    const diffInHours = Math.ceil((now.getTime() - entryDate.getTime()) / (1000 * 60 * 60));
    return diffInHours * HOURLY_RATE;
}
export function addSubscription(licensePlate, owner, months = 1) {
    try {
        if (subscriptions.addSubscription(licensePlate, owner, months)) {
            alert("Subscription added successfully!");
            renderSubscriptionList(); // רענון התצוגה מיד לאחר הוספת מנוי
            updateSubscriptionStatus();
        }
    }
    catch (error) {
        console.error("Error adding subscription", error);
        alert("An error occurred while adding the subscription. Please try again.");
    }
}
export function removeCarFromParking(licensePlate) {
    try {
        parkingLot.removeCar(licensePlate);
        alert("Car removed successfully!");
        updateParkingStatus();
    }
    catch (error) {
        console.error("Error removing car:", error);
        alert("An error occurred while removing the car. Please try again.");
    }
}
export function removeSubscription(licensePlate) {
    try {
        subscriptions.removeSubscription(licensePlate);
        alert("Subscription removed successfully!");
    }
    catch (error) {
        console.error("Error removing subscription:", error);
        alert("An error occurred while removing the subscription. Please try again.");
    }
}
export function getParkingInfo() {
    return {
        total: parkingLot.getMaxCapacity(),
        used: parkingLot.getCars().length,
        available: parkingLot.getAvailableSpots()
    };
}
export function getCarList() {
    return parkingLot.getCars().map(car => ({
        licensePlate: car.getLicensePlate(),
        owner: car.getOwner() || "Unknown",
        entryTime: car.getEntryTime(),
        feeDue: calculateParkingFee(car.getEntryTime())
    }));
}
export function getSubscriptionList() {
    return subscriptions.getSubscriptions().map(sub => ({
        licensePlate: sub.getLicensePlate(),
        owner: sub.getOwner() || "Unknown",
        startDate: sub.getStartDate(),
        endDate: sub.getEndDate(),
        monthlyFee: sub.getMonthlyFee(),
        active: sub.isActive()
    }));
}
function updateSubscriptionStatus() {
    const activeSubs = document.getElementById("activeSubs");
    const inactiveSubs = document.getElementById("inactiveSubs");
    const subscriptionList = document.getElementById("subscriptionList");
    if (!activeSubs || !inactiveSubs || !subscriptionList) {
        console.warn("Subscription status elements not found on this page. Skipping update.");
        return;
    }
    const subs = getSubscriptionList();
    const active = subs.filter(sub => sub.active);
    const inactive = subs.filter(sub => !sub.active);
    activeSubs.textContent = active.length.toString();
    inactiveSubs.textContent = inactive.length.toString();
    renderSubscriptionList();
}
export function renderSubscriptionList() {
    try {
        const subscriptionList = document.getElementById("subscriptionList");
        if (!subscriptionList) {
            console.error("Element #subscriptionList not found!");
            return;
        }
        subscriptionList.innerHTML = "";
        const subs = getSubscriptionList();
        if (subs.length === 0) {
            subscriptionList.innerHTML = "<li>No subscriptions found.</li>";
            return;
        }
        subs.forEach(sub => {
            const li = document.createElement("li");
            li.classList.add("sub-item");
            const subInfo = document.createElement("div");
            subInfo.classList.add("sub-info");
            subInfo.innerHTML = `<strong>${sub.licensePlate}</strong> - ${sub.owner}`;
            const subMeta = document.createElement("div");
            subMeta.classList.add("sub-meta");
            const startDate = document.createElement("span");
            startDate.classList.add("start-date");
            startDate.innerText = `Start Date: ${sub.startDate}`;
            const endDate = document.createElement("span");
            endDate.classList.add("end-date");
            endDate.innerText = `End Date: ${sub.endDate}`;
            const monthlyFee = document.createElement("span");
            monthlyFee.classList.add("monthly-fee");
            monthlyFee.innerText = `Monthly Fee: $${sub.monthlyFee}`;
            const activeBadge = document.createElement("span");
            activeBadge.classList.add("active-badge");
            activeBadge.innerText = sub.active ? "Active" : "Inactive";
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-sub");
            removeButton.innerText = "Remove";
            removeButton.onclick = () => removeSubscription(sub.licensePlate);
            subMeta.appendChild(startDate);
            subMeta.appendChild(endDate);
            subMeta.appendChild(monthlyFee);
            subMeta.appendChild(activeBadge);
            subMeta.appendChild(removeButton);
            li.appendChild(subInfo);
            li.appendChild(subMeta);
            subscriptionList.appendChild(li);
        });
    }
    catch (error) {
        console.error("Error rendering subscription list:", error);
    }
}
function updateParkingStatus() {
    try {
        const usedSlots = document.getElementById("usedSlots");
        const availableSlots = document.getElementById("availableSlots");
        const carList = document.getElementById("carList");
        const maxCapacity = document.getElementById("maxCapacity");
        const openingTime = document.getElementById("openingTime");
        const closingTime = document.getElementById("closingTime");
        if (!usedSlots || !availableSlots || !carList || !openingTime || !closingTime || !maxCapacity) {
            console.error("Parking status elements not found!");
            return;
        }
        const info = getParkingInfo(); //<------FIX THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        usedSlots.textContent = info.used.toString();
        availableSlots.textContent = info.available.toString();
        maxCapacity.textContent = info.total.toString();
        openingTime.textContent = parkingLot.getOpeningTime();
        closingTime.textContent = parkingLot.getClosingTime();
        renderCarList();
    }
    catch (error) {
        console.error("Error updating parking status:", error);
    }
}
export function renderCarList() {
    try {
        const carList = document.getElementById("carList");
        if (!carList) {
            console.error("Element #carList not found!");
            return;
        }
        carList.innerHTML = "";
        const cars = getCarList();
        if (cars.length === 0) {
            carList.innerHTML = "<li>No cars in the parking lot.</li>";
            return;
        }
        cars.forEach(car => {
            const li = document.createElement("li");
            li.classList.add("car-item");
            const carInfo = document.createElement("div");
            carInfo.classList.add("car-info");
            carInfo.innerHTML = `<strong>${car.licensePlate}</strong> - ${car.owner}`;
            const carMeta = document.createElement("div");
            carMeta.classList.add("car-meta");
            const entryTime = document.createElement("span");
            entryTime.classList.add("entry-time");
            entryTime.innerText = `Entered: ${car.entryTime}`;
            const feeDue = document.createElement("span");
            feeDue.classList.add("fee-due");
            feeDue.innerText = `Amount Due: $${car.feeDue}`;
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-car");
            removeButton.innerText = "Remove";
            removeButton.onclick = () => removeCarFromParking(car.licensePlate);
            carMeta.appendChild(entryTime);
            carMeta.appendChild(feeDue);
            carMeta.appendChild(removeButton);
            li.appendChild(carInfo);
            li.appendChild(carMeta);
            carList.appendChild(li);
        });
    }
    catch (error) {
        console.error("Error rendering car list:", error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("usedSlots")) {
        updateParkingStatus();
        setInterval(updateParkingStatus, 10000);
    }
    if (document.getElementById("subscriptionList")) {
        updateSubscriptionStatus();
        renderSubscriptionList();
    }
});
function handleAddSubscription() {
    const licensePlateInput = document.getElementById("licensePlate");
    const ownerInput = document.getElementById("owner");
    const monthsInput = document.getElementById("months");
    const licensePlate = licensePlateInput.value.trim();
    const owner = ownerInput.value.trim();
    const months = parseInt(monthsInput.value, 10);
    if (!licensePlate || !owner || isNaN(months) || months < 1) {
        alert("Please enter valid details for the subscription.");
        return;
    }
    console.log("Adding subscription:", { licensePlate, owner, months });
    addSubscription(licensePlate, owner, months);
    // ניקוי הטופס אחרי הוספה
    licensePlateInput.value = "";
    ownerInput.value = "";
    monthsInput.value = "1";
}
