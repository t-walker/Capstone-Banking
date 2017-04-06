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

  constructor(private reviewService: LoanReviewService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log("LoanApproval component initialized ...");

    this.route.params.subscribe(params => {
      this.loanId = +params['id'];
      this.reviewService.getLoan(this.loanId).subscribe(
        data => {
          this.loan = data.result;
        },
        err => {

        },
        () => { }
      );
    });
  }

  approveLoan() {
    this.reviewService.reviewLoan(this.loanId, "approve").subscribe(
      loan => {
        this.router.navigate(['landing']);
      },
      err => {
        this.router.navigate(['landing']);
      }
    );
  }

  denyLoan() {
    this.reviewService.reviewLoan(this.loanId, "deny").subscribe(
      loan => {
        this.router.navigate(['landing']);
      },
      err => {
        this.router.navigate(['landing']);
      }
    );
  }

}
