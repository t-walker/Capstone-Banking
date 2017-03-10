import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoanReviewService {

  constructor(private http: Http) { }

  getLoan(id) {
   return this.http
     .get(
       '/api/loan/' + id
     ).map(this.extractData);
 }

   private extractData(res: Response) {
    let body = res.json();

    console.log("extract data");
    console.log(body);
    return body.result || [];
  }
}
