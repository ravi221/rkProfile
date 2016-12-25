import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { LoginService, User }       from './login.service';

import { Router} from '@angular/router';

import '../../rxjs-operators';

@Component({
 	templateUrl: 'app/components/login/login.tpl.html',
 	styleUrls: ['app/components/login/login.css'],
 })

export class LoginComponent implements OnInit {
	
	loading = false;
 	public user = new User('','');
    public errorMsg = '';

    constructor(
    	private _http: Http,
        private _router: Router,
        private _loginService:LoginService,
    ){}

	ngOnInit() {
        // reset login status
        this._loginService.logout();
    }

    login() {
        this.loading = true;
        this._loginService.login(this.user)
            .subscribe(result => {
            	console.log(result);
                if (result === true) {
                    // login successful
                    //this.router.navigate(['/module']);
                    this._router.navigateByUrl('/module');
                } else {
                    // login failed
                    this.errorMsg = 'Username or password is incorrect';
                    this.loading = false;
                }
            },
            error => {
                    this.errorMsg = 'Username or password is incorrect ' + error.Error;
                    this.loading = false;
                }
            );
    }
	
}




