let Subscription = /** @class */ (() => {
    class Subscription {
        constructor(licensePlate, owner, startDate, endDate, months = 1) {
            this.licensePlate = licensePlate;
            this.owner = owner;
            this.startDate = startDate;
            this.endDate = endDate;
            this.months = months;
            this.monthlyFee = Subscription.MONTHLY_FEE * this.months;
        }
        getLicensePlate() {
            return this.licensePlate;
        }
        getOwner() {
            return this.owner;
        }
        getStartDate() {
            return this.startDate;
        }
        getEndDate() {
            return this.endDate;
        }
        getMonthlyFee() {
            return this.monthlyFee;
        }
        isActive() {
            const now = new Date();
            const endDate = new Date(this.endDate);
            return now < endDate;
        }
    }
    Subscription.MONTHLY_FEE = 100;
    return Subscription;
})();
export { Subscription };
