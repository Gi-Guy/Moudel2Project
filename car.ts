export class Car {
    constructor(
        private licensePlate: string,
        private owner?: string,
        private entryTime: string = new Date().toISOString()
    ) {}

    getLicensePlate(): string {
        return this.licensePlate;
    }
    
    getOwner(): string | undefined {
        return this.owner;
    }

    getEntryTime(): string {
        return this.entryTime;
    }

    setEntryTime(entryTime: string): void {
        this.entryTime = new Date(entryTime).toISOString();
    }
}
