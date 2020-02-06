import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { NewaccountPage } from '../newaccount/newaccount';
import { HomePage } from '../../pages/home/home';
import { InnermatchcenterPage } from './../innermatchcenter/innermatchcenter';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user: any = {
    firstname: '',
    lastname: '',
    age: '',
    mobile_number: '',
    email: '',
    password: '',
    cpassword: '',
  }
  email: '';
  fulluserdetails: any = [];
  showPassword: boolean = false;
  local: any = [];
  deviceId: any = '';
  showPassword1: boolean = false;
  subscriptionCheck: any; userSubscription: any; isLogin: any; disableLogin: any;
  valid: any = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/;
  emailValid: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  constructor(public events: Events, public localData: LocalDataProvider,
    public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, public plt: Platform, public ga: FirebaseAnalyticsProvider, public navCtrl: NavController, public navParams: NavParams, public Storage: Storage) {
    Storage.get('userEmail').then((val) => {
      if (val) {
        this.email = val;
        // this.user.email=val;
      }
    })
    this.deviceId = this.localData.GetDevice();
    this.local = this.localData.getlocalprofile();
    console.log(this.local)
    // alert(this.deviceId);
    if (this.local) {
      this.user = {
        firstname: this.local.first_name,
        lastname: this.local.last_name,
        age: this.local.user_age,
        mobile_number: this.local.mobile_number,
        email: this.local.user_email,
        password: '',
        cpassword: '',
      }
    }

    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('Signup');
          this.ga.trackTiming('Signup', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
  }

  async ionViewDidLoad() {
    console.log(await this.Storage.get('userEmail'));
    console.log('ionViewDidLoad SignUpPage');
  }
  toggleShowPassword() {

    this.showPassword = !this.showPassword;
  }

  toggleShowPassword1() {

    this.showPassword1 = !this.showPassword1;
  }

  ViewNumber(val) {
    if (val.length == 5) {
      this.user.mobile_number = val.replace(/(.{4})/, '$1 ').trim();
    }
    if (val.length == 9) {

      this.user.mobile_number = val.replace(/(.{8})/, '$1 ').trim();
    }
  }

  signUp() {

    if (this.user.email == '' || !this.emailValid.test(this.user.email)) {
      this.cmnfun.showToast('Please enter valid email');
    } else if (this.user.firstname == '') {
      this.cmnfun.showToast('Please enter first name');
    } else if (this.user.lastname == '') {
      this.cmnfun.showToast('Please enter last name');
    } else if (this.user.age == '') {
      this.cmnfun.showToast('Please enter age');
    } else if (this.user.password == '') {
      this.cmnfun.showToast('Please enter password');
    } else if (this.user.cpassword == '') {
      this.cmnfun.showToast('Please enter confirm password');
    } else if (this.user.password != this.user.cpassword) {
      this.cmnfun.showToast('Password does not match');
    } else {
      console.log(this.user)
      this.cmnfun.showLoading('Please wait...');
      this.ajax.post('custom/email-webuser', {
        // username: this.user.name,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        age: this.user.age,
        device_id: this.deviceId,
        mobile_number: this.user.mobile_number,
        email: this.user.email,
        password: this.user.password
      }).subscribe((res) => {
        this.cmnfun.HideLoading();
        console.log(res);
        this.fulluserdetails = res;
        this.Storage.set("userData", JSON.stringify(this.fulluserdetails.webuser));
        this.Storage.set('checkLogin', this.fulluserdetails.webuser);
        this.Storage.set('FullData', this.fulluserdetails);
        this.localData.StoreData(this.fulluserdetails.webuser);
        this.events.publish('userlogin', 'true1');
        if(this.localData.LoginTo()=='LandingpagePage'){
          this.navCtrl.push(this.localData.LoginTo());
        }else if(this.localData.LoginTo()=='InnermatchcenterPage')
        {
          if(this.localData.getBckpage() != '' && this.localData.getBckpage() != undefined){
            let det = this.localData.getBckdata().details;
            let yr = this.localData.getBckdata().year;
            let pr = this.localData.getBckdata().parent;
            this.localData.SetBack('','','','');
            this.navCtrl.push('InnermatchcenterPage', { details: det, year :yr ,stats : true});
        }
      }else{
        this.events.publish('gotostats:changed', true);
        this.navCtrl.setRoot(NewaccountPage);
      }

      }, error => {
        this.cmnfun.HideLoading();
        this.cmnfun.showToast('Some thing Unexpected happen please try again');
      });
    }

  }
}
