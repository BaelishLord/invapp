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
  	loading: Loading;
  	setHideShow: boolean = false;

  	product = {pname: "", pid: "", psupplier: "", pdate:"", pquantity: "", pamount: "", pprice: "",unitprice : "", myForm: true};
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

        if (this.product.pname != "" && this.product.pid != "" && this.product.psupplier != "" && this.product.pdate != "" && this.product.pquantity != "" && this.product.pprice != "" && this.product.pamount != "" && this.product.unitprice != "") {
            this.product.myForm = false;
        } else {
            this.product.myForm = true;
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
	}

	// public getBase64Image(img) {
	// 	var canvas = document.createElement("canvas");
	// 	canvas.width = img.width;
	// 	canvas.height = img.height;
	// 	var ctx = canvas.getContext("2d");
	// 	ctx.drawImage(img, 0, 0);
	// 	var dataURL = canvas.toDataURL("image/png");
	// 	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	// }

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
            // db.executeSql('DROP TABLE IF EXISTS product', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, quantity INTEGER, type TEXT, description TEXT, amount INTEGER)', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS product(rowid INTEGER PRIMARY KEY, pname TEXT, pid INTEGER, psupplier TEXT, pdate TEXT, pquantity INTEGER, pamount INTEGER, pprice INTEGER, unitprice INTEGER, file TEXT)', {})
            .then(res => {
                db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?,?)',[this.product.pdate,this.product.pquantity,'expense',this.product.pname,this.product.pprice])
                db.executeSql('INSERT INTO product VALUES(NULL,?,?,?,?,?,?,?,?,?)',[this.product.pname,this.product.pid,this.product.psupplier,this.product.pdate,this.product.pquantity,this.product.pamount,this.product.pprice,this.product.unitprice,this.pathForImage(this.lastImage)])
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
