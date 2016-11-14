import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { User }           from './user';
import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class HeroService {
  private userUrl = 'api/users';  // URL to web API

  constructor (private http: Http) {}

  getUser (username: string): Observable<User> {
    return this.http.get(this.userUrl + "/" + username)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
