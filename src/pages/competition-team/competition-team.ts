import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { environment } from '../../environments/environment';

/**
 * Generated class for the CompetitionTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-competition-team',
  templateUrl: 'competition-team.html',
})
export class CompetitionTeamPage {
  list:any={};
  type:any;
  // path : any = 'http://vafalive.com.au/';
  // path:any = 'http://v2.vafalive.com.au/';
  path1: any = environment.baseURL;
  path: any = environment.amazonaws;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.list=navParams.get('list');
    this.type=navParams.get('type');
    console.log(this.type);
    console.log(this.list);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetitionTeamPage');
  }
    close()
  {
    var data={
         type:'',
         value:''
    }
     this.viewCtrl.dismiss(data);
  }
  itemSelected(item)
  {
    var data={
         type:this.type,
         value:item
    }
    this.viewCtrl.dismiss(data);
  }

      // path reset function
      cutPath(url){
        if(url)
        return url.substring(12);
      }

}
