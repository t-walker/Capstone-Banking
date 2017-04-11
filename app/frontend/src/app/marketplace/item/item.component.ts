import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { MarketItemService } from './item.service';

@Component({
  templateUrl: "./app/marketplace/item/item.html",
  providers: [MarketItemService]
})

export class MarketplaceItemComponent implements OnInit {
  private loanId: number = 0;
  private loan: any = {};

  constructor (private route: ActivatedRoute, private marketItemService: MarketItemService) {
    this.route.params.subscribe(params => {
      this.loanId = +params['id'];
      this.marketItemService.getLoan(this.loanId).subscribe(
        data => {
          this.loan = data.result;
        },
        err => {

        },
        () => { }
      );
    });
  }

  ngOnInit() {
  }
}
