import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Patient }    from './patient';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class PatientService {
	private mainUrl = 'http://localhost/ng2sites/rkDoctorApp/api/';  // URL to web API
  	constructor (private http: Http) {}


  getPatients (id:string): Observable<Patient[]> {
      return this.http.get(this.mainUrl+ "patient.php?pDoctorId=" + id)
      .map(this.extractData)
          .catch(this.handleError);
  }

  getPatient (id:string): Observable<Patient> {
      return this.http.get(this.mainUrl+ "patient.php?patientId=" + id)
      .map(this.extractData)
          .catch(this.handleError);
  }

  getPatientDesc (id:string): Observable<Patient> {
      return this.http.get(this.mainUrl+ "patient.php?patientDescId=" + id)
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