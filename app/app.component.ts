import { Component } from '@angular/core';
var themeName = 'default';
@Component({
  selector: 'my-app',
  templateUrl: '../themes/' + themeName +'/theme.tpl.html',
})
export class AppComponent { 
	public siteName = "RK Mania";
}