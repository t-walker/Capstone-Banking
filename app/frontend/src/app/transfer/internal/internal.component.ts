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

  private amount: number;
  private accountId: number;
  private destination: string;

  private accounts: any = [];
  private account: any = null;

  private errorMsg = "";
  private hasError: boolean = false;

  constructor(private transferService: TransferService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    console.log("Transfer component initialized ............");
    this.refreshAccounts();
  }

  transferMoney() {
  	this.transferService.transferFundsInternal(this.destination, this.amount, this.account.id)
    .subscribe(
      data => {
        this.refreshAccounts();
      },
      err => {
        this.hasError = true;
        this.errorMsg = err.json().result;
      },
      () => {
      }
    );
  }

  refreshAccounts() {
    this.userService.getAccounts().subscribe(accounts => {
      this.accounts = accounts.result;
      this.account = this.accounts[0];
    });
  }
}
