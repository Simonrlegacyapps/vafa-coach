import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Content, Keyboard, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Searchbar } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';

/**
 * Generated class for the GoalkickersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goalkickers',
  templateUrl: 'goalkickers.html',
})
export class GoalkickersPage {
  @ViewChild('searchbar') searchbar: Searchbar;
  @ViewChild(Content) content: Content;
  scrollTop: any;
  advDisplay: any = 'show';
  toggled: boolean;
  searchTerm: String = '';
  items: any = [];
  // path: any = 'http://vafalive.com.au';
  path1: any = environment.baseURL;
  // path1: any = 'http://52.89.30.220';
  path: any = environment.amazonaws;
  competition_id: any;
  comptitionlists: any = [];
  selectables: any = [];
  getAllTeams: any = [];
  allTeamData: any = [];
  goalKickers: any = [];
  selectablesTeam: any;
  team_id: any;
  YearList: any = [];
  headerAdv: any = [];
  footerAdv: any = [];
  WeblinkAd: any;
  isLogin: boolean = false;

  weblink: boolean = false;
  safeURL: any;

  options: InAppBrowserOptions = {
    location: "no", //Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    disallowoverscroll: 'no', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'pagesheet',//iOS only
    fullscreen: 'yes',//Windows only
    // hideurlbar: 'yes'
    closebuttoncaption: '< VAFA Live', //iOS only
    hidespinner: 'yes',
    toolbarposition: 'top',
    toolbarcolor: '#04225e',
    closebuttoncolor: '#ffffff',
    toolbartranslucent: 'no'
  };

  optionsAndroid: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    disallowoverscroll: 'no', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'pagesheet',//iOS only
    fullscreen: 'yes',//Windows only
    // hideurlbar: 'yes'
    closebuttoncaption: '< VAFA Live', //iOS only
    hidespinner: 'yes',
    toolbarposition: 'top',
    toolbarcolor: '#04225e',
    closebuttoncolor: '#ffffff',
    toolbartranslucent: 'no'
  };

  selectd_yr: any = '';
  constructor(private zone: NgZone, public plt: Platform,
    public ga: FirebaseAnalyticsProvider, public keyboard: Keyboard,
    private inapp: InAppBrowser, public ajax: AjaxProvider,
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController, public events: Events,
    public cmnfun: CommomfunctionProvider, public navCtrl: NavController,
    public popoverCtrl: PopoverController, public navParams: NavParams,
    public storage: Storage) {
    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('Goal Kickers');
          // this.ga.trackEvent('Advertisement', 'Viewed', 'Goal Kickers Page', 1);
          this.ga.trackTiming('Goal Kickers', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
  }
  toggleSearch() {
    this.searchTerm = '';
    this.toggled = this.toggled ? false : true;
    this.items = this.goalKickers;
    if (this.toggled == true) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 150);
    }
  }
  toggleSearchcancel() {
    this.toggled = this.toggled ? false : true;
    if (this.toggled == true) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 150);
    }
  }

  // path reset function
  cutPath(url) {
    if (url)
      return url.substring(12);
  }

  identify(index, value) {
    return value.player_id;
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  initializeItems() {
    this.items = this.goalKickers;
  }
  submitSearch() {
    this.keyboard.close();
    this.toggled = this.toggled ? false : true;
    this.searchTerm = '';
    // this.items = this.goalKickers;
  }
  triggerInput(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = [];
      this.goalKickers.forEach((item, keys) => {
        if (item.player_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          this.items.push(item);
        }
      })
    }
    else {
      this.items = this.goalKickers;
    }
  }
  getallteamsbycompetitions(res) {
    console.log(res);
    this.getAllTeams = res.teams;
    this.allTeamData = res.teams;
    this.selectablesTeam = this.allTeamData[0].team_name;
    this.team_id = this.allTeamData[0].team_id;


    this.ajax.datalist('get-team-players-goal-kickers-filter', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      team_id: this.team_id,
      compition_id: this.competition_id
    }).subscribe((res) => {
      this.getteamplayersgoalkickersfilter(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })

  };
  getallcompetitions(res) {

    this.comptitionlists = res.competition;
    console.log(res.competition);
    // if(this.isLogin){
    //   this.storage.get('userData').then((val) => {
    //     if (val) {
    //       console.log("From storage:", val);
    //       let user = JSON.parse(val);
    //       let storedId = user.favourite_competition_id;
    //       let CompArr = this.comptitionlists;
    //       let cntr = 0;
    //       CompArr.forEach(element => {
    //         if(storedId == element.competition_id && val.selectedcompetition.seasons[0].manual_score_recording != "2"){
    //           this.selectables = element.competitions_name;
    //           this.competition_id = element.seasons[0].competition_id;
    //           let compId = element.seasons[0].competition_id;
    //           // year listing
    //           this.YearList = element.seasons;
    //           this.selectd_yr = this.YearList[0].competition_year;
    //           this.getGoalKickers(compId);
    //         }else if(storedId == 65 && cntr < 1){
    //           this.selectables = this.comptitionlists[0].competitions_name;
    //           this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
    //           let compId = this.comptitionlists[0].seasons[0].competition_id;
    //           // year listing
    //           this.YearList = this.comptitionlists[0].seasons;
    //           this.selectd_yr = this.YearList[0].competition_year;
    //           //  get matches
    //           this.getGoalKickers(compId);
    //         }else if (val.selectedcompetition.seasons[0].manual_score_recording == "2"  && cntr < 1) {
    //           this.selectables = this.comptitionlists[0].competitions_name;
    //           this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
    //           let compId = this.comptitionlists[0].seasons[0].competition_id;
    //           // year listing
    //           this.YearList = this.comptitionlists[0].seasons;
    //           this.selectd_yr = this.YearList[0].competition_year;
    //           //  get matches
    //           this.getGoalKickers(compId);

    //           if (this.plt.is('ios')) {
    //             let target = "_blank";
    //             this.inapp.create(val.selectedcompetition.seasons[0].weblink_goal_kickers,target,this.options);

    //           }else if (this.plt.is('android')) {
    //             let target = "_blank";
    //             this.inapp.create(val.selectedcompetition.seasons[0].weblink_goal_kickers,target,this.optionsAndroid);
    //           }

    //           // let target = "_blank";
    //           // this.inapp.create(val.selectedcompetition.seasons[0].weblink_goal_kickers,target,this.options);

    //           cntr++;
    //         }
    //       });

    //     } else  {
    //       this.selectables = this.comptitionlists[0].competitions_name;
    //       this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
    //       let compId = this.comptitionlists[0].seasons[0].competition_id;
    //       // year listing
    //       this.YearList = this.comptitionlists[0].seasons;
    //       this.selectd_yr = this.YearList[0].competition_year;
    //       //  get matches
    //       this.getGoalKickers(compId);
    //     }
    //   });
    // }else{
    this.storage.get('UserTeamData').then((val) => {
      if (val) {
        console.log("From storage:", val.selectedcompetition.competition_id);
        let storedId = val.selectedcompetition.competition_id;
        let CompArr = this.comptitionlists;
        let cntr = 0;
        CompArr.forEach(element => {
          if (storedId == element.competition_id && val.selectedcompetition.seasons[0].manual_score_recording != "2") {
            this.selectables = element.competitions_name;
            this.competition_id = element.seasons[0].competition_id;
            let compId = element.seasons[0].competition_id;
            // year listing
            this.YearList = element.seasons;
            this.selectd_yr = this.YearList[0].competition_year;
            this.getGoalKickers(compId);
          } else if (storedId == 65 && cntr < 1) {
            cntr++;
            this.selectables = this.comptitionlists[0].competitions_name;
            this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
            let compId = this.comptitionlists[0].seasons[0].competition_id;
            // year listing
            this.YearList = this.comptitionlists[0].seasons;
            this.selectd_yr = this.YearList[0].competition_year;
            //  get matches
            this.getGoalKickers(compId);
          } else if (val.selectedcompetition.seasons[0].manual_score_recording == "2" && cntr < 1) {
            this.selectables = this.comptitionlists[0].competitions_name;
            this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
            let compId = this.comptitionlists[0].seasons[0].competition_id;
            // year listing
            this.YearList = this.comptitionlists[0].seasons;
            this.selectd_yr = this.YearList[0].competition_year;
            //  get matches
            this.getGoalKickers(compId);

            if (this.plt.is('ios')) {
              let target = "_blank";
              this.inapp.create(val.selectedcompetition.seasons[0].weblink_goal_kickers, target, this.options);

            } else if (this.plt.is('android')) {
              let target = "_blank";
              this.inapp.create(val.selectedcompetition.seasons[0].weblink_goal_kickers, target, this.optionsAndroid);
            }

            // let target = "_blank";
            // this.inapp.create(val.selectedcompetition.seasons[0].weblink_goal_kickers,target,this.options);

            cntr++;
          }
        });
      } else {
        this.selectables = this.comptitionlists[0].competitions_name;
        this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
        let compId = this.comptitionlists[0].seasons[0].competition_id;
        // year listing
        this.YearList = this.comptitionlists[0].seasons;
        this.selectd_yr = this.YearList[0].competition_year;
        //  get matches
        this.getGoalKickers(compId);
      }
    });
    // }

    // console.log(res);
    // this.comptitionlists = res.competition;
    // this.selectables = this.comptitionlists[0].competitions_name;
    // this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
    // this.YearList = this.comptitionlists[0].seasons;
    //  // default year selection
    //  this.selectd_yr = this.comptitionlists[0].seasons[0].competition_year;


  }

  getGoalKickers(comp) {

    this.ajax.datalist('get-all-teams-by-competitions', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      competition_id: comp,
    }).subscribe((res) => {
      this.getallteamsbycompetitions(res);
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })

  }

  getteamplayersgoalkickersfilter(res) {
    console.log(res);
    if (res.message == 'No Data Found') {
      this.cmnfun.hideLoader();
      this.headerAdv = [];
      this.footerAdv = [];
      this.goalKickers = [];
      this.items = this.goalKickers;
      this.cmnfun.showToast('No data');
    } else {
      this.headerAdv = res.headerAdv;
      this.footerAdv = res.footerAdv;
      this.goalKickers = res.playerGoal;
      this.items = this.goalKickers;
      this.cmnfun.hideLoader();
    }
  };
  ionViewDidLoad() {

    this.storage.get('checkLogin').then((val) => {
      if (val) {
        console.log(val);
        this.isLogin = true;
      }
    });

    console.log('ionViewDidLoad GoalkickersPage');
    this.cmnfun.showLoader('Please wait...');
    this.ajax.datalist('get-all-competitions-v2', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
    }).subscribe((res) => {
      this.getallcompetitions(res);
    }, error => {
      this.cmnfun.hideLoader();
      this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })

    // weblink add fetching api
    this.ajax.postMethod('get-weblink-advertisements', { page_title: 'Goal Kickers(Weblink)' }).subscribe((res: any) => {
      this.WeblinkAd = res.footerAdv.ad_image;
    })
  }
  onScroll() {
    //   this.content.ionScrollEnd.subscribe((data)=>{
    this.scrollTop = this.content.scrollTop;
    let storeData = this.scrollTop;
    if (storeData >= 180) {
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
    // this.events.unsubscribe('datalist_get-team-players-goal-kickers-filter:changed');
    // this.events.unsubscribe('datalist_get-all-teams-by-competitions:changed');
    // this.events.unsubscribe('competitionlistgoalkickers:changed');
  }
  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Goal Kickers', 1);
    const browser = this.inapp.create(ad_url);
  }
  goToGoalKickerDetailsPage(player_id, team_id, pName, pNo, teamName, pImage, pGoals) {
    this.navCtrl.push('GoalkickerdetailsPage', { details: { player_id: player_id, team_id: team_id, pName: pName, pNo: pNo, teamName: teamName, pImage: pImage, pGoals: pGoals } });
  }
  selectedType(type) {
    if (type == 'competion') {
      let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
      let me = this;
      modal.onDidDismiss(data => {
        if (data) {
          if (data.seasons[0].manual_score_recording == "2") {
            // this.selectables = data.competitions_name;
            let target = "_blank";
            this.inapp.create(data.seasons[0].weblink_goal_kickers, target, this.options);
            var htmlvalue = '<iframe src=' + data.seasons[0].weblink_goal_kickers + ' seamless   sandbox="allow-popups allow-same-origin allow-forms allow-scripts"></iframe>';
            this.safeURL = this.sanitizer.bypassSecurityTrustHtml(htmlvalue);
            // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.seasons[0].weblink_goal_kickers);
            // this.weblink = true;
          } else {
            this.weblink = false;
            console.log(data);
            this.competition_id = data.seasons[0].competition_id;
            this.YearList = data.seasons;
            // default year selection
            this.selectd_yr = data.seasons[0].competition_year;

            this.selectables = data.competitions_name
            // this.competition_id = data.competition_id;
            this.cmnfun.showLoader('Please wait...');
            this.ajax.datalist('get-all-teams-by-competitions', {
              accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
              competition_id: this.competition_id,
            }).subscribe((res) => {
              this.scrollToTop();
              this.getallteamsbycompetitions(res);
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          }
        }
      });
      modal.present();
    } else if (type == 'year') {
      // year selection dropdown.
      let data = this.YearList;
      let popover = this.popoverCtrl.create("YeardropdownPage", { yearData: data }, { cssClass: 'year-popover' });
      popover.present();

      popover.onDidDismiss(data => {
        if (data != null && data.manual_score_recording != "2") {
          this.selectd_yr = data.competition_year;
          this.competition_id = data.competition_id;
          // get team by year
          this.cmnfun.showLoader('Please wait...');
          this.ajax.datalist('get-all-teams-by-competitions', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            competition_id: this.competition_id,
          }).subscribe((res) => {
            this.scrollToTop();
            this.getallteamsbycompetitions(res);
          }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
          })
        } else if (data != null && data.manual_score_recording == "2") {
          let target = "_blank";
          this.inapp.create(data.weblink_goal_kickers, target, this.options);
        }
      });

    } else {
      let modal = this.modalCtrl.create('TeamlistPage', { items: this.allTeamData });
      let me = this;
      modal.onDidDismiss(data => {
        if (data) {
          console.log(data);
          this.selectablesTeam = data.team_name;
          this.team_id = data.team_id;
          this.cmnfun.showLoader('Please wait...');
          this.ajax.datalist('get-team-players-goal-kickers-filter', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            team_id: this.team_id,
            compition_id: this.competition_id
          }).subscribe((res) => {
            this.scrollToTop()
            this.getteamplayersgoalkickersfilter(res);
          }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
          })
        }
      });
      modal.present();
    }
  }
}
