import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }      from './components/about/about.component';
import { ContactComponent }      from './components/contact/contact.component';
import { ProfileComponent }      from './components/profile/profile.component';
import { DoctorComponent }      from './components/doctor/doctor.component';
import { PatientlistComponent }      from './components/patient/patientlist.component';
import { PatientComponent }      from './components/patient/patient.component';
import { PatientdescComponent }      from './components/patient/patientdesc.component';
import { ComplaintComponent }      from './components/complaint/complaint.component';
//import { RegisterComponent }      from './components/register/register.component';

const appRoutes: Routes = [
	{ path: '',    redirectTo: '/home',    pathMatch: 'full' },
  	{ path: 'home',    component: HomeComponent },
  	{ path: 'about',    component: AboutComponent },
  	{ path: 'profile',    component: ProfileComponent },
  	{ path: 'contact',    component: ContactComponent },
  	{ path: 'doctors',    component: DoctorComponent },
  	{ path: 'doctor/:id',    component: DoctorComponent },
  	{ path: 'patients/:id',    component: PatientlistComponent },
  	{ path: 'patient/:id',    component: PatientComponent },
    { path: 'patientdesc/:id',    component: PatientdescComponent },
    { path: 'complaint/:id',    component: ComplaintComponent }
  	//{ path: 'register',    component: RegisterComponent }
];
export const routing = RouterModule.forRoot(appRoutes);






