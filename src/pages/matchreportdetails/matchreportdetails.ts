import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
/**
 * Generated class for the MatchreportdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matchreportdetails',
  templateUrl: 'matchreportdetails.html',
})
export class MatchreportdetailsPage {
  reportid: any;
  reportdetails: any = [];
  matchreportdetails: any = [];
  createddate: any = {};
  fixtureReport: any = [];
  matchReportFixtureScore: any = [];
  // path: any = 'http://vafalive.com.au';
  path1: any = environment.amazonaws;
  path: any = environment.baseURL;
  fixture_user: any;
  fixture_planned_time: any;
  fixture_ground: any;
  matchReportGoalKicker: any = [];
  quater1Score: any;
  advertisementFooter: any;
  quater2Score: any;
  home_team_goal2: any;
  home_team_goal_rbb_total2: any;
  home_team_total_score2: any;
  away_team_goal2: any;
  away_team_goal_rbb_total2: any;
  away_team_total_score2: any;
  quater3Score: any;
  home_team_goal3: any;
  home_team_goal_rbb_total3: any;
  home_team_total_score3: any;
  away_team_goal3: any;
  away_team_goal_rbb_total3: any;
  away_team_total_score3: any;
  home_team: any;
  away_team: any;
  constructor(public ajax: AjaxProvider, private socialSharing: SocialSharing,public plt:Platform,public ga:FirebaseAnalyticsProvider,public cmnfun: CommomfunctionProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.reportid = navParams.get('repordid');
    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Match Report - Individual');
        this.ga.trackTiming('Match Report - Individual', 1000, 'Duration', 'Time');
        // this.ga.trackEvent('Advertisement', 'Viewed', 'MatchReportDetails Page', 1);
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidEnter() {
    // alert("hai");
    this.cmnfun.showLoading('Please wait...');
    this.ajax.postMethod('get-fixture-match-report-details', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      report_id: this.reportid
    }).subscribe((res) => {
      this.reportdetails = res;

      console.log(this.reportdetails);
      this.matchreportdetails = this.reportdetails.match_report_details[0];
      console.log(this.matchreportdetails);
      var created = this.matchreportdetails.created_at.split("-");
      this.createddate = created[1];
      this.fixture_user = this.reportdetails.fixture.user_name;
      this.fixture_ground = this.reportdetails.fixture.ground;
      this.fixture_planned_time = this.reportdetails.fixture.planned_time;
      this.fixtureReport = this.reportdetails.fixture_report;
      this.matchReportFixtureScore = this.reportdetails.match_report_fixture_score;
      this.matchReportGoalKicker = this.reportdetails.score;
      this.away_team = this.matchReportFixtureScore.fixtureFinalScore.away_team;
      this.home_team = this.matchReportFixtureScore.fixtureFinalScore.home_team;
      this.quater1Score = this.matchReportFixtureScore.fixtureQ1Score;
      console.log("matchReportGoalKicker" + JSON.stringify(this.quater1Score.home_team_goal_rbb_total));

      this.advertisementFooter = this.reportdetails.footerAdv;

      this.quater2Score = this.matchReportFixtureScore.fixtureQ2Score;

      this.home_team_goal2 = parseInt(this.quater1Score.home_team_goal) + parseInt(this.quater2Score.home_team_goal);
      console.log("2-----" + this.home_team_goal2);

      this.home_team_goal_rbb_total2 = parseInt(this.quater1Score.home_team_goal_rbb_total) + parseInt(this.quater2Score.home_team_goal_rbb_total);
      console.log("2---" + this.home_team_goal_rbb_total2);

      this.home_team_total_score2 = parseInt(this.quater1Score.home_team_total_score) + parseInt(this.quater2Score.home_team_total_score);
      console.log("2---" + this.home_team_total_score2);

      this.away_team_goal2 = parseInt(this.quater1Score.away_team_goal) + parseInt(this.quater2Score.away_team_goal);
      console.log("2---" + this.away_team_goal2);

      this.away_team_goal_rbb_total2 = parseInt(this.quater1Score.away_team_goal_rbb_total) + parseInt(this.quater2Score.away_team_goal_rbb_total);
      console.log("2---" + this.away_team_goal_rbb_total2);

      this.away_team_total_score2 = parseInt(this.quater1Score.away_team_total_score) + parseInt(this.quater2Score.away_team_total_score);
      console.log("2---" + this.away_team_total_score2);



      this.quater3Score = this.matchReportFixtureScore.fixtureQ3Score;


      this.home_team_goal3 = this.home_team_goal2 + parseInt(this.quater3Score.home_team_goal);
      console.log("3----" + this.home_team_goal3);

      this.home_team_goal_rbb_total3 = parseInt(this.home_team_goal_rbb_total2) + parseInt(this.quater3Score.home_team_goal_rbb_total);
      console.log("3----" + this.home_team_goal_rbb_total3);

      this.home_team_total_score3 = parseInt(this.home_team_total_score2) + parseInt(this.quater3Score.home_team_total_score);
      console.log("3----" + this.home_team_total_score3);

      this.away_team_goal3 = parseInt(this.away_team_goal2) + parseInt(this.quater3Score.away_team_goal);
      console.log("3----" + this.away_team_goal3);

      this.away_team_goal_rbb_total3 = parseInt(this.away_team_goal_rbb_total2) + parseInt(this.quater3Score.away_team_goal_rbb_total);
      console.log("3----" + this.away_team_goal_rbb_total3);

      this.away_team_total_score3 = parseInt(this.away_team_total_score2) + parseInt(this.quater3Score.away_team_total_score);
      console.log("3----" + this.away_team_total_score3);
      this.cmnfun.HideLoading();
    }, error => {
      this.cmnfun.showToast('Some thing Unexpected happen please try again');
      this.cmnfun.HideLoading();
    })
    // this.cmnfun.showLoading('Please wait...');
  }
  fbShare(img, title, createdAt, pm_vdo) {
    var text = title + "  " + createdAt;
    this.socialSharing.shareViaFacebook(text, img, pm_vdo).then(() => {
      // Sharing via email is possible
    }).catch(() => {
      this.cmnfun.showToast('Sharing via FB is not possible');
    });
  }

  twitterShare(img, title, createdAt, pm_vdo) {
    var text = title + "  " + createdAt;
    this.socialSharing.shareViaTwitter(text, img, pm_vdo).then(() => {
      // Sharing via email is possible
    }).catch(() => {
      this.cmnfun.showToast('Sharing via twitter is not possible');
    });
  }

  gmailShare(img, title, createdAt, pm_vdo) {
    var text = title + "  " + createdAt;
    this.socialSharing.shareViaEmail(text, 'VAFA Live Match', [], img).then(() => {
      // Sharing via email is possible
    }).catch(() => {
      this.cmnfun.showToast('Sharing via email is not possible');
    });
  }


     // path reset function
     cutPath(url){
      if(url)
      return url.substring(12);
    }
}
