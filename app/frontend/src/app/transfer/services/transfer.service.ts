import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UserService } from '../../user/services/user.service';

@Injectable()
export class TransferService {

  constructor(private http: Http) { }
  // Uses http.get() to load a single JSON file

  transferFundsUser(accountF, accountT, amount) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = {};

    body['type'] = 'user';
    body['accountF'] = +accountF;
    body['accountT'] = +accountT;
    body['amount'] = +amount;

    return this.http
      .post(
      '/api/transfer',
      JSON.stringify(body),
      { headers }
      )
      .map(res => res.json());
  }

  transferFundsInternal(destination, amount, accountId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = {};

    body['type'] = 'internal';
    body['destination'] = destination;
    body['amount'] = +amount;
    body['account'] = +accountId;

    return this.http
      .post(
      '/api/transfer',
      JSON.stringify(body),
      { headers }
      )
      .map(res => res.json());
  }
}
