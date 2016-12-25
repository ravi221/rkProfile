import { Component, OnInit } from '@angular/core';

//import {AccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {AccordionModule} from "ng2-accordion";
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {LoginService} from './components/login/login.service'

var themeName = 'default';
@Component({
  selector: 'my-app',
  templateUrl: '../themes/' + themeName +'/theme.tpl.html',
})
export class AppComponent implements OnInit { 
	public langList = [];

	constructor(private translate: TranslateService, private auth:LoginService) {
        translate.setDefaultLang('de');
        translate.use('en');
    }



    // It is a ng2 life cycle hook - executes automatic
    ngOnInit(){
    	this.langList = [
    		{lang:'en', 'flag':'en.gif' },
    		{lang:'de', 'flag':'de.gif' }
            
    	];
    }

    onLangChange(val){
    	this.translate.use(val);
    }

}