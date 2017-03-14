import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { TransferService } from './transfer.service';

import { UserService } from '../../user/services/user.service';


@Component({
  templateUrl: './app/transfer/transfer/transfer.html',
  providers: [TransferService, UserService]
})

export class TransferComponent implements OnInit {

  private destination: string;
  private amount: number;
  private account: number;

  private accounts;

  constructor(private transferService: TransferService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    console.log("Transfer component initialized ............");

    this.userService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  sendMoney() {
  	this.transferService.transferFunds(this.destination, this.amount, this.account)
    .subscribe(
      data => {

      },
      err => {

      },
      () => {

      }
    );
  }

}
