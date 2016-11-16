import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }
  // Uses http.get() to load a single JSON file

  loginUser(loginObject) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var body = loginObject;

    return this.http.post('api/login', body, { headers: headers })
      .map(res => res.json());
  }
}
