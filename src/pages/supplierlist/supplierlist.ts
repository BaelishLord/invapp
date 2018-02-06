import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { SupplierPage } from '../supplier/supplier';
// import { ModalContentPage } from '../productlist/modal-content';

@Component({
  selector: 'page-home',
  templateUrl: 'supplierlist.html'
})
export class SupplierListPage {
    selectedItem: any;
    icons: string[];
    suppliers: Array<{name: string, address: string, phoneno: string}>;

    suppliersArray: any = [];
    // suppliersArray: Array<{name: string, address: string, phoneno: string}>;
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
        this.navCtrl.push(SupplierListPage, {
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
          db.executeSql('SELECT * FROM supplier',{})
            .then(res => {
                console.log(res, 'select console');
                this.suppliersArray = [];
                for(var i=0; i<res.rows.length; i++) {
                    this.suppliersArray.push({rowid:res.rows.item(i).rowid,sname:res.rows.item(i).sname,address:res.rows.item(i).address,phoneno:res.rows.item(i).phoneno})
                }
                console.log(this.suppliersArray, 'select console');
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
                            db.executeSql('DELETE FROM supplier WHERE rowid=?', [rowid])
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
    //         db.executeSql('DELETE FROM supplier WHERE rowid=?', [rowid])
    //         .then(res => {
    //           console.log(res);
    //           this.getData();
    //         })
    //     .catch(e => console.log(e));
    //     }).catch(e => console.log(e));
    // }

    clickLink(type) {
        this.navCtrl.setRoot(SupplierPage);
    }
}

// @Component({
//     template: 
//     `<ion-header>
//           <ion-toolbar>
//             <ion-title>
//                 Description
//             </ion-title>
//             <ion-buttons start>
//               <button ion-button (click)="dismiss()">
//                 <span ion-text color="primary" showWhen="ios">Cancel</span>
//                 <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
//               </button>
//             </ion-buttons>
//           </ion-toolbar>
//         </ion-header>
//         <ion-content>
//           <ion-list>
//               <ion-item>
//                 <ion-avatar item-start>
//                   <img src="{{character.image}}">
//                 </ion-avatar>
//                 <h2>{{character.name}}</h2>
//                 <p>{{character.quote}}</p>
//               </ion-item>
//               <ion-item *ngFor="let item of character['items']">
//                 {{item.title}}
//                 <ion-note item-end>
//                   {{item.note}}
//                 </ion-note>
//               </ion-item>
//           </ion-list>
//     </ion-content>`
// })

// export class ModalContentPage {
//     character;

//     constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
//         var characters = [
//             {
//                 name: 'Gollum',
//                 quote: 'Sneaky little hobbitses!',
//                 image: 'assets/img/avatar-gollum.jpg',
//                 items: [
//                     { title: 'Race', note: 'Hobbit' },
//                     { title: 'Culture', note: 'River Folk' },
//                     { title: 'Alter Ego', note: 'Smeagol' }
//                 ]
//             },
//             {
//                 name: 'Frodo',
//                 quote: 'Go back, Sam! I\'m going to Mordor alone!',
//                 image: 'assets/img/avatar-frodo.jpg',
//                 items: [
//                     { title: 'Race', note: 'Hobbit' },
//                     { title: 'Culture', note: 'Shire Folk' },
//                     { title: 'Weapon', note: 'Sting' }
//                 ]
//             },
//             {
//                 name: 'Samwise Gamgee',
//                 quote: 'What we need is a few good taters.',
//                 image: 'assets/img/avatar-samwise.jpg',
//                 items: [
//                     { title: 'Race', note: 'Hobbit' },
//                     { title: 'Culture', note: 'Shire Folk' },
//                     { title: 'Nickname', note: 'Sam' }
//                 ]
//             }
//         ];
//         this.character = characters[this.params.get('charNum')];
//     }

//     dismiss() {
//         this.viewCtrl.dismiss();
//     }
// }

