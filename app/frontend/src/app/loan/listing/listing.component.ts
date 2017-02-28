import {Component, OnInit} from "@angular/core";
import {LoanListingService} from "./listing.service";

@Component({
  templateUrl: "./app/loan/listing/listing.html",
  providers: [LoanListingService]

})

export class LoanListingComponent implements OnInit {
  private loans;

  constructor(private listingService: LoanListingService) { }

  ngOnInit() {
    console.log("LoanListing component initialized ...");
    this.getListings();
  }

  getListings() {
    this.listingService.getLoans()
      .subscribe(
      data => {
        this.loans = data;
        console.log(this.loans);
      },
      err => console.log(err),
      () => console.log('finished'));
  }
}
