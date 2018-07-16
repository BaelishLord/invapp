import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProductPage } from '../pages/product/product';
import { SupplierPage } from '../pages/supplier/supplier';
import { CustomerPage } from '../pages/customer/customer';
import { ExpenseManagerPage } from '../pages/expensemanager/expensemanager';
import { SalesPage } from '../pages/sales/sales';
import { PaymentPage } from '../pages/payment/payment';
import { ProductListPage } from '../pages/productlist/productlist';
import { SupplierListPage } from '../pages/supplierlist/supplierlist';
import { CustomerListPage } from '../pages/customerlist/customerlist';
import { SalesListPage } from '../pages/saleslist/saleslist';
import { ExpenseManagerListPage } from '../pages/expensemanagerlist/expensemanagerlist';
import { PaymentListPage } from '../pages/paymentlist/paymentlist';

import { StockReportPage } from '../pages/stockreport/stockreport';
import { SalesReportPage } from '../pages/salesreport/salesreport';
import { PurchaseReportPage } from '../pages/purchasereport/purchasereport';
import { PaymentReportPage } from '../pages/paymentreport/paymentreport';
import { PaymentDuePage } from '../pages/paymentdue/paymentdue';

import { ReportsPage } from '../pages/reports/reports';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProductPage,
    SupplierPage,
    CustomerPage,
    PaymentPage,
    ExpenseManagerPage,
    SalesPage,
    ProductListPage,
    SupplierListPage,
    CustomerListPage,
    SalesListPage,
    PaymentListPage,
    ExpenseManagerListPage,
    StockReportPage,
    SalesReportPage,
    PurchaseReportPage,
    PaymentReportPage,
    PaymentDuePage,
    ReportsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProductPage,
    SupplierPage,
    CustomerPage,
    PaymentPage,
    ExpenseManagerPage,
    SalesPage,
    ProductListPage,
    SupplierListPage,
    CustomerListPage,
    SalesListPage,
    PaymentListPage,
    ExpenseManagerListPage,
    StockReportPage,
    SalesReportPage,
    PurchaseReportPage,
    PaymentReportPage,
    PaymentDuePage,
    ReportsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast
    // FileTransfer,
    // FileUploadOptions,
    // FileTransferObject,
    
  ]
})
export class AppModule {}
