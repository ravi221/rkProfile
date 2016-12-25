import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ProfileComponent }      from './components/profile/profile.component';
import { ContactComponent }      from './components/contact/contact.component';
import { FeedbackComponent }      from './components/feedback/feedback.component';
import { DoctorComponent }      from './components/doctor/doctor.component';
import { LoginComponent }      from './components/login/login.component';
import { PatientlistComponent }      from './components/patient/patientlist.component';
import { PatientComponent }      from './components/patient/patient.component';
import { PatientdescComponent }      from './components/patient/patientdesc.component';
import { ComplaintComponent }      from './components/complaint/complaint.component';
import { RegisterComponent }      from './components/register/register.component';
import { ModuleComponent }      from './components/module/module.component';

import {AuthGuard} from './common/auth.guard';

import {routing} from './app.routing';


import {HttpModule} from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import {AccordionModule} from "ng2-accordion";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { AccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {TabViewModule, DataGridModule} from 'primeng/primeng';
import {LoginService} from './components/login/login.service'

@NgModule({
  imports:      [ 
  		BrowserModule, 
  		routing,
  		HttpModule,
      FormsModule,
        TranslateModule.forRoot(),
        AccordionModule,
        TabViewModule,
        DataGridModule,
        NgbModule.forRoot()
        
   ],
  declarations: [ AppComponent, HomeComponent, AboutComponent, ProfileComponent, ContactComponent, PatientlistComponent, PatientComponent, DoctorComponent, PatientdescComponent, ComplaintComponent, LoginComponent, FeedbackComponent, RegisterComponent, ModuleComponent ],
  providers:[LoginService,        AuthGuard],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }