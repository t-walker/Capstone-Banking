import {Component, OnInit, Input} from "@angular/core";
import {MarketplaceListService} from "./list.service";

@Component({
  templateUrl: "./app/marketplace/list/list.html",
  providers: [MarketplaceListService]
})

export class MarketplaceListComponent implements OnInit {
  private loans: any = [];
  private loanGrid: any = [];

  constructor(private marketService: MarketplaceListService) { }

  ngOnInit() {
    this.marketService.getLoans().subscribe(
      data => {
        this.loans = data;

        var i = 0;
        var tmp = [];

        console.log(this.loans.length);

        for (let loan of this.loans) {
          console.log("iteration" + i );
          if (i % 3 === 0) {
            this.loanGrid.push(tmp);
            tmp = [];
          }
          tmp.push(loan);
          i++;
        }
        console.log(this.loanGrid);
      },
      err => { },
      () => { }
    );
  }
}
