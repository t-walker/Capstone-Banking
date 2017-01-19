import {Component, OnInit} from "@angular/core";
import { UserService } from '../../user/services/user.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: "navbar",
  templateUrl: "./app/layout/navbar/navbar.html",
})
export class NavComponent implements OnInit {
  ngOnInit() {

  }

  private isLoggedIn;
  private subscription: Subscription;

  constructor(private userService: UserService) {
    this.subscription = this.userService.isLoggedIn.subscribe(value => {this.isLoggedIn = value; console.log(value)} );
  }

  logout() {
    this.userService.logout();
  }
}
