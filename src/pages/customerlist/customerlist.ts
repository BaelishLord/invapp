import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { CustomerPage } from '../customer/customer';
// import { ModalContentPage } from '../productlist/modal-content';

@Component({
  selector: 'page-home',
  templateUrl: 'customerlist.html'
})
export class CustomerListPage {
    selectedItem: any;
    icons: string[];
    customers: Array<{name: string, address: string, phoneno: string}>;

    customersArray: any = [];
    // customersArray: Array<{name: string, address: string, phoneno: string}>;
    totalIncome = 0;
    totalExpense = 0;
    balance = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private alertCtrl: AlertController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }

    itemTapped(event, item) {
        // console.log(this.selectedItems)
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(CustomerListPage, {
          item: item
        });
    }

    ionViewDidLoad() {
      this.getData();
    }

    ionViewWillEnter() {
      this.getData();
    }

    getData() {
        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('SELECT * FROM customer ORDER BY rowid DESC',{})
            .then(res => {
                console.log(res, 'select console');
                this.customersArray = [];
                for(var i=0; i<res.rows.length; i++) {
                    this.customersArray.push({rowid:res.rows.item(i).rowid,sname:res.rows.item(i).sname,address:res.rows.item(i).address,email:res.rows.item(i).email,phoneno:res.rows.item(i).phoneno,remark:res.rows.item(i).remark})
                }
                console.log(this.customersArray, 'select console');
            })
            .catch(e => {
              console.log(e);
            });
        }).catch(e => {
          console.log(e);
        });
    }

    deleteData(rowid) {
        let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.sqlite.create({
                            name: 'ionicdb.db',
                            location: 'default'
                        }).then((db: SQLiteObject) => {
                            db.executeSql('DELETE FROM customer WHERE rowid=?', [rowid])
                            .then(res => {
                                this.selectedItem = false;
                                console.log(res);
                                this.getData();
                            })
                        .catch(e => console.log(e));
                        }).catch(e => console.log(e));
                    }
                }
            ]
        });
        alert.present();
    }

    // deleteData(rowid) {
    //     this.sqlite.create({
    //         name: 'ionicdb.db',
    //         location: 'default'
    //     }).then((db: SQLiteObject) => {
    //         db.executeSql('DELETE FROM customer WHERE rowid=?', [rowid])
    //         .then(res => {
    //           console.log(res);
    //           this.getData();
    //         })
    //     .catch(e => console.log(e));
    //     }).catch(e => console.log(e));
    // }

    clickLink(type) {
        this.navCtrl.setRoot(CustomerPage);
    }
}

