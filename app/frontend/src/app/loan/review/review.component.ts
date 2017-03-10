import {Component, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import {LoanReviewService} from "./review.service";

@Component({
  templateUrl: "./app/loan/review/review.html",
  providers: [LoanReviewService]

})

export class LoanReviewComponent implements OnInit {
  private loanId: number;
  private loan = {};

  constructor(private approvalService: LoanReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("LoanApproval component initialized ...");

    this.route.params.subscribe(params => {
      this.loanId = +params['id'];
      this.approvalService.getLoan(this.loanId).subscribe(loan => {
        this.loan = loan;
      });
    });
  }

}
