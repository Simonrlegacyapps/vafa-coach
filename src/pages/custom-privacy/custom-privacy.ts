import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
/**
 * Generated class for the CustomPrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 const PPLink = 'https://www.completesportsmanagement.com.au/privacy';

@IonicPage()
@Component({
  selector: 'page-custom-privacy',
  templateUrl: 'custom-privacy.html',
})
export class CustomPrivacyPage {

	

  constructor(public navCtrl: NavController,private sanitize: DomSanitizer, public navParams: NavParams,public plt:Platform,public ga:FirebaseAnalyticsProvider) {
  	 this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Privacy Policy');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidLoad() {
    this.ga.trackView('Privacy Policy Page');
    console.log('ionViewDidLoad CustomPrivacyPage');
  }

}
