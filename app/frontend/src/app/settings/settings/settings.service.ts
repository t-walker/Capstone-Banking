import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {

  constructor(private http: Http) { }
  // Uses http.get() to load a single JSON file

  onSubmit(applicationObject) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var body = applicationObject;

    return this.http.post('api/my/profile', body, { headers: headers })
      .map(res => res.json());
  }
}
