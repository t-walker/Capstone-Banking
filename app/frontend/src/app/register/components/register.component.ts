import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

@Component({
    templateUrl: './app/register/components/register.html'
})

export class RegisterComponent implements OnInit {

	public email = "";
	public p1 = "";
	public p2 = "";

    ngOnInit() : void {
      console.log("Register component initialized ...");
    }

    onClickRegister() : void {
    	console.log(this.email);
    	console.log(this.p1);
    	console.log(this.p2);

    	var registerObject = {};

    	registerObject['email'] = this.email;
    	registerObject['password1'] = this.p1;
    	registerObject['password2'] = this.p2;

    	//send this object to api

    }

}
