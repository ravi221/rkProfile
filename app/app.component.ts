import { Component, OnInit } from '@angular/core';

import {TranslateService} from 'ng2-translate/ng2-translate';


var themeName = 'theme2';
@Component({
  selector: 'my-app',
  templateUrl: '../themes/' + themeName +'/theme.tpl.html',
})
export class AppComponent implements OnInit { 
	public langList = [];

	constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('de');
        translate.use('te');
    }



    // It is a ng2 life cycle hook - executes automatic
    ngOnInit(){
    	this.langList = [
    		{lang:'en', 'flag':'en.gif' },
    		{lang:'de', 'flag':'de.gif' },
            {lang:'te', 'flag':'te.gif' }
    	];
    }

    onLangChange(val){
    	this.translate.use(val);
    }

}