import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
 
@Component({
  	selector: 'page-list',
  	templateUrl: 'login.html'
})

export class LoginPage {
	authForm : FormGroup;
	constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
		this.authForm = fb.group({
		  	'username' : [null, Validators.compose([Validators.required])],
		  	'password': [null, Validators.compose([Validators.required])]
		});
	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad');
	}
	 
	submitForm(value: any):void{
	    if (this.authForm.controls.username.value && this.authForm.controls.password.value) {
	    	this.navCtrl.push(HomePage);
	    }
	}	
}