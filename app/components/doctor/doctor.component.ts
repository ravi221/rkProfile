import { Component, OnInit, OnDestroy } from '@angular/core';

import { DoctorService }    from './doctor.service';
import { Doctor }    from './doctor';

import { Router, ActivatedRoute} from "@angular/router";
import { Subscription }          from 'rxjs/Subscription';
//import 'rxjs/Rx';
@Component({
  templateUrl: './app/components/doctor/doctor.tpl.html',
  providers: [ DoctorService ]
})

export class DoctorComponent implements OnInit, OnDestroy {
	public pageHeading = "Welcome";
	public errorMessage = '';
	public doctors: Doctor[];
  public doctor: Doctor;

  private sub: Subscription;
  

  public showDoctors = true;
	public constructor(
		private doctorService: DoctorService,
    private _router: Router,
    private route: ActivatedRoute
	){

	}
	ngOnInit(){
		

    this.sub = this.route.params.subscribe(params => {
          let doctorId = params['id']; 
          if(doctorId != undefined ){
            this.showDoctors= false;
            this.getDoctor(doctorId);
            console.log("Show doctor profile: " + doctorId)
          }
     });      
     if(this.showDoctors == true) {
        this.getDoctors(); 
     }
    
	}

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  	getDoctors(){
  		this.doctorService.getDoctors()
  		.subscribe(
  			res => {
  				this.doctors = res; 
  				console.log("loading success");
  			},
  			error => this.errorMessage = <any>error
  		);
  	}
    getDoctor(id:string){
      this.doctorService.getDoctor(id)
      .subscribe(
        res => {
          this.doctor = res; 
        },
        error => this.errorMessage = <any>error
      );
    }


    showPatients(id:string){
      this._router.navigate(['/patients', id]);
    }
    showDoctor(id:string){
      this._router.navigate(['/doctor', id]);
    }
}
