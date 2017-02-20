import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { UserService } from '../../user/services/user.service';

import {CreateAccountComponent} from "./create.component";

@Component({
    templateUrl: './app/accounts/components/accounts.html'
})


export class AccountsComponent implements OnInit {

	public accounts;

    ngOnInit() {

      console.log("ACCOUNT component initialized ............");
      // console.log("account: " + this.accounts);

      // for (var i = this.accounts.length - 1; i >= 0; i--) {
      // 	console.log(this.accounts[i]); 
      // }

      var x = this.userService.getAccounts().subscribe(accounts => {

                       this.accounts = accounts;
                        console.log("inside");

                        //don't see this being printed
                        console.log(this.accounts);

                      });
      
       //check return value of function
      console.log(x);


      //mock data
   this.accounts = [

   {account_type: "checking", total : 500, id: 1, transactions:[]}, {account_type: "checking", total : 200, id: 2, transactions:[{
          "account_id": 7,
          "amount": 112.0,
          "tx_from": "bank",
          "tx_to": "4",
          "tx_type": "D"
        },
        {
          "account_id": 7,
          "amount": 300.0,
          "tx_from": "bank",
          "tx_to": "4",
          "tx_type": "D"
        },
        {
          "account_id": 7,
          "amount": 313.0,
          "tx_from": "4",
          "tx_to": "bank",
          "tx_type": "W"
        }]}, {account_type: "savings", total : 1000, id: 3, transactions:[]}

   ];
      
    }

    constructor(private userService: UserService, private router: Router) { }

goToAccountDetail(account) {

 console.log(account);
  let link = ['account-details'];
    this.router.navigate(link);
}
    // createAccount()
    // {
    // 	this.accounts.push({type: "new", amount : 4000});
    // }
}