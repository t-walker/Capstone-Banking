import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';

import {CreateAccountComponent} from "./create.component";

@Component({
    templateUrl: './app/accounts/components/accounts.html'
})


export class AccountsComponent implements OnInit {

	public accounts = [

	{type: "checking", amount : 500}, {type: "checking", amount : 200}, {type: "savings", amount : 1000}

	];

    ngOnInit() {
      console.log("Accounts component initialized ............");
      // console.log("account: " + this.accounts);

      // for (var i = this.accounts.length - 1; i >= 0; i--) {
      // 	console.log(this.accounts[i]); 
      // }

      
    }

    // createAccount()
    // {
    // 	this.accounts.push({type: "new", amount : 4000});
    // }
}