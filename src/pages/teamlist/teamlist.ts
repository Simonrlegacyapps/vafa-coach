import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the TeamlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teamlist',
  templateUrl: 'teamlist.html',
})
export class TeamlistPage {
 items:any=[];
  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams) {
    this.items=navParams.get('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamlistPage');
  }
 itemSelected(item)
  {
    this.viewCtrl.dismiss(item);
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
