import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserLoanListingService {

  constructor(private http: Http) { }

  getLoans() {
    return this.http.get('api/my/loans')
      .map(res => res.json().result);
  }
}
