import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-yeardropdown',
  template : `
  <ion-list no-lines class='jd-custom-drop'>
    <button detail-none *ngFor="let year of YearList" ion-item text-center (click)="dismiss(year)">{{year.competition_year}}</button>
  </ion-list>
`
})

export class YeardropdownPage {

  YearList: any;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
     public navParams: NavParams) {
     // yearlist data
     this.YearList = this.navParams.get('yearData');
     console.log(this.YearList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YeardropdownPage');
  }

  dismiss(val){
    this.viewCtrl.dismiss(val);
  }

}
