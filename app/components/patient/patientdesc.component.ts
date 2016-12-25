import { Component, OnInit, OnDestroy } from '@angular/core';

import { PatientService }    from './patient.service';
import { Patient }    from './patient';

import { Router, ActivatedRoute} from "@angular/router";
import { Subscription }          from 'rxjs/Subscription';
@Component({
  templateUrl: './app/components/patient/patient.tpl.html',
  providers: [ PatientService ]
})

export class PatientdescComponent implements OnInit, OnDestroy {
	public pageHeading = "Patient Desc";
	public errorMessage = '';
  	public patients: Patient[];
    public patientdesc: Patient;
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
      this.patientService.getPatientDesc(id)
      .subscribe(
        res => {
          this.patientdesc = res; 
          console.log("loading success patient desc");
        },
        error => this.errorMessage = <any>error
      );
    }


    showPatientDesc(id:string){
      console.log("Patient id");
      this._router.navigate(['/patient', id]);
    }
}
