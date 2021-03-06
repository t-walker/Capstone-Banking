import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs/Rx';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class UserService {

  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public user = new BehaviorSubject({});

  constructor(private http: Http, private localStorage: LocalStorageService, private router: Router) {
    this.isLoggedIn.next(!!localStorage.get('user'));
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');


    return this.http
      .post(
      '/api/login',
      JSON.stringify({ email, password }),
      { headers }
      )
      .map(res => res.json())
      .map((res) => {
        this.isLoggedIn.next(true);
        this.user.next(res.result[0]);
      });
  }

  getAccounts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // this.isLoggedIn.next(true);

    return this.http
      .get(
      '/api/my/accounts'
      ).map(res => res.json());
  }

  getTransactions(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // this.isLoggedIn.next(true);

    return this.http
      .get(
      '/api/my/accounts/' + id + "/transactions"
      ).map(res => res.json());

  }

  private extractData(res: Response) {
    let body = res.json();

    console.log("extract data");
    console.log(body);
    return body.result || [];
  }

  grabUser() {
    this.getCurrentUser().subscribe(
      data => {
        this.isLoggedIn.next(true);
        this.user.next(data.result);
      },
      err => {
        this.isLoggedIn.next(false);
      },
      () => {

      }
    );
  }

  getCreditScore() {
    let headers = new Headers();

    return this.http
      .get(
        '/api/creditScore'
        ).map(res => res)
        .catch(err => err);

  }

  public handleNoCreditError(error: Response) {
    console.log("error");
    console.error(error);
    return 30;
  }

  getCurrentUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // this.isLoggedIn.next(true);

    return this.http
      .get(
      '/api/current_user'
      ).map(res => res.json());
  }

  logout() {
    this.isLoggedIn.next(false);
    this.http.get('/api/logout').subscribe();
    this.router.navigate(['home']);
  }
}
