import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
/**
 * Generated class for the CustomBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TermsLink = 'http://vafalive.com.au/termsconds';

@IonicPage()
@Component({
  selector: 'page-custom-browser',
  templateUrl: 'custom-browser.html',
})
export class CustomBrowserPage {



  constructor(public navCtrl: NavController, private sanitize: DomSanitizer, public navParams: NavParams, public plt: Platform, public ga: FirebaseAnalyticsProvider) {
    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('Terms and Conditions');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomBrowserPage');
  }

}
