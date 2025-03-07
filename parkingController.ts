import { ParkingLot } from "./parkingLot.js";
import { Car } from "./car.js";
import { Subscriptions } from "./Subscriptions.js";  

const parkingLot = new ParkingLot();
const subscriptions = new Subscriptions();
const HOURLY_RATE = 5;

export function addCarToParking(licensePlate: string, owner?: string): boolean {
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
    } catch (error) {
        console.error("Error adding car:", error);
        alert("An error occurred while adding the car. Please try again.");
    }
    return false;
}

export function calculateParkingFee(entryTime: string): number {
    const entryDate = new Date(entryTime);
    const now = new Date();
    const diffInHours = Math.ceil((now.getTime() - entryDate.getTime()) / (1000 * 60 * 60));
    return diffInHours * HOURLY_RATE;
}

export function addSubscription(licensePlate: string, owner?: string, months: number = 1): void {
    try {
        if (subscriptions.addSubscription(licensePlate, owner, months)) {
            alert("Subscription added successfully!");
            updateSubscriptionStatus();
        }
    } catch (error) {
        console.error("Error adding subscription", error);
        alert("An error occurred while adding the subscription. Please try again.");
    }
}

export function removeCarFromParking(licensePlate: string): void {
    try {
        parkingLot.removeCar(licensePlate);
        alert("Car removed successfully!");
        updateParkingStatus();
    } catch (error) {
        console.error("Error removing car:", error);
        alert("An error occurred while removing the car. Please try again.");
    }
}

export function removeSubscription(licensePlate: string): void {
    try {
        subscriptions.removeSubscription(licensePlate);
        alert("Subscription removed successfully!");
        updateSubscriptionStatus();
    }
    catch (error) {
        console.error("Error removing subscription:", error);
        alert("An error occurred while removing the subscription. Please try again.");
    }
}
function updateTimeAndStatus() {
    const now = new Date();
    document.getElementById("currentTime").textContent = now.toLocaleTimeString();

    const isOpen = parkingLot.iswithinOperatingHours();
    const statusEl = document.getElementById("parkingStatus");
    statusEl.textContent = isOpen ? "OPEN" : "CLOSED";
    statusEl.style.color = isOpen ? "green" : "red";
}
export function getParkingInfo() {
    return {
        total: parkingLot.getMaxCapacity(),
        used: parkingLot.getCars().length,
        available: parkingLot.getAvailableSpots()
    };
}

export function getCarList() {
    return parkingLot.getCars().map(car => {
        const isSubscribed = subscriptions.getSubscriptions().some(sub => sub.getLicensePlate() === car.getLicensePlate());
        return {
            licensePlate: car.getLicensePlate(),
            owner: car.getOwner() || "Unknown",
            entryTime: car.getEntryTime(),
            feeDue: isSubscribed ? 0 : calculateParkingFee(car.getEntryTime())
        };
    });
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
function updateSubscriptionStatus(): void {
    try{
         const activeSubs = document.getElementById("activeSubs");
        // const inactiveSubs = document.getElementById("inactiveSubs");
        const subscriptionList = document.getElementById("subscriptionList");
    
        //if (!activeSubs || !inactiveSubs || !subscriptionList) {
        if ( !activeSubs || !subscriptionList) {
        console.warn("Subscription status elements not found on this page. Skipping update.");
            return;
        }
    
        const subs = getSubscriptionList();
        const active = subs.filter(sub => sub.active);
        const inactive = subs.filter(sub => !sub.active);
    
         activeSubs.textContent = active.length.toString();
        // inactiveSubs.textContent = inactive.length.toString();
    
        renderSubscriptionList();

    }catch(error){
        console.error("Error updating subscription status:", error);
    }
}

export function renderSubscriptionList(): void {
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
            monthlyFee.innerText = `Total payment: $${sub.monthlyFee}`;

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
    } catch (error) {
        console.error("Error rendering subscription list:", error);
    }
    
}
function updateParkingStatus(): void {
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
        
        const info = getParkingInfo();//<------FIX THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        usedSlots.textContent = info.used.toString();
        availableSlots.textContent = info.available.toString();
        maxCapacity.textContent = info.total.toString();
        openingTime.textContent = parkingLot.getOpeningTime();
        closingTime.textContent = parkingLot.getClosingTime();
        
        renderCarList();
    } catch (error) {
        console.error("Error updating parking status:", error);
    }
}

export function renderCarList(): void {
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
            li.setAttribute("draggable", "true");

            li.addEventListener("dragstart", () => {
                li.classList.add("dragging");
            });

            li.addEventListener("dragend", () => {
                li.classList.remove("dragging");
            });

            if (car.feeDue === 0) {
                li.classList.add("subscribed-car");
            }

            const carInfo = document.createElement("div");
            carInfo.classList.add("car-info");
            carInfo.innerHTML = `<strong>${car.licensePlate}</strong> - ${car.owner}`;

            if (car.feeDue === 0) {
                carInfo.innerHTML += ` <span class="subscription-badge">🔵 Subscribed</span>`;
            }

            const carMeta = document.createElement("div");
            carMeta.classList.add("car-meta");

            const entryTime = document.createElement("span");
            entryTime.classList.add("entry-time");
            entryTime.innerText = `Entered: ${car.entryTime}`;

            const feeDue = document.createElement("span");
            feeDue.classList.add("fee-due");
            feeDue.innerText = `Amount Due: $${car.feeDue}`;

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");

            if (car.feeDue > 0) {
                const payButton = document.createElement("button");
                payButton.classList.add("pay-car");
                payButton.innerText = "Payment";
                payButton.onclick = () => goToPayment(car.licensePlate);
                buttonContainer.appendChild(payButton);
            }

            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-car");
            removeButton.innerText = "Remove";
            removeButton.onclick = () => removeCarFromParking(car.licensePlate);
            buttonContainer.appendChild(removeButton);

            carMeta.appendChild(entryTime);
            if (car.feeDue > 0) {
                carMeta.appendChild(feeDue);
            }
            carMeta.appendChild(buttonContainer);

            li.appendChild(carInfo);
            li.appendChild(carMeta);
            carList.appendChild(li);
        });

        carList.addEventListener("dragover", (event) => {
            event.preventDefault();
            const draggingItem = document.querySelector(".dragging");
            const afterElement = getDragAfterElement(carList, event.clientY);
            if (afterElement == null) {
                carList.appendChild(draggingItem);
            } else {
                carList.insertBefore(draggingItem, afterElement);
            }
        });
    } catch (error) {
        console.error("Error rendering car list:", error);
    }
}

function getDragAfterElement(container: HTMLElement, y: number) {
    const draggableElements = Array.from(container.querySelectorAll(".car-item:not(.dragging)"));
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}


function goToPayment(licensePlate: string) {
    localStorage.setItem("selectedCar", licensePlate);
    location.href = "payment.html";
}

setInterval(updateTimeAndStatus, 1000);
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("usedSlots")) {
        updateParkingStatus();
    }

    if (document.getElementById("subscriptionList")) {
        updateSubscriptionStatus();
    }
});
document.addEventListener("DOMContentLoaded", updateTimeAndStatus);
