import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "./models/subscription";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import { ToasterService } from './toaster.service';

@Injectable()
export class SubscriptionService {

  url: string = environment.apiUrl + "/subscription";

  constructor(private http: HttpClient, public toaster: ToasterService) { }

  getLatestSubscription(): Observable<Subscription[]> {
    let url = this.url + '/history';
    return this.http.get(url).map((data: any) => {
      return data;
    }).catch((error) => {
      this.toaster.showError(error.error);
      return Observable.throw(error);
    });
  }

  getSubscriptions(page: number, status: number = -1): Observable<Subscription[]> {
    let params = new HttpParams().set('page', String(page));
    let url = this.url;
    if (status !== -1) {
      url += '/' + status;
    }
    return this.http.get(url, {params: params}).map((data: any) => {
      return data;
    }).catch((error) => {
      this.toaster.showError(error.error);
      return Observable.throw(error);
    });
  }

  cancelSubscription(id: number): Observable<Subscription> {
    return this.http.put(this.url + '/cancel/' + id, {}).map(data => {
      return data;
    }).catch((error) => {
      this.toaster.showError(error.error);
      return Observable.throw(error);
    });
  }

  updateSubscription(id: number, status: number): Observable<Subscription> {
    return this.http.put(this.url + '/respond/' + id, { status: status }).map(data => {
      this.toaster.showSuccess('Subscription Updated');
      return data;
    }).catch((error) => {
      this.toaster.showError(error.error);
      return Observable.throw(error);
    });
  }

  createSubscription(formData: any): Observable<Subscription> {
    return this.http.post(this.url, formData).map(data => {
      this.toaster.showSuccess('New Subscription ceated');
      return data;
    }).catch((error) => {
      this.toaster.showError(error.error);
      return Observable.throw(error);
    });
  }

}
