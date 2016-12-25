import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map'
export class User {
    constructor(
        public email: string,
        public password: string
    ) { }
}

@Injectable()
export class LoginService {
  public token: string;

	constructor (private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

    login(user: User): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

         return this.http.post('http://localhost/ng2sites/rkDoctorApp/api/login.php', JSON.stringify({ username: user.email, password: user.password }), headers)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
     
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: user.email, token: token }));
     
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
            .catch(this.handleError);
            
    }
  	
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    private handleError (error: Response | any) {
        return Observable.throw(error.json() || '');
    }

    isLogged(){
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    }

}

