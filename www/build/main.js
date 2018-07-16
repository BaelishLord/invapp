webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__productlist_productlist__ = __webpack_require__(104);
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
        this.cursor = null;
        this.setHideShow = false;
        this.product = { pname: "", pid: "", pdescription: "", psupplier: "", pdate: "", pquantity: "", pamount: "", pprice: "", unitprice: "", myForm: true, productIdError: false };
        this.supplierArray = [];
        this.product.myForm = true;
    }
    ProductPage.prototype.keyUp = function (event) {
        var _this = this;
        if (this.product.pquantity != "" && this.product.unitprice != "") {
            var total = (parseInt(this.product.pquantity) * parseInt(this.product.unitprice));
            this.product.pprice = String(total);
        }
        else {
            this.product.pprice = "";
        }
        if (this.product.pname != "" && this.product.pid != "" && this.product.pdescription != "" && this.product.psupplier != "" && this.product.pdate != "" && this.product.pquantity != "" && this.product.pprice != "" && this.product.pamount != "" && this.product.unitprice != "") {
            this.product.myForm = false;
        }
        else {
            this.product.myForm = true;
        }
        if (this.product.pid != "") {
            this.sqlite.create({
                name: 'ionicdb.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql('SELECT count(*) as cnt from product where pid = ?', [_this.product.pid])
                    .then(function (res) {
                    console.log(res.rows.item(0).cnt);
                    if (res.rows.item(0).cnt == 0) {
                        _this.product.myForm = false;
                        _this.product.productIdError = false;
                    }
                    else {
                        _this.product.myForm = true;
                        _this.product.productIdError = true;
                    }
                })
                    .catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
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
    };
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
            // db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, quantity INTEGER, type TEXT, description TEXT, amount INTEGER)', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS product(rowid INTEGER PRIMARY KEY, pname TEXT, pid INTEGER, pdescription TEXT, file TEXT)', {});
            db.executeSql('CREATE TABLE IF NOT EXISTS purchase(rowid INTEGER PRIMARY KEY, productId INTEGER NOT NULL, psupplier TEXT, pquantity INTEGER, pprice INTEGER, unitprice INTEGER)', {});
            db.executeSql('CREATE TABLE IF NOT EXISTS purchasepayment(rowid INTEGER PRIMARY KEY, productId INTEGER NOT NULL, pdate TEXT, pamount INTEGER)', {})
                .then(function (res) {
                // db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?,?)',[this.product.pdate,this.product.pquantity,'expense',this.product.pname,this.product.pprice])
                db.executeSql('INSERT INTO product VALUES(NULL,?,?,?,?)', [_this.product.pname, _this.product.pid, _this.product.pdescription, _this.pathForImage(_this.lastImage)]);
                db.executeSql('INSERT INTO purchase VALUES(NULL,?,?,?,?,?)', [_this.product.pid, _this.product.psupplier, _this.product.pquantity, _this.product.pprice, _this.product.unitprice]);
                db.executeSql('INSERT INTO purchasepayment VALUES(NULL,?,?,?)', [_this.product.pid, _this.product.pdate, _this.product.pamount])
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
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\product\product.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>\n\n            Add Product\n\n            <ion-icon title="Product List" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row class="content_block">\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <div class="productHeader">\n\n                            Product Details\n\n                        </div>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Product Name" [(ngModel)]="product.pname" name="pname" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Product Code" [(ngModel)]="product.pid" name="pid" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <div class="error-box color_red" *ngIf="product.productIdError">Please check Product Id.</div>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Product Description" [(ngModel)]="product.pdescription" name="pid" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n\n\n                        <div class="productHeader">\n\n                            Purchase Details\n\n                        </div>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-select placeholder="Product Supplier" [(ngModel)]="product.psupplier" name="psupplier">\n\n                                <ion-option *ngFor="let supplier of supplierArray" value="{{supplier.sname}}">{{supplier.sname}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Quantity" [(ngModel)]="product.pquantity" name="pquantity" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Per Unit Price" [(ngModel)]="product.unitprice" name="unitprice" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Total Price" [(ngModel)]="product.pprice" name="pprice" (keyup)=\'keyUp($event);\' disabled></ion-input>\n\n                        </ion-item>\n\n\n\n                        <div class="productHeader">\n\n                            Payment Details\n\n                        </div>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-datetime placeholder="Payment Date" displayFormat="MMM DD YYYY" [(ngModel)]="product.pdate" name="pdate" pickerFormat="MMM DD YYYY"></ion-datetime>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Payment Amount" [(ngModel)]="product.pamount" name="pamount" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row class="media_block" >\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <!-- <ion-item class="border_radius_10px margin_bottom_10px"> -->\n\n                        <ion-buttons>\n\n                            <button class="submit-btn width_100_percent" type="button" ion-button icon-left  (click)="presentActionSheet()">\n\n                                <ion-icon name="camera"></ion-icon><span class="font_size_12px">Select Image</span>\n\n                            </button>\n\n                        </ion-buttons>\n\n                        <!-- </ion-item> -->\n\n                        <ion-item class="product-item">     \n\n                            <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n\n                            <h3 class="text-center" [hidden]="lastImage !== null">Please Select Image!</h3>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn add_product" full type="submit" [disabled]="product.myForm">Add Product</button>\n\n                    <!-- <button ion-button class="submit-btn continue" full type="button" *ngIf="setHideShow == false" (click)="hideShowDiv()">Continue</button> -->\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\product\product.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_transfer__["a" /* Transfer */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */]])
], ProductPage);

//# sourceMappingURL=product.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_product__ = __webpack_require__(103);
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
            db.executeSql('SELECT p.*, ph.*, pp.* from product p left join purchase ph on p.pid = ph.productId left join purchasepayment pp on p.pid = pp.productId', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.productArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.productArray.push({ rowid: res.rows.item(i).rowid, pname: res.rows.item(i).pname, pid: res.rows.item(i).pid, pdescription: res.rows.item(i).pdescription, pdate: res.rows.item(i).pdate, pquantity: res.rows.item(i).pquantity, psupplier: res.rows.item(i).psupplier, pprice: res.rows.item(i).pprice, unitprice: res.rows.item(i).unitprice, file: res.rows.item(i).file });
                }
                console.log(_this.productArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
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
                                _this.selectedItem = false;
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
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\productlist\productlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Product List\n      <ion-icon title="Add Product" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item class="item_list_align" *ngFor="let product of productArray" (click)="itemTapped($event, product)">\n            <ion-avatar item-start>\n                <img src="{{product.file}}">\n            </ion-avatar>\n            <h2>{{product.pname}}</h2>\n            <p>&#8377;{{product.pprice}}</p>\n            <ion-note item-end>{{product.pdate | date}}</ion-note>\n        </ion-item>\n    </ion-list>\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <ion-row>\n                <ion-col col-6>\n                    <button ion-button icon-left clear small>\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                        <div>Sales Add</div>\n                    </button>\n                </ion-col>\n                <ion-col col-6>\n                    <button ion-button icon-left clear small>\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                        <div>Sales Add</div>\n                    </button>\n                </ion-col>\n            </ion-row>\n            <img style="height:300px !important" src="{{selectedItem.file}}" />\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Name</h2>\n                <p class="text_align_left">{{selectedItem.pname}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Id</h2>\n                <p class="text_align_left">{{selectedItem.pid}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Description</h2>\n                <p class="text_align_left">{{selectedItem.pdescription}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Date</h2>\n                <p class="text_align_left">{{selectedItem.pdate}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Supplier</h2>\n                <p class="text_align_left">{{selectedItem.psupplier}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Quantity</h2>\n                <p class="text_align_left">{{selectedItem.pquantity}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Per Unit Price</h2>\n                <p class="text_align_left">&#8377;{{selectedItem.unitprice}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Price</h2>\n                <p class="text_align_left">&#8377;{{selectedItem.pprice}}</p>\n            </ion-item>\n            \n            <ion-row>\n                <ion-col>\n                    <button ion-button icon-left clear small (click)="deleteData(selectedItem.rowid)">\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                        <div>Delete</div>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\productlist\productlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ProductListPage);

var ProductListPage_1;
//# sourceMappingURL=productlist.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__supplierlist_supplierlist__ = __webpack_require__(106);
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
        this.supplier = { sname: "", address: "", email: "", phoneno: "", remark: "", myForm: true };
        this.supplier.myForm = true;
    }
    SupplierPage.prototype.keyUp = function (event) {
        console.log(this.supplier.sname, this.supplier.address, this.supplier.phoneno);
        if (this.supplier.sname != "" && this.supplier.address != "" && this.supplier.email != "" && this.supplier.phoneno != "" && this.supplier.remark != "") {
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
            db.executeSql('CREATE TABLE IF NOT EXISTS supplier(rowid INTEGER PRIMARY KEY, sname TEXT, address TEXT, email TEXT, phoneno TEXT, remark TEXT)', {})
                .then(function (res) {
                db.executeSql('INSERT INTO supplier VALUES(NULL,?,?,?,?,?)', [_this.supplier.sname, _this.supplier.address, _this.supplier.email, _this.supplier.phoneno, _this.supplier.remark])
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
        selector: 'page-list',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\supplier\supplier.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n         <ion-title>\n\n            Add Supplier\n\n            <ion-icon title="Supplier List" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row>\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <!-- <div class="" *ngIf="!supplierForm.controls.supplier_name.valid  && (supplierForm.controls.supplier_name.dirty || submitAttempt)">* Please enter valid supplier name.</div> -->\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Supplier Name" [(ngModel)]="supplier.sname" name="sname" (keyup)=\'keyUp($event);\'>\n\n                            </ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Address" name="address" [(ngModel)]="supplier.address" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="email" placeholder="Email" name="email" [(ngModel)]="supplier.email" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Phone Number" maxlength="10" name="phoneno" [(ngModel)]="supplier.phoneno" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Remark" maxlength="50" name="remark" [(ngModel)]="supplier.remark" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn" full type="submit" [disabled]="supplier.myForm">Add Supplier</button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\supplier\supplier.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
], SupplierPage);

//# sourceMappingURL=supplier.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supplier_supplier__ = __webpack_require__(105);
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
    }
    SupplierListPage.prototype.itemTapped = function (event, item) {
        // console.log(this.selectedItems)
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
            db.executeSql('SELECT * FROM supplier ORDER BY rowid DESC', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.suppliersArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.suppliersArray.push({ rowid: res.rows.item(i).rowid, sname: res.rows.item(i).sname, address: res.rows.item(i).address, email: res.rows.item(i).email, phoneno: res.rows.item(i).phoneno, remark: res.rows.item(i).remark });
                }
                console.log(_this.suppliersArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
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
                                _this.selectedItem = false;
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
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\supplierlist\supplierlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Supplier List\n      <ion-icon title="Add Supplier" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item class="item_list_align" *ngFor="let supplier of suppliersArray" (click)="itemTapped($event, supplier)">\n            <ion-icon name="leaf" item-start></ion-icon>\n            {{supplier.sname}}\n        </ion-item>\n    </ion-list>\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Name</h2>\n                <p class="text_align_left">{{selectedItem.sname}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Address</h2>\n                <p class="text_align_left">{{selectedItem.address}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Email</h2>\n                <p class="text_align_left">{{selectedItem.email}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Phone Number</h2>\n                <p class="text_align_left">{{selectedItem.phoneno}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Remark</h2>\n                <p class="text_align_left">{{selectedItem.remark}}</p>\n            </ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button icon-left clear small (click)="deleteData(selectedItem.rowid)">\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                        <div>Delete</div>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\supplierlist\supplierlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], SupplierListPage);

var SupplierListPage_1;
//# sourceMappingURL=supplierlist.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__saleslist_saleslist__ = __webpack_require__(108);
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
    // let date = new Date();
    function SalesPage(navCtrl, navParams, fb, sqlite, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.sqlite = sqlite;
        this.toast = toast;
        this.information = [];
        this.productItem = [];
        this.sales = { name: "", product: "", squantity: "", sprice: "", myForm: true, todaydate: new Date(), quantitycheck: false, totalValueQuantity: 0 };
        this.productArray = [];
        this.sales.myForm = true;
        this.sales.quantitycheck = false;
        // this.sales.todaydate = new Date();
        // this.myForm = fb.group({
        //     name: ['', Validators.required]
        // });
    }
    SalesPage.prototype.changeUp = function (value) {
        var _this = this;
        console.log("valuevalue", value);
        var productQuantity = 0;
        var salesQuantity = 0;
        var finalCalc = 0;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('select pquantity from product where pname = ?', [value])
                .then(function (res) {
                if (res.rows.item(0).pquantity == 0 || res.rows.item(0).pquantity == null) {
                    productQuantity = 0;
                }
                else {
                    productQuantity = parseInt(res.rows.item(0).pquantity);
                }
                console.log(res, productQuantity, 'select console');
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('select SUM(squantity) AS totalquantity from sales where product = ?', [value])
                .then(function (res) {
                if (res.rows.item(0).totalquantity == 0 || res.rows.item(0).totalquantity == null) {
                    salesQuantity = 0;
                }
                else {
                    salesQuantity = parseInt(res.rows.item(0).totalquantity);
                }
                console.log(res, salesQuantity, 'select console');
                finalCalc = productQuantity - salesQuantity;
                _this.sales.squantity = String(finalCalc);
                _this.sales.totalValueQuantity = finalCalc;
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SalesPage.prototype.keyUp = function (event) {
        if (this.sales.name != "" && this.sales.squantity != "" && this.sales.sprice != "" && this.sales.product != "") {
            if (parseInt(this.sales.squantity) > this.sales.totalValueQuantity) {
                this.sales.myForm = true;
                this.sales.quantitycheck = true;
            }
            else {
                this.sales.myForm = false;
                this.sales.quantitycheck = false;
            }
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
            db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, quantity INTEGER, type TEXT, description TEXT, amount INTEGER)', {});
            db.executeSql('CREATE TABLE IF NOT EXISTS sales(rowid INTEGER PRIMARY KEY, name TEXT, product TEXT, squantity INTEGER, sprice INTEGER)', {})
                .then(function (res) {
                console.log(res);
                db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?,?)', [_this.sales.todaydate, _this.sales.squantity, 'income', _this.sales.product, _this.sales.sprice]);
                db.executeSql('INSERT INTO sales VALUES(NULL,?,?,?,?)', [_this.sales.name, _this.sales.product, _this.sales.squantity, _this.sales.sprice])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__saleslist_saleslist__["a" /* SalesListPage */]);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
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
    SalesPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__saleslist_saleslist__["a" /* SalesListPage */]);
    };
    return SalesPage;
}());
SalesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\sales\sales.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>\n\n            Add Sales Order\n\n            <ion-icon title="Sales List" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row>\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Customer Name" [(ngModel)]="sales.name" name="name" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-select placeholder="Product" [(ngModel)]="sales.product" name="product" \n\n                            (ionChange)=\'changeUp(sales.product);\'>\n\n                                <ion-option *ngFor="let product of productArray" value="{{product.pname}}">{{product.pname}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Quantity" [(ngModel)]="sales.squantity" name="squantity" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <div class="error-box color_red" *ngIf="sales.quantitycheck">* Quantity greater than available product quantity.</div>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Price" [(ngModel)]="sales.sprice" name="sprice" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn" full type="submit" [disabled]="sales.myForm">Add Sales Order</button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\sales\sales.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
], SalesPage);

//# sourceMappingURL=sales.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sales_sales__ = __webpack_require__(107);
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
            db.executeSql('SELECT * FROM sales ORDER BY rowid DESC', {})
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
            });
        }).catch(function (e) {
            console.log(e);
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
                                _this.selectedItem = false;
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
    SalesListPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__sales_sales__["a" /* SalesPage */]);
    };
    return SalesListPage;
}());
SalesListPage = SalesListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\saleslist\saleslist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Sales List\n      <ion-icon title="Add sales" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item class="item_list_align" *ngFor="let sales of salesArray" (click)="itemTapped($event, sales)">\n            <ion-icon name="leaf" item-start></ion-icon>\n            <h2>{{sales.name}}</h2>\n            <p>{{sales.product}}</p>\n            <ion-note item-end>&#8377;{{sales.sprice}}</ion-note>\n        </ion-item>\n    </ion-list>\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Customer Name</h2>\n                <p class="text_align_left">{{selectedItem.name}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product</h2>\n                <p class="text_align_left">{{selectedItem.product}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Quanity</h2>\n                <p class="text_align_left">{{selectedItem.squantity}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Price</h2>\n                <p class="text_align_left">&#8377;{{selectedItem.sprice}}</p>\n            </ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button icon-left clear small (click)="deleteData(selectedItem.rowid)">\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                        <div>Delete</div>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\saleslist\saleslist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], SalesListPage);

var SalesListPage_1;
//# sourceMappingURL=saleslist.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__paymentlist_paymentlist__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PaymentPage = (function () {
    function PaymentPage(navCtrl, navParams, fb, sqlite, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.sqlite = sqlite;
        this.toast = toast;
        this.information = [];
        this.productItem = [];
        this.payment = { product: "", pdate: "", amount: "", myForm: true };
        this.productArray = [];
        this.payment.myForm = true;
        // this.myForm = fb.group({
        //     name: ['', Validators.required]
        // });
    }
    PaymentPage.prototype.keyUp = function (event) {
        if (this.payment.amount != "" && this.payment.product != "" && this.payment.pdate != "") {
            this.payment.myForm = false;
        }
        else {
            this.payment.myForm = true;
        }
    };
    PaymentPage.prototype.submitForm = function (value) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            // db.executeSql('DROP TABLE IF EXISTS expense', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS payment(rowid INTEGER PRIMARY KEY, product TEXT, pdate TEXT, amount INTEGER)', {})
                .then(function (res) {
                console.log(res);
                db.executeSql('INSERT INTO payment VALUES(NULL,?,?,?)', [_this.payment.product, _this.payment.pdate, _this.payment.amount])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__paymentlist_paymentlist__["a" /* PaymentListPage */]);
                    // this.getData();
                })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    PaymentPage.prototype.ionViewDidLoad = function () {
        this.getProductData();
    };
    PaymentPage.prototype.ionViewWillEnter = function () {
        this.getProductData();
    };
    PaymentPage.prototype.getProductData = function () {
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
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    PaymentPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__paymentlist_paymentlist__["a" /* PaymentListPage */]);
    };
    return PaymentPage;
}());
PaymentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\payment\payment.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>\n\n            Payement\n\n            <ion-icon title="Sales List" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row>\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-select placeholder="Product" [(ngModel)]="payment.product" name="product">\n\n                                <ion-option *ngFor="let product of productArray" value="{{product.pname}}">{{product.pname}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-datetime placeholder="Paid Date" displayFormat="MMM DD YYYY" [(ngModel)]="payment.pdate" name="pdate" pickerFormat="MMM DD YYYY"></ion-datetime>\n\n                        </ion-item>\n\n\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Paid Amount" [(ngModel)]="payment.amount" name="pamount" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn" full type="submit" [disabled]="payment.myForm">Add Payment</button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\payment\payment.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
], PaymentPage);

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payment_payment__ = __webpack_require__(109);
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
var PaymentListPage = PaymentListPage_1 = (function () {
    function PaymentListPage(navCtrl, navParams, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.paymentArray = [];
        this.totalIncome = 0;
        this.totalExpense = 0;
        this.balance = 0;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }
    PaymentListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(PaymentListPage_1, {
            item: item
        });
    };
    PaymentListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    PaymentListPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    PaymentListPage.prototype.getData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM payment ORDER BY rowid DESC', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.paymentArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.paymentArray.push({ rowid: res.rows.item(i).rowid, product: res.rows.item(i).product, pdate: res.rows.item(i).pdate, amount: res.rows.item(i).amount });
                }
                console.log(_this.paymentArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    PaymentListPage.prototype.deleteData = function (rowid) {
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
                            db.executeSql('DELETE FROM payment WHERE rowid=?', [rowid])
                                .then(function (res) {
                                console.log(res);
                                _this.selectedItem = false;
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
    PaymentListPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__payment_payment__["a" /* PaymentPage */]);
    };
    return PaymentListPage;
}());
PaymentListPage = PaymentListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\paymentlist\paymentlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Payment List\n      <ion-icon title="Add payement" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item class="item_list_align" *ngFor="let payment of paymentArray" (click)="itemTapped($event, payment)">\n            <ion-icon name="leaf" item-start></ion-icon>\n            {{payment.product}}\n        </ion-item>\n    </ion-list>\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Product Name</h2>\n                <p class="text_align_left">{{selectedItem.product}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Date</h2>\n                <p class="text_align_left">{{selectedItem.pdate}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Paid Amount</h2>\n                <p class="text_align_left">&#8377;{{selectedItem.amount}}</p>\n            </ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button icon-left clear small (click)="deleteData(selectedItem.rowid)">\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                        <div>Delete</div>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\paymentlist\paymentlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], PaymentListPage);

var PaymentListPage_1;
//# sourceMappingURL=paymentlist.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseManagerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__expensemanagerlist_expensemanagerlist__ = __webpack_require__(112);
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

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseManagerListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__expensemanager_expensemanager__ = __webpack_require__(111);
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
            db.executeSql('SELECT * FROM expense ORDER BY rowid DESC', {})
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
                                _this.selectedItem = false;
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
    ExpenseManagerListPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__expensemanager_expensemanager__["a" /* ExpenseManagerPage */]);
    };
    return ExpenseManagerListPage;
}());
ExpenseManagerListPage = ExpenseManagerListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\expensemanagerlist\expensemanagerlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Expense Manager List\n      <ion-icon title="Add sales" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item class="item_list_align" *ngFor="let expense of expenseArray" (click)="itemTapped($event, expense)">\n            <ion-icon name="leaf" item-start></ion-icon>\n            <h2 *ngIf="expense.type == \'expense\'">Expense</h2>\n            <h2 *ngIf="expense.type == \'income\'">Income</h2>\n            <p>&#8377;{{expense.amount}}</p>\n            <ion-note item-end>{{expense.date | date}}</ion-note>\n        </ion-item>\n    </ion-list>\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Date</h2>\n                <p class="text_align_left">{{selectedItem.date | date:\'yyyy-MM-dd\'}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Quantity</h2>\n                <p class="text_align_left">{{selectedItem.quantity}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Type</h2>\n                <p class="text_align_left">{{selectedItem.type}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Description</h2>\n                <p class="text_align_left">{{selectedItem.description}}</p>\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Amount</h2>\n                <p class="text_align_left">&#8377;{{selectedItem.amount}}</p>\n            </ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button icon-left clear small (click)="deleteData(selectedItem.rowid)">\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                        <div>Delete</div>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\expensemanagerlist\expensemanagerlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ExpenseManagerListPage);

