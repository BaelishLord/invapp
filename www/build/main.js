webpackJsonp([0],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__productlist_productlist__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProductPage = (function () {
    function ProductPage(navCtrl, camera, transfer, file, filePath, actionSheetCtrl, toastCtrl, platform, loadingCtrl, sqlite, toast) {
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.sqlite = sqlite;
        this.toast = toast;
        this.lastImage = null;
        this.setHideShow = false;
        this.product = { pname: "", pid: "", psupplier: "", pdate: "", pquantity: "", pprice: "", myForm: true };
        this.supplierArray = [];
        this.product.myForm = true;
    }
    ProductPage.prototype.keyUp = function (event) {
        if (this.product.pname != "" && this.product.pid != "" && this.product.psupplier != "" && this.product.pdate != "" && this.product.pquantity != "" && this.product.pprice != "") {
            this.product.myForm = false;
        }
        else {
            this.product.myForm = true;
        }
    };
    ProductPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    ProductPage.prototype.hideShowDiv = function () {
        this.setHideShow = true;
    };
    ProductPage.prototype.uploadImage = function () {
        // Destination URL
        var url = "http://yoururl/upload.php";
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };
        console.log(options);
        console.log(targetPath);
        // const fileTransfer: TransferObject = this.transfer.create();
        // console.log(this.transfer.create())
        // Simulate a call to Dropbox or other service that can
        // return an image as an ArrayBuffer.
        // var base64 = this.getBase64Image(targetPath);
        // console.log(base64)
        // this.loading = this.loadingCtrl.create({
        //   content: 'Uploading...',
        // });
        // this.loading.present();
        // // Use the FileTransfer to upload the image
        // fileTransfer.upload(targetPath, url, options).then(data => {
        //   this.loading.dismissAll()
        //   this.presentToast('Image succesful uploaded.');
        // }, err => {
        //   this.loading.dismissAll()
        //   this.presentToast('Error while uploading file.');
        // });
    };
    // public getBase64Image(img) {
    // 	var canvas = document.createElement("canvas");
    // 	canvas.width = img.width;
    // 	canvas.height = img.height;
    // 	var ctx = canvas.getContext("2d");
    // 	ctx.drawImage(img, 0, 0);
    // 	var dataURL = canvas.toDataURL("image/png");
    // 	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    // }
    ProductPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    ProductPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    ProductPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    ProductPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    ProductPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                // this.filePath.resolveNativePath(imagePath).then(filePath => {
                var correctPath_1 = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                var currentName_1 = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                console.log(correctPath_1, currentName_1);
                _this.copyFileToLocalDir(correctPath_1, currentName_1, _this.createFileName());
                // });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                console.log(correctPath, currentName);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    ProductPage.prototype.ionViewDidLoad = function () {
        this.getSupplierData();
    };
    ProductPage.prototype.ionViewWillEnter = function () {
        this.getSupplierData();
    };
    ProductPage.prototype.getSupplierData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM supplier', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.supplierArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.supplierArray.push({ rowid: res.rows.item(i).rowid, sname: res.rows.item(i).sname, address: res.rows.item(i).address, phoneno: res.rows.item(i).phoneno });
                }
                console.log(_this.supplierArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
                // this.toast.show(e, '5000', 'center').subscribe(
                //   toast => {
                // console.log(toast);
                //   }
                // );
            });
        }).catch(function (e) {
            console.log(e);
            // this.toast.show(e, '5000', 'center').subscribe(
            //   toast => {
            // console.log(toast);
            //   }
            // );
        });
    };
    ProductPage.prototype.submitForm = function (value) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            // db.executeSql('DROP TABLE IF EXISTS expense', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS product(rowid INTEGER PRIMARY KEY, pname TEXT, pid INTEGER, psupplier TEXT, pdate TEXT, pquantity INTEGER, pprice INTEGER, file TEXT)', {})
                .then(function (res) {
                db.executeSql('INSERT INTO product VALUES(NULL,?,?,?,?,?,?,?)', [_this.product.pname, _this.product.pid, _this.product.psupplier, _this.product.pdate, _this.product.pquantity, _this.product.pprice, _this.pathForImage(_this.lastImage)])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__productlist_productlist__["a" /* ProductListPage */]);
                })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    ProductPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__productlist_productlist__["a" /* ProductListPage */]);
    };
    return ProductPage;
}());
ProductPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\product\product.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>\n\n            Add Product\n\n            <ion-icon title="Product List" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row class="content_block">\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Product Name" [(ngModel)]="product.pname" name="pname" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Product ID" [(ngModel)]="product.pid" name="pid" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-select placeholder="Product Supplier" [(ngModel)]="product.psupplier" name="psupplier">\n\n                                <ion-option *ngFor="let supplier of supplierArray" value="{{supplier.sname}}">{{supplier.sname}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                         <ion-item class="product-item" padding>\n\n                            <ion-datetime placeholder="Date" displayFormat="MMM DD YYYY" [(ngModel)]="product.pdate" name="pdate" pickerFormat="MMM DD YYYY"></ion-datetime>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Quantity" [(ngModel)]="product.pquantity" name="pquantity" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Average Price" [(ngModel)]="product.pprice" name="pprice" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row class="media_block" >\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <ion-item class="border_radius_10px margin_bottom_10px">\n\n                            <ion-buttons>\n\n                                <button type="button" ion-button icon-left color="secondary" (click)="presentActionSheet()">\n\n                                    <ion-icon name="camera"></ion-icon><span class="font_size_12px">Select Image</span>\n\n                                </button>\n\n                                <!-- <button ion-button icon-left color="secondary" (click)="uploadImage()" [disabled]="lastImage === null">\n\n                                    <ion-icon name="cloud-upload"></ion-icon><span class="font_size_12px">Upload</span>\n\n                                </button> -->\n\n                            </ion-buttons>\n\n                        </ion-item>\n\n                        <ion-item class="product-item">     \n\n                            <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n\n                            <h3 [hidden]="lastImage !== null">Please Select Image!</h3>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn add_product" full type="submit" [disabled]="product.myForm">Add Product</button>\n\n                    <!-- <button ion-button class="submit-btn continue" full type="button" *ngIf="setHideShow == false" (click)="hideShowDiv()">Continue</button> -->\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\product\product.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */]])
], ProductPage);

