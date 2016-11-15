import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  templateUrl: './app/login/components/login.html',
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public email = "";
  public password = "";

  ngOnInit() {
    console.log("Login component initialized ...");
  }

  constructor(private loginService: LoginService, private router: Router) { }

  onClickLogin() {
    let loginObject = {};

    loginObject['email'] = this.email;
    loginObject['password'] = this.password;

    this.loginService.createUser(loginObject)
      .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('finished'));

    this.router.navigate(['/home'])
  }

}
