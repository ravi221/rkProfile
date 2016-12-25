import { Component, OnInit, OnDestroy } from '@angular/core';

import { ComplaintService }    from './complaint.service';
import { Complaint }    from './complaint';

import { Router, ActivatedRoute} from "@angular/router";
import { Subscription }          from 'rxjs/Subscription';
@Component({
  templateUrl: './app/components/patient/patient.tpl.html',
  providers: [ ComplaintService ]
})

export class ComplaintComponent implements OnInit, OnDestroy {
	public pageHeading = "Complaints";
	public errorMessage = '';
    public complaint: Complaint[];
  	private sub: Subscription;
  
  	public showPatients = true;
	public constructor(
		private complaintService: ComplaintService,
    	private _router: Router,
    	private route: ActivatedRoute
	){

	}
	ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
          let encno = params['id']; 
          if(encno != undefined ){
            this.getComplaint(encno);
            console.log("Show encounter no : " + encno)
          }
          
     });      
	}

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

 

    getComplaint(id:string){
      this.complaintService.getComplaint(id)
      .subscribe(
        res => {
          this.complaint = res; 
          console.log(this.complaint);
          console.log("loading success complaints");
        },
        error => this.errorMessage = <any>error
      );
    }

}
