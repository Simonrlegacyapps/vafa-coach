import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams,Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
/**
 * Generated class for the NewsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {
  @ViewChild(Slides) slides: Slides;
  newsdetails: any = {};
  path1: any = environment.amazonaws;
  // path: any = 'http://vafalive.com.au';
  path: any = environment.baseURL;
  constructor(public navCtrl: NavController, private youtube: YoutubeVideoPlayer,public plt:Platform,public ga:FirebaseAnalyticsProvider, public navParams: NavParams, private socialSharing: SocialSharing, public cmnfun: CommomfunctionProvider) {
    this.newsdetails = navParams.get('newdetails');
    console.log(this.newsdetails);

 this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('News - Individual');
        this.ga.trackTiming('News - Individual', 1000, 'Duration', 'Time');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailsPage');
  }
  fbShare(img, title, createdAt) {
    var text = title + "  " + createdAt;
    this.socialSharing.shareViaFacebook(text, img, '').then(() => {
      // Sharing via email is possible
    }).catch(() => {
      this.cmnfun.showToast('Sharing via FB is not possible');
    });
  }

  twitterShare(img, title, createdAt) {
    var text = title + "  " + createdAt;
    this.socialSharing.shareViaTwitter(text, img, '').then(() => {
      // Sharing via email is possible
    }).catch(() => {
      this.cmnfun.showToast('Sharing via twitter is not possible');
    });
  }

  gmailShare(img, title, createdAt) {
    var text = title + "  " + createdAt;
    this.socialSharing.shareViaEmail(text, 'YJFL Live Match', [], img).then(() => {
      // Sharing via email is possible
    }).catch(() => {
      this.cmnfun.showToast('Sharing via email is not possible');
    });
  }
  youtubepage(item) {
    var filename = item.video.substring(item.video.lastIndexOf('/') + 1);
    this.youtube.openVideo(filename);

  }


  cutPath(url){
    if(url)
    return url.substring(12);
  }

}
