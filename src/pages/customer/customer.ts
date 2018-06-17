import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';


import { CustomerListPage } from '../customerlist/customerlist';

class ContactInfo {
    constructor() { }
}

@Component({
  selector: 'page-list',
  templateUrl: 'customer.html'
})
export class CustomerPage {
    information = [];
    customerForm : FormGroup;
    // data = { date:"", type:"", description:"", amount:"" };
    customer = {cname:"", address:"", email:"", phoneno:"", remark: "", myForm: true};
    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private sqlite: SQLite, private toast: Toast) {
    	this.customer.myForm = true;
    }

    keyUp(event) {
    	console.log(this.customer.cname,this.customer.address,this.customer.phoneno)
        if (this.customer.cname != "" && this.customer.address != "" && this.customer.email != "" && this.customer.phoneno != "" && this.customer.remark != "") {
            this.customer.myForm = false;
        } else {
            this.customer.myForm = true;
        }
    }

    submitForm(value: any):void {
    	this.sqlite.create({
		    name: 'ionicdb.db',
		    location: 'default'
		}).then((db: SQLiteObject) => {
		    db.executeSql('CREATE TABLE IF NOT EXISTS customer(rowid INTEGER PRIMARY KEY, cname TEXT, address TEXT, email TEXT, phoneno TEXT, remark TEXT)', {})
			.then(res => {
				db.executeSql('INSERT INTO customer VALUES(NULL,?,?,?,?,?)',[this.customer.cname,this.customer.address,this.customer.email,this.customer.phoneno,this.customer.remark])
			    .then(res => {
			      	console.log(res);
			      	this.navCtrl.setRoot(CustomerListPage);
			      // this.getData();
			    })
			    .catch(e => console.log(e));

			})
		    .catch(e => console.log(e));
		    
		}).catch(e => console.log(e));
	}	


	
  
    // addContact() {
    //     this.information.push(new ContactInfo());
    // }

    clickLink(type) {
        this.navCtrl.setRoot(CustomerListPage);
    }

}
