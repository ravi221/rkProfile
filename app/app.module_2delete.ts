import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ProfileComponent }      from './components/profile/profile.component';
import { ContactComponent }      from './components/contact/contact.component';
import { DoctorComponent }      from './components/doctor/doctor.component';
import { PatientlistComponent }      from './components/patient/patientlist.component';
import { PatientComponent }      from './components/patient/patient.component';
import { PatientdescComponent }      from './components/patient/patientdesc.component';
import { ComplaintComponent }      from './components/complaint/complaint.component';
//import { RegisterComponent }      from './components/register/register.component';

import {routing} from './app.routing';


import {HttpModule} from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import {AccordionModule} from "ng2-accordion";
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { AccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {TabViewModule, DataGridModule} from 'primeng/primeng';


@NgModule({
  imports:      [ 
  		BrowserModule, 
  		routing,
  		HttpModule,
        TranslateModule.forRoot(),
        AccordionModule,
        TabViewModule,
        DataGridModule
   ],
  declarations: [ AppComponent, HomeComponent, AboutComponent, ProfileComponent, ContactComponent, PatientlistComponent, PatientComponent, DoctorComponent, PatientdescComponent, ComplaintComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }