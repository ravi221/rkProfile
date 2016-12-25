import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RegisterService {
  constructor (private http: Http) {}
  private registerUrl = 'http://localhost/ng2sites/rkDoctorApp/api/register.php';  // URL to web API
  submitData (data:any): Observable<any>  {

    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    //let options = new RequestOptions({ headers: headers });
    
    return this.http.post(this.registerUrl, body, headers)
                    .map(this.extractData)
                    .catch(this.handleError)
      ;
      
  }
  private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    return body || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}


  
  