var ExpenseManagerListPage_1;
//# sourceMappingURL=expensemanagerlist.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__customerlist_customerlist__ = __webpack_require__(114);
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
var CustomerPage = (function () {
    function CustomerPage(navCtrl, navParams, fb, sqlite, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.sqlite = sqlite;
        this.toast = toast;
        this.information = [];
        // data = { date:"", type:"", description:"", amount:"" };
        this.customer = { cname: "", address: "", email: "", phoneno: "", remark: "", myForm: true };
        this.customer.myForm = true;
    }
    CustomerPage.prototype.keyUp = function (event) {
        console.log(this.customer.cname, this.customer.address, this.customer.phoneno);
        if (this.customer.cname != "" && this.customer.address != "" && this.customer.email != "" && this.customer.phoneno != "" && this.customer.remark != "") {
            this.customer.myForm = false;
        }
        else {
            this.customer.myForm = true;
        }
    };
    CustomerPage.prototype.submitForm = function (value) {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('CREATE TABLE IF NOT EXISTS customer(rowid INTEGER PRIMARY KEY, cname TEXT, address TEXT, email TEXT, phoneno TEXT, remark TEXT)', {})
                .then(function (res) {
                db.executeSql('INSERT INTO customer VALUES(NULL,?,?,?,?,?)', [_this.customer.cname, _this.customer.address, _this.customer.email, _this.customer.phoneno, _this.customer.remark])
                    .then(function (res) {
                    console.log(res);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__customerlist_customerlist__["a" /* CustomerListPage */]);
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
    CustomerPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__customerlist_customerlist__["a" /* CustomerListPage */]);
    };
    return CustomerPage;
}());
CustomerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\customer\customer.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n         <ion-title>\n\n            Add customer\n\n            <ion-icon title="customer List" role="img" class="icon icon-md ion-md-list-box item-icon pull-right" aria-label="list-box" ng-reflect-name="list-box" (click)=\'clickLink();\'></ion-icon>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="product-content" padding>\n\n    <div class="login-box">\n\n        <form class="form-horizontal" (ngSubmit)="submitForm()" novalidate>\n\n            <ion-row>\n\n                <ion-col>\n\n                    <ion-list inset>\n\n                        <!-- <div class="" *ngIf="!customerForm.controls.customer_name.valid  && (customerForm.controls.customer_name.dirty || submitAttempt)">* Please enter valid customer name.</div> -->\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="customer Name" [(ngModel)]="customer.cname" name="cname" (keyup)=\'keyUp($event);\'>\n\n                            </ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Address" name="address" [(ngModel)]="customer.address" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="email" placeholder="Email" name="email" [(ngModel)]="customer.email" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Phone Number" maxlength="10" name="phoneno" [(ngModel)]="customer.phoneno" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                        <ion-item class="product-item" padding>\n\n                            <ion-input type="text" placeholder="Remark" maxlength="50" name="remark" [(ngModel)]="customer.remark" (keyup)=\'keyUp($event);\'></ion-input>\n\n                        </ion-item>\n\n                    </ion-list>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col class="signup-col">\n\n                    <button ion-button class="submit-btn" full type="submit" [disabled]="customer.myForm">Add Customer</button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </form>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\customer\customer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */]])
], CustomerPage);

