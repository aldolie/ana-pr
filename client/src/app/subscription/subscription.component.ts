import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, PageEvent} from "@angular/material";
import {SubscriptionService} from "../subscription.service";
import {Subscription} from "../models/subscription";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

    page: number = 0;
    size: number = 0;

    subscriptions: Subscription[];

    displayedColumns = ['bankName', 'accountName', 'accountNumber', 'paymentProof', 'priviledge', 'status', 'action'];

    adminDisplayedColumns = ['email', 'bankName', 'accountName', 'accountNumber', 'paymentProof', 'priviledge', 'status', 'action'];

    priviledges: string[] = ['Basic', '', 'Pro'];

    statuses: any[] = [
        {value: -1, text: 'Show All'},
        {value: 1, text: 'Applied'},
        {value: 2, text: 'Cancelled'},
        {value: 3, text: 'Approved'},
        {value: 4, text: 'Rejected'}
    ];

    filterValue: number = 1;

    dataSource: MatTableDataSource<Subscription>;

    pageEvent: PageEvent;

    url: string = environment.serverUrl;

    isAdmin: boolean = false;

    constructor(private authService: AuthService, private subscriptionService: SubscriptionService) {
        this.isAdmin = authService.isAdmin();
    }

    ngOnInit() {
        this.getSubs();
    }

    cancel(id: number) {
        this.subscriptionService.cancelSubscription(id).subscribe((data: any) => {
            this.getSubs();
        });
    }

    approve(id: number) {
        this.subscriptionService.updateSubscription(id, 3).subscribe((data: any) => {
            this.getSubs();
        });
    }

    reject(id: number) {
        this.subscriptionService.updateSubscription(id, 4).subscribe((data: any) => {
            this.getSubs();
        });
    }

    applyFilter(): void {
        this.getSubs();
    }

    getSubs() {
        if (this.isAdmin) {
            this.getSubscriptions();
        } else {
            this.getSubscriptionHistories();
        }
    }

    getData($event): void {
        this.page = $event.pageIndex;
        this.getSubs();
        return $event;
    }

    getSubscriptions() {
        this.subscriptionService.getSubscriptions(this.page + 1, this.filterValue).subscribe((data: any) => {
            this.page = data.page - 1;
            this.size = data.count;
            this.subscriptions = data.result;
            this.dataSource = new MatTableDataSource(this.subscriptions);
        });
    }

    getSubscriptionHistories() {
        this.subscriptionService.getSubscriptionHistories(this.page + 1, this.filterValue).subscribe((data: any) => {
            this.page = data.page - 1;
            this.size = data.count;
            this.subscriptions = data.result;
            this.dataSource = new MatTableDataSource(this.subscriptions);
        });
    }
}
