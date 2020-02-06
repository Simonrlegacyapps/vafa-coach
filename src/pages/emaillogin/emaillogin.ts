import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { Events } from 'ionic-angular';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
/**
 * Generated class for the EmailloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emaillogin',
  templateUrl: 'emaillogin.html',
})
export class EmailloginPage {
  user: any = { email: '' }
  userdetails: any = [];
  local: any = [];
  ApiResponse: any = [];
  emailValid: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  PaymentProcess: any;
  constructor(public ajax: AjaxProvider, public localData: LocalDataProvider, public events: Events,
    public alertCtrl: AlertController, public cmnfun: CommomfunctionProvider, public plt: Platform, public ga: FirebaseAnalyticsProvider, public navCtrl: NavController, public navParams: NavParams, public Storage: Storage) {

    this.local = this.localData.getlocalprofile();
    if (this.local) {
      this.user.email = this.local.user_email;
    }

    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('Login');
          this.ga.trackTiming('Login', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailloginPage');
  }
  registerdEmailCheck() {

    if (this.user.email == '' || !this.emailValid.test(this.user.email)) {
      this.cmnfun.showToast('Please enter valid email!');
    } else {
      this.cmnfun.showLoading('loading.')
      this.ajax.post('custom/check-email-webuser', {
        email: this.user.email,
      }).subscribe((res) => {
        console.log(res);
        this.cmnfun.HideLoading();
        this.userdetails = res;
        if (this.userdetails.code == 2) {
          this.localData.LocalUserData('user_email', this.user.email);
          this.navCtrl.push('SignUpPage');
        } else if (this.userdetails.code == 1) {
          this.Storage.set('userEmail', this.userdetails.webuser.user_email);
          this.navCtrl.push('RegisteredpassPage');
        }
      }, error => {
        this.cmnfun.showToast('Some thing Unexpected happen please try again');
      });

    }
  }

}
