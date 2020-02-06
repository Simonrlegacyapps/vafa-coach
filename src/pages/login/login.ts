import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LocalDataProvider } from '../../providers/local-data/local-data';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LoginUser: boolean =false;
  iap:any='';
  isLoggedIn: boolean = false;
  users: any; userImageUrl: any; userToken: any; userName: any; userEmail: any;
  fulluserdetails: any = [];
  subscriptionCheck: any;
  constructor(public events: Events,public localdata: LocalDataProvider, public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, public Storage: Storage, private fb: Facebook, public navCtrl: NavController, public navParams: NavParams) {
    this.iap=this.navParams.get('iap');
    console.log(this.iap);
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  landing(){

    if(this.iap=='true'){
      this.navCtrl.push('LandingpagePage');
    }else{
      if(this.localdata.getBckpage() != '' &&  this.localdata.getBckpage() != undefined){
        let det = this.localdata.getBckdata().details;
        let yr = this.localdata.getBckdata().year;
        let pr = this.localdata.getBckdata().parent;
        this.localdata.SetBack('','','','');
        this.navCtrl.push('InnermatchcenterPage', { details: det, year :yr ,stats : true});
      }else{
        this.navCtrl.setRoot(HomePage);
      }
    }
    // else if(this.iap == 'true2'){
    //   if(this.localdata.getBckpage() != ''){
    //     let det = this.localdata.getBckdata().details;
    //     let yr = this.localdata.getBckdata().year;
    //     let pr = this.localdata.getBckdata().parent;
    //     this.localdata.SetBack('','','','');
    //     this.navCtrl.push('InnermatchcenterPage', { details: det, year :yr ,"parentPage":pr, gamepass: true});
    //   }
    // }

   }
  Login(){
    this.LoginUser=true;
  }
  temp(){
    this.cmnfun.showToast('Facebook coming soon');
  }
  CreateAccount(){
    this.navCtrl.push('EmailloginPage');
  }
  emailLogin() {
    this.navCtrl.push('EmailloginPage');
  }
  getUserDetail(userid) {
    this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
      .then(res => {
        console.log(res);

        this.users = res;
        var imageURL = "http://graph.facebook.com/" + userid + "/picture?type=large";
        this.userImageUrl = imageURL;
        this.userToken = userid;
        this.userName = res.name;;
        this.userEmail = res.email;
        this.userData();
      })
      .catch(e => {
        console.log(e);
      });
  }
  fblogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }
  userData() {
    this.cmnfun.showLoading('Please wait...');
    this.ajax.post('custom/facebook-webuser', {
      username: this.userName,
      email: this.userEmail,
      user_image: this.userImageUrl,
      device_id: this.userToken
    }).subscribe((res) => {
      this.cmnfun.HideLoading();
      console.log(res);
      this.fulluserdetails = res;
      //  window.localStorage.setItem("subscription",1);
      // $scope.subscriptionreamin= window.localStorage.getItem("subscriptionRemain");
      this.Storage.set("subscriptionRemain", this.fulluserdetails.subscription_remain);
      this.Storage.set("userData", JSON.stringify(this.fulluserdetails.webuser));
      this.Storage.set('checkLogin', this.fulluserdetails.webuser);
      this.Storage.set('subscription', 1);
      this.subscriptionCheck = 1;  // change made on 21 June 17 instead of data.subscription in if also
      if (this.subscriptionCheck == 1) {
        var item = {
          isLogin: 1,
          disableLogin: 1
        }
        this.events.publish('userlogin:changed', item);
        // this.navCtrl.setRoot('LivestatsPage', { disableLogin: 1, isLogin: 1 });
      } else {
        var item1 = {
          isLogin: 0,
          disableLogin: 0
        }
        this.events.publish('userlogin:changed', item1);

      }

    }, error => {
      this.cmnfun.HideLoading();
      this.cmnfun.showToast('Some thing Unexpected happen please try again');
    });

  }

}
