import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Doctor }           from './doctor';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class DoctorService {
	private mainUrl = 'http://localhost/ng2sites/rkDoctorApp/api/doctor.php';  // URL to web API
  	constructor (private http: Http) {}
  getDoctors (): Observable<Doctor[]> {
      return this.http.get(this.mainUrl)
      .map(this.extractData)
          .catch(this.handleError);
  }

  getDoctor (id:string): Observable<Doctor> {
      return this.http.get(this.mainUrl + "?id=" + id)
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