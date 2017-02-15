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

      var x = this.userService.getAccounts().map(res => res)
                      .subscribe(result => {

                       // this.accounts = result;
                        console.log("inside");

                        //don't see this being printed
                        console.log(this.accounts);

                      });
      
       //check return value of function
      console.log(x);


      //mock data
  this.accounts = [

  {type: "checking", amount : 500, id: 1}, {type: "checking", amount : 200, id: 2}, {type: "savings", amount : 1000, id: 3}

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