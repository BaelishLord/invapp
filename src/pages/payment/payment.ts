import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { PaymentListPage } from '../paymentlist/paymentlist';

@Component({
  selector: 'page-home',
  templateUrl: 'payment.html'
})

export class PaymentPage {
    information = [];
    productItem = [];

    payment = {product: "", pdate:"", amount:"", myForm: true};
    productArray: any = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private sqlite: SQLite, private toast: Toast) {
        this.payment.myForm = true;
        // this.myForm = fb.group({
        //     name: ['', Validators.required]
        // });
  	}

    keyUp(event) {
        if (this.payment.amount != "" && this.payment.product != "" && this.payment.pdate != "") {
            this.payment.myForm = false;
        } else {
            this.payment.myForm = true;
        }
    }


    submitForm(value: any):void {
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            // db.executeSql('DROP TABLE IF EXISTS expense', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS payment(rowid INTEGER PRIMARY KEY, product TEXT, pdate TEXT, amount INTEGER)', {})
            .then(res => {
                console.log(res);
                db.executeSql('INSERT INTO payment VALUES(NULL,?,?,?)',[this.payment.product,this.payment.pdate,this.payment.amount])
                .then(res => {
                    console.log(res);
                    this.navCtrl.setRoot(PaymentListPage);
                  // this.getData();
                })
                .catch(e => console.log(e));

            })
            .catch(e => console.log(e));
            
        }).catch(e => console.log(e));
    }

    ionViewDidLoad() {
      this.getProductData();
    }

    ionViewWillEnter() {
      this.getProductData();
    }

    getProductData() {
        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('SELECT * FROM product',{})
            .then(res => {
                console.log(res, 'select console');
                this.productArray = [];
                for(var i=0; i<res.rows.length; i++) {
                    this.productArray.push({rowid:res.rows.item(i).rowid,pname:res.rows.item(i).pname,pid:res.rows.item(i).pid,pdate:res.rows.item(i).pdate,pquantity:res.rows.item(i).pquantity,psupplier:res.rows.item(i).psupplier,pprice:res.rows.item(i).pprice,file:res.rows.item(i).file})
                }
                console.log(this.productArray, 'select console');
            })
            .catch(e => {
              console.log(e);
            });
        }).catch(e => {
          console.log(e);
        });
    }

    clickLink(type) {
        this.navCtrl.setRoot(PaymentListPage);
    }

}