//# sourceMappingURL=product.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_product__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { ModalContentPage } from '../productlist/modal-content';
var ProductListPage = ProductListPage_1 = (function () {
    function ProductListPage(navCtrl, navParams, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.productArray = [];
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
    ProductListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ProductListPage_1, {
            item: item
        });
    };
    ProductListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    ProductListPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    ProductListPage.prototype.getData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM product', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.productArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.productArray.push({ rowid: res.rows.item(i).rowid, pname: res.rows.item(i).pname, pid: res.rows.item(i).pid, pdate: res.rows.item(i).pdate, pquantity: res.rows.item(i).pquantity, psupplier: res.rows.item(i).psupplier, pprice: res.rows.item(i).pprice, file: res.rows.item(i).file });
                }
                console.log(_this.productArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
                // this.toast.show(e, '5000', 'center').subscribe(
                //   toast => {
                // console.log(toast);
                //   }
                // );
            });
        }).catch(function (e) {
            console.log(e);
            // this.toast.show(e, '5000', 'center').subscribe(
            //   toast => {
            // console.log(toast);
            //   }
            // );
        });
    };
    ProductListPage.prototype.deleteData = function (rowid) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.sqlite.create({
                            name: 'ionicdb.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql('DELETE FROM product WHERE rowid=?', [rowid])
                                .then(function (res) {
                                console.log(res);
                                _this.getData();
                            })
                                .catch(function (e) { return console.log(e); });
                        }).catch(function (e) { return console.log(e); });
                    }
                }
            ]
        });
        alert.present();
    };
    // deleteData(rowid) {
    //     this.sqlite.create({
    //         name: 'ionicdb.db',
    //         location: 'default'
    //     }).then((db: SQLiteObject) => {
    //         db.executeSql('DELETE FROM product WHERE rowid=?', [rowid])
    //         .then(res => {
    //           console.log(res);
    //           this.getData();
    //         })
    //     .catch(e => console.log(e));
    //     }).catch(e => console.log(e));
    // }
    ProductListPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__product_product__["a" /* ProductPage */]);
    };
    return ProductListPage;
}());
ProductListPage = ProductListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\productlist\productlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Product List\n      <ion-icon title="Add Product" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item-sliding *ngFor="let product of productArray">\n            <ion-item nopadding (click)="itemTapped($event, product)">\n                <div class="item-note" item-start>\n                    <ion-icon ios="logo-buffer" md="logo-buffer"></ion-icon>\n                    {{product.pname}}&nbsp;&nbsp;&nbsp;&nbsp;&#8377;{{product.pprice}}\n                </div>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="deleteData(product.rowid)">\n                  <ion-icon name="trash"></ion-icon>\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <!-- <ion-list *ngIf="!selectedItem">\n        <button ion-item *ngFor="let product of productArray" >\n            <div class="item-note" item-start (click)="itemTapped($event, product)">\n                {{product.pname}}&nbsp;&nbsp;{{product.pdate}}&nbsp;&nbsp;{{product.pprice}}\n            </div>\n            <ion-icon ios="ios-trash" md="md-trash" item-end (click)="deleteData(product.rowid)"></ion-icon>\n        </button>\n    </ion-list> -->\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <!-- <ion-card-header>Product Details</ion-card-header> -->\n            <img src="{{selectedItem.file}}" />\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Name</h2>\n                <p class="text_align_left">{{selectedItem.pname}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Id</h2>\n                <p class="text_align_left">{{selectedItem.pid}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Date</h2>\n                <p class="text_align_left">{{selectedItem.pdate}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Quantity</h2>\n                <p class="text_align_left">{{selectedItem.pquantity}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Supplier</h2>\n                <p class="text_align_left">{{selectedItem.psupplier}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Price</h2>\n                <p class="text_align_left">{{selectedItem.pprice}}</p>\n            </ion-item>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\productlist\productlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ProductListPage);

