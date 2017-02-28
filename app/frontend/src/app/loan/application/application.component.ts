import {Component, OnInit} from "@angular/core";
import {LoanApplicationService} from "./application.service";

@Component({
  templateUrl: "./app/loan/application/application.html",
  providers: [LoanApplicationService]

})

export class LoanApplicationComponent implements OnInit {
  public name = "";
  public type = "";
  public requested_amount = 0;
  public term = "";
  public description = "";
  public funding = "";
  public payment = "";

  constructor(private applicationService: LoanApplicationService) { }

  ngOnInit() {
    console.log("LoanApplication component initialized ...");
  }

  onSubmit() {
    var applicationObject = {};

    applicationObject['name'] = this.name;
    applicationObject['type'] = this.type;
    applicationObject['requested_amount'] = this.requested_amount;
    applicationObject['term'] = this.term;
    applicationObject['description'] = this.description;
    applicationObject['funding'] = this.funding;
    applicationObject['payment'] = this.payment;

    this.applicationService.onSubmit(applicationObject)
      .subscribe(
      data => {
      },
      err => console.log(err),
      () => console.log('finished'));
  }
}
