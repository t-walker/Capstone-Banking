import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import {AccountListingComponent} from "../../accounts/components/account-listing.component";
import { UserService } from '../../user/services/user.service';

@Component({
  templateUrl: './app/landing/components/landing.html'
})

export class LandingComponent implements OnInit {
  private user;

  ngOnInit() {
    console.log("Landing component initialized ...");

  }

  constructor(private userService: UserService) {
    this.userService.user.subscribe(value => {this.user = value; console.log("USER"); console.log(this.user) } );
  }
}
