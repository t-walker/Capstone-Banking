import {Component, OnInit, Input} from "@angular/core";

import {UserLoanListingService} from "./userlisting.service";
import {UserService} from "../../user/services/user.service";

@Component({
  selector: "userloanlisting",
  templateUrl: "./app/loan/userlisting/userlisting.html",
  providers: [UserLoanListingService]
})

export class UserLoanListingComponent implements OnInit {
  private user;
  private loans = [];
  @Input() title: string;

  constructor(private listingService: UserLoanListingService, private userService: UserService) { }

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
        this.loans = loans.slice(0, 5);
      },
      err => console.log(err),
      () => console.log('finished'));
  }
}
