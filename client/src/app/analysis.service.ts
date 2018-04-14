import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Analysis } from './models/analysis';

@Injectable()
export class AnalysisService {

  url: string = "http://localhost:3000/api/analyzes"

  constructor(private http: HttpClient) { }

  getAnalyzes(page: number): Observable<Analysis[]> {

    let params = new HttpParams().set('page', String(page));
    return this.http.get(this.url, {params: params}).map((data: any) => {

      return data;
    }).catch((error: Response) => {
      return Observable.throw(error);
    });
  }

  getAnalysis(id: number): Observable<Analysis> {
     return this.http.get(this.url + '/' + id).map(data => {
         return data;
     }).catch((error: Response) => {
         return Observable.throw(error);
     });
  }

  updateAnalysis(id: number, analysis: Analysis): Observable<Analysis> {
    return this.http.put(this.url + '/' + id, analysis).map(data => {
         return data;
     }).catch((error: Response) => {
         return Observable.throw(error);
     });
  }

  createAnalysis(analysis: Analysis): Observable<Analysis> {
    return this.http.post(this.url, analysis).map(data => {
         return data;
     }).catch((error: Response) => {
         return Observable.throw(error);
     });
  }

}
