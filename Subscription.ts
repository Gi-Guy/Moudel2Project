export class Subscription{
    private static readonly MONTHLY_FEE: number = 100;
    private monthlyFee: number;

    constructor(
        private licensePlate: string,
        private owner: string,        
        private startDate: string,  
        private endDate: string,       
        private months: number = 1     
    ) {
        this.monthlyFee = Subscription.MONTHLY_FEE * this.months;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }
    getOwner(): string {
        return this.owner;
    }
    getStartDate(): string {
        return this.startDate;
    }
    getEndDate(): string {
        return this.endDate;
    }
    getMonthlyFee(): number {
        return this.monthlyFee;
    }
    isActive(): boolean {
        const now = new Date();
        const endDate = new Date(this.endDate);
        return now < endDate;
    }
}