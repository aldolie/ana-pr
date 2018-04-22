import {User} from "./user";
export class Subscription {
    id: number;
    user: User;
    userId: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    paymentProof: string;
    priviledge: number;
    status: number;
    respondedAt: Date;
}