var ProductListPage_1;
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
//# sourceMappingURL=productlist.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__supplierlist_supplierlist__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContactInfo = (function () {
    function ContactInfo() {
    }
    return ContactInfo;
}());
var SupplierPage = (function () {
    function SupplierPage(navCtrl, navParams, fb, sqlite, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.sqlite = sqlite;
        this.toast = toast;
        this.information = [];
        // data = { date:"", type:"", description:"", amount:"" };
        this.supplier = { sname: "", address: "", phoneno: "", myForm: true };
        this.supplier.myForm = true;
    }
    SupplierPage.prototype.keyUp = function (event) {
        console.log(this.supplier.sname, this.supplier.address, this.supplier.phoneno);
        if (this.supplier.sname != "" && this.supplier.address != "" && this.supplier.phoneno != "") {
            this.supplier.myForm = false;
        }
        else {
            this.supplier.myForm = true;
        }
    };
    SupplierPage.prototype.submitForm = function (value) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('CREATE TABLE IF NOT EXISTS supplier(rowid INTEGER PRIMARY KEY, sname TEXT, address TEXT, phoneno TEXT)', {})
                .then(function (res) {
                db.executeSql('INSERT INTO supplier VALUES(NULL,?,?,?)', [_this.supplier.sname, _this.supplier.address, _this.supplier.phoneno])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__supplierlist_supplierlist__["a" /* SupplierListPage */]);
                    // this.getData();
                })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    // addContact() {
    //     this.information.push(new ContactInfo());
    // }
    SupplierPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__supplierlist_supplierlist__["a" /* SupplierListPage */]);
    };
    return SupplierPage;
}());
SupplierPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\supplier\supplier.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n         <ion-title>\n\n            Add Supplier\n\n            <ion-icon title="Supplier List" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row>\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <!-- <div class="" *ngIf="!supplierForm.controls.supplier_name.valid  && (supplierForm.controls.supplier_name.dirty || submitAttempt)">* Please enter valid supplier name.</div> -->\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Supplier Name" [(ngModel)]="supplier.sname" name="sname" (keyup)=\'keyUp($event);\'>\n\n                            </ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Address" name="address" [(ngModel)]="supplier.address" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Phone Number" maxlength="10" name="phoneno" [(ngModel)]="supplier.phoneno" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn" full type="submit" [disabled]="supplier.myForm">Add Supplier</button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\supplier\supplier.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
], SupplierPage);

//# sourceMappingURL=supplier.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supplier_supplier__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { ModalContentPage } from '../productlist/modal-content';
var SupplierListPage = SupplierListPage_1 = (function () {
    function SupplierListPage(navCtrl, navParams, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.suppliersArray = [];
        // suppliersArray: Array<{name: string, address: string, phoneno: string}>;
        this.totalIncome = 0;
        this.totalExpense = 0;
        this.balance = 0;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        // this.items = [];
        // for (let i = 1; i < 11; i++) {
        //   this.items.push({
        //     title: 'Item ' + i,
        //     note: 'This is item #' + i,
        //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        //   });
        // }
        // this.getData();
    }
    SupplierListPage.prototype.itemTapped = function (event, item) {
        console.log(event, item);
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(SupplierListPage_1, {
            item: item
        });
    };
    SupplierListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    SupplierListPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    SupplierListPage.prototype.getData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM supplier', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.suppliersArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.suppliersArray.push({ rowid: res.rows.item(i).rowid, sname: res.rows.item(i).sname, address: res.rows.item(i).address, phoneno: res.rows.item(i).phoneno });
                }
                console.log(_this.suppliersArray, 'select console');
                // if(res.rows.length > 0) {
                //   this.data.rowid = res.rows.item(0).rowid;
                //   this.data.date = res.rows.item(0).date;
                //   this.data.type = res.rows.item(0).type;
                //   this.data.description = res.rows.item(0).description;
                //   this.data.amount = res.rows.item(0).amount;
                // }
            })
                .catch(function (e) {
                console.log(e);
                // this.toast.show(e, '5000', 'center').subscribe(
                //   toast => {
                // console.log(toast);
                //   }
                // );
            });
        }).catch(function (e) {
            console.log(e);
            // this.toast.show(e, '5000', 'center').subscribe(
            //   toast => {
            // console.log(toast);
            //   }
            // );
        });
    };
    SupplierListPage.prototype.deleteData = function (rowid) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.sqlite.create({
                            name: 'ionicdb.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql('DELETE FROM supplier WHERE rowid=?', [rowid])
                                .then(function (res) {
                                console.log(res);
                                _this.getData();
                            })
                                .catch(function (e) { return console.log(e); });
                        }).catch(function (e) { return console.log(e); });
                    }
                }
            ]
        });
        alert.present();
    };
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
    SupplierListPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__supplier_supplier__["a" /* SupplierPage */]);
    };
    return SupplierListPage;
}());
SupplierListPage = SupplierListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\supplierlist\supplierlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Supplier List\n      <ion-icon title="Add Supplier" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item-sliding *ngFor="let supplier of suppliersArray">\n            <ion-item nopadding (click)="itemTapped($event, supplier)">\n                <div class="item-note" item-start>\n                    <ion-icon ios="ios-person" md="md-person"></ion-icon>\n                    {{supplier.sname}}\n                </div>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="deleteData(supplier.rowid)">\n                  <ion-icon name="trash"></ion-icon>\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <!-- <ion-list *ngIf="!selectedItem">\n        <button ion-item *ngFor="let supplier of suppliersArray" >\n            <div class="item-note" item-start (click)="itemTapped($event, supplier)">\n                {{supplier.name}}\n            </div>\n            <ion-icon ios="ios-trash" md="md-trash" item-end (click)="deleteData(supplier.rowid)"></ion-icon>\n        </button>\n    </ion-list> -->\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <!-- <ion-card-header>Supplier Details</ion-card-header> -->\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Name</h2>\n                <p class="text_align_left">{{selectedItem.sname}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Address</h2>\n                <p class="text_align_left">{{selectedItem.address}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Phone Number</h2>\n                <p class="text_align_left">{{selectedItem.phoneno}}</p>\n            </ion-item>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\supplierlist\supplierlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], SupplierListPage);

var SupplierListPage_1;
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
//# sourceMappingURL=supplierlist.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__saleslist_saleslist__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContactInfo = (function () {
    function ContactInfo() {
    }
    return ContactInfo;
}());
var productInfo = (function () {
    function productInfo() {
    }
    return productInfo;
}());
var SalesPage = (function () {
    function SalesPage(navCtrl, navParams, fb, sqlite, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.sqlite = sqlite;
        this.toast = toast;
        this.information = [];
        this.productItem = [];
        this.sales = { name: "", product: "", squantity: "", sprice: "", myForm: true };
        this.productArray = [];
        this.sales.myForm = true;
        // this.myForm = fb.group({
        //     name: ['', Validators.required]
        // });
    }
    SalesPage.prototype.keyUp = function (event) {
        if (this.sales.name != "" && this.sales.squantity != "" && this.sales.sprice != "" && this.sales.product != "") {
            this.sales.myForm = false;
        }
        else {
            this.sales.myForm = true;
        }
    };
    SalesPage.prototype.submitForm = function (value) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            // db.executeSql('DROP TABLE IF EXISTS expense', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS sales(rowid INTEGER PRIMARY KEY, name TEXT, product TEXT, squantity INTEGER, sprice INTEGER)', {})
                .then(function (res) {
                console.log(res);
                db.executeSql('INSERT INTO sales VALUES(NULL,?,?,?,?)', [_this.sales.name, _this.sales.product, _this.sales.squantity, _this.sales.sprice])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__saleslist_saleslist__["a" /* SalesListPage */]);
                    // this.getData();
                })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    SalesPage.prototype.ionViewDidLoad = function () {
        this.getProductData();
    };
    SalesPage.prototype.ionViewWillEnter = function () {
        this.getProductData();
    };
    SalesPage.prototype.getProductData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM product', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.productArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.productArray.push({ rowid: res.rows.item(i).rowid, pname: res.rows.item(i).pname, pid: res.rows.item(i).pid, pdate: res.rows.item(i).pdate, pquantity: res.rows.item(i).pquantity, psupplier: res.rows.item(i).psupplier, pprice: res.rows.item(i).pprice, file: res.rows.item(i).file });
                }
                console.log(_this.productArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
                // this.toast.show(e, '5000', 'center').subscribe(
                //   toast => {
                // console.log(toast);
                //   }
                // );
            });
        }).catch(function (e) {
            console.log(e);
            // this.toast.show(e, '5000', 'center').subscribe(
            //   toast => {
            // console.log(toast);
            //   }
            // );
        });
    };
    SalesPage.prototype.addSupplier = function () {
        this.information.push(new productInfo());
    };
    SalesPage.prototype.addProducts = function () {
        this.productItem.push(new productInfo());
    };
    SalesPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__saleslist_saleslist__["a" /* SalesListPage */]);
    };
    return SalesPage;
}());
SalesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\sales\sales.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>\n\n            Add Sales Order\n\n            <ion-icon title="Sales List" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row>\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Customer Name" [(ngModel)]="sales.name" name="name" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-select placeholder="Product" [(ngModel)]="sales.product" name="product">\n\n                                <ion-option *ngFor="let product of productArray" value="{{product.pname}}">{{product.pname}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Quantity" [(ngModel)]="sales.squantity" name="squantity" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Price" [(ngModel)]="sales.sprice" name="sprice" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn" full type="submit" [disabled]="sales.myForm">Add Sales Order</button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\sales\sales.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
], SalesPage);

