import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {BehaviorSubject} from 'rxjs/Rx';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class UserService {

  public isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: Http, private localStorage: LocalStorageService) {
    this.isLoggedIn.next(!!localStorage.get('auth_token'));
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.isLoggedIn.next(true);

    return this.http
      .post(
        '/api/login',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {

          localStorage.setItem('auth_token', res.auth_token);
          this.isLoggedIn.next(true);

        }
        return res.success;
      });
  }

   getAccounts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

   // this.isLoggedIn.next(true);

    return this.http
      .get(
        '/api/my/accounts'
      ).map(data => {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
        });

  }

  createAccount(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.isLoggedIn.next(true);

    return this.http
      .post(
        '/api/login',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.isLoggedIn.next(true);
        }
        return res.success;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.isLoggedIn.next(false);
    this.http.get('/api/logout');
  }
}
