import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { Events } from 'ionic-angular';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
/**
 * Generated class for the LivestatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-livestats',
  templateUrl: 'livestats.html',
})
export class LivestatsPage {
  @ViewChild(Slides) slides: Slides;
  disableLogin: any;
  isLogin: any;
  userSubscription: any;
  constructor(public events: Events, public Storage: Storage,public plt:Platform,public ga:FirebaseAnalyticsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.disableLogin = navParams.get('disableLogin');
    this.isLogin = navParams.get('isLogin');

    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('LiveStatus Page');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LivestatsPage');
  }
  gotologin() {
    this.navCtrl.push('LoginPage');
  }
  logout() {
    this.Storage.clear().then(() => {
      this.userSubscription = 0;
      var item = {
        isLogin: 0,
        disableLogin: 0
      }
      this.events.publish('userlogin:changed', item);
      this.events.publish('menuchange:changed', { title: 'News', component: HomePage, icon: 'assets/imgs/menuIcon/newsIcon.png', itemseleted: 'seleted' });
      //  this.navCtrl.setRoot(HomePage);
    });

  }
  slideChanged() {
    this.slides.startAutoplay();
  }
}
