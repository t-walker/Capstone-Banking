import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MarketplaceListService {

  constructor(private http: Http) { }

  getLoans() {
    return this.http.get('api/loans/marketplace')
      .map(res => res.json().result);
  }
}
