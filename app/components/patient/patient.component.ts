import { Component, OnInit, OnDestroy } from '@angular/core';

import { PatientService }    from './patient.service';
import { Patient }    from './patient';


import { Router, ActivatedRoute} from "@angular/router";
import { Subscription }          from 'rxjs/Subscription';
@Component({
  templateUrl: './app/components/patient/patient.tpl.html',
  providers: [ PatientService ]
})

export class PatientComponent implements OnInit, OnDestroy {
	public pageHeading = "Patients";
	public errorMessage = '';
  	public patients: Patient[];
    public patient: Patient;

  
  	private sub: Subscription;
  
  	public showPatients = true;
    public patientId: any;
    public ShowTemplateOfPatientServiceList = true;


	public constructor(
		private patientService: PatientService,
    	private _router: Router,
    	private route: ActivatedRoute
	){

	}
	ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
          this.patientId = params['id']; 
          if(this.patientId != undefined ){
            this.getPatient(this.patientId);
            console.log("Show patient : " + this.patientId)
          }
     });      
	}

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

 

    getPatient(id:string){
      this.patientService.getPatient(id)
      .subscribe(
        res => {
          this.patient = res; 
          console.log("loading success patient");
        },
        error => this.errorMessage = <any>error
      );
    }

    showPatient(id:string){
      console.log("Patient id");
      this._router.navigate(['/patient', id]);
    }

    showPatientDesc(id:string){
      console.log("Patient id" + id);
      this._router.navigate(['/patientdesc', id]);
    }

    complaints_2delete(id:string){
      console.log("complaints");
      //this._router.navigate(['/complaint', id]);
    }

    }
