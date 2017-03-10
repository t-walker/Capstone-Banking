import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { UserService } from '../../user/services/user.service';

import {CreateAccountComponent} from "./create.component";

@Component({
  templateUrl: './app/accounts/components/account-listing.html',
  selector: "accounts"
})

export class AccountListingComponent implements OnInit {

  public accounts;

  ngOnInit() {
    console.log("AccountListing component initialized ............");

    this.userService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  constructor(private userService: UserService, private router: Router) { }

}
