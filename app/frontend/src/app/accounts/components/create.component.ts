import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { UserService } from '../../user/services/user.service';

//import { UserService } from '../../user/services/user.service';

@Component({
    templateUrl: './app/accounts/components/create.html',
    selector: 'create-account'
})

export class CreateAccountComponent implements OnInit {

    ngOnInit() {
      console.log("Create Accounts component initialized ...");
    }

    constructor(private userService: UserService, private router: Router) { }


    public ShowForm = false;

   public types = [ 'choose...', 'Checking', 'Savings' ];

   public order = {
      type: 'choose...'          
  };

  callType(value) {
    console.log(value);
    this.order.type = value;
  }

  hideFormAccount() {
  	this.ShowForm = false;
  }

  showFormAccount() {
  	this.ShowForm = true;
  }

  createAccount() {
  	console.log("hi");

  	if (this.order.type === "choose...") {
  		return;
  	}

  	//send request
  
  	this.hideFormAccount();
  }

}