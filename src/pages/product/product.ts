import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';

import { ProductListPage } from '../productlist/productlist';

declare let cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'product.html'
})
export class ProductPage {
	lastImage: string = null;
	cursor: string = null;
  	loading: Loading;
  	setHideShow: boolean = false;

  	product = {pname: "", pid: "", pdescription: "", psupplier: "", pdate:"", pquantity: "", pamount: "", pprice: "",unitprice : "", myForm: true, productIdError: false};
  	supplierArray: any = [];
  	constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private sqlite: SQLite, private toast: Toast) {
  		this.product.myForm = true;
  	}

  	keyUp(event) {
  		if (this.product.pquantity != "" && this.product.unitprice != "") {
  			var total = (parseInt(this.product.pquantity) * parseInt(this.product.unitprice));
  			this.product.pprice = String(total);
  		} else {
  			this.product.pprice = "";
  		}

        if (this.product.pname != "" && this.product.pid != "" && this.product.pdescription != "" && this.product.psupplier != "" && this.product.pdate != "" && this.product.pquantity != "" && this.product.pprice != "" && this.product.pamount != "" && this.product.unitprice != "") {
            this.product.myForm = false;
        } else {
            this.product.myForm = true;
        }

        if (this.product.pid != "") {
	        this.sqlite.create({
	            name: 'ionicdb.db',
	            location: 'default'
	        }).then((db: SQLiteObject) => {
	            db.executeSql('SELECT count(*) as cnt from product where pid = ?',[this.product.pid])
	            .then(res => { 
	                console.log(res.rows.item(0).cnt);
	            	if (res.rows.item(0).cnt == 0) {
	            		this.product.myForm = false;
	            		this.product.productIdError = false;
	            	} else {
	            		this.product.myForm = true;
	            		this.product.productIdError = true;
	            	}
	            })
	        .catch(e => console.log(e));
	        }).catch(e => console.log(e));
        } 
        	
    }

  	

  	public presentActionSheet() {
	    let actionSheet = this.actionSheetCtrl.create({
	      title: 'Select Image Source',
	      buttons: [
	        {
	          text: 'Load from Library',
	          handler: () => {
	            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
	          }
	        },
	        {
	          text: 'Use Camera',
	          handler: () => {
	            this.takePicture(this.camera.PictureSourceType.CAMERA);
	          }
	        },
	        {
	          text: 'Cancel',
	          role: 'cancel'
	        }
	      ]
	    });
	    actionSheet.present();
  	}
  	
  	hideShowDiv(): void { 
  		this.setHideShow = true;
  	}

  	public uploadImage() {
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
			params : {'fileName': filename}
		};

		console.log(options)
		console.log(targetPath)
	}

	private createFileName() {
	  var d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  return newFileName;
	}
 
	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {
	  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	    this.lastImage = newFileName;
	  }, error => {
	    this.presentToast('Error while storing file.');
	  });
	}
 
	private presentToast(text) {
	  let toast = this.toastCtrl.create({
	    message: text,
	    duration: 3000,
	    position: 'top'
	  });
	  toast.present();
	}
	 
	// Always get the accurate path to your apps folder
	public pathForImage(img) {
	  if (img === null) {
	    return '';
	  } else {
	    return cordova.file.dataDirectory + img;
	  }
	}

	public takePicture(sourceType) {
		// Create options for the Camera Dialog
		var options = {
			quality: 100,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};
		// Get the data of an image
		this.camera.getPicture(options).then((imagePath) => {
			// Special handling for Android library
			if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
				// this.filePath.resolveNativePath(imagePath).then(filePath => {
			    let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
			    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
			    console.log(correctPath,currentName)
			    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
			// });
			} else {
				var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
				var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
			    console.log(correctPath,currentName)
				this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
			}
		}, (err) => {
			this.presentToast('Error while selecting image.');
		});
	}

	ionViewDidLoad() {
      this.getSupplierData();
    }

    ionViewWillEnter() {
      this.getSupplierData();
    }

	getSupplierData() {
        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('SELECT * FROM supplier',{})
            .then(res => {
                console.log(res, 'select console');
                this.supplierArray = [];
                for(var i=0; i<res.rows.length; i++) {
                    this.supplierArray.push({rowid:res.rows.item(i).rowid,sname:res.rows.item(i).sname,address:res.rows.item(i).address,phoneno:res.rows.item(i).phoneno})
                }
                console.log(this.supplierArray, 'select console');
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

	submitForm(value: any):void {
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            // db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, quantity INTEGER, type TEXT, description TEXT, amount INTEGER)', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS product(rowid INTEGER PRIMARY KEY, pname TEXT, pid INTEGER, pdescription TEXT, file TEXT)', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS purchase(rowid INTEGER PRIMARY KEY, productId INTEGER NOT NULL, psupplier TEXT, pquantity INTEGER, pprice INTEGER, unitprice INTEGER)', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS purchasepayment(rowid INTEGER PRIMARY KEY, productId INTEGER NOT NULL, pdate TEXT, pamount INTEGER)', {})
            .then(res => {
                // db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?,?)',[this.product.pdate,this.product.pquantity,'expense',this.product.pname,this.product.pprice])
                db.executeSql('INSERT INTO product VALUES(NULL,?,?,?,?)',[this.product.pname,this.product.pid,this.product.pdescription,this.pathForImage(this.lastImage)])
                db.executeSql('INSERT INTO purchase VALUES(NULL,?,?,?,?,?)',[this.product.pid,this.product.psupplier,this.product.pquantity,this.product.pprice,this.product.unitprice])
                db.executeSql('INSERT INTO purchasepayment VALUES(NULL,?,?,?)',[this.product.pid,this.product.pdate,this.product.pamount])
                .then(res => {
                    console.log(res);
                    this.navCtrl.setRoot(ProductListPage);
                })
                .catch(e => console.log(e));

            })
            .catch(e => console.log(e));
            
        }).catch(e => console.log(e));
    }

	clickLink(type) {
        this.navCtrl.setRoot(ProductListPage);
    }
}
