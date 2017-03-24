import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { TransferService } from '../services/transfer.service';

import { UserService } from '../../user/services/user.service';


@Component({
  templateUrl: './app/transfer/internal/internal.html',
  providers: [TransferService, UserService],
  selector: 'internal'
})

export class TransferInternalComponent implements OnInit {

  private destination: string;
  private amount: number;
  private account: number;

  private accounts = [];
  private hasError = false;
  private errorMsg = "";
  private defaultAccount;

  constructor(private transferService: TransferService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {

    console.log("Transfer component initialized ............");

    this.userService.getAccounts().subscribe(accounts => {
      this.accounts = accounts.result;
    });

  }

  transferMoney() {
  	this.transferService.transferFundsInternal(this.destination, this.amount, this.account)
    .subscribe(
      data => {
        this.userService.getAccounts().subscribe(accounts => {
          this.accounts = accounts.result;
          console.log(this.accounts[0]);
          this.defaultAccount = this.accounts[0];
        });
      },
      err => {
        this.hasError = true;
        this.errorMsg = err.json().result;
      },
      () => {

      }
    );
  }
}
