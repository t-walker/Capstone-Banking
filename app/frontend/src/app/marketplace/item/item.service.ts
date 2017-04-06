import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MarketItemService {

  constructor(private http: Http) { }

  getLoan(id) {
    return this.http
      .get(
      '/api/loan/' + id
      ).map(res => res.json());
  }
}
