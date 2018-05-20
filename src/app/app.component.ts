import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { ProductListPage } from '../pages/productlist/productlist';
import { SupplierListPage } from '../pages/supplierlist/supplierlist';
import { SalesListPage } from '../pages/saleslist/saleslist';
import { PaymentListPage } from '../pages/paymentlist/paymentlist';
import { ExpenseManagerListPage } from '../pages/expensemanagerlist/expensemanagerlist';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


    rootPage: any = RegisterPage;

    pages: Array<{title: string, component: any}>;
    public alertPresented: any;
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController) {
        this.initializeApp();
        this.alertPresented = false
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Supplier', component: SupplierListPage },
            { title: 'Product', component: ProductListPage },
            { title: 'Payment Histoy', component: PaymentListPage },
            { title: 'Sales', component: SalesListPage },
            { title: 'Expense Manager', component: ExpenseManagerListPage }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.platform.registerBackButtonAction(() => {
                if(!this.alertPresented) {
                    this.alertPresented = true;
                    let alert = this.alertCtrl.create({
                        title: 'Exit App',
                        message: 'Are you sure you want to exit app ?',
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                handler: () => {
                                    this.alertPresented = false;
                                    // console.log('Cancel clicked');
                                }
                            },{
                                text: 'Exit',
                                handler: () => {
                                    this.alertPresented = false;
                                    this.platform.exitApp();
                                }
                            }
                        ]
                    });
                    alert.present();
                }
            });

        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
