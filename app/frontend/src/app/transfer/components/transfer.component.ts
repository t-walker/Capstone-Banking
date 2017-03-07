import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { UserService } from '../../user/services/user.service';


@Component({
  templateUrl: './app/transfer/components/transfer.html'
})


export class TransferComponent implements OnInit {

  public current_user = "tyler@email.com";
  public to_user = "";
  public amount = 0.0;


  ngOnInit() {
    console.log("Transfer component initialized ............");

    this.userService.getCurrentUser().subscribe(result => {

    	if (result['result'] !== undefined) {
    		this.current_user = result['result']['email'];
    	}else {
    		this.current_user = 'not logged in';
    	}
    });
  }

  sendMoney() {

	console.log("SENDING $" + this.amount + " to " + this.to_user + "!");
  	this.userService.transferFunds(this.to_user, this.current_user, this.amount).map( res => {
  		console.log("response: ");
  		console.log(res);
  		this.to_user = '';
  		this.amount = 0;
  		});
  }

  constructor(private userService: UserService, private router: Router) { 

  }

}
