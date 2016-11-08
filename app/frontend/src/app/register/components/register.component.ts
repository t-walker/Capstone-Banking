import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Headers, Http } from '@angular/http';

@Component({
    templateUrl: './app/register/components/register.html'
})

export class RegisterComponent implements OnInit {

	public email = "";
	public p1 = "";
	public p2 = "";
    public first_name = "";
    public last_name = "";
    public username = "";

    ngOnInit() : void {
      console.log("NEW Register component initialized ...");
    }

    constructor(private http: Http) { }

    onClickRegister() : void {
    	console.log(this.email);
    	console.log(this.p1);
    	console.log(this.p2);

    	var registerObject = {};

    	registerObject['email'] = this.email;
    	registerObject['password'] = this.p1;
        registerObject['username'] = this.username;
        registerObject['first_name'] = this.first_name;
        registerObject['last_name'] = this.last_name;

        console.log(registerObject);

    	//send this object to api
        var headers = new Headers({'Content-Type': 'application/json'});
        this.http.post("api/register/", JSON.stringify(registerObject), {"headers": headers});

    }

}
