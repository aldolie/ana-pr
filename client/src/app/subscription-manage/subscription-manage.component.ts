import {Component, OnInit} from '@angular/core';
import {Subscription} from "../models/subscription";
import {MatTableDataSource, PageEvent} from "@angular/material";
import {SubscriptionService} from "../subscription.service";

@Component({
    selector: 'app-subscription-manage',
    templateUrl: './subscription-manage.component.html',
    styleUrls: ['./subscription-manage.component.css']
})
export class SubscriptionManageComponent implements OnInit {

    page: number = 0;
    size: number = 0;

    subscriptions: Subscription[];

    displayedColumns = ['email', 'bankName', 'accountName', 'accountNumber', 'paymentProof', 'priviledge', 'status', 'action'];

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

    constructor(private subscriptionService: SubscriptionService) {
    }

    ngOnInit() {
        this.getSubscriptions();
    }

    approve(id: number) {
        this.subscriptionService.updateSubscription(id, 3).subscribe((data: any) => {
            this.getSubscriptions();
        });
    }

    reject(id: number) {
        this.subscriptionService.updateSubscription(id, 4).subscribe((data: any) => {
            this.getSubscriptions();
        });
    }

    applyFilter(): void {
        this.getSubscriptions();
    }

    getData($event): void {
        this.page = $event.pageIndex;
        this.getSubscriptions();
    }

    getSubscriptions() {
        this.subscriptionService.getSubscriptions(this.page + 1, this.filterValue).subscribe((data: any) => {
            this.page = data.page - 1;
            this.size = data.count;
            this.subscriptions = data.result;
            this.dataSource = new MatTableDataSource(this.subscriptions);
        });
    }
}
