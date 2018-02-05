import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ExpenseManagerListPage } from '../expensemanagerlist/expensemanagerlist';

class addRowInfo {
    constructor() { }
}

class minusRowInfo {
    constructor() { }
}

@Component({
  selector: 'page-home',
  templateUrl: 'expensemanager.html'
})

export class ExpenseManagerPage {
    emForm : FormGroup;
    addrow = [];
    minusrow = [];
    emDataVm = this;
    expense = {date: "", quantity:"", type:"", description:"", amount:"", myForm: true};
  	constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private sqlite: SQLite, private toast: Toast) {
        this.expense.myForm = true;
        // this.emForm = fb.group({
        //     account : ['', Validators.compose([Validators.maxLength(30), Validators.required])]
        // });
        // this.values = 0;
    }
    
    keyUp(event) {
        if (this.expense.date != "" && this.expense.quantity != "" && this.expense.type != "" && this.expense.description != "" && this.expense.amount != "") {
            this.expense.myForm = false;
        } else {
            this.expense.myForm = true;
        }
    }

    submitForm(value: any):void {
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            // db.executeSql('DROP TABLE IF EXISTS expense', {})
            db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, quantity INTEGER, type TEXT, description TEXT, amount INTEGER)', {})
            .then(res => {
                console.log(res);
                db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?,?)',[this.expense.date,this.expense.quantity,this.expense.type,this.expense.description,this.expense.amount])
                .then(res => {
                    console.log(res);
                    this.navCtrl.setRoot(ExpenseManagerListPage);
                  // this.getData();
                })
                .catch(e => console.log(e));

            })
            .catch(e => console.log(e));
            
        }).catch(e => console.log(e));
    }

    addAmountButton() {
        this.addrow.push(new addRowInfo());
    }

    minusAmountButton() {
        this.minusrow.push(new minusRowInfo());
    }

    clickLink(type) {
        this.navCtrl.setRoot(ExpenseManagerListPage);
    }

    // submitForm(value: any):void{
        // console.log(value)
    //     if (this.expenseManagerForms.controls.account.value) {
    //         // this.navCtrl.push(HomePage);
    //     s}
    // }   

}
