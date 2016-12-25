import { Component, OnInit, OnDestroy } from '@angular/core';

import { PatientService }    from './patient.service';
import { Patient }    from './patient';

import { Router, ActivatedRoute} from "@angular/router";
import { Subscription }          from 'rxjs/Subscription';
@Component({
  templateUrl: './app/components/patient/patient.tpl.html',
  providers: [ PatientService ]
})

export class PatientlistComponent implements OnInit, OnDestroy {
	public pageHeading = "Patients";
	public errorMessage = '';
  	public patients: Patient[];
    public patient: Patient;
  	private sub: Subscription;
  
  	public showPatients = true;
	public constructor(
		private patientService: PatientService,
    	private _router: Router,
    	private route: ActivatedRoute
	){

	}
	ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
          let doctorId = params['id']; 
          if(doctorId != undefined ){
            this.getPatients(doctorId);
            console.log("Show patients of doctor : " + doctorId)
          }
     });      
	}

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

 
    getPatients(id:string){
      this.patientService.getPatients(id)
      .subscribe(
        res => {
          this.patients = res; 
          console.log("loading success");
        },
        error => this.errorMessage = <any>error
      );
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
}