//# sourceMappingURL=sales.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sales_sales__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { ModalContentPage } from '../productlist/modal-content';
var SalesListPage = SalesListPage_1 = (function () {
    function SalesListPage(navCtrl, navParams, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.salesArray = [];
        this.totalIncome = 0;
        this.totalExpense = 0;
        this.balance = 0;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        // this.items = [];
        // for (let i = 1; i < 11; i++) {
        //   this.items.push({
        //     title: 'Item ' + i,
        //     note: 'This is item #' + i,
        //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        //   });
        // }
    }
    SalesListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(SalesListPage_1, {
            item: item
        });
    };
    SalesListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    SalesListPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    SalesListPage.prototype.getData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM sales', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.salesArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.salesArray.push({ rowid: res.rows.item(i).rowid, name: res.rows.item(i).name, product: res.rows.item(i).product, squantity: res.rows.item(i).squantity, sprice: res.rows.item(i).sprice });
                }
                console.log(_this.salesArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
                // this.toast.show(e, '5000', 'center').subscribe(
                //   toast => {
                // console.log(toast);
                //   }
                // );
            });
        }).catch(function (e) {
            console.log(e);
            // this.toast.show(e, '5000', 'center').subscribe(
            //   toast => {
            // console.log(toast);
            //   }
            // );
        });
    };
    SalesListPage.prototype.deleteData = function (rowid) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.sqlite.create({
                            name: 'ionicdb.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql('DELETE FROM sales WHERE rowid=?', [rowid])
                                .then(function (res) {
                                console.log(res);
                                _this.getData();
                            })
                                .catch(function (e) { return console.log(e); });
                        }).catch(function (e) { return console.log(e); });
                    }
                }
            ]
        });
        alert.present();
    };
    // deleteData(rowid) {
    //     this.sqlite.create({
    //         name: 'ionicdb.db',
    //         location: 'default'
    //     }).then((db: SQLiteObject) => {
    //         db.executeSql('DELETE FROM sales WHERE rowid=?', [rowid])
    //         .then(res => {
    //           console.log(res);
    //           this.getData();
    //         })
    //     .catch(e => console.log(e));
    //     }).catch(e => console.log(e));
    // }
    SalesListPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__sales_sales__["a" /* SalesPage */]);
    };
    return SalesListPage;
}());
SalesListPage = SalesListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\saleslist\saleslist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Sales List\n      <ion-icon title="Add sales" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item-sliding *ngFor="let sales of salesArray">\n            <ion-item nopadding (click)="itemTapped($event, sales)">\n                <div class="item-note" item-start>\n                    <ion-icon ios="ios-paper" md="md-paper"></ion-icon>\n                    {{sales.name}}\n                </div>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="deleteData(sales.rowid)">\n                  <ion-icon name="trash"></ion-icon>\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <!-- <ion-list *ngIf="!selectedItem">\n        <button ion-item *ngFor="let sales of salesArray" >\n            <div class="item-note" item-start (click)="itemTapped($event, sales)">\n                {{sales.name}}&nbsp;&nbsp;{{sales.product}}&nbsp;&nbsp;{{sales.sprice}}\n            </div>\n            <ion-icon ios="ios-trash" md="md-trash" item-end (click)="deleteData(sales.rowid)"></ion-icon>\n        </button>\n    </ion-list> -->\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <!-- <ion-card-header>Sales Details</ion-card-header> -->\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Customer Name</h2>\n                <p class="text_align_left">{{selectedItem.name}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product</h2>\n                <p class="text_align_left">{{selectedItem.product}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Quanity</h2>\n                <p class="text_align_left">{{selectedItem.squantity}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Price</h2>\n                <p class="text_align_left">{{selectedItem.sprice}}</p>\n            </ion-item>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\saleslist\saleslist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], SalesListPage);

var SalesListPage_1;
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
//# sourceMappingURL=saleslist.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseManagerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__expensemanagerlist_expensemanagerlist__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var addRowInfo = (function () {
    function addRowInfo() {
    }
    return addRowInfo;
}());
var minusRowInfo = (function () {
    function minusRowInfo() {
    }
    return minusRowInfo;
}());
var ExpenseManagerPage = (function () {
    function ExpenseManagerPage(navCtrl, navParams, fb, sqlite, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.sqlite = sqlite;
        this.toast = toast;
        this.addrow = [];
        this.minusrow = [];
        this.emDataVm = this;
        this.expense = { date: "", quantity: "", type: "", description: "", amount: "", myForm: true };
        this.expense.myForm = true;
        // this.emForm = fb.group({
        //     account : ['', Validators.compose([Validators.maxLength(30), Validators.required])]
        // });
        // this.values = 0;
    }
    ExpenseManagerPage.prototype.keyUp = function (event) {
        if (this.expense.date != "" && this.expense.quantity != "" && this.expense.type != "" && this.expense.description != "" && this.expense.amount != "") {
            this.expense.myForm = false;
        }
        else {
            this.expense.myForm = true;
        }
    };
    ExpenseManagerPage.prototype.submitForm = function (value) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            // db.executeSql('DROP TABLE IF EXISTS expense', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, quantity INTEGER, type TEXT, description TEXT, amount INTEGER)', {})
                .then(function (res) {
                console.log(res);
                db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?,?)', [_this.expense.date, _this.expense.quantity, _this.expense.type, _this.expense.description, _this.expense.amount])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__expensemanagerlist_expensemanagerlist__["a" /* ExpenseManagerListPage */]);
                    // this.getData();
                })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    ExpenseManagerPage.prototype.addAmountButton = function () {
        this.addrow.push(new addRowInfo());
    };
    ExpenseManagerPage.prototype.minusAmountButton = function () {
        this.minusrow.push(new minusRowInfo());
    };
    ExpenseManagerPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__expensemanagerlist_expensemanagerlist__["a" /* ExpenseManagerListPage */]);
    };
    return ExpenseManagerPage;
}());
ExpenseManagerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\expensemanager\expensemanager.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>\n\n          Add Expense Manager List\n\n          <ion-icon title="Add sales" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row>\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-datetime placeholder="Date" displayFormat="MMM DD YYYY" [(ngModel)]="expense.date" name="date" pickerFormat="MMM DD YYYY"></ion-datetime>\n\n                        </ion-item>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Quantity" name="quantity" [(ngModel)]="expense.quantity" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-select placeholder="Type" name="type" [(ngModel)]="expense.type">\n\n                                <ion-option value="expense">Expense</ion-option>\n\n                                <ion-option value="income">Income</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Description" name="description" [(ngModel)]="expense.description" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Amount" name="amount" [(ngModel)]="expense.amount" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn" full type="submit" [disabled]="expense.myForm">Add Expense Manager</button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\expensemanager\expensemanager.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
], ExpenseManagerPage);

