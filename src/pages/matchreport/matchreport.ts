import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, Slides, ModalController, NavParams, Content, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';

/**
 * Generated class for the MatchreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matchreport',
  templateUrl: 'matchreport.html',
})
export class MatchreportPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  scrollTop: any;
  advDisplay: any = 'show';
  comptitionlists: any = [];
  competition_id: any;
  selectables: any = [];
  MatchreportData: any = []; report: any = [];
  headerAdv: any;
  footerAdv: any;
  headerimage: any = '';
  headerurl: any;
  isLogin: boolean = false;
  //  path:any='http://vafalive.com.au';
  //  path: any = 'http://54.244.98.247';
  path: any = environment.amazonaws;
  constructor(private zone: NgZone, private inapp: InAppBrowser, public plt: Platform, public ga: FirebaseAnalyticsProvider, public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, private modalCtrl: ModalController, public events: Events, public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage) {
    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('Match Report');
          // this.ga.trackEvent('Advertisement', 'Viewed', 'Match Report Page', 1);
          this.ga.trackTiming('Match Report', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
  ionViewDidEnter() {
    if (this.MatchreportData.length != 0) {
      this.slides.startAutoplay();
    }
  }
  onScroll() {
    //   this.content.ionScrollEnd.subscribe((data)=>{
    this.scrollTop = this.content.scrollTop;
    let storeData = this.scrollTop;
    if (storeData >= 250) {
      console.log("80");
      this.zone.run(() => {
        this.advDisplay = 'hide';
      });
    }
    else {
      this.zone.run(() => {
        this.advDisplay = 'show';
      });

    }
  }
  ionViewWillLeave() {
    this.events.unsubscribe('competitionlistmatchreport:changed');
    this.slides.stopAutoplay();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostmatchPage');
    this.cmnfun.showLoader('Please wait...');
    this.ajax.getcompetionlist('get-all-competitions-matchreportwise', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
    }, 'matchreport')
  }
  slideChanged() {
    this.slides.startAutoplay();
  }



  // path reset function
  cutPath(url) {
    if (url)
      return url.substring(12);
  }


  ionViewWillEnter() {

    this.storage.get('FullData').then((val) => {
      if (val) {
        console.log(val);
        this.isLogin = true;
      }
    });

    console.log("res");
    this.events.subscribe('competitionlistmatchreport:changed', res => {
      if (res !== undefined && res !== "") {
        this.comptitionlists = res.competition;
        if (this.comptitionlists.length != 0) {
          // if (this.isLogin) {
          //   this.storage.get('FullData').then((val) => {
          //     if (val) {
          //       let cntr = 0;
          //       let user = val.webuser;
          //       let storedId = user.favourite_competition_id;
          //       if(storedId){
          //         let compName = val.webusercompetition.competitions_name;
          //         this.comptitionlists.forEach(element => {
          //           if (compName == element.competitions_name && val.selectedcompetition.seasons[0].manual_score_recording != "2") {
          //             this.selectables = element.competitions_name;
          //             this.competition_id = element.competition_id;
          //             this.getMatchReport(this.competition_id);
          //           }else if (val.selectedcompetition.seasons[0].manual_score_recording == "2"  && cntr < 1) {
          //             this.selectables = this.comptitionlists[0].competitions_name;
          //       this.competition_id = this.comptitionlists[0].competition_id;
          //       this.getMatchReport(this.competition_id);
          //           }
          //         });
          //       }else{
          //       this.selectables = this.comptitionlists[0].competitions_name;
          //       this.competition_id = this.comptitionlists[0].competition_id;
          //       this.getMatchReport(this.competition_id);
          //       }
          //     } else {
          //       this.selectables = this.comptitionlists[0].competitions_name;
          //       this.competition_id = this.comptitionlists[0].competition_id;
          //       this.getMatchReport(this.competition_id);
          //     }
          //   });
          // } else {
            //
            this.storage.get('UserTeamData').then((val) => {
              if (val) {
                let cntr = 0;
                console.log("From storage:", val.selectedcompetition);
                let storedId = val.selectedcompetition.competitions_name;
                this.comptitionlists.forEach(element => {
                  console.log(element.competition_id);
                  if (storedId == element.competitions_name && val.selectedcompetition.seasons[0].manual_score_recording != "2") {
                    this.selectables = element.competitions_name;
                    this.competition_id = element.competition_id;
                    this.getMatchReport(element.competition_id);
                  }else if (val.selectedcompetition.seasons[0].manual_score_recording == "2"  && cntr < 1) {
                    this.selectables = this.comptitionlists[0].competitions_name;
              this.competition_id = this.comptitionlists[0].competition_id;
              this.getMatchReport(this.competition_id);
                  }
                });
              } else {
                this.selectables = this.comptitionlists[0].competitions_name;
                this.competition_id = this.comptitionlists[0].competition_id;
                this.getMatchReport(this.competition_id);
              }
            });
            //
          // }



        }

        // this.cmnfun.showLoading('Please wait...');
      }
    })
  }

  // Match Report get function
  getMatchReport(comp) {
    console.log(comp+':'+'comp')
    this.ajax.postMethod('get-compition-fixture-match-report', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      competition_id: comp
    }).subscribe((res) => {
      this.cmnfun.hideLoader();
      this.MatchreportData = res;
      console.log(this.MatchreportData);
      if (this.MatchreportData.code == 2) {
        this.cmnfun.showLoader('Match Report Not Found!');
      } else {

        // 	angular.forEach( this.postMatchData.potmatch,function(v,k){
        // 	var cDate = v.pm_date;
        // 	$scope.pmdate = cDate.split(" ");
        // 	$scope.pmTime = $scope.pmdate[1].split(":");
        //  });
        if (this.MatchreportData.match_report) {
          this.headerAdv = this.MatchreportData.headerAdv;
          this.footerAdv = this.MatchreportData.footerAdv;
          this.headerimage = this.MatchreportData.headerAdv[0].ad_image;
          this.headerurl = this.MatchreportData.headerAdv[0].ad_url;
        }
        //  $timeout(function(){
        // 	 $ionicSlideBoxDelegate.update();
        //  }, 100);
      }
    }, error => {
      this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }
  //



  goToMatchReportDetail(reportId) {
    this.navCtrl.push('MatchreportdetailsPage', { repordid: reportId });
  }
  gotomodel() {
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
    let me = this;
    modal.onDidDismiss(data => {
      if (data) {
        this.MatchreportData = [];
        this.cmnfun.showLoader('Please wait...');
        this.slides.update();
        this.selectables = data.competitions_name
        this.competition_id = data.competition_id
        this.ajax.postMethod('get-compition-fixture-match-report', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.competition_id
        }).subscribe((res) => {

          this.cmnfun.hideLoader();
          this.MatchreportData = res;
          console.log(this.MatchreportData);
          this.scrollToTop();
          if (this.MatchreportData.code == 2) {
            this.cmnfun.showLoader('Match Report Not Found!');
          } else {
            this.headerAdv = this.MatchreportData.headerAdv;
            this.footerAdv = this.MatchreportData.footerAdv;
            this.headerimage = this.MatchreportData.headerAdv[0].ad_image;
            this.headerurl = this.MatchreportData.headerAdv[0].ad_url;
          }
        }, error => {
          this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
      }
    });
    modal.present();
  }
  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Match Report', 1);
    const browser = this.inapp.create(ad_url);
  }


}
