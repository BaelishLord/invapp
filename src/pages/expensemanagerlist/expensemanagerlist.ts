import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { ExpenseManagerPage } from '../expensemanager/expensemanager';
// import { ModalContentPage } from '../productlist/modal-content';

@Component({
  selector: 'page-home',
  templateUrl: 'expensemanagerlist.html'
})
export class ExpenseManagerListPage {
    selectedItem: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;

    expenseArray: any = [];
    expenses: any = [];
    totalIncome = 0;
    totalExpense = 0;
    balance = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private alertCtrl: AlertController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        // Let's populate this page with some filler content for funzies
        // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
        // 'american-football', 'boat', 'bluetooth', 'build'];

        // this.items = [];
        // for (let i = 1; i < 11; i++) {
        //   this.items.push({
        //     title: 'Item ' + i,
        //     note: 'This is item #' + i,
        //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        //   });
        // }
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ExpenseManagerListPage, {
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
          db.executeSql('SELECT * FROM expense ORDER BY rowid DESC',{})
            .then(res => {
                console.log(res, 'select console');
                this.expenseArray = [];
                for(var i=0; i<res.rows.length; i++) {
                    this.expenseArray.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,quantity:res.rows.item(i).quantity,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
                }
                console.log(this.expenseArray, 'select console');
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
                            db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
                            .then(res => {
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
        this.navCtrl.setRoot(ExpenseManagerPage);
    }
}


