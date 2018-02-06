import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductPage } from '../product/product';
import { SupplierPage } from '../supplier/supplier';
import { SalesPage } from '../sales/sales';
import { PaymentPage } from '../payment/payment';
import { ExpenseManagerPage } from '../expensemanager/expensemanager';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	constructor(public navCtrl: NavController) {

  	}

  	clickLink(type) {
    	if (type == "product") {
          this.navCtrl.setRoot(ProductPage);
        } else if (type == "supplier") {
  	    	this.navCtrl.setRoot(SupplierPage);
        } else if (type == "sales") {
            this.navCtrl.setRoot(SalesPage);
        } else if (type == "payment") {
            this.navCtrl.setRoot(PaymentPage);
        } else if (type == "manager") {
  	    	this.navCtrl.setRoot(ExpenseManagerPage);
        }
  	}	

}
