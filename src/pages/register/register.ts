import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
 
@Component({
  selector: 'page-list',
  templateUrl: 'register.html'
})

export class RegisterPage {
 	signupForm : FormGroup;
	constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) { 
		this.signupForm = fb.group({
		  	'name' : [null, Validators.compose([Validators.required])],
		  	'email': [null, Validators.compose([Validators.required, Validators.email])],
		  	'username' : [null, Validators.compose([Validators.required])],
		  	'password': [null, Validators.compose([Validators.required])],
		  	'confirm_password': [null, Validators.compose([Validators.required, matchOtherValidator('password')])]
		});
	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad');
	}
	 
	submitForm(value: any):void {
	console.log(value)
	    if (value) {
	    	this.navCtrl.push(HomePage);
	    }
	}	
}

export function matchOtherValidator(otherControlName: string) {

	let thisControl: FormControl;
	let otherControl: FormControl;

	return function matchOtherValidate (control: FormControl) {

	    if (!control.parent) {
	      return null;
	    }

	    // Initializing the validator.
	    if (!thisControl) {
		      thisControl = control;
		      otherControl = control.parent.get(otherControlName) as FormControl;
		      if (!otherControl) {
		        throw new Error('matchOtherValidator(): other control is not found in parent group');
		      }
		      otherControl.valueChanges.subscribe(() => {
		        thisControl.updateValueAndValidity();
		      });
	    }

	    if (!otherControl) {
	      	return null;
	    }

	    if (otherControl.value !== thisControl.value) {
		    return {
		        matchOther: true
		    };
	    }

	    return null;

	}

}