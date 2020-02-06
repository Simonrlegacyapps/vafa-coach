import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the CommommodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commommodel',
  templateUrl: 'commommodel.html',
})
export class CommommodelPage {
  items: any = [];
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.items = navParams.get('items');
    // this.url=this.sanitizer.bypassSecurityTrustResourceUrl(url_test);

    // console.log(this.url.changingThisBreaksApplicationSecurity);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommommodelPage');
  }
  itemSelected(item) {
    this.viewCtrl.dismiss(item);
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
