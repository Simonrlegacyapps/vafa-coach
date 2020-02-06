import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import 'datatables.net-fixedheader';
import { PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';

/**
 * Generated class for the LadderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ladder',
  templateUrl: 'ladder.html',
})
export class LadderPage {
  isLogin: boolean = false;
  comptitionlists: any = [];
  competition_id: any;
  selectables: any = [];
  WeblinkAd: any;
  arraySize: any;
  advertisementHeader: any;
  advertisementFooter: any;
  headerimage: any = '';
  headerurl: any;
  ladderDataa: any = [];
  selectd_yr: any;
  YearList: any;
  weblink: boolean = false;
  safeURL: any;
  // path: any = 'http://vafalive.com.au';
  path1: any = environment.baseURL;
  path: any = environment.amazonaws;

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



  constructor(private sanitizer: DomSanitizer, private inapp: InAppBrowser, public popoverCtrl: PopoverController, public storage: Storage,
    public plt: Platform, public ga: FirebaseAnalyticsProvider, public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, private modalCtrl: ModalController, public events: Events, public navCtrl: NavController, public navParams: NavParams) {

    // $.plot($("#placeholder"), [ [[0, 0], [1, 1]] ], { yaxis: { max: 1 } });
    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('Ladder');
          this.ga.trackTiming('Ladder', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
  }

  ionViewDidLeave() {
    let table: any = $('#LadderTable').dataTable();
    table.fnDestroy();
  }


  // path reset function
  cutPath(url) {
    if (url)
      return url.substring(12);
  }

  ionViewDidLoad() {

    this.storage.get('checkLogin').then((val) => {
      if (val) {
        console.log(val);
        this.isLogin = true;
      }
    });

    this.cmnfun.showLoader('Please wait...');
    console.log('ionViewDidLoad LadderPage');
    this.ajax.getcompetionlist('get-all-competitions-v2', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
    }, 'ladder')
    this.events.subscribe('competitionlistladder:changed', res => {
      console.log(res);

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
      //           this.getLadderMatches(compId);
      //         }else if(storedId == 65 && cntr < 1){
      //           cntr++;
      //           this.selectables = this.comptitionlists[0].competitions_name;
      //           this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
      //           let compId = this.comptitionlists[0].seasons[0].competition_id;
      //           // year listing
      //           this.YearList = this.comptitionlists[0].seasons;
      //           this.selectd_yr = this.YearList[0].competition_year;
      //           //  get matches
      //           this.getLadderMatches(compId);
      //         }else if (val.selectedcompetition.seasons[0].manual_score_recording == "2"  && cntr < 1) {
      //           this.selectables = this.comptitionlists[0].competitions_name;
      //           this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
      //           let compId = this.comptitionlists[0].seasons[0].competition_id;
      //           // year listing
      //           this.YearList = this.comptitionlists[0].seasons;
      //           this.selectd_yr = this.YearList[0].competition_year;
      //           //  get matches
      //           this.getLadderMatches(compId);

      //           if (this.plt.is('ios')) {
      //             let target = "_blank";
      //             this.inapp.create(val.selectedcompetition.seasons[0].weblink_ladder,target,this.options);

      //           }else if (this.plt.is('android')) {
      //             let target = "_blank";
      //             this.inapp.create(val.selectedcompetition.seasons[0].weblink_ladder,target,this.optionsAndroid);
      //           }

      //           // let target = "_blank";
      //           // this.inapp.create(val.selectedcompetition.seasons[0].weblink_ladder,target,this.options);

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
      //       this.getLadderMatches(compId);
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
              this.getLadderMatches(compId);
            } else if (storedId == 65 && cntr < 1) {
              cntr++;
              this.selectables = this.comptitionlists[0].competitions_name;
              this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
              let compId = this.comptitionlists[0].seasons[0].competition_id;
              // year listing
              this.YearList = this.comptitionlists[0].seasons;
              this.selectd_yr = this.YearList[0].competition_year;
              //  get matches
              this.getLadderMatches(compId);
            } else if (val.selectedcompetition.seasons[0].manual_score_recording == "2" && cntr < 1) {
              this.selectables = this.comptitionlists[0].competitions_name;
              this.competition_id = this.comptitionlists[0].seasons[0].competition_id;
              let compId = this.comptitionlists[0].seasons[0].competition_id;
              // year listing
              this.YearList = this.comptitionlists[0].seasons;
              this.selectd_yr = this.YearList[0].competition_year;
              //  get matches
              this.getLadderMatches(compId);

              if (this.plt.is('ios')) {
                let target = "_blank";
                this.inapp.create(val.selectedcompetition.seasons[0].weblink_ladder, target, this.options);

              } else if (this.plt.is('android')) {
                let target = "_blank";
                this.inapp.create(val.selectedcompetition.seasons[0].weblink_ladder, target, this.optionsAndroid);

              }

              // let target = "_blank";
              // this.inapp.create(val.selectedcompetition.seasons[0].weblink_ladder,target,this.options);

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
          this.getLadderMatches(compId);
        }
      });
      // }

      // if (res !== undefined && res !== "") {
      // this.comptitionlists = res.competition;
      // this.YearList =this.comptitionlists[0].seasons;
      // this.selectd_yr = this.YearList[0].competition_year;
      // this.selectables = this.comptitionlists[0].competitions_name;
      // this.competition_id = this.comptitionlists[0].seasons[0].competition_id;


      // }
    });



    // weblink add fetching api
    this.ajax.postMethod('get-weblink-advertisements', { page_title: 'Ladder(Weblink)' }).subscribe((res: any) => {
      this.WeblinkAd = res.footerAdv.ad_image;
    })

  }


  getLadderMatches(comp) {
    this.ajax.datalist('team-ladder-competitionwise', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
      competition_id: comp
    }).subscribe((res) => {
      this.teamladdercompetitionwise(res);
    }, error => {
      this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }

  // year_dropdown
  presentPopover(myEvent) {
    let data = this.YearList;
    let popover = this.popoverCtrl.create("YeardropdownPage", { yearData: data });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      console.log(data);
      if (data != null && data.manual_score_recording != "2") {
        this.selectd_yr = data.competition_year;
        this.competition_id = data.competition_id;
        // get ladder by year
        this.cmnfun.showLoader('Please wait...');
        this.ajax.datalist('team-ladder-competitionwise', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.competition_id
        }).subscribe((res) => {
          this.cmnfun.hideLoader();
          this.teamladdercompetitionwise(res);
        }, error => {
          this.cmnfun.hideLoader();
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
      } else if (data != null && data.manual_score_recording == "2") {
        let target = "_blank";
        this.inapp.create(data.weblink_ladder, target, this.options);
      }
    })
  }



  teamladdercompetitionwise(res) {
    let table: any = $('#LadderTable').dataTable();
    table.fnDestroy();
    this.ladderDataa = res.ladder;
    this.arraySize = this.ladderDataa.length;
    this.advertisementHeader = res.headerAdv;
    console.log(this.advertisementHeader[0].ad_image);
    this.advertisementFooter = res.footerAdv;
    console.log(res);

    setTimeout(() => {
      let windowWidth = (window.innerWidth);
      let windowHeight = (window.innerHeight) - 150;
      var table = $('#LadderTable').DataTable({
        // scrollY: windowHeight,
        // scrollY: 150,
        scrollY: true,
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        info: false,
        "bPaginate": false,
        "bDestroy": true,
        "bFilter": false,
        "bInfo": false,
        "bSortable": false,
        "ordering": true,
        "order": [[4, "desc"], [14, "desc"], [5, "desc"]],
        "aoColumnDefs": [
          {
            "targets": [3],
            "orderable": false,
            "bSortable": false,
            "searchable": false,
            "render": function (data, type, full, meta) {
              return parseInt(full[6]) + parseInt(full[7]) + parseInt(full[8]) + parseInt(full[9]) + parseInt(full[12]) + parseInt(full[13]);
            }
          }],

        fixedColumns: {
          leftColumns: 2,
          rightColumns: 0
        },
        fixedHeader: {
          header: true,
          footer: true
        }
      });
      table.on("order.dt search.dt", function () {
        table.column(0, { search: "applied", order: "applied" }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
      }).draw();
      //   table.row.add( [
      //     '<img class="full-image" src="assets/imgs/CSM_-_More_Footy_Less_Admin_(white).gif">'
      // ] ).draw( false );
      // $('#LadderTable').wrap('<img src="https://s3.us-west-2.amazonaws.com/vafas3/publish/339/1522912681_stats_guru.gif">');
      this.cmnfun.hideLoader();
    }, 1500);


  };
  gotomodel() {
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
    let me = this;
    modal.onDidDismiss(data => {
      if (data) {
        if (data.seasons[0].manual_score_recording == "2") {
          // this.selectables = data.competitions_name;
          let target = "_blank";
          this.inapp.create(data.seasons[0].weblink_ladder, target, this.options);
          var htmlvalue = '<iframe src=' + data.seasons[0].weblink_ladder + ' seamless   sandbox="allow-popups allow-same-origin allow-forms allow-scripts"></iframe>';
          this.safeURL = this.sanitizer.bypassSecurityTrustHtml(htmlvalue);
          // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.seasons[0].weblink_ladder);
          // this.weblink = true;
        } else {
          this.weblink = false;
          this.ladderDataa = [];
          let table: any = $('#LadderTable').dataTable();
          table.fnDestroy();
          console.log(data);
          this.cmnfun.showLoader('Please wait...');
          this.selectables = data.competitions_name;
          this.YearList = data.seasons;
          this.selectd_yr = this.YearList[0].competition_year;
          this.competition_id = data.seasons[0].competition_id;
          this.ajax.datalist('team-ladder-competitionwise', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            competition_id: this.competition_id,
          }).subscribe((res) => {
            this.teamladdercompetitionwise(res);
          }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
          })
        }
      }
    });
    modal.present();
  }


}
