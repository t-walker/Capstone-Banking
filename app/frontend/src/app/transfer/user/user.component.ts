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

  private accountF: number;
  private accountT: number;
  private amount: number;

  private accounts;
  private defaultAccountFirst = {};
  private defaultAccountSecond = {};


  constructor(private transferService: TransferService, private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    console.log("TransferUser component initialized ............");
    
    this.userService.getAccounts().subscribe(accounts => {
      this.accounts = accounts.result;
      this.defaultAccountFirst = this.accounts[0];
      this.defaultAccountSecond = this.accounts[1];
      console.log(this.defaultAccountFirst);
      console.log(this.defaultAccountSecond);
    });
  }

  transferMoney() {
  	this.transferService.transferFundsUser(this.accountF, this.accountT, this.amount)
    .subscribe(
      data => {
        this.userService.getAccounts().subscribe(accounts => {
          this.accounts = accounts.result;
        });
      },
      err => {

      },
      () => {

      }
    );
  }

}
