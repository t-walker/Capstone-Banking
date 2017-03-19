import {Component, Input} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { UserService } from '../../user/services/user.service';

import {CreateAccountComponent} from "../create/create.component";

@Component({
  templateUrl: './app/account/listing/listing.html',
  selector: "accounts"
})

export class AccountListingComponent implements OnInit {

  public accounts = [];
  @Input() title: string;

  ngOnInit() {
    console.log("AccountListing component initialized ............");
    console.log("TITLE");
    console.log(this.title);

    this.userService.getAccounts().subscribe(accounts => {
      this.accounts = accounts.result;
    });
  }

  constructor(private userService: UserService, private router: Router) { }

}