//# sourceMappingURL=customer.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__customer_customer__ = __webpack_require__(113);
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
var CustomerListPage = CustomerListPage_1 = (function () {
    function CustomerListPage(navCtrl, navParams, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.customersArray = [];
        // customersArray: Array<{name: string, address: string, phoneno: string}>;
        this.totalIncome = 0;
        this.totalExpense = 0;
        this.balance = 0;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }
    CustomerListPage.prototype.itemTapped = function (event, item) {
        // console.log(this.selectedItems)
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(CustomerListPage_1, {
            item: item
        });
    };
    CustomerListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    CustomerListPage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    CustomerListPage.prototype.getData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM customer ORDER BY rowid DESC', {})
                .then(function (res) {
                console.log(res, 'select console');
                _this.customersArray = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.customersArray.push({ rowid: res.rows.item(i).rowid, sname: res.rows.item(i).sname, address: res.rows.item(i).address, email: res.rows.item(i).email, phoneno: res.rows.item(i).phoneno, remark: res.rows.item(i).remark });
                }
                console.log(_this.customersArray, 'select console');
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    CustomerListPage.prototype.deleteData = function (rowid) {
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
                            db.executeSql('DELETE FROM customer WHERE rowid=?', [rowid])
                                .then(function (res) {
                                _this.selectedItem = false;
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
    //         db.executeSql('DELETE FROM customer WHERE rowid=?', [rowid])
    //         .then(res => {
    //           console.log(res);
    //           this.getData();
    //         })
    //     .catch(e => console.log(e));
    //     }).catch(e => console.log(e));
    // }
    CustomerListPage.prototype.clickLink = function (type) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__customer_customer__["a" /* CustomerPage */]);
    };
    return CustomerListPage;
}());
CustomerListPage = CustomerListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\customerlist\customerlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Customer List\n      <ion-icon title="Add Customer" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon>\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="!selectedItem">\n        <ion-item class="item_list_align" *ngFor="let customer of customersArray" (click)="itemTapped($event, customer)">\n            <ion-icon name="leaf" item-start></ion-icon>\n            {{customer.sname}}\n        </ion-item>\n    </ion-list>\n    <div *ngIf="selectedItem">\n        <ion-card>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Name</h2>\n                <p class="text_align_left">{{selectedItem.cname}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Address</h2>\n                <p class="text_align_left">{{selectedItem.address}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Email</h2>\n                <p class="text_align_left">{{selectedItem.email}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Phone Number</h2>\n                <p class="text_align_left">{{selectedItem.phoneno}}</p>\n            </ion-item>\n            <ion-item>\n                <ion-icon name="star" item-start large></ion-icon>\n                <h2 class="text_align_left">Remark</h2>\n                <p class="text_align_left">{{selectedItem.remark}}</p>\n            </ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button icon-left clear small (click)="deleteData(selectedItem.rowid)">\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                        <div>Delete</div>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </div>\n    <!-- <ion-fab right bottom>\n        <button ion-fab color="light">\n           <ion-icon name="search"></ion-icon>\n        </button>\n    </ion-fab> -->\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\customerlist\customerlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], CustomerListPage);

var CustomerListPage_1;
//# sourceMappingURL=customerlist.js.map

/***/ }),

/***/ 123:
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
webpackEmptyAsyncContext.id = 123;

/***/ }),

