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
      ).map(res => res.json());
  }
  
  reviewLoan(id, action) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var body = {};
    body['action'] = action;

    return this.http.post('api/loan/' + id + '/review', body, { headers: headers })
      .map(res => res.json());
  }
}
