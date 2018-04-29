import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from './models/user';
import { environment } from '../environments/environment';
import { ToasterService } from './toaster.service';

@Injectable()
export class UserService {

  url: string = environment.apiUrl + "/users";

  constructor(private http: HttpClient, public toaster: ToasterService) { }

  getUsers(page: number): Observable<User[]> {

    let params = new HttpParams().set('page', String(page));
    return this.http.get(this.url, {params: params}).map((data: any) => {
      return data;
    }).catch((error) => {
      this.toaster.showError(error.error);
      return Observable.throw(error);
    });
  }

  getUser(id: number): Observable<User> {
     return this.http.get(this.url + '/' + id).map(data => {
         return data;
     }).catch((error) => {
         this.toaster.showError(error.error);
         return Observable.throw(error);
     });
  }

  updateUser(id: number, analysis: User): Observable<User> {
    return this.http.put(this.url + '/' + id, analysis).map(data => {
         return data;
     }).catch((error) => {
         this.toaster.showError(error.error);
         return Observable.throw(error);
     });
  }

}
