export class Car {
    constructor(licensePlate, owner, entryTime = new Date().toISOString()) {
        this.licensePlate = licensePlate;
        this.owner = owner;
        this.entryTime = entryTime;
    }
    getLicensePlate() {
        return this.licensePlate;
    }
    getOwner() {
        return this.owner;
    }
    getEntryTime() {
        return this.entryTime;
    }
    setEntryTime(entryTime) {
        this.entryTime = new Date(entryTime).toISOString();
    }
}
