import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { UserService } from '../../user/services/user.service';

import {CreateAccountComponent} from "../create/create.component";

@Component({
  templateUrl: './app/account/details/details.html'
})


export class AccountDetailsComponent implements OnInit {

  private accountId: number;
  private transactions;

  ngOnInit() {
    console.log("Account-Details component initialized ............");

    this.route.params.subscribe(params => {
      this.accountId = +params['id'];
      this.userService.getTransactions(this.accountId).subscribe(transactions => {
        this.transactions = transactions;
      });
    });
  }

  constructor(private userService: UserService, private route: ActivatedRoute) { }
}
