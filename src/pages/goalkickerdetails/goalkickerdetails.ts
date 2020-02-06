import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
/**
 * Generated class for the GoalkickerdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goalkickerdetails',
  templateUrl: 'goalkickerdetails.html',
})
export class GoalkickerdetailsPage {
  // path: any = 'http://vafalive.com.au';
  path1: any = environment.baseURL;
  path: any = environment.amazonaws;
  goaldeatls: any = [];
  showhide: any;
  details: any = {}; pImage: any; pGoals: any; footerAdv: any = []; headerAdv: any = []; teamGoal: any; goalKickersimage: any; playerTotalGoal: any;
  player_id: any = ''; team_id: any; pName: any; pNo: any; teamName: any; goalKickersNumber: any; goalKickersName: any; firstName: any; lastName: any; goalKickersTeamName: any;
  constructor(private inapp: InAppBrowser, public ajax: AjaxProvider, public plt: Platform, public ga: FirebaseAnalyticsProvider, public events: Events, public cmnfun: CommomfunctionProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.details = navParams.get('details');
    this.player_id = this.details.player_id;
    this.team_id = this.details.team_id;
    this.pName = this.details.pName;
    this.pNo = this.details.pNo;
    this.teamName = this.details.teamName;
    this.pImage = this.details.pImage
    this.pGoals = this.details.pGoals;


    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('Goal Kickers - Individual');
          // this.ga.trackEvent('Advertisement', 'Viewed', 'Goal Kickers - Individual Page', 1);
          this.ga.trackTiming('Goal Kickers - Individual', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })


  }


  // path reset function
  cutPath(url) {
    if (url)
      return url.substring(12);
  }

  ionViewDidLoad() {
    this.showhide = 0;
    if (this.goaldeatls.length == 0) {
      console.log('ionViewDidLoad GoalkickerdetailsPage');

      this.ajax.datalist('get-team-players-goal-kickers-details', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        player_id: this.player_id,
        team_id: this.team_id
      }).subscribe((res) => {
        this.getteamplayersgoalkickersdetails(res);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
    }


  }
  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Goal Kickers - Individual', 1);
    const browser = this.inapp.create(ad_url);
  }
  getteamplayersgoalkickersdetails(res) {
    console.log(res);
    this.goaldeatls = res;
    this.goalKickersName = res.teamPlayerData.player_name;
    let goalKickername = this.goalKickersName.split(' ');
    this.firstName = goalKickername[0];
    this.lastName = goalKickername[1];

    this.goalKickersTeamName = res.teamPlayerData.team_team;
    this.goalKickersNumber = res.teamPlayerData.player_number;
    this.goalKickersimage = res.teamPlayerData.player_image;
    this.playerTotalGoal = res.playerTotalGoal;
    this.teamGoal = res.teamGoal;
    //ADVERTISEMENT:
    this.headerAdv = res.headerAdv;
    console.log(this.headerAdv[0].ad_image);

    this.footerAdv = res.footerAdv;
    console.log(this.footerAdv[0].ad_image);

  }
  ionViewWillLeave() {
    // this.events.unsubscribe('datalist_get-team-players-goal-kickers-details:changed');
    this.showhide = 1;
  }


}
