import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';

import { UserService } from '../../user/services/user.service';

@Component({
  templateUrl: './app/login/components/login.html',
})
export class LoginComponent implements OnInit {

  public email = "";
  public password = "";

  ngOnInit() {
    console.log("Login component initialized ...");
  }

  constructor(private userService: UserService, private router: Router) { }

  onClickLogin() {
    let loginObject = {};

    loginObject['email'] = this.email;
    loginObject['password'] = this.password;


    this.loginUser(loginObject)
      .subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
        // Flash ERROR
      },
      () => console.log('finished'));
  }

  loginUser(loginObject) {
    var body = loginObject;

    return this.userService.login(loginObject['email'], loginObject['password']);
  }
}
