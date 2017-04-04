import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { TransferService } from '../services/transfer.service';

import { UserService } from '../../user/services/user.service';

@Component({
  templateUrl: './app/transfer/user/user.html',
  providers: [TransferService, UserService],
  selector: 'user'
})

export class TransferUserComponent implements OnInit {
  private amount: number;
  private accounts: any = null;
  private accountF: any = null;
  private accountT: any = null;

  constructor(private transferService: TransferService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    console.log("TransferUser component initialized ............");
    this.refreshAccounts();
  }

  transferMoney() {
  	this.transferService.transferFundsUser(this.accountF.id, this.accountT.id, this.amount)
    .subscribe(
      data => {
        this.refreshAccounts();
      },
      err => {

      },
      () => {

      }
    );
  }

  refreshAccounts() {
    this.userService.getAccounts().subscribe(accounts => {
      this.accounts = accounts.result;
      this.accountF = this.accounts[0];
      this.accountT = this.accounts[1];
    });
  }
}
