import {Component, OnInit, Input} from "@angular/core";
import {LoanListingService} from "./listing.service";

@Component({
  selector: "loanlisting",
  templateUrl: "./app/loan/listing/listing.html",
  providers: [LoanListingService]
})

export class LoanListingComponent implements OnInit {
  private loans = [];
  @Input() title: string;

  constructor(private listingService: LoanListingService) { }

  ngOnInit() {
    console.log("LoanListing component initialized ...");
    console.log("TITLE");
    console.log(this.title);
    this.getListings();
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