/***/ 164:
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
webpackEmptyAsyncContext.id = 164;

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stockreport_stockreport__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__salesreport_salesreport__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__purchasereport_purchasereport__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__paymentreport_paymentreport__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__paymentdue_paymentdue__ = __webpack_require__(287);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ReportsPage = (function () {
    function ReportsPage(navCtrl, navParams, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }
    ReportsPage.prototype.clickLink = function (type) {
        if (type == "payment") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__paymentreport_paymentreport__["a" /* PaymentReportPage */]);
        }
        else if (type == "stock") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__stockreport_stockreport__["a" /* StockReportPage */]);
        }
        else if (type == "sales") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__salesreport_salesreport__["a" /* SalesReportPage */]);
        }
        else if (type == "purchase") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__purchasereport_purchasereport__["a" /* PurchaseReportPage */]);
        }
        else if (type == "paymentdue") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__paymentdue_paymentdue__["a" /* PaymentDuePage */]);
        }
    };
    return ReportsPage;
}());
ReportsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\reports\reports.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Reports\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-grid>\n        <ion-row>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("payment");\'>\n                    <a href="javascipt:;">Payment Report</a>\n                </div>\n            </ion-col>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("stock");\'>\n                    <a href="javascript:;">Stock Report</a>\n                </div>\n            </ion-col>\n            <ion-col col-12>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("sales");\'>\n                    <a href="javascript:;">Sales Report</a>\n                </div>\n            </ion-col>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("purchase");\'>\n                    <a href="javascipt:;">Purchase Report</a>\n                </div>\n            </ion-col>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("paymentdue");\'>\n                    <a href="javascipt:;">Payment Due Report</a>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\reports\reports.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _d || Object])
], ReportsPage);

