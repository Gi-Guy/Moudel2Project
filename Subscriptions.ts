import { Subscription } from "./Subscription.js";
export class Subscriptions{
    private subscriptions: Subscription[] = [];
    
    constructor() {
        this.loadFromStorage();
    }

    addSubscription(licensePlate: string, owner?: string, months: number = 1): boolean {
        const alreadyExists = this.subscriptions.some(existingSub => existingSub.getLicensePlate() === subscription.getLicensePlate());
        if(alreadyExists){
            alert("Car already has a subscription!");
            return false;
        }
        
        const startDate = new Date().toISOString();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);
        const subscription = new Subscription(licensePlate, owner,startDate, endDate.toISOString(), months);
        this.subscriptions.push(subscription);
        this.saveToStorage();
        return true;
    }
    removeSubscription(licensePlate: string): void{
        this.subscriptions = this.subscriptions.filter(sub => sub.getLicensePlate() !== licensePlate);
        this.saveToStorage();
    }
    private saveToStorage(): void {
        localStorage.setItem("subscriptions", JSON.stringify(this.subscriptions));
    }

    private loadFromStorage(): void {
        const data = localStorage.getItem("subscriptions");
        if (data) {
            this.subscriptions = JSON.parse(data).map((sub: any) => new Subscription(sub.licensePlate, sub.owner, sub.startDate, sub.endDate, sub.months));
        }
    }
}