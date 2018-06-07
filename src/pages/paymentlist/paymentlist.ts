import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { PaymentPage } from '../payment/payment';
// import { ModalContentPage } from '../productlist/modal-content';

@Component({
  selector: 'page-home',
  templateUrl: 'paymentlist.html'
})
export class PaymentListPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;

    paymentArray: any = [];
    totalIncome = 0;
    totalExpense = 0;
    balance = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private alertCtrl: AlertController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(PaymentListPage, {
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
          db.executeSql('SELECT * FROM payment ORDER BY rowid DESC',{})
            .then(res => {
                console.log(res, 'select console');
                this.paymentArray = [];
                for(var i=0; i<res.rows.length; i++) {
                    this.paymentArray.push({rowid:res.rows.item(i).rowid,product:res.rows.item(i).product,pdate:res.rows.item(i).pdate,amount:res.rows.item(i).amount})
                }
                console.log(this.paymentArray, 'select console');
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
                            db.executeSql('DELETE FROM payment WHERE rowid=?', [rowid])
                            .then(res => {
                                console.log(res);
                                this.selectedItem = false;
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

    clickLink(type) {
        this.navCtrl.setRoot(PaymentPage);
    }
}