//# sourceMappingURL=expensemanager.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseManagerListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__expensemanager_expensemanager__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { ModalContentPage } from '../productlist/modal-content';
var ExpenseManagerListPage = ExpenseManagerListPage_1 = (function () {
    function ExpenseManagerListPage(navCtrl, navParams, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.expenseArray = [];
        this.expenses = [];
        this.totalIncome = 0;
        this.totalExpense = 0;
        this.balance = 0;
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
    ExpenseManagerListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ExpenseManagerListPage_1, {
            item: item
        });
    };
    ExpenseManagerListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    ExpenseManagerListPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    ExpenseManagerListPage.prototype.getData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM expense', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.expenseArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.expenseArray.push({ rowid: res.rows.item(i).rowid, date: res.rows.item(i).date, quantity: res.rows.item(i).quantity, type: res.rows.item(i).type, description: res.rows.item(i).description, amount: res.rows.item(i).amount });
                }
                console.log(_this.expenseArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
                // this.toast.show(e, '5000', 'center').subscribe(
                //   toast => {
                // console.log(toast);
                //   }
                // );
            });
        }).catch(function (e) {
            console.log(e);
            // this.toast.show(e, '5000', 'center').subscribe(
            //   toast => {
            // console.log(toast);
            //   }
            // );
        });
    };
    ExpenseManagerListPage.prototype.deleteData = function (rowid) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.sqlite.create({
                            name: 'ionicdb.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
                                .then(function (res) {
                                console.log(res);
                                _this.getData();
                            })
                                .catch(function (e) { return console.log(e); });
                        }).catch(function (e) { return console.log(e); });
                    }
                }
            ]
        });
        alert.present();
    };
    // deleteData(rowid) {
    //     this.sqlite.create({
    //         name: 'ionicdb.db',
    //         location: 'default'
    //     }).then((db: SQLiteObject) => {
    //         db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
    //         .then(res => {
    //           console.log(res);
    //           this.getData();
    //         })
    //     .catch(e => console.log(e));
    //     }).catch(e => console.log(e));
    // }
    ExpenseManagerListPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__expensemanager_expensemanager__["a" /* ExpenseManagerPage */]);
    };
    return ExpenseManagerListPage;
}());
ExpenseManagerListPage = ExpenseManagerListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\expensemanagerlist\expensemanagerlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Expense Manager List\n      <ion-icon title="Add sales" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item-sliding *ngFor="let expense of expenseArray">\n            <ion-item nopadding (click)="itemTapped($event, expense)">\n                <div class="item-note" item-start>\n                    <ion-icon ios="ios-cash" md="md-cash"></ion-icon>\n                    {{expense.date}}&nbsp;&nbsp;{{expense.type}}&nbsp;&nbsp;&#8377;{{expense.amount}}\n                </div>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="deleteData(expense.rowid)">\n                  <ion-icon name="trash"></ion-icon>\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <!-- <ion-list *ngIf="!selectedItem">\n        <button ion-item *ngFor="let expense of expenseArray" >\n            <div class="item-note" item-start (click)="itemTapped($event, expense)">\n                {{expense.date}}&nbsp;&nbsp;{{expense.description}}\n            </div>\n            <ion-icon ios="ios-trash" md="md-trash" item-end (click)="deleteData(expense.rowid)"></ion-icon>\n        </button>\n    </ion-list> -->\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <!-- <ion-card-header>Expense Manager Details</ion-card-header> -->\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Date</h2>\n                <p class="text_align_left">{{selectedItem.date}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Quantity</h2>\n                <p class="text_align_left">{{selectedItem.quantity}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Type</h2>\n                <p class="text_align_left">{{selectedItem.type}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Description</h2>\n                <p class="text_align_left">{{selectedItem.description}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Amount</h2>\n                <p class="text_align_left">{{selectedItem.amount}}</p>\n            </ion-item>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\expensemanagerlist\expensemanagerlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ExpenseManagerListPage);

