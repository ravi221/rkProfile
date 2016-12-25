import { Component } from '@angular/core';
//import myGlobals = require('../../globals'); 

import { RegisterService }    from './register.service';

import { Router} from "@angular/router";
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
 	templateUrl: 'app/components/register/register.tpl.html',
 	styleUrls: ['app/components/login/login.css'],
 	providers: [ RegisterService ]
 })

export class RegisterComponent {
	model = new RegisterData('','','','','','','','','','','','','',undefined,'',undefined,'','','','','','');
	submitted = false;
	result: any;
    errMessage = '';

     constructor(private _registerService: RegisterService, private router:Router,
     dconfig: NgbDatepickerConfig )
    {

    	var now = new Date();
    	// this.model.RegDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    	//this.model.RegDate = now.month + "-" + now.day + "T"+ now.hour + ":" + now.minute; 
    	//this.model.RegDate = now.getFullYear() + "-"  + (parseInt(now.getMonth())  + parseInt(1)  ) +  "-" + now.getDate();

    	//dconfig.startDate = { year: now.getFullYear(); month: (parseInt(now.getMonth())  + parseInt(1) } ;


    }

	onSubmit() { 
		this.errMessage='';
		//if(this.model.loginEmail == undefined  || this.model.loginEmail.length<=4) { this.errMessage="Invalid Email"; }
		//if(this.model.loginPass == undefined || this.model.loginPass.length<=7) { this.errMessage="Invalid Password"; }
		//if(this.model.FirstName == undefined || this.model.FirstName.length<=8){ this.errMessage="Invalid Firstname"; }
		

        console.log(this.result);
        if(this.errMessage == ''){

	        console.log('Form Submitted  ' + JSON.stringify(this.model));
	    	this._registerService.submitData(this.model)
	        .subscribe(
				data  => { 
					this.result = data; 
					this.submitted = true;
				},
	            error =>  this.errMessage = <any>error
				// contact service here /
	 		);
				// here goes the login process
				if(this.errMessage == '') {this.submitted = true;}			
				console.log(this.result);
				//this._router.navigate(['register']);
				//this._router.navigateByUrl('/register');
		}

	}
  	// TODO: Remove this when we're done
  	get diagnostic() { return JSON.stringify(this.model); }
}




export class RegisterData {
  constructor(
  	public RegDate: string,
  	public RegTime: string,
  	public Title: string,
	public FirstName: string,
	public MiddleName: string,
	public LastName: string, 
	public FatherName: string,   
	public FatherPhone: string,
	public FatherPassport: string,
	public MotherName: string,
	public MotherPhone: string,
	public MotherPassport: string,
	public Age: string,
	public DateOfBirth: Object,
	public Gender: string,
    public Address: Object,
    public Residence: string,
    public Nationality: string,
	public Email: string,
	public PhoneNo: string,
	public BillingType: string,
	public Religion: string
  ) {  }
}