var _a, _b, _c, _d;
//# sourceMappingURL=reports.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(231);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_register_register__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_product_product__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_supplier_supplier__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_customer_customer__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_expensemanager_expensemanager__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_sales_sales__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_payment_payment__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_productlist_productlist__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_supplierlist_supplierlist__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_customerlist_customerlist__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_saleslist_saleslist__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_expensemanagerlist_expensemanagerlist__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_paymentlist_paymentlist__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_stockreport_stockreport__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_salesreport_salesreport__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_purchasereport_purchasereport__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_paymentreport_paymentreport__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_paymentdue_paymentdue__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_reports_reports__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_transfer__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_file_path__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_camera__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_sqlite__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_toast__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

































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
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_product_product__["a" /* ProductPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_supplier_supplier__["a" /* SupplierPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_customer_customer__["a" /* CustomerPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_payment_payment__["a" /* PaymentPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_expensemanager_expensemanager__["a" /* ExpenseManagerPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_sales_sales__["a" /* SalesPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_productlist_productlist__["a" /* ProductListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_supplierlist_supplierlist__["a" /* SupplierListPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_customerlist_customerlist__["a" /* CustomerListPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_saleslist_saleslist__["a" /* SalesListPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_paymentlist_paymentlist__["a" /* PaymentListPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_expensemanagerlist_expensemanagerlist__["a" /* ExpenseManagerListPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_stockreport_stockreport__["a" /* StockReportPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_salesreport_salesreport__["a" /* SalesReportPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_purchasereport_purchasereport__["a" /* PurchaseReportPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_paymentreport_paymentreport__["a" /* PaymentReportPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_paymentdue_paymentdue__["a" /* PaymentDuePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_reports_reports__["a" /* ReportsPage */]
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
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_product_product__["a" /* ProductPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_supplier_supplier__["a" /* SupplierPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_customer_customer__["a" /* CustomerPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_payment_payment__["a" /* PaymentPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_expensemanager_expensemanager__["a" /* ExpenseManagerPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_sales_sales__["a" /* SalesPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_productlist_productlist__["a" /* ProductListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_supplierlist_supplierlist__["a" /* SupplierListPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_customerlist_customerlist__["a" /* CustomerListPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_saleslist_saleslist__["a" /* SalesListPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_paymentlist_paymentlist__["a" /* PaymentListPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_expensemanagerlist_expensemanagerlist__["a" /* ExpenseManagerListPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_stockreport_stockreport__["a" /* StockReportPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_salesreport_salesreport__["a" /* SalesReportPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_purchasereport_purchasereport__["a" /* PurchaseReportPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_paymentreport_paymentreport__["a" /* PaymentReportPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_paymentdue_paymentdue__["a" /* PaymentDuePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_reports_reports__["a" /* ReportsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_30__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_file_path__["a" /* FilePath */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_toast__["a" /* Toast */]
            // FileTransfer,
            // FileUploadOptions,
            // FileTransferObject,
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_productlist_productlist__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_supplierlist_supplierlist__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_customerlist_customerlist__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_saleslist_saleslist__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_paymentlist_paymentlist__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_expensemanagerlist_expensemanagerlist__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_reports_reports__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.alertPresented = false;
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Supplier', component: __WEBPACK_IMPORTED_MODULE_6__pages_supplierlist_supplierlist__["a" /* SupplierListPage */] },
            { title: 'Customer', component: __WEBPACK_IMPORTED_MODULE_7__pages_customerlist_customerlist__["a" /* CustomerListPage */] },
            { title: 'Product', component: __WEBPACK_IMPORTED_MODULE_5__pages_productlist_productlist__["a" /* ProductListPage */] },
            { title: 'Payment Histoy', component: __WEBPACK_IMPORTED_MODULE_9__pages_paymentlist_paymentlist__["a" /* PaymentListPage */] },
            { title: 'Sales', component: __WEBPACK_IMPORTED_MODULE_8__pages_saleslist_saleslist__["a" /* SalesListPage */] },
            { title: 'Expense Manager', component: __WEBPACK_IMPORTED_MODULE_10__pages_expensemanagerlist_expensemanagerlist__["a" /* ExpenseManagerListPage */] },
            { title: 'Reports', component: __WEBPACK_IMPORTED_MODULE_11__pages_reports_reports__["a" /* ReportsPage */] }
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
                if (!_this.alertPresented) {
                    _this.alertPresented = true;
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Exit App',
                        message: 'Are you sure you want to exit app ?',
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                handler: function () {
                                    _this.alertPresented = false;
                                    // console.log('Cancel clicked');
                                }
                            }, {
                                text: 'Exit',
                                handler: function () {
                                    _this.alertPresented = false;
                                    _this.platform.exitApp();
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\projects\ionic\myApp\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon name="arrow-forward"></ion-icon> {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n  \n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\projects\ionic\myApp\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.authForm = fb.group({
            'username': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'password': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad');
    };
    LoginPage.prototype.submitForm = function (value) {
        if (this.authForm.controls.username.value && this.authForm.controls.password.value) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\login\login.html"*/'<!-- <ion-list>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Username</ion-label>\n\n    <ion-input [(ngModel)]="username" type="text" value=""></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Password</ion-label>\n\n    <ion-input [(ngModel)]="password"  type="password" value=""></ion-input>\n\n  </ion-item>\n\n\n\n</ion-list>\n\n\n\n<div padding>\n\n  <button primary block  (click)="login()">Sign In</button>\n\n</div> -->\n\n<!-- <ion-view view-title="Login" name="login-view">\n\n  <ion-content class="padding"> -->\n\n <div class="container">\n\n    <div class="card card-container">\n\n        <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />\n\n        <p id="profile-name" class="profile-name-card"></p>\n\n        <form class="form_signup" [formGroup]="authForm" (ngSubmit)="submitForm()">\n\n            <span id="reauth-email" class="reauth-email"></span>\n\n            <div class="form-group">\n\n                <input type="text" id="inputEmail" [formControl]="authForm.controls[\'username\']" class="form-control" placeholder="Username" required autofocus>\n\n                <div class="error-box color_red" *ngIf="authForm.controls[\'username\'].hasError(\'required\') && authForm.controls[\'username\'].touched">* Username is required.</div>\n\n            </div>\n\n            <div class="form-group">\n\n                <input type="password" id="inputPassword" [formControl]="authForm.controls[\'password\']" class="form-control" placeholder="Password" required>\n\n                <div class="error-box color_red" *ngIf="authForm.controls[\'password\'].hasError(\'required\') && authForm.controls[\'password\'].touched">* Password is required!</div>\n\n            </div>\n\n            <div id="remember" class="checkbox">\n\n                <label>\n\n                    <input type="checkbox" value="remember-me"> Remember me\n\n                </label>\n\n            </div>\n\n            <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit" ion-button full [disabled]="!authForm.valid">Login</button>\n\n        </form>\n\n        <!-- <a href="javascript:;" class="forgot-password">\n\n            Forgot the password?\n\n        </a> -->\n\n    </div>\n\n</div>\n\n<!-- </ion-content>\n\n</ion-view> -->'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* unused harmony export matchOtherValidator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.signupForm = fb.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'email': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].email])],
            'username': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'password': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            'confirm_password': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, matchOtherValidator('password')])]
        });
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad');
    };
    RegisterPage.prototype.submitForm = function (value) {
        console.log(value);
        if (value) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\register\register.html"*/'<div class="card card-container">\n\n	<img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />\n\n    <p id="profile-name" class="profile-name-card"></p>\n\n	<form class="form-horizontal" [formGroup]="signupForm" (ngSubmit)="submitForm()">\n\n		\n\n		<div class="form-group">\n\n			<label for="name" class="cols-sm-2 control-label">Your Name</label>\n\n			<div class="cols-sm-10">\n\n				<input type="text" class="form-control" name="name" id="name" [formControl]="signupForm.controls[\'name\']"  placeholder="Enter your Name"/>\n\n			</div>\n\n			<div class="error-box color_red" *ngIf="signupForm.controls[\'name\'].hasError(\'required\') && signupForm.controls[\'name\'].touched">* Name is required.</div>\n\n		</div>\n\n\n\n		<div class="form-group">\n\n			<label for="email" class="cols-sm-2 control-label">Your Email</label>\n\n			<div class="cols-sm-10">\n\n				<input type="text" class="form-control" name="email" id="email" [formControl]="signupForm.controls[\'email\']"  placeholder="Enter your Email"/>\n\n			</div>\n\n			<div class="error-box color_red" *ngIf="signupForm.controls[\'email\'].hasError(\'required\') && signupForm.controls[\'email\'].touched">* Email is required.</div>\n\n			<div class="error-box color_red" *ngIf="signupForm.controls[\'email\'].hasError(\'email\') && signupForm.controls[\'email\'].touched">* Email is not valid.</div>\n\n		</div>\n\n\n\n		<div class="form-group">\n\n			<label for="username" class="cols-sm-2 control-label">Username</label>\n\n			<div class="cols-sm-10">\n\n				<input type="text" class="form-control" name="username" id="username" [formControl]="signupForm.controls[\'username\']"  placeholder="Enter your Username"/>\n\n			</div>\n\n			<div class="error-box color_red" *ngIf="signupForm.controls[\'username\'].hasError(\'required\') && signupForm.controls[\'username\'].touched">* Username is required.</div>\n\n		</div>   \n\n\n\n		<div class="form-group">\n\n			<label for="password" class="cols-sm-2 control-label">Password</label>\n\n			<div class="cols-sm-10">\n\n				<input type="password" class="form-control" name="password" id="password" [formControl]="signupForm.controls[\'password\']"  placeholder="Enter your Password"/>\n\n			</div>\n\n			<div class="error-box color_red" *ngIf="signupForm.controls[\'password\'].hasError(\'required\') && signupForm.controls[\'password\'].touched">* Password is required.</div>\n\n		</div>\n\n\n\n		<div class="form-group">\n\n			<label for="confirm_password" class="cols-sm-2 control-label">Confirm Password</label>\n\n			<div class="cols-sm-10">\n\n				<input type="password" class="form-control" name="confirm_password" id="confirm_password" [formControl]="signupForm.controls[\'confirm_password\']"  placeholder="Confirm your Password"/>\n\n			</div>\n\n			<div class="error-box color_red" *ngIf="signupForm.controls[\'confirm_password\'].hasError(\'required\') && signupForm.controls[\'confirm_password\'].touched">* Confirm password is required.</div>\n\n			<div class="error-box color_red" *ngIf="!signupForm.controls.confirm_password.valid && signupForm.controls[\'confirm_password\'].touched">* Both passwords not same.</div>\n\n		</div>\n\n\n\n		<div class="form-group ">\n\n			<button class="btn btn-primary btn-lg btn-block" type="submit" ion-button full [disabled]="!signupForm.valid">Register</button>\n\n		</div>\n\n		<div class="login-register">\n\n            <a href="#">Login</a>\n\n         </div>\n\n	</form>\n\n</div>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\register\register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
], RegisterPage);

function matchOtherValidator(otherControlName) {
    var thisControl;
    var otherControl;
    return function matchOtherValidate(control) {
        if (!control.parent) {
            return null;
        }
        // Initializing the validator.
        if (!thisControl) {
            thisControl = control;
            otherControl = control.parent.get(otherControlName);
            if (!otherControl) {
                throw new Error('matchOtherValidator(): other control is not found in parent group');
            }
            otherControl.valueChanges.subscribe(function () {
                thisControl.updateValueAndValidity();
            });
        }
        if (!otherControl) {
            return null;
        }
        if (otherControl.value !== thisControl.value) {
            return {
                matchOther: true
            };
        }
        return null;
    };
}
//# sourceMappingURL=register.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StockReportPage = (function () {
    function StockReportPage() {
    }
    return StockReportPage;
}());
StockReportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\stockreport\stockreport.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Stock Report\n      <!-- <ion-icon title="Add Supplier" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon> -->\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div style="overflow: auto;margin-top:50px;">\n        <table class="reporttable">\n            <tr>\n                <th>Product</th>\n                <th>Start Date</th>\n                <th>Total Purchase</th>\n                <th>Total Sold</th>\n                <th>Available Quantity</th>\n                <th>PNL</th>\n            </tr>\n            <tr>\n                <td>oneplus</td>\n                <td>43</td>\n                <td>fsdfs</td>\n                <td>sdfsd</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n            </tr>\n            <tr>\n                <td>oppo</td>\n                <td>345</td>\n                <td>54sd</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n            </tr>\n        </table>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\stockreport\stockreport.html"*/
    })
], StockReportPage);

