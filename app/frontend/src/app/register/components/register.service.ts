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
		var headers = new Headers();
		var body = registerObject;

		console.log("HI REGISTER, FROM REG SERVICE NOV 13 !!");
		console.log(body);

		headers.append('Content-Type', 'application/json');

	 	return this._http.post('api/register', body, { headers: headers })
	 		.map(res => res.json());
	}

	getMotivated() {
		return this._http.get('http://ec2-54-201-251-84.us-west-2.compute.amazonaws.com:8080/combo/tyler').map(res => res.json());
	}
}
