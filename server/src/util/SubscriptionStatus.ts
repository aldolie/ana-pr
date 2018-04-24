
class SubscriptionStatus  {

    public static APPLIED = 1;
    public static CANCELLED = 2;
    public static APPROVED = 3;
    public static REJECTED = 4;

    getAppliedStatus() {
        return SubscriptionStatus.APPLIED;
    }

    getCancelledStatus() {
        return SubscriptionStatus.CANCELLED;
    }

    getApprovedStatus() {
        return SubscriptionStatus.APPROVED;
    }

    getRejectedStatus() {
        return SubscriptionStatus.REJECTED;
    }

}


export let SubscriptionStatuses = new SubscriptionStatus();