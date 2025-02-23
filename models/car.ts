export class Car{
    constructor(
        private licensePlate: string,
        private owner?: string,
        private entryTime: string = new Date().toLocaleString("he-IL"),
    ){
    }
    getLicensePlate(): string{
        return this.licensePlate;
    }
    getOwner(): string{
        return this.owner;
    }
    getEntryTime(): string{
        return this.entryTime;
    }
    setentryTime(entryTime: string){
        this.entryTime = entryTime;
    }
}