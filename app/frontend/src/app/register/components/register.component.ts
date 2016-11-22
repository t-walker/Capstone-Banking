import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import { RegisterService } from '../services/register.service';

@Component({
  templateUrl: './app/register/components/register.html',
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  public email = "";
  public p1 = "";
  public p2 = "";
  public first_name = "";
  public last_name = "";
  public username = "";

  ngOnInit() {
    console.log("Register component initialized ...");
  }

  constructor(private registerService: RegisterService) { }

  onClickRegister() {
    let registerObject = {};

    registerObject['email'] = this.email;
    registerObject['password'] = this.p1;
    registerObject['username'] = this.username;
    registerObject['first_name'] = this.first_name;
    registerObject['last_name'] = this.last_name;

    console.log(registerObject);

    this.registerService.createUser(registerObject)
      .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('finished'));
  }
}