//# sourceMappingURL=stockreport.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SalesReportPage = (function () {
    function SalesReportPage() {
    }
    return SalesReportPage;
}());
SalesReportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\salesreport\salesreport.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Sales Report\n      <!-- <ion-icon title="Add Supplier" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon> -->\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div style="overflow: auto;margin-top:50px;">\n        <table class="reporttable">\n            <tr>\n                <th>Product</th>\n                <th>Sales Date</th>\n                <th>Quantity</th>\n                <th>Customer</th>\n                <th>Per Unit Price</th>\n                <th>Total Price</th>\n            </tr>\n            <tr>\n                <td>oneplus</td>\n                <td>43</td>\n                <td>fsdfs</td>\n                <td>sdfsd</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n            </tr>\n            <tr>\n                <td>oppo</td>\n                <td>345</td>\n                <td>54sd</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n            </tr>\n        </table>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\salesreport\salesreport.html"*/
    })
], SalesReportPage);

//# sourceMappingURL=salesreport.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PurchaseReportPage = (function () {
    function PurchaseReportPage() {
    }
    return PurchaseReportPage;
}());
PurchaseReportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\purchasereport\purchasereport.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Purchase Report\n      <!-- <ion-icon title="Add Supplier" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon> -->\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div style="overflow: auto;margin-top:50px;">\n        <table class="reporttable">\n            <tr>\n                <th>Product</th>\n                <th>Product Date</th>\n                <th>Quantity</th>\n                <th>Supplier</th>\n                <th>Per Unit Price</th>\n                <th>Total Price</th>\n            </tr>\n            <tr>\n                <td>oneplus</td>\n                <td>43</td>\n                <td>fsdfs</td>\n                <td>sdfsd</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n            </tr>\n            <tr>\n                <td>oppo</td>\n                <td>345</td>\n                <td>54sd</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n                <td>sdfsdf</td>\n            </tr>\n        </table>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\purchasereport\purchasereport.html"*/
    })
], PurchaseReportPage);

