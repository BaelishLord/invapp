import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { StockReportPage } from '../stockreport/stockreport';
import { SalesReportPage } from '../salesreport/salesreport';
import { PurchaseReportPage } from '../purchasereport/purchasereport';
import { PaymentReportPage } from '../paymentreport/paymentreport';
import { PaymentDuePage } from '../paymentdue/paymentdue';

@Component({
  selector: 'page-home',
  templateUrl: 'reports.html'
})
export class ReportsPage {
    selectedItem: any;
    icons: string[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private alertCtrl: AlertController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }

    clickLink(type) {
        if (type == "payment") {
          this.navCtrl.setRoot(PaymentReportPage);
        } else if (type == "stock") {
            this.navCtrl.setRoot(StockReportPage);
        } else if (type == "sales") {
            this.navCtrl.setRoot(SalesReportPage);
        } else if (type == "purchase") {
            this.navCtrl.setRoot(PurchaseReportPage);
        } else if (type == "paymentdue") {
            this.navCtrl.setRoot(PaymentDuePage);
        }
    }   
}

