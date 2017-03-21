import {Component, OnInit, Input} from "@angular/core";

import {OfficerLoanListingService} from "./officerlisting.service";
import {UserService} from "../../user/services/user.service";

@Component({
  selector: "officerloanlisting",
  templateUrl: "./app/loan/officerlisting/officerlisting.html",
  providers: [OfficerLoanListingService]
})

export class OfficerLoanListingComponent implements OnInit {
  private user;
  private loans = [];

  constructor(private listingService: OfficerLoanListingService, private userService: UserService) { }

  ngOnInit() {
    this.getListings();

    this.userService.user.subscribe(
      data => {
        this.user = data;
      },
      err => {},
      () => {}
    );
  }

  getListings() {
    this.listingService.getLoans()
      .subscribe(
      loans => {
        this.loans = loans;
        console.log(this.loans);
      },
      err => console.log(err),
      () => console.log('finished'));
  }
}