//# sourceMappingURL=purchasereport.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PaymentReportPage = (function () {
    function PaymentReportPage() {
    }
    return PaymentReportPage;
}());
PaymentReportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\paymentreport\paymentreport.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Payment Report\n      <!-- <ion-icon title="Add Supplier" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon> -->\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div style="overflow: auto;margin-top:50px;">\n        <table class="reporttable">\n            <tr>\n                <th>Type</th>\n                <th>Product</th>\n                <th>Party Name</th>\n                <th>Amount</th>\n            </tr>\n            <tr>\n                <td>oneplus</td>\n                <td>43</td>\n                <td>fsdfs</td>\n                <td>sdfsd</td>\n            </tr>\n            <tr>\n                <td>oppo</td>\n                <td>345</td>\n                <td>54sd</td>\n                <td>sdfsdf</td>\n            </tr>\n        </table>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\paymentreport\paymentreport.html"*/
    })
], PaymentReportPage);

//# sourceMappingURL=paymentreport.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentDuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PaymentDuePage = (function () {
    function PaymentDuePage() {
    }
    return PaymentDuePage;
}());
PaymentDuePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\paymentdue\paymentdue.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Payment Due\n      <!-- <ion-icon title="Add Supplier" role="img" class="icon icon-md ion-md-add item-icon pull-right" aria-label="add" ng-reflect-name="add" (click)=\'clickLink();\'></ion-icon> -->\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div style="overflow: auto;margin-top:50px;">\n        <table class="reporttable">\n            <tr>\n                <th>To Be Paid</th>\n                <th>Supplier</th>\n                <th>Amount Due</th>\n            </tr>\n            <tr>\n                <td>oneplus</td>\n                <td>43</td>\n                <td>fsdfs</td>\n            </tr>\n            <tr>\n                <td>oppo</td>\n                <td>345</td>\n                <td>54sd</td>\n            </tr>\n        </table>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\paymentdue\paymentdue.html"*/
    })
], PaymentDuePage);

//# sourceMappingURL=paymentdue.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_product__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supplier_supplier__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sales_sales__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__payment_payment__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__expensemanager_expensemanager__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__customer_customer__ = __webpack_require__(113);
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
        else if (type == "payment") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__payment_payment__["a" /* PaymentPage */]);
        }
        else if (type == "manager") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__expensemanager_expensemanager__["a" /* ExpenseManagerPage */]);
        }
        else if (type == "customer") {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__customer_customer__["a" /* CustomerPage */]);
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\projects\ionic\myApp\src\pages\home\home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Home</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<!-- <ion-content padding>\n  <h3>Ionic Menu Starter</h3>\n\n  <p>\n    If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will show you the way.\n  </p>\n\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content> -->\n\n<!-- <div class="wrapper padding">\n    <div class="row">\n        <div class="col-md-4 col-xs-6 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Product</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Purchase</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Supplier</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Users</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Sales</div>\n        </div>\n        <div class="col-md-4 col-xs-12 col-sm-12 padding_bottom_10px">\n            <div class="box height_100px te text-center">Manager</div>\n        </div>\n    </div>\n</div>\n -->\n\n<ion-content padding>\n    <ion-grid>\n        <ion-row>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("supplier");\'>\n                    <a href="javascipt:;">Supplier</a>\n                </div>\n            </ion-col>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("customer");\'>\n                    <a href="javascipt:;">Customer</a>\n                </div>\n            </ion-col>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("product");\'>\n                    <a href="javascript:;">Product</a>\n                </div>\n            </ion-col>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("payment");\'>\n                    <a href="javascript:;">Payment</a>\n                </div>\n            </ion-col>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("sales");\'>\n                    <a href="javascipt:;">Sales</a>\n                </div>\n            </ion-col>\n            <ion-col col-6>\n                <div class="box height_100px text-center product_div" (click)=\'clickLink("manager");\'>\n                    <a href="javascipt:;">Expense Manager</a>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"E:\projects\ionic\myApp\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.js.map