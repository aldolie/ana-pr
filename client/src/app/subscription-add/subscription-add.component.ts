import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from "../subscription.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-subscription-add',
    templateUrl: './subscription-add.component.html',
    styleUrls: ['./subscription-add.component.css']
})
export class SubscriptionAddComponent implements OnInit {

    private priviledge: number;
    private bankName: string;
    private accountName: string;
    private accountNumber: string;
    public step: number = 0;

    priviledges: any[] = [
        {value: 1, text: 'Basic', price: '$25'},
        {value: 3, text: 'Pro', price: '$250'}
    ];

    image: any;
    isAdmin: boolean = false;

    constructor(private router: Router, private subscriptionService: SubscriptionService, private authService: AuthService) {
        this.isAdmin = authService.isAdmin();
    }

    ngOnInit() {
        this.step = 0;
    }

    submit() {
        let formData = new FormData();
        formData.append('image', this.image, this.image.name);
        formData.append('priviledge', this.priviledge.toString());
        formData.append('bankName', this.bankName);
        formData.append('accountName', this.accountName);
        formData.append('accountNumber', this.accountNumber);
        
        this.subscriptionService.createSubscription(formData).subscribe(analysis => {
            this.router.navigate([(this.isAdmin) ? 'subscription' : 'profile']);
        }, error => {
            console.log(error);
        });
    }

    next() {
        this.step = 1;
    }

    setFile($event) {
        let files = $event.srcElement.files;
        if (!files) {
            this.image = null;
            return;
        }

        this.image = files[0];
        return $event;
    }

    dataURItoBlob(dataURI) {
        let binary = atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mimeString
        });
    }

}
