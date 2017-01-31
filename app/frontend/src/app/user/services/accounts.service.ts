// import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
// import {BehaviorSubject} from 'rxjs/Rx';

// import { LocalStorageService } from 'angular-2-local-storage';

// @Injectable()
// export class AccountsService {

//   public isLoggedIn = new BehaviorSubject<boolean>(false);

//   constructor(private http: Http, private localStorage: LocalStorageService)
//   {
//     this.isLoggedIn.next(!!localStorage.get('auth_token'));
//   }

//   login(email, password) {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');

//     this.isLoggedIn.next(true);

//     return this.http
//       .get(
//         '/api/accounts',
//         JSON.stringify({ user_id, total, account_type }),
//         { headers })
//       .map(res => res.json())
//       .map((res) => {
//         if (res.success) {
//           localStorage.setItem('auth_token', res.auth_token);
//           this.isLoggedIn.next(true);
//         }
//         return res.success;
//       });
//   }

//   logout() {
//     localStorage.removeItem('auth_token');
//     this.isLoggedIn.next(false);
//     this.http.get('/api/logout');
//   }
// }