var ExpenseManagerListPage_1;
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
//# sourceMappingURL=expensemanagerlist.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_product__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supplier_supplier__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sales_sales__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__expensemanager_expensemanager__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.clickLink = function (type) {
        if (type == "product") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__product_product__["a" /* ProductPage */]);
        }
        else if (type == "supplier") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__supplier_supplier__["a" /* SupplierPage */]);
        }
        else if (type == "sales") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__sales_sales__["a" /* SalesPage */]);
        }
        else if (type == "manager") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__expensemanager_expensemanager__["a" /* ExpenseManagerPage */]);
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\home\home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Home</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<!-- <ion-content padding>\n  <h3>Ionic Menu Starter</h3>\n\n  <p>\n    If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will show you the way.\n  </p>\n\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content> -->\n\n<!-- <div class="wrapper padding">\n    <div class="row">\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Product</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Purchase</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Supplier</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Users</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Sales</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Manager</div>\n        </div>\n    </div>\n</div>\n -->\n\n<ion-content padding>\n    <ion-grid>\n        <ion-row>\n            <ion-col col-12>\n                <div class="box height_100px text-center supplier_div" (click)=\'clickLink("supplier");\'>\n                    <a href="javascipt:;">Supplier</a>\n                </div>\n            </ion-col>\n            <ion-col col-12>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("product");\'>\n                    <a href="javascript:;">Product</a>\n                </div>\n            </ion-col>\n           <!--  <ion-col col-12>\n                <div class="box height_100px text-center purchase_div" (click)=\'clickLink("purchsae");\'>\n                    <a href="javascipt:;">Purchase</a>\n                </div>\n            </ion-col> -->\n            <ion-col col-12>\n                <div class="box height_100px text-center sales_div" (click)=\'clickLink("sales");\'>\n                    <a href="javascipt:;">Sales</a>\n                </div>\n            </ion-col>\n            <!-- <ion-col col-12>\n                <div class="box height_100px text-center users_div" (click)=\'clickLink("users");\'>\n                    <a href="javascipt:;">Users</a>\n                </div>\n            </ion-col> -->\n            <ion-col col-12>\n                <div class="box height_100px text-center manager_div" (click)=\'clickLink("manager");\'>\n                    <a href="javascipt:;">Expense Manager</a>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(226);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_product_product__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_supplier_supplier__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_expensemanager_expensemanager__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_sales_sales__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_productlist_productlist__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_supplierlist_supplierlist__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_saleslist_saleslist__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_expensemanagerlist_expensemanagerlist__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_transfer__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_path__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_camera__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_toast__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { LoginPage } from '../pages/login/login';
// import { RegisterPage } from '../pages/register/register';



