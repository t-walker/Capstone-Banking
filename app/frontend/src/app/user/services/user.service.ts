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
    this.isLoggedIn.next(!!localStorage.get('auth_token'));
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
        this.isLoggedIn.next(true);
      });
  }

   getAccounts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

   // this.isLoggedIn.next(true);

    return this.http
      .get(
        '/api/my/accounts'
      ).map(this.extractData);
  }

  getTransactions(id) {
   let headers = new Headers();
   headers.append('Content-Type', 'application/json');

  // this.isLoggedIn.next(true);

   return this.http
     .get(
       '/api/my/accounts/' + id + "/transactions"
     ).map(this.extractData);

 }

   private extractData(res: Response) {
    let body = res.json();

    console.log("extract data");
    console.log(body);
    return body.result || [];
  }

     getCurrentUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

   // this.isLoggedIn.next(true);

    return this.http
      .get(
        '/api/current_user'
      ).map(this.extractBody);
  }

     private extractBody(res: Response) {
    let body = res.json();

    console.log("extract body");
    console.log(body);
    return body || {};
  }

  // createAccount(email, password) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   this.isLoggedIn.next(true);

  //   return this.http
  //     .post(
  //       '/api/login',
  //       JSON.stringify({ email, password }),
  //       { headers }
  //     )
  //     .map(res => res.json())
  //     .map((res) => {
  //       if (res.success) {
  //         localStorage.setItem('auth_token', res.auth_token);
  //         this.isLoggedIn.next(true);
  //       }
  //       return res.success;
  //     });
  // }

  transferFunds(to, from, amount) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var body = {"to" : to, "from": from, "amount" : amount};

    console.log(body);

    return this.http
      .post(
        '/api/transfer',
        JSON.stringify(body),
        { headers }
      )
      .map(this.extractBody);
  }


  logout() {
    this.isLoggedIn.next(false);
    this.http.get('/api/logout');
    this.router.navigate(['home']);

  }
}
