import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';

import { PurchaseListPage } from '../purchaselist/purchaselist';

class ContactInfo {
    constructor() { }
}

class productInfo {
    constructor() { }
}

@Component({
  selector: 'page-home',
  templateUrl: 'purchase.html'
})

export class PurchasePage {
    information = [];
    productItem = [];
  	constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
        // this.myForm = fb.group({
        //     account: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
        // });
  	}

    addSupplier() {
        this.information.push(new productInfo());
    }

    addProducts() {
        this.productItem.push(new productInfo());
    }

    clickLink(type) {
        this.navCtrl.setRoot(PurchaseListPage);
    }

}
