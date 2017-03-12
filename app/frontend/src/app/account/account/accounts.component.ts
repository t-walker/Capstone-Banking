import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { UserService } from '../../user/services/user.service';

import {CreateAccountComponent} from "../create/create.component";
import {AccountListingComponent} from "../listing/listing.component";

@Component({
  templateUrl: './app/account/account/accounts.html'
})

export class AccountsComponent implements OnInit {

  public accounts;

  ngOnInit() {
    console.log("AccountListing component initialized ............");
  }

  constructor() { }

}
