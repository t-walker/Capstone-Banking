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
    this.loanGrid = [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]];
    //
    // this.marketService.getLoans().subscribe(
    //   data => {
    //     this.loans = data.result;
    //     this.populateGrid();
    //   },
    //   err => { },
    //   () => { }
    // );
  }

  populateGrid() {
    // var i = 0;
    // var tmp = [];
    //
    // for (let loan of this.loans) {
    //   if (i === 2) {
    //     this.loanGrid.push(tmp);
    //     tmp = [];
    //   }
    //   tmp.push(loan);
    //   i++;
    // }

    this.loanGrid = [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]];
  }
}
