import { Component, OnInit } from '@angular/core';

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

  priviledges: any[] = [
    {value: 1, text: 'Basic'},
    {value: 3, text: 'Pro'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
