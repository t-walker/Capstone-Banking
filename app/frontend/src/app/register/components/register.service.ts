import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers , RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'; 


@Injectable()
export class RegisterService {

	constructor(private _http: Http) { }
  // Uses http.get() to load a single JSON file

  createUser(registerObject) {

	//let headers = new Headers({ 'Content-Type': 'application/json' });
	var headers = new Headers();
//    var options = new RequestOptions({ headers: headers });
    var body = JSON.stringify(registerObject);
    var json = JSON.stringify({ var1: "test", var2 : 3});
   // var params = 'json=' + json;

    console.log("HI REGISTER, FROM REG SERVICE NOV 13 !!");
  	console.log(body);

  	//headers.append('Content-Type', 'application/json');
  //	headers.append('Content-Type', 'application/x-www-form-urlencoded');


   //	return this._http.post('/api/register', body, headers)
   	//	.map(res => res.json());

   	return this._http.post('api/register', body, { headers: headers })
   		.map(res => res.json());
}

	getMotivated() {
		return this._http.get('http://ec2-54-201-251-84.us-west-2.compute.amazonaws.com:8080/combo/tyler').map(res => res.json());
	}

}