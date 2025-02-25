//MODEL
import { Subscription } from "./Subscription.js";
export class Subscriptions {
    constructor() {
        this.subscriptions = [];
        this.loadFromStorage();
    }
    addSubscription(licensePlate, owner, months = 1) {
        const alreadyExists = this.subscriptions.some(existingSub => existingSub.getLicensePlate() === licensePlate);
        if (alreadyExists) {
            alert("Car already has a subscription!");
            return false;
        }
        const startDate = new Date().toISOString();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);
        const subscription = new Subscription(licensePlate, owner, startDate, endDate.toISOString(), months);
        this.subscriptions.push(subscription);
        this.saveToStorage();
        return true;
    }
    removeSubscription(licensePlate) {
        this.subscriptions = this.subscriptions.filter(sub => sub.getLicensePlate() !== licensePlate);
        this.saveToStorage();
    }
    getSubscriptions() {
        return this.subscriptions;
    }
    getActiveSubscriptions() {
        return this.subscriptions.filter(sub => sub.isActive());
    }
    saveToStorage() {
        localStorage.setItem("subscriptions", JSON.stringify(this.subscriptions));
    }
    loadFromStorage() {
        const data = localStorage.getItem("subscriptions");
        if (data) {
            this.subscriptions = JSON.parse(data).map((sub) => new Subscription(sub.licensePlate, sub.owner, sub.startDate, sub.endDate, sub.months));
        }
    }
}