// import { PurchasePage } from '../pages/purchase/purchase';



// import { PurchaseListPage } from '../pages/purchaselist/purchaselist';


// import { ModalContentPage } from '../pages/productlist/productlist';








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            // LoginPage,
            // RegisterPage,
            __WEBPACK_IMPORTED_MODULE_5__pages_product_product__["a" /* ProductPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_supplier_supplier__["a" /* SupplierPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_expensemanager_expensemanager__["a" /* ExpenseManagerPage */],
            // PurchasePage,
            __WEBPACK_IMPORTED_MODULE_8__pages_sales_sales__["a" /* SalesPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_productlist_productlist__["a" /* ProductListPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_supplierlist_supplierlist__["a" /* SupplierListPage */],
            // PurchaseListPage,
            __WEBPACK_IMPORTED_MODULE_11__pages_saleslist_saleslist__["a" /* SalesListPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_expensemanagerlist_expensemanagerlist__["a" /* ExpenseManagerListPage */]
            // ModalContentPage
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            // LoginPage,
            // RegisterPage,
            __WEBPACK_IMPORTED_MODULE_5__pages_product_product__["a" /* ProductPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_supplier_supplier__["a" /* SupplierPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_expensemanager_expensemanager__["a" /* ExpenseManagerPage */],
            // PurchasePage,
            __WEBPACK_IMPORTED_MODULE_8__pages_sales_sales__["a" /* SalesPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_productlist_productlist__["a" /* ProductListPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_supplierlist_supplierlist__["a" /* SupplierListPage */],
            // PurchaseListPage,
            __WEBPACK_IMPORTED_MODULE_11__pages_saleslist_saleslist__["a" /* SalesListPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_expensemanagerlist_expensemanagerlist__["a" /* ExpenseManagerListPage */]
            // ModalContentPage
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_file_path__["a" /* FilePath */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_toast__["a" /* Toast */]
            // FileTransfer,
            // FileUploadOptions,
            // FileTransferObject,
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_productlist_productlist__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_supplierlist_supplierlist__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_saleslist_saleslist__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_expensemanagerlist_expensemanagerlist__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { LoginPage } from '../pages/login/login';
// import { RegisterPage } from '../pages/register/register';
// import { SupplierPage } from '../pages/supplier/supplier';
// import { ProductPage } from '../pages/product/product';
// import { ExpenseManagerPage } from '../pages/expensemanager/expensemanager';
// import { PurchasePage } from '../pages/purchase/purchase';
// import { SalesPage } from '../pages/sales/sales';


// import { PurchaseListPage } from '../pages/purchaselist/purchaselist';


var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Supplier', component: __WEBPACK_IMPORTED_MODULE_6__pages_supplierlist_supplierlist__["a" /* SupplierListPage */] },
            { title: 'Product', component: __WEBPACK_IMPORTED_MODULE_5__pages_productlist_productlist__["a" /* ProductListPage */] },
            // { title: 'Purchase', component: PurchaseListPage },
            { title: 'Sales', component: __WEBPACK_IMPORTED_MODULE_7__pages_saleslist_saleslist__["a" /* SalesListPage */] },
            { title: 'Expense Manager', component: __WEBPACK_IMPORTED_MODULE_8__pages_expensemanagerlist_expensemanagerlist__["a" /* ExpenseManagerListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.platform.registerBackButtonAction(function () {
                //     console.log("sdfsdfsdfsdfsdfsdfsdfsdsdfs")
                var alert = _this.alertCtrl.create({
                    title: 'Exit App',
                    message: 'Are you sure you want to exit app?',
                    buttons: [
                        {
                            text: 'Exit',
                            handler: function () {
                                _this.platform.exitApp();
                            }
                        }, {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        }
                    ]
                });
                alert.present();
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\projects\ionic\myApp\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n  \n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\projects\ionic\myApp\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[207]);
//# sourceMappingURL=main.js.map