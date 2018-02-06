import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { SalesListPage } from '../saleslist/saleslist';

class ContactInfo {
    constructor() { }
}

class productInfo {
    constructor() { }
}

@Component({
  selector: 'page-home',
  templateUrl: 'sales.html'
})

export class SalesPage {
    information = [];
    productItem = [];

    sales = {name: "", product: "", squantity:"", sprice:"", myForm: true, todaydate: new Date()};
    productArray: any = [];
    // let date = new Date();
    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private sqlite: SQLite, private toast: Toast) {
        this.sales.myForm = true;
        // this.sales.todaydate = new Date();
        // this.myForm = fb.group({
        //     name: ['', Validators.required]
        // });
  	}

    keyUp(event) {
        if (this.sales.name != "" && this.sales.squantity != "" && this.sales.sprice != "" && this.sales.product != "") {
            this.sales.myForm = false;
        } else {
            this.sales.myForm = true;
        }
    }


    submitForm(value: any):void {
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            // db.executeSql('DROP TABLE IF EXISTS expense', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, quantity INTEGER, type TEXT, description TEXT, amount INTEGER)', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS sales(rowid INTEGER PRIMARY KEY, name TEXT, product TEXT, squantity INTEGER, sprice INTEGER)', {})
            .then(res => {
                console.log(res);
                db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?,?)',[this.sales.todaydate,this.sales.squantity,'income',this.sales.product,this.sales.sprice])
                db.executeSql('INSERT INTO sales VALUES(NULL,?,?,?,?)',[this.sales.name,this.sales.product,this.sales.squantity,this.sales.sprice])
                .then(res => {
                    console.log(res);
                    this.navCtrl.setRoot(SalesListPage);
                }).catch(e => console.log(e));

            }).catch(e => console.log(e));
            
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
              // this.toast.show(e, '5000', 'center').subscribe(
              //   toast => {
                  // console.log(toast);
              //   }
              // );
            });
        }).catch(e => {
          console.log(e);
          // this.toast.show(e, '5000', 'center').subscribe(
          //   toast => {
              // console.log(toast);
          //   }
          // );
        });
    }

    clickLink(type) {
        this.navCtrl.setRoot(SalesListPage);
    }

}
