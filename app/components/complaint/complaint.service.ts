import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Complaint }    from './complaint';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ComplaintService {
	private mainUrl = 'http://localhost/rkProfile/api/patient.php';  // URL to web API
  	constructor (private http: Http) {}


  getComplaint (id:string): Observable<Complaint[]> {
      return this.http.get(this.mainUrl+ "?enc=" + id)
      .map(this.extractData)
          .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.Response || { };
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