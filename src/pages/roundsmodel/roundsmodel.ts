import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RoundsmodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roundsmodel',
  templateUrl: 'roundsmodel.html',
})
export class RoundsmodelPage {

  items: any = [];
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.items = navParams.get('items');
    console.log(this.items)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommommodelPage');
  }
  itemSelected(item) {
    if(item=='all'){
      var all={
        round:'0_0',
        name:'All'
      }
       this.viewCtrl.dismiss(all);
    }else{
    this.viewCtrl.dismiss(item);
    }
  
  }

}
