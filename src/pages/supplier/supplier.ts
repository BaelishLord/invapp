import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';


import { SupplierListPage } from '../supplierlist/supplierlist';

class ContactInfo {
    constructor() { }
}

@Component({
  selector: 'page-list',
  templateUrl: 'supplier.html'
})
export class SupplierPage {
    information = [];
    supplierForm : FormGroup;
    // data = { date:"", type:"", description:"", amount:"" };
    supplier = {sname:"", address:"", email:"", phoneno:"", remark: "", myForm: true};
    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private sqlite: SQLite, private toast: Toast) {
    	this.supplier.myForm = true;
    }

    keyUp(event) {
    	console.log(this.supplier.sname,this.supplier.address,this.supplier.phoneno)
        if (this.supplier.sname != "" && this.supplier.address != "" && this.supplier.email != "" && this.supplier.phoneno != "" && this.supplier.remark != "") {
            this.supplier.myForm = false;
        } else {
            this.supplier.myForm = true;
        }
    }

    submitForm(value: any):void {
    	this.sqlite.create({
		    name: 'ionicdb.db',
		    location: 'default'
		}).then((db: SQLiteObject) => {
		    db.executeSql('CREATE TABLE IF NOT EXISTS supplier(rowid INTEGER PRIMARY KEY, sname TEXT, address TEXT, email TEXT, phoneno TEXT, remark TEXT)', {})
			.then(res => {
				db.executeSql('INSERT INTO supplier VALUES(NULL,?,?,?,?,?)',[this.supplier.sname,this.supplier.address,this.supplier.email,this.supplier.phoneno,this.supplier.remark])
			    .then(res => {
			      	console.log(res);
			      	this.navCtrl.setRoot(SupplierListPage);
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
        this.navCtrl.setRoot(SupplierListPage);
    }

}
