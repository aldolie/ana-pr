import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "./models/subscription";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable()
export class SubscriptionService {

  url: string = environment.apiUrl + "/subscription";

  constructor(private http: HttpClient) { }

  getSubscriptionHistories(page: number, status: number = -1): Observable<Subscription[]> {
    let params = new HttpParams().set('page', String(page));
    let url = this.url + '/history';
    if (status !== -1) {
      url += '/' + status;
    }
    return this.http.get(url, {params: params}).map((data: any) => {
      return data;
    }).catch((error: Response) => {
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
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  cancelSubscription(id: number): Observable<Subscription> {
    return this.http.put(this.url + '/cancel/' + id, {}).map(data => {
      return data;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  updateSubscription(id: number, status: number): Observable<Subscription> {
    return this.http.put(this.url + '/respond/' + id, { status: status }).map(data => {
      return data;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  createSubscription(formData: any): Observable<Subscription> {
    return this.http.post(this.url, formData).map(data => {
      return data;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

}
