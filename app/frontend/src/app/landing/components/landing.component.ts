import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import {LoanListingComponent} from "../../loan/listing/listing.component";
import {AccountListingComponent} from "../../account/listing/listing.component";
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
    this.userService.user.subscribe(user => {this.user = user; } );
  }
}
