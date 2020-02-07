import { LocalDataProvider } from './../../providers/local-data/local-data';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController, ViewController, Platform, ModalController, PopoverController } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ProductListProvider } from '../../providers/product-list/product-list';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { StreamingMedia } from '@ionic-native/streaming-media';
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import 'datatables.net-fixedheader';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-fixedcolumns';
// import 'jquery-flot'
// import 'jquery.flot.tooltip'
/**
 * Generated class for the InnermatchcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const GamePass = 'game_pass';

@IonicPage()
@Component({
    selector: 'page-innermatchcenter',
    templateUrl: 'innermatchcenter.html',
})
export class InnermatchcenterPage {

    options: InAppBrowserOptions = {
        location: 'yes',//Or 'no'
        hidden: 'no', //Or  'yes'
        clearcache: 'yes',
        clearsessioncache: 'yes',
        zoom: 'no',//Android only ,shows browser zoom controls
        hardwareback: 'yes',
        mediaPlaybackRequiresUserAction: 'no',
        shouldPauseOnSuspend: 'no', //Android only
        closebuttoncaption: 'Close', //iOS only
        disallowoverscroll: 'no', //iOS only
        toolbar: 'yes', //iOS only
        enableViewportScale: 'no', //iOS only
        allowInlineMediaPlayback: 'no',//iOS only
        presentationstyle: 'pagesheet',//iOS only
        fullscreen: 'yes',//Windows only
        // hideurlbar: 'yes'
    };




    @ViewChild(Content) content: Content;
    // @ViewChild(Navbar) navBar: Navbar;

    LiveVideo: any = '';
    LiveAudio: any = '';

    ShowCoach: boolean = true;
    CoachQ: any = ['all'];

    AwayBestplayers: any = [];
    HomeBestplayers: any = [];
    AwayGoalKickers: any = [];
    HomeGoalKickers: any = [];
    QuaterBreakstatus: any = 0;
    BreakQuater: any = 0;
    showAd: boolean = false;
    PaymentData: any = [];

    jd_active: any = '';


    isToggled: boolean = false;

    deviceData: any = {
        device_id: '',
        year: ''
    }
    isLogin: boolean = false;
    ApiResponse: any;
    // path: any = 'http://vafalive.com.au';
    path1: any = environment.baseURL;
    path: any = environment.amazonaws;
    // path1: any = 'http://52.89.30.220';
    type: any = 'SCORE';
    showcontent: any = 'hide';
    showfooter: any;
    showrest: boolean = false;
    i: number = 0;
    selectedOption: any = ['all'];
    statcheck: any = 'SCORE';
    playerStatsTable0: any = 'playerStatsTable';
    btn10: any = 'btn1';
    btn20: any = 'btn2';
    advDisplay: any = 'show';
    GB0: any = 'GB';
    buttonId0: any = 'buttonId'; statschoose2: any;
    details: any = {}; fixture_id: any; stateRoundNo: any; statusName: any; manual_score_recording: any; roundName: any;
    disableBtn: any; compitionId: any; baseUrl: any; newTotalHomeTeamScore: any; newTotalAwayTeamScore: any; advertisementHeader: any; advertisementFooter: any = [];
    lastScore: any = {}; homeTeamAbbr: any = {}; awayTeamAbbr: any = {}; homeTeamImg: any; awayTeamImg: any; HomeTeamScore: any = []; awayTeamScore: any;
    rushBehind2: any; rushBehind3: any; rushBehind4: any; q1HomeScore: any; q2HomeScore: any; totalHomeQuarerScore: any; q3HomeScore: any;
    q4HomeScore: any; totalHoMeScores: any; q1AwayScore: any; q2AwayScore: any; totalAwayQuarerScore: any; q3AwayScore: any; q4AwayScore: any;
    totalAwAyScores: any; homeTeamName: any; awayTeamName: any; teamStatus: any; totalScores: any; winTeamStatus: any; winTeamScore: any;
    //   actionpage
    newMerge: any = []; id: any; scoreid: any; data: any = []; endQuarterValue: any; actTime: any; teamStatusNumber: any; matchStatus: any;
    scrollTop: number = 0; homeTeamData: any = []; awayTeamData: any = []; quaterEnd: any = []; merged: any; homeTeamScore: any;
    actionScoreFeed1: any = []; actionScoreFeed: any = []; stat_title: any; shortGraph: any; fullGraph: any; graphImgShowHide: any; shortAdvhideshow: any; headerImg: any;
    // stats
    statschoose: any; homePlayerData: any = []; awayPlayerData: any = []; pamentshow: any = 0;
    homeTeamScoreStat: any = []; awayTeamScoreStat: any = []; showDataTable: boolean = false; homeTeam: any = []; awayTeam: any = []; adv: any = [{}];
    stats: any; awayTeamWithStatPoint: any; homeTeamWithStatPoint: any; homeTeamPlayers: any; modifiedState: any;
    awayEFF: any; awayEFFWidth: any; hEFF: any; homeEFF: any; homeEFFWidth: any; aEFF: any; hColor: any; aColor: any; modifiedStateSeq: any = [];
    homeTeamPlayers1: any = []; homeAwayTeamPlayerWithScore: any = []; cntt: any; reverse: boolean = false; orderByFieldName: any;
    array1: any = []; totalTeamPlayerScore: any; awayTeamPlayers: any; homeTeamImages: any; awayTeamImages: any;

    SortHomePlayer: boolean = false;
    SortAwayPlayer: boolean = true;
    selectd_yr: any = '';

    PurchaseData: any = [];

    CompMainID: any;
    rdata: any;

    Selectedmatch: any;

    constructor(public popover: PopoverController, private iap: InAppPurchase, public platform: Platform, public processproduct: ProductListProvider, public ga: FirebaseAnalyticsProvider, public localdata: LocalDataProvider,
        private alertCtrl: AlertController, private youtube: YoutubeVideoPlayer, private streamingMedia: StreamingMedia, private modalCtrl: ModalController, private zone: NgZone, private inapp: InAppBrowser, public Storage: Storage, public ajax: AjaxProvider, public events: Events, public cmnfun: CommomfunctionProvider, public navCtrl: NavController, public navParams: NavParams,
        public themeableBrowser: ThemeableBrowser) {
        this.details = navParams.get('details');
        this.deviceData.year = navParams.get('year');
        this.selectd_yr = navParams.get('year');

        if (this.navParams.get("parentPage")) {
            this.Selectedmatch = this.navParams.get("parentPage");
            this.localdata.savematch(this.Selectedmatch);
        }




        console.log(this.details);
        console.log(this.processproduct.getMatchcenterCompId());
        this.platform.ready().then(() => {
            this.iap.getProducts([GamePass])
                .then((products) => {
                })
                .catch((err) => {
                    console.log(err);
                });
            this.ga.startTrackerWithId('UA-118996199-1')
                .then(() => {
                    console.log('Google analytics is ready now');
                    this.ga.trackView('Score');
                })
                .catch(e => console.log('Error starting GoogleAnalytics', e));
        })
        //check login
        this.Storage.get('userData').then((val) => {
            if (val) {
                console.log(val)
                this.isLogin = true;
            }
        });
        //
        // get all purchases
        let dv_id = this.localdata.GetDevice();
        this.ajax.GetAllPurchases({ device_id: dv_id }).subscribe((res) => {
            this.rdata = res;
            if (this.rdata.code == 2) {
                this.PaymentData = this.rdata.payment;
                console.log(this.PaymentData.length);
            }
        })
        //
    }


    cutPath(url) {
        if (url) {
            return url.substring(12);
        }
    }


    ionViewDidEnter() {
        console.log('back from individual player');
        // this.gotostatspage()
    }





    ionViewWillLeave() {
        console.log(this.navCtrl.getActive().index);

        if (this.navParams.get("parentPage") && this.navParams.get('stats') != true) {
            this.localdata.getmatch().RefreshScore();
        }
        else if (this.navParams.get('stats') == true) {
            this.localdata.getmatch().RefreshScore2();
        }

        if (this.navCtrl.getPrevious().name == 'LoginPage' || this.navCtrl.getPrevious().name == 'SignUpPage' || this.navCtrl.getPrevious().name == 'RegisteredpassPage' || this.navCtrl.getPrevious().name == 'LandingpagePage' || this.navCtrl.getPrevious().name == 'PlayerstatindividualPage' || this.navCtrl.getPrevious().name == 'NewaccountPage') {
            this.navCtrl.popToRoot();
        }
        clearInterval(this.id);
        clearInterval(this.scoreid);
    }

    ionViewDidLeave() {
        clearInterval(this.id);
        clearInterval(this.scoreid);
    }
    goToAddSite(ad_url) {
        this.ga.trackEvent('Advertisement', 'Viewed', 'Score', 1);
        const browser = this.inapp.create(ad_url);
    }
    onScroll() {
        //   this.content.ionScrollEnd.subscribe((data)=>{
        //  setTimeout(() => {
        this.scrollTop = this.content.scrollTop;
        let storeData = this.scrollTop;
        if (this.type == 'stats') {
            if (storeData >= 195) {
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


        if (storeData > 0) {
            $('.xAxis .tickLabel').removeClass('tickLabel').addClass('tickLabel1');

            $('.overlay').addClass('overlay1');
            $('.border-left-graph').addClass('rm_h');
            $('.border-right-graph').addClass('rm_h');

            console.log("80");
            console.log(storeData);
            this.fullGraph = 1;
            this.graphImgShowHide = 0;
            this.shortGraph = 0;

            this.headerImg = 1;
            this.showfooter = "show";
            this.zone.run(() => {
                this.shortAdvhideshow = 0;
            });
            $("#scoreChart").hide();
            $("#scoreChartmin").show();
            $("#scoreChartminh").show();
        }
        else {
            $('.xAxis .tickLabel1').removeClass('tickLabel1').addClass('tickLabel');
            $('.overlay').removeClass('overlay1');
            $('.border-left-graph').removeClass('rm_h');
            $('.border-right-graph').removeClass('rm_h');
            //  if(this.i>=10)
            // {
            //    this.i=0;
            // }
            // if(this.i==1)
            //     {
            this.shortGraph = 1;
            this.zone.run(() => {
                this.shortAdvhideshow = 1;
                this.graphImgShowHide = 1;
            });
            this.headerImg = 0;
            this.fullGraph = 0;
            this.showfooter = 'hide';
            console.log("100")
            console.log(storeData)
            $("#scoreChart").show();
            $("#scoreChartmin").hide();
            $("#scoreChartminh").hide();

            $('.overlay').addClass('overlay');
            //         }
            // this.i++;
        }
        //  },200);

        // });
    }

    ionViewDidLoad() {
        let firstCounter = 0;
        this.cmnfun.showLoader('Please wait...');
        this.fixture_id = this.details.fixture_id;
        this.stateRoundNo = this.details.fixture_id.roundNo;
        this.statusName = this.details.match_status;
        this.manual_score_recording = this.details.manual_score_recording;
        this.roundName = this.details.roundName;

        if (this.manual_score_recording == 1) {
            this.disableBtn = true;
        } else {
            this.disableBtn = false;
        }
        if (this.navParams.get('stats') == true) {
            this.cmnfun.hideLoader();
            this.goTostats();
        }
        this.ajax.datalist('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Home'
        }).subscribe((res) => {
            if (firstCounter == 0) {
                this.cmnfun.hideLoader();
                firstCounter++;
            }
            this.getplayerscore(res);
        }, error => {
            this.cmnfun.hideLoader();
            this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
    }

    getplayerscore(res) {
        // console.log(res.fixureData);
        // console.log(res.fixureData.status);
        if (res.fixureData.radio_link != null) {
            this.LiveAudio = res.fixureData.radio_link;
        }
        if (res.fixureData.video_link != null) {
            this.LiveVideo = res.fixureData.video_link;
        }



        this.baseUrl = res.baseUrl;
        this.manual_score_recording = res.manual_score_recording;
        if (this.manual_score_recording == 1) {
            this.disableBtn = true;
        } else {
            this.disableBtn = false;
        }
        this.newTotalHomeTeamScore = res.totalHomeTeamScore;
        this.newTotalAwayTeamScore = res.totalAwayTeamScore;

        this.AwayBestplayers = res.awayTeamBestplayers;
        this.HomeBestplayers = res.homeTeamBestplayers;
        this.AwayGoalKickers = res.awayTeamGoalkickers;
        this.HomeGoalKickers = res.homeTeamGoalkickers;

        this.QuaterBreakstatus = res.quaterBreak.quater_break;
        this.BreakQuater = res.quaterBreak.quater;

        //ADVERTISEMENT::
        this.advertisementHeader = res.adv.headerAdv;
        this.advertisementFooter = res.adv.footerAdv[0];
        console.log(this.advertisementHeader);
        console.log(this.advertisementFooter)
        this.lastScore = res.lastScore;
        console.log(this.lastScore);
        this.homeTeamAbbr = res.homeTeam;
        this.awayTeamAbbr = res.awayTeam;
        console.log(this.homeTeamAbbr);
        console.log(this.awayTeamAbbr)

        this.homeTeamImg = res.homeTeamImages;
        this.awayTeamImg = res.awayTeamImages;
        this.HomeTeamScore = [];
        this.HomeTeamScore = res.homeTeamScore;
        this.awayTeamScore = res.awayTeamScore;
        if (res.homeTeamScore != '') {
            let quaterHScore = ["0.0", "0.0", "0.0", "0.0"];
            //START:Home TEam SCORE EACH FUNCTIon
            this.HomeTeamScore.forEach(obj => {
                if (obj.stat_id == 1 || obj.stat_id == 2 || obj.stat_id == 3) {
                    if (obj.stat_id == 1) //calculation for total goal
                    {
                        let Q = obj.quater;
                        let totaValQ = quaterHScore[Q - 1];

                        if (Q == 1) {
                            ////console.log("Q1");
                            totaValQ = quaterHScore[0];
                            let totaValQ1 = totaValQ.split(".");
                            let totaQG = parseInt(totaValQ1[0]) + 1;
                            let totalValQ1RB = parseInt(totaValQ1[1]);
                            quaterHScore[0] = totaQG + "." + totalValQ1RB;
                            // this.quaterHScore1 = quaterHScore[0];
                            ////console.log("this.quaterHScore1 =="+this.quaterHScore1);

                        }
                        else if (Q == 2) {

                            ////console.log("Q2");
                            let totaValQ2 = quaterHScore[1];
                            let totaValQ3 = totaValQ2.split(".");
                            let totaQ2G = parseInt(totaValQ3[0]) + 1;
                            quaterHScore[1] = totaQ2G + "." + totaValQ3[1];
                            //this.quaterHScore2 = quaterHScore[1];
                            ////console.log("this.quaterHScore2 =="+this.quaterHScore2);

                        }
                        else if (Q == 3) {

                            //quarter3 cal
                            let totaValQ3 = quaterHScore[2];
                            let totaValQ4 = totaValQ3.split(".");
                            let totaQ3G = parseInt(totaValQ4[0]) + 1;
                            quaterHScore[2] = totaQ3G + "." + totaValQ4[1];
                            //this.quaterHScore3 = quaterHScore[2];
                            ////console.log("this.quaterHScore3 =="+this.quaterHScore3);

                        }
                        else if (Q == 4) {

                            //quarter4 cal
                            let totaValQ4 = quaterHScore[3];
                            let totaValQ5 = totaValQ4.split(".");
                            let totaQ4G = parseInt(totaValQ5[0]) + 1;
                            quaterHScore[3] = totaQ4G + "." + totaValQ5[1];
                            //this.quaterHScore4 = quaterHScore[3];
                            ////console.log("this.quaterHScore4 =="+this.quaterHScore4);

                        }

                    }//END:calculation for total goal
                    else //calculation for total RB
                    {

                        //Calulation for display total quarter values in
                        let Q = obj.quater;
                        let totaValQ = quaterHScore[Q - 1];
                        //////console.log(totaValQ);
                        if (Q == 1) {
                            //totaValQ = "0.0";
                            let totaValQ = quaterHScore[0];
                            let totaValQ1 = totaValQ.split(".");
                            let totaQG = parseInt(totaValQ1[0]);
                            let totalValQ1RB = parseInt(totaValQ1[1]) + 1;
                            quaterHScore[0] = totaQG + "." + totalValQ1RB;
                            // this.rushBehind1 = quaterHScore[0];
                            ////console.log("this.rushBehind1 =="+this.rushBehind1);

                        }
                        else if (Q == 2) {

                            //quarter2 cal
                            let totaValQ2 = quaterHScore[1];
                            let totaValQ3 = totaValQ2.split(".");
                            let RBQ2 = parseInt(totaValQ3[1]);
                            RBQ2++;
                            let totaQ2G = parseInt(totaValQ3[0]);
                            quaterHScore[1] = totaQ2G + "." + RBQ2;
                            this.rushBehind2 = quaterHScore[1];
                            ////console.log("this.rushBehind2 =="+this.rushBehind2);

                        }
                        else if (Q == 3) {

                            //quarter3 cal
                            let totaValQ3 = quaterHScore[2];
                            let totaValQ4 = totaValQ3.split(".");
                            let totaQ3G = parseInt(totaValQ4[0]);
                            let RBQ3 = parseInt(totaValQ4[1]);
                            RBQ3++;
                            quaterHScore[2] = totaQ3G + "." + RBQ3;
                            this.rushBehind3 = quaterHScore[2];
                            ////console.log("this.rushBehind3 =="+this.rushBehind3);
                        }
                        else if (Q == 4) {

                            //quarter4 cal
                            let totaValQ4 = quaterHScore[3];
                            let totaValQ5 = totaValQ4.split(".");
                            let totaQ4G = parseInt(totaValQ5[0]);
                            let RBQ4 = parseInt(totaValQ5[1]);
                            RBQ4++;
                            quaterHScore[3] = totaQ4G + "." + RBQ4;
                            this.rushBehind4 = quaterHScore[3];
                            ////console.log("this.rushBehind4 =="+this.rushBehind4);

                        }

                    }//calculation for total RB
                }
                ////console.log("quaterHScore[0]!==="+quaterHScore[0]);
                //START:total scores calculations
                //////console.log('Home Team Scores');////console.log('q1-'+quaterHScore[0]); ////console.log('q2-'+quaterHScore[1]); ////console.log('q3-'+quaterHScore[2]); ////console.log('q4-'+quaterHScore[3]);  ////console.log('-----');

                if (quaterHScore[0] != '') {
                    // $("#q1HomeScore").html(quaterHScore[0]);
                    this.q1HomeScore = quaterHScore[0];

                }
                else {
                    // $("#q1HomeScore").html('-');
                    this.q1HomeScore = '-';
                    ////console.log(" this.q1HomeScore1=="+this.q1HomeScore);
                }
                //for q2 score
                ////console.log("quaterHScore[1]"+quaterHScore[1]);
                if (quaterHScore[1] !== '0.0' || this.lastScore.quater >= 2) {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    let q12Total = q2G + "." + q2RB;
                    //////console.log(q12Total);
                    // $("#q2HomeScore").html(q12Total);
                    // $('.totalHomeQuarerScore').html(q12Total);

                    this.q2HomeScore = q12Total;
                    this.totalHomeQuarerScore = q12Total;
                    ////console.log(this.q2HomeScore); ////console.log(this.totalHomeQuarerScore);
                }
                // }
                else {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    let q2HTotal = q2G + "." + q2RB;
                    //$('.totalHomeQuarerScore').html(q2HTotal);
                    // $("#q2HomeScore").html('-');
                    this.q2HomeScore = '-';
                    this.totalHomeQuarerScore = q2HTotal;

                    ////console.log("q2 else1"+this.q2HomeScore); ////console.log("q2 else2"+this.totalHomeQuarerScore);
                }
                //END:q2 score

                //For q3 score
                if (quaterHScore[2] !== '0.0' || this.lastScore.quater >= 3) {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q3Score = quaterHScore[2].split(".");
                    let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    let q3Total = q3G + "." + q3RB;
                    // $("#q3HomeScore").html(q3Total);
                    //$('.totalHomeQuarerScore').html(q3Total);
                    this.q3HomeScore = q3Total;
                    this.totalHomeQuarerScore = q3Total;
                    // console.log('q3score'+this.q3HomeScore); ////console.log(this.totalHomeQuarerScore);
                }
                else {

                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q3Score = quaterHScore[2].split(".");
                    let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    let q3Htotal = q3G + "." + q3RB;
                    // $('.totalHomeQuarerScore').html(q3Htotal);
                    // $("#q3HomeScore").html('-');
                    this.q3HomeScore = '-';
                    this.totalHomeQuarerScore = q3Htotal;
                    ////console.log(this.q3HomeScore); ////console.log(this.totalHomeQuarerScore);
                }
                // }
                //END:q3 score

                //For q4 score
                if (quaterHScore[3] !== '0.0' || this.lastScore.quater >= 4) {

                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q3Score = quaterHScore[2].split(".");
                    let q4Score = quaterHScore[3].split(".");
                    let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    let q4Total = q4G + "." + q4RB;
                    // $("#q4HomeScore").html(q4Total);
                    // $('.totalHomeQuarerScore').html(q4Total);
                    this.q4HomeScore = q4Total;
                    this.totalHomeQuarerScore = q4Total;
                    ////console.log(this.q4HomeScore); ////console.log(this.totalHomeQuarerScore);
                }
                else {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q3Score = quaterHScore[2].split(".");
                    let q4Score = quaterHScore[3].split(".");
                    let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    let q4Htotal = q4G + "." + q4RB;
                    // $('.totalHomeQuarerScore').html(q4Htotal);
                    // $("#q4HomeScore").html('-');
                    this.q4HomeScore = '-';
                    this.totalHomeQuarerScore = q4Htotal;
                    ////console.log(this.q4HomeScore); ////console.log(this.totalHomeQuarerScore);
                }
                //END:q3 score

                //To display total scores

                if (quaterHScore[0] !== '0.0') {
                    let q1Score = quaterHScore[0].split(".");
                    let q1HTot = (parseInt(q1Score[0]) * 6) + parseInt(q1Score[1]);
                    //$('.totalHoMeScores').html(q1HTot);
                    //////console.log('q1-'+q1HTot);

                    this.totalHoMeScores = q1HTot;
                    ////console.log(this.totalHoMeScores);

                }
                if (quaterHScore[1] !== '0.0') {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    let q2HTot = q2G * 6 + q2RB;
                    //$('.totalHoMeScores').html(q2HTot);
                    //////console.log('q2-'+q2HTot);
                    this.totalHoMeScores = q2HTot;
                    ////console.log(this.totalHoMeScores);
                }
                if (quaterHScore[2] !== '0.0') {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q3Score = quaterHScore[2].split(".");
                    let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    let q3HTot = q3G * 6 + q3RB;
                    //$('.totalHoMeScores').html(q3HTot);
                    //////console.log('q3-'+q3HTot);
                    this.totalHoMeScores = q3HTot;
                    ////console.log(this.totalHoMeScores);
                }
                if (quaterHScore[3] !== '0.0') {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q3Score = quaterHScore[2].split(".");
                    let q4Score = quaterHScore[3].split(".");
                    let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    let q4HTot = q4G * 6 + q4RB;
                    //$('.totalHoMeScores').html(q4HTot);
                    //////console.log('q4-'+q4HTot);
                    this.totalHoMeScores = q4HTot;
                    ////console.log(this.totalHoMeScores);
                }
                //END:total scores calculations

                //END:genrate home team players score


            });//END:Home TEam SCORE EACH FUNCTIon

        }
        //END:HOME TEAM res

        //START:AWAY TEAM res

        if (res.awayTeamScore != null) {
            let quaterAScore = ["0.0", "0.0", "0.0", "0.0"];
            this.awayTeamScore.forEach(obj => {
                if (obj.stat_id == 1 || obj.stat_id == 2 || obj.stat_id == 3) {
                    if (obj.stat_id == 1) {
                        let Q = obj.quater;
                        let totaValQ = quaterAScore[Q - 1];
                        //alert(totaValQ);
                        if (Q == 1) {
                            //totaValQ = "0.0";
                            totaValQ = quaterAScore[0];
                            let totaValQ1 = totaValQ.split(".");
                            let totaQG = parseInt(totaValQ1[0]) + 1;
                            let totalValQ1RB = parseInt(totaValQ1[1]);
                            quaterAScore[0] = totaQG + "." + totalValQ1RB;
                            //$('#q1HomeScore').html(quaterHScore[Q-1]);
                            //this.q1HomeScore = quaterHScore[Q-1];
                            ////console.log("away1==="+this.q1HomeScore1);

                        }
                        else if (Q == 2) {

                            //quarter2 cal
                            let totaValQ2 = quaterAScore[1];
                            let totaValQ3 = totaValQ2.split(".");
                            let totaQ2G = parseInt(totaValQ3[0]) + 1;
                            quaterAScore[1] = totaQ2G + "." + totaValQ3[1];

                            //this.q1HomeScore2 = quaterAScore[1];
                            ////console.log("away2==="+this.q1HomeScore2);

                        }
                        else if (Q == 3) {

                            //quarter3 cal
                            let totaValQ3 = quaterAScore[2];
                            let totaValQ4 = totaValQ3.split(".");
                            let totaQ3G = parseInt(totaValQ4[0]) + 1;
                            quaterAScore[2] = totaQ3G + "." + totaValQ4[1];

                            //this.q1HomeScore3 = quaterAScore[2];
                            ////console.log("away3==="+this.q1HomeScore3);

                        }
                        else if (Q == 4) {

                            //quarter4 cal
                            let totaValQ4 = quaterAScore[3];
                            let totaValQ5 = totaValQ4.split(".");
                            let totaQ4G = parseInt(totaValQ5[0]) + 1;
                            quaterAScore[3] = totaQ4G + "." + totaValQ5[1];

                            //this.q1HomeScore4 = quaterAScore[3];
                            ////console.log("away4==="+this.q1HomeScore4);

                        }

                        //END:Calulation for display total quarter values in


                    }
                    else {

                        //Calulation for display total quarter values in
                        let Q = obj.quater;
                        let totaValQ = quaterAScore[Q - 1];
                        //alert(totaValQ);
                        if (Q == 1) {
                            //totaValQ = "0.0";
                            totaValQ = quaterAScore[0];
                            let totaValQ1 = totaValQ.split(".");
                            let totaQG = parseInt(totaValQ1[0]);
                            let totalValQ1RB = parseInt(totaValQ1[1]) + 1;
                            quaterAScore[0] = totaQG + "." + totalValQ1RB;

                            //  this.q1HomeScore = quaterAScore[0];
                            //alert("q1==="+this.q1HomeScore);


                        }
                        else if (Q == 2) {

                            //quarter2 cal
                            let totaValQ2 = quaterAScore[1];
                            let totaValQ3 = totaValQ2.split(".");
                            let RBQ2 = parseInt(totaValQ3[1]);
                            RBQ2++;
                            let totaQ2G = parseInt(totaValQ3[0]);
                            quaterAScore[1] = totaQ2G + "." + RBQ2;

                            //  this.q1HomeScore = quaterAScore[1];
                            ////console.log("q2==="+this.q1HomeScore);

                        }
                        else if (Q == 3) {

                            //quarter3 cal
                            let totaValQ3 = quaterAScore[2];
                            let totaValQ4 = totaValQ3.split(".");
                            let totaQ3G = parseInt(totaValQ4[0]);
                            let RBQ3 = parseInt(totaValQ4[1]);
                            RBQ3++;
                            quaterAScore[2] = totaQ3G + "." + RBQ3;

                            //  this.q1HomeScore = quaterAScore[2];
                            ////console.log("q3==="+this.q1HomeScore);

                        }
                        else if (Q == 4) {

                            //quarter4 cal
                            let totaValQ4 = quaterAScore[3];
                            let totaValQ5 = totaValQ4.split(".");
                            let totaQ4G = parseInt(totaValQ5[0]);
                            let RBQ4 = parseInt(totaValQ5[1]);
                            RBQ4++;
                            quaterAScore[3] = totaQ4G + "." + RBQ4;

                            //this.q1HomeScore = quaterAScore[3];
                            ////console.log("q4==="+this.q1HomeScore);

                        }

                        //END:Calulation for display total quarter values in


                    }

                }


                //START:Away Team total scores calculations
                //////console.log('Away Team Scores');////console.log('q1-'+quaterAScore[0]); ////console.log('q2-'+quaterAScore[1]); ////console.log('q3-'+quaterAScore[2]); ////console.log('q4-'+quaterAScore[3]);  ////console.log('-----');
                if (quaterAScore[0] !== '0.0') {
                    //$("#q1AwayScore").html(quaterAScore[0]);
                    this.q1AwayScore = quaterAScore[0];
                    ////console.log("q1AwayScore==="+this.q1AwayScore);
                }
                else {
                    //$("#q2AwayScore").html('0.0');
                    this.q1AwayScore = '0.0';
                    this.q2AwayScore = '0.0';
                    ////console.log("q2AwayScore"+this.q2AwayScore);

                }
                //for q2 score
                if (quaterAScore[1] !== '0.0' || this.lastScore.quater >= 2) {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q12G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    let q12RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    let q12Total = q12G + "." + q12RB;
                    // $("#q2AwayScore").html(q12Total);
                    // $('.totalAwayQuarerScore').html(q12Total);

                    this.q2AwayScore = q12Total;
                    this.totalAwayQuarerScore = q12Total;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q2AwayScore);
                }
                else {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    let q2ATotal = q2G + "." + q2RB;
                    // $('.totalAwayQuarerScore').html(q2ATotal);
                    //$("#q2AwayScore").html('-');

                    this.q2AwayScore = '-';
                    this.totalAwayQuarerScore = q2ATotal;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q2AwayScore);
                }
                //END:q2 score

                //For q3 score
                if (quaterAScore[2] !== '0.0' || this.lastScore.quater >= 3) {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q3Score = quaterAScore[2].split(".");
                    let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    let q3Total = q3G + "." + q3RB;
                    //$("#q3AwayScore").html(q3Total);
                    // $('.totalAwayQuarerScore').html(q3Total);

                    this.q3AwayScore = q3Total;
                    this.totalAwayQuarerScore = q3Total;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q3Total);
                }
                else {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q3Score = quaterAScore[2].split(".");
                    let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    let q3ATotal = q3G + "." + q3RB;
                    //$('.totalAwayQuarerScore').html(q3ATotal);
                    //$("#q3AwayScore").html('-');

                    this.q3AwayScore = '-';
                    this.totalAwayQuarerScore = q3ATotal;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q3AwayScore);
                }
                //END:q3 score

                //For q4 score
                if (quaterAScore[3] !== '0.0' || this.lastScore.quater >= 4) {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q3Score = quaterAScore[2].split(".");
                    let q4Score = quaterAScore[3].split(".");
                    let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    let q4Total = q4G + "." + q4RB;
                    //$("#q4AwayScore").html(q4Total);
                    // $('.totalAwayQuarerScore').html(q4Total);

                    this.q4AwayScore = q4Total;
                    this.totalAwayQuarerScore = q4Total;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q4AwayScore);
                }
                else {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q3Score = quaterAScore[2].split(".");
                    let q4Score = quaterAScore[3].split(".");
                    let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    let q4ATotal = q4G + "." + q4RB;
                    // $('.totalAwayQuarerScore').html(q4ATotal);
                    // $("#q4AwayScore").html('-');

                    this.q4AwayScore = '-';
                    this.totalAwayQuarerScore = q4ATotal;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q4AwayScore);
                }
                //END:q3 score

                //To display total scores
                if (quaterAScore[0] !== '0.0') {
                    let q1Score = quaterAScore[0].split(".");
                    let q1ATot = (parseInt(q1Score[0]) * 6) + parseInt(q1Score[1]);
                    // $('.totalAwAyScores').html(q1ATot);

                    this.totalAwAyScores = q1ATot;
                    ////console.log("totalAwAyScores==="+this.totalAwAyScores);

                }
                if (quaterAScore[1] !== '0.0') {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    let q2ATot = (q2G * 6) + q2RB;
                    // $('.totalAwAyScores').html(q2ATot);
                    this.totalAwAyScores = q2ATot;
                    ////console.log("totalAwAyScores==="+this.totalAwAyScores);
                }
                if (quaterAScore[2] !== '0.0') {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q3Score = quaterAScore[2].split(".");
                    let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    let q3ATot = (q3G * 6) + q3RB;
                    //$('.totalAwAyScores').html(q3ATot);
                    this.totalAwAyScores = q3ATot;
                    ////console.log("totalAwAyScores==="+this.totalAwAyScores);
                }
                if (quaterAScore[3] !== '0.0') {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q3Score = quaterAScore[2].split(".");
                    let q4Score = quaterAScore[3].split(".");
                    let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    let q4ATot = (q4G * 6) + q4RB;
                    // $('.totalAwAyScores').html(q4ATot);
                    this.totalAwAyScores = q4ATot;
                    ////console.log("totalAwAyScores==="+this.totalAwAyScores);
                } else {
                    this.totalAwAyScores = 0;
                }
                //END:Away Team total scores calculations

                //END:Away Team total scores calculations
            });

        }//END:AWAY TEAM res


        //START:DISPLAY TEAM WIN STATUS

        this.homeTeamName = this.homeTeamAbbr.team_abbrevation;
        this.awayTeamName = this.awayTeamAbbr.team_abbrevation;
        //alert(this.homeTeamName+"---"+this.awayTeamName);
        //alert(this.totalHoMeScores+"---"+this.totalAwAyScores);
        this.teamStatus = res.fixureData.status;

        //alert(this.teamStatus);

        if (this.teamStatus == 1) {
            //alert(1);
            if (this.newTotalAwayTeamScore >= this.newTotalHomeTeamScore && this.newTotalAwayTeamScore != 0 && this.newTotalHomeTeamScore != 0) {
                this.totalScores = this.newTotalAwayTeamScore - this.newTotalHomeTeamScore;

                // $('.winTeamStatus').html(awayTeamName);
                // $('.winTeamScore').html('Won by '+totalScores);
                this.winTeamStatus = this.awayTeamName;
                this.winTeamScore = 'Won by ' + this.totalScores;
                //alert(this.winTeamStatus +"----"+ this.winTeamScore)
            }

            if (this.newTotalHomeTeamScore >= this.newTotalAwayTeamScore && this.newTotalAwayTeamScore != 0 && this.newTotalHomeTeamScore != 0) {
                this.totalScores = this.newTotalHomeTeamScore - this.newTotalAwayTeamScore;
                // $('.winTeamStatus').html(homeTeamName);
                // $('.winTeamScore').html('Won by '+totalScores);

                this.winTeamStatus = this.homeTeamName;
                this.winTeamScore = 'Won by ' + this.totalScores;
                //alert(this.winTeamStatus +"----"+ this.winTeamScore)
            }
            if (this.newTotalAwayTeamScore == this.newTotalHomeTeamScore && this.newTotalAwayTeamScore != 0 && this.newTotalHomeTeamScore != 0) {
                // $('.winTeamStatus').html('Draw');
                // $('.winTeamScore').html('');

                // $('.ResultTabMobApp').css({"color":"#FFCA22"});

                this.winTeamStatus = 'Draw';
                this.winTeamScore = '';
                //this.ResultTabMobApp = homeTeamName;

            }

        } else if (this.teamStatus == 10) {

            if (this.newTotalAwayTeamScore >= this.newTotalHomeTeamScore) {
                this.totalScores = this.newTotalAwayTeamScore - this.newTotalHomeTeamScore;
                this.winTeamStatus = this.awayTeamName;
                this.winTeamScore = 'Lead by ' + this.totalScores;
            }
            if (this.newTotalHomeTeamScore >= this.newTotalAwayTeamScore) {
                this.totalScores = this.newTotalHomeTeamScore - this.newTotalAwayTeamScore;
                this.winTeamStatus = this.homeTeamName;
                this.winTeamScore = 'Lead by ' + this.totalScores;
            }
            if (this.newTotalHomeTeamScore == 0 && this.newTotalAwayTeamScore == 0) {
                this.winTeamStatus = 'Scores are even';
                this.winTeamScore = '';
            }

            if (this.newTotalHomeTeamScore == this.newTotalAwayTeamScore) {
                this.winTeamStatus = "Level";
                this.winTeamScore = '';
            }
            else {
                let str1 = "It's all locked up";

                if (this.newTotalHomeTeamScore == this.newTotalAwayTeamScore) {
                    this.winTeamStatus = "It's all locked up";
                    this.winTeamScore = '';
                }

            }

        }
        //END:DISPLAY TEAM WIN STATUS
        this.showcontent = 'show';
        this.cmnfun.hideLoader();
        if (this.teamStatus != 1) {
            this.scoreid = setInterval(() => {
                this.ajax.datalist('get-player-score', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: this.fixture_id,
                    adv_title: 'Home'
                }).subscribe((res) => {
                    this.getplayerscore(res);
                }, error => {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                })
            }, 10000);
        }

    };
    goToActionPage(type) {
        this.type = type;
        if (this.type == 'ACTION') {
            this.statcheck = 'ACTION';
            clearInterval(this.scoreid);
            this.actionpage();
            this.statschoose2 = 'Player';
            this.platform.ready().then(() => {
                this.ga.startTrackerWithId('UA-118996199-1')
                    .then(() => {
                        console.log('Google analytics is ready now');
                        this.ga.trackView('Action');
                        this.ga.trackTiming('Action', 2000, 'Duration', 'Time');
                        this.ga.trackEvent('Advertisement', 'Viewed', 'Action', 1);
                    })
                    .catch(e => console.log('Error starting GoogleAnalytics', e));
            })
        }
        else if (this.type == 'SCORE') {
            let loader = 0;
            this.statcheck = 'SCORE';
            this.statschoose2 = 'Player';
            clearInterval(this.id);
            this.cmnfun.showLoader('Please wait...');
            this.ajax.datalist('get-player-score', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                fixtureId: this.fixture_id,
                adv_title: 'Home'
            }).subscribe((res) => {
                if (loader == 0) {
                    this.cmnfun.hideLoader();
                    loader++;
                }
                this.getplayerscore(res);
            }, error => {
                this.cmnfun.hideLoader();
                this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })

            this.platform.ready().then(() => {
                this.ga.startTrackerWithId('UA-118996199-1')
                    .then(() => {
                        console.log('Google analytics is ready now');
                        this.ga.trackView('Score');
                        this.ga.trackTiming('Score', 1000, 'Duration', 'Time');
                        this.ga.trackEvent('Advertisement', 'Viewed', 'Score', 1);
                    })
                    .catch(e => console.log('Error starting GoogleAnalytics', e));
            })
        }
        // $state.go('app.action',{fixture_id: this.fixture_id, roundNo: this.stateRoundNo, homeTeamScore: this.totalHoMeScores, awayTeamScore : this.totalAwAyScores, match_status:this.statusName});
    }
    goTostats() {
        //test
        this.pamentshow = 1;
        //  this.gotostatspage();
        //
        this.platform.ready().then(() => {
            this.ga.startTrackerWithId('UA-118996199-1')
                .then(() => {
                    console.log('Google analytics is ready now');
                    this.ga.trackView('Stats - Teams');
                    this.ga.trackTiming('Stats - Teams', 1000, 'Duration', 'Time');
                    this.ga.trackEvent('Advertisement', 'Viewed', 'Stats - Teams', 1);
                })
                .catch(e => console.log('Error starting GoogleAnalytics', e));
        })
        this.statschoose2 = 'team';
        clearInterval(this.id);
        clearInterval(this.scoreid);
        this.gotostatspage();
        // this.cmnfun.showLoading('Please wait...');
        // this.deviceData.device_id = this.localdata.GetDevice();
        // this.cmnfun.hideLoader();
        this.type = 'stats';
        this.statschoose = 'team';
        // this.deviceData.device_id = 'AD91526F-760C-470F-AAAv-957E45C92AD56';
        console.log(this.deviceData)
        // this.cmnfun.HideLoading();

    }


    // actionpage///////////////////////////////////////////
    getgamescorefeeds(res) {
        console.log('feed' + res.score_feed);

        this.actionScoreFeed1 = [];
        this.actionScoreFeed = res.score_feed;
        //console.log("Scroll"+ JSON.stringify(this.actionScoreFeed));
        this.actionScoreFeed.forEach(value => {
            //alert("Stat Title"+ value.stat_title);
            if (value.stat_title == 'Goals') {
                this.stat_title = 'Goal';

            } else if (value.stat_title == 'Rush Behinds') {
                this.stat_title = 'Rush Behind';

            } else if (value.stat_title == 'Behinds') {
                this.stat_title = 'Behind';

            } else if (value.stat_title != 'Goals' || value.stat_title != 'Rush Behinds' || value.stat_title == 'Behinds') {
                this.stat_title = value.stat_title;

            }
            this.actionScoreFeed1.push({
                quater: value.quater,
                act_time: value.act_time,
                stat_id: value.stat_id,
                team_type: value.team_type,
                stat_title: this.stat_title,
                player_image: value.player_image,
                player_name: value.player_name,
                quater_id: value.quater_id,
                fixture_id: value.fixture_id,
                quater_one_start: value.quater_one_start,
                quater_one_end: value.quater_one_end,
                quater_two_start: value.quater_two_start,
                quater_two_end: value.quater_two_end,
                quater_third_start: value.quater_third_start,
                quater_third_end: value.quater_third_end,
                quater_fourth_start: value.quater_fourth_start,
                quater_fourth_end: value.quater_fourth_end,
                created_at: value.created_at,
                updated_at: value.updated_at
            });

        });

        // console.log("Scroll team type"+ this.actionScoreFeed1);
    };
    getplayerscoreaction(res) {
        this.homeTeamData = res.homeTeam;
        //console.log("Home"+ JSON.stringify(this.homeTeamData.team_image));
        this.awayTeamData = res.awayTeam;
        ////console.log("away"+ JSON.stringify(this.awayTeamData.team_image));

        this.newTotalHomeTeamScore = res.totalHomeTeamScore;
        this.newTotalAwayTeamScore = res.totalAwayTeamScore;

        this.advertisementHeader = res.adv.headerAdv;
        /*Graph Code Start*/

        this.homeTeamScore = res.homeTeamScore;
        this.awayTeamScore = res.awayTeamScore;

        this.quaterEnd = [];
        this.quaterEnd = res.quaterEnd;


        let homeTeamScore_1 = res.homeTeamScore;
        let awayTeamScore_1 = res.awayTeamScore;
        let merged_1 = homeTeamScore_1.concat(awayTeamScore_1);
        //console.log("merged_1");
        //console.log( merged_1 );


        this.merged = this.homeTeamScore + this.awayTeamScore;
        //console.log("merged"+  this.merged );


        let scores = [];
        let i = 1, goalHScore = 0, rbBHscore = 0, totalHScore = 0, actualTime, splitTime, minuteVal, totalSec;

        let cmp2 = function (x, y) {
            return x > y ? 1 : x < y ? -1 : 0;
        };
        let cmp3 = function (x, y) {
            let data = x.split(":");
            let data_time1 = (parseInt(data[0]) * 60) + data[1];
            data = y.split(":");
            let data_time2 = (parseInt(data[0]) * 60) + data[1];
            return data_time1 > data_time2 ? 1 : data_time1 < data_time2 ? -1 : 0;

        };

        merged_1.sort(function (a, b) {
            //console.log("hh");
            //console.log(a);
            //console.log(b);
            //note the minus before -cmp, for descending order
            return cmp2(
                [cmp2(a.quater, b.quater), cmp2(a.act_time, b.act_time)],
                [cmp2(b.quater, a.quater), cmp3(b.act_time, a.act_time)]
            );
        });

        //console.log("++++++++++++++++++++");
        // //console.log(merged_1);
        this.newMerge = [];
        this.merged = merged_1;

        //   angular.forEach( this.merged, function(value5, key5) {
        this.merged.forEach(value5 => {
            if (value5.stat_id == '1' || value5.stat_id == '2' || value5.stat_id == '3')
                this.newMerge.push(value5);

        });
        console.log("this.newMerge" + this.newMerge);

        console.log('==old merged ARRAY==');
        //console.log(this.merged);
        //console.log(this.merged.length);
        // console.log('======');
        // console.log('==new merged ARRAY==');
        //console.log(  this.newMerge);
        //console.log(  this.newMerge.length);
        //let res;

        let quaterHScore = ["0.0", "0.0", "0.0", "0.0"];
        let quaterAScore = ["0.0", "0.0", "0.0", "0.0"];
        let finalQr = 0;
        let timeTotalGlobal = 0;
        let qrTimeLimit = Array();
        let flagchk = true;
        let temp = 1;
        let tempMin = 0;
        let maxScore = 0;
        let tempQr = 1;
        let tempValue = 0;
        let minSore = 0;
        let minScore = 0;
        let timeDuration = 20;

        //   angular.forEach(this.newMerge, function( value3 ,key3) {
        this.newMerge.forEach((value3, key3) => {
            if (flagchk) {
                qrTimeLimit[0] = 0;
                flagchk = false;
                tempMin = 0;
                qrTimeLimit[temp] = 1;

            }
            else {
                if (temp != value3.quater) {
                    temp = value3.quater;
                    let actualTime2 = this.newMerge[key3 - 1].act_time;
                    let actualTime1 = actualTime2.split(":");
                    qrTimeLimit[temp] = parseInt(qrTimeLimit[temp - 1]) + (parseInt(actualTime1[0]) * 60) + parseInt(actualTime1[1]);
                }
            }


            finalQr = value3.quater;
            actualTime = value3.act_time;

            splitTime = actualTime.split(":");

            minuteVal = splitTime[1];
            totalSec = (minuteVal / 60).toFixed(2);

            let addQrTime = (value3.quater - 1) * timeDuration * 60;
            timeTotalGlobal = parseInt((splitTime[0] * 60) + (splitTime[1]) + (addQrTime));
            if ((value3.team_type) == 'home') {
                if (value3.quater == '1') {
                    if (value3.stat_id == '1') {
                        // goalHScore+=6;
                        goalHScore = goalHScore + 6;

                    }
                    else {
                        //rbBHscore+=1;
                        rbBHscore = rbBHscore + 1;
                    }
                }
                else if (value3.quater == '2') {
                    if (value3.stat_id == '1') {
                        //goalHScore+=6;
                        goalHScore = goalHScore + 6;

                    }
                    else {
                        // rbBHscore+=1;
                        rbBHscore = rbBHscore + 1;
                    }
                }
                else if (value3.quater == '3') {
                    if (value3.stat_id == '1') {
                        // goalHScore+=6;
                        goalHScore = goalHScore + 6
                    }
                    else {
                        //rbBHscore+=1;
                        rbBHscore = rbBHscore + 1;
                    }
                }
                else if (value3.quater == '4') {
                    if (value3.stat_id == '1') {
                        //goalHScore+=6;
                        goalHScore = goalHScore + 6;
                    }
                    else {
                        // rbBHscore+=1;
                        rbBHscore = rbBHscore + 1;
                    }
                }
                totalHScore = goalHScore + rbBHscore;
                scores.push([timeTotalGlobal, totalHScore]);
                if (maxScore < totalHScore)
                    maxScore = totalHScore;
                if (totalHScore <= 0) {
                    if (minScore > totalHScore)
                        minScore = totalHScore;
                }
            }
            else {
                if (value3.quater == '1') {
                    if (value3.stat_id == '1') {
                        // goalHScore-=6;
                        goalHScore = goalHScore - 6;
                    }
                    else {
                        //rbBHscore-=1;
                        rbBHscore = rbBHscore - 1;
                    }
                }
                else if (value3.quater == '2') {
                    if (value3.stat_id == '1') {
                        //goalHScore-=6;
                        goalHScore = goalHScore - 6;
                    }
                    else {
                        //rbBHscore-=1;
                        rbBHscore = rbBHscore - 1;
                    }
                }
                else if (value3.quater == '3') {
                    if (value3.stat_id == '1') {
                        //goalHScore-=6;
                        goalHScore = goalHScore - 6;
                    }
                    else {
                        // rbBHscore-=1;
                        rbBHscore = rbBHscore - 1;
                    }
                }
                else if (value3.quater == '4') {
                    if (value3.stat_id == '1') {
                        //goalHScore-=6;
                        goalHScore = goalHScore - 6;
                    }
                    else {
                        rbBHscore -= 1;
                        rbBHscore = rbBHscore - 1;
                    }
                }
                totalHScore = goalHScore + rbBHscore;
                scores.push([timeTotalGlobal, totalHScore]);
                if (maxScore < totalHScore)
                    maxScore = totalHScore;
                if (totalHScore <= 0) {
                    if (minScore > totalHScore)
                        minScore = totalHScore;
                }
            }


            i += 1;

        });
        //console.log("scores"+scores);




        let ticks1 = [];
        if ((quaterAScore[0] !== '0.0') || (quaterHScore[0] !== '0.0')) {
            if (qrTimeLimit.length > 0) {
                ticks1 = [[30, 'Q1']];
                //ticks1=ticks1/2;
                //if($('#q1AwayScore').html()=='-')
                if (this.q1AwayScore == '-') {
                    //$('#q1AwayScore').html(quaterAScore[0]);
                    this.q1AwayScore = quaterAScore[0];
                }
                //if($('#q1HomeScore').html()=='-')
                if (this.q1HomeScore == '-') {
                    //$('#q1HomeScore').html(quaterHScore[0]);
                    this.q1HomeScore = quaterHScore[0];
                }

            }
        }
        else {
            // if($('#q1AwayScore').html()=='-')
            if (this.q1AwayScore == '-') {
                this.q1AwayScore = quaterAScore[0];
            }
            // if($('#q1HomeScore').html()=='-')
            if (this.q1HomeScore == '-') {
                this.q1HomeScore = quaterHScore[0];
            }
        }
        if ((quaterAScore[1] !== '0.0') || (quaterHScore[1] !== '0.0')) {
            if (qrTimeLimit.length > 1) {
                ticks1 = [[360, 'Q1'], [qrTimeLimit[1], 'Q2']];
                //if($('#q2AwayScore').html()=='-')
                if (this.q2AwayScore == '-') {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    let q2ATotal = q2G + "." + q2RB;
                    // $('#q2AwayScore').html(q2ATotal);
                    this.q2AwayScore = q2ATotal;

                }
                //if($('#q2HomeScore').html()=='-')
                if (this.q2HomeScore == '-') {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    let q2HTotal = q2G + "." + q2RB;
                    //  $('#q2HomeScore').html(q2HTotal);
                    this.q2HomeScore = q2HTotal;
                }

            }
        }
        if ((quaterAScore[2] !== '0.0') || (quaterHScore[2] !== '0.0')) {
            if (qrTimeLimit.length > 2) {
                ticks1 = [[0, 'Q1'], [qrTimeLimit[1], 'Q2'], [qrTimeLimit[2], 'Q3']];
                //if($('#q3AwayScore').html()=='-')
                if (this.q3AwayScore == '-') {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q3Score = quaterAScore[2].split(".");
                    let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    let q3ATotal = q3G + "." + q3RB;
                    // $('#q3AwayScore').html(q3ATotal);
                    this.q3AwayScore = q3ATotal;
                }
                //if($('#q3HomeScore').html()=='-')
                if (this.q3HomeScore == '-') {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q3Score = quaterHScore[2].split(".");
                    let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    let q3Htotal = q3G + "." + q3RB;
                    //$('#q3HomeScore').html(q3Htotal);
                    this.q3HomeScore = q3Htotal;
                }

            }
        }
        if ((quaterAScore[3] !== '0.0') || (quaterHScore[3] !== '0.0')) {
            if (qrTimeLimit.length > 3) {

                ticks1 = [[0, 'Q1'], [qrTimeLimit[2], 'Q2'], [qrTimeLimit[3], 'Q3'], [qrTimeLimit[4], 'Q4']];
                //alert($('#q4HomeScore').html());
                // if($('#q4AwayScore').html()=='-')
                if (this.q4AwayScore == '-') {
                    let q1Score = quaterAScore[0].split(".");
                    let q2Score = quaterAScore[1].split(".");
                    let q3Score = quaterAScore[2].split(".");
                    let q4Score = quaterAScore[3].split(".");
                    let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    let q4ATotal = q4G + "." + q4RB;
                    //$('#q4AwayScore').html(q4ATotal);
                    this.q4AwayScore = q4ATotal;
                }
                //if($('#q4HomeScore').html()=='-')
                if (this.q4HomeScore == '-') {
                    let q1Score = quaterHScore[0].split(".");
                    let q2Score = quaterHScore[1].split(".");
                    let q3Score = quaterHScore[2].split(".");
                    let q4Score = quaterHScore[3].split(".");
                    let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    let q4Htotal = q4G + "." + q4RB;
                    //$('#q4HomeScore').html(q4Htotal);
                    this.q4HomeScore = q4Htotal;

                }

            }
        }
        //console.log("len ::"+qrTimeLimit.length);

        if (Math.abs(minScore) > maxScore) maxScore = Math.abs(minScore);

        maxScore = maxScore + 5;
        let modifedScore = [[0, 0]];
        let lastTempValue = 0;
        // angular.forEach(scores,function(item,index)
        scores.forEach((item, index) => {

            modifedScore.push([item[0], lastTempValue]);
            modifedScore.push([item[0], item[1]]);

            lastTempValue = item[1];



        });

        /*angular.forEach(this.quaterEnd, function(value,index){
                            //alert(value.quater+"---"+index);
                            this.endQuarterValue = value.quater;
                    });
            //alert(this.endQuarterValue);

        if(this.endQuarterValue == 1)
            modifedScore.push([timeDuration*1*60,lastTempValue]);

        if(this.endQuarterValue == 2)
            modifedScore.push([timeDuration*2*60,lastTempValue]);

        if(this.endQuarterValue == 3)
            modifedScore.push([timeDuration*3*60,lastTempValue]);

        if(this.endQuarterValue == 4)
            modifedScore.push([timeDuration*4*60,lastTempValue]);
        */

    };
    actionpage() {
        clearInterval(this.id);
        let secondloader = 0;
        this.showcontent = 'hide';
        this.cmnfun.showLoader('Please wait...');
        this.ajax.datalist('get-game-score-feeds', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Home'
        }).subscribe((res) => {
            // if(secondloader == 0){
            //   this.cmnfun.hideLoader();
            //   secondloader++;
            // }
            this.getgamescorefeeds(res);
        }, error => {
            this.cmnfun.hideLoader();
            this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
        this.shortGraph = 1;
        this.fullGraph = 0;
        this.graphImgShowHide = 1;
        this.shortAdvhideshow = 1;
        this.headerImg = 0;
        this.ajax.datalist('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Home'
        }).subscribe((res) => {
            this.getplayerscoreaction(res);
            if (secondloader == 0) {
                this.cmnfun.hideLoader();
                secondloader++;
            }
        }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
        this.graphRefresh();

        if (this.statusName == 'COMPLETE') {
            clearInterval(this.id);
        } else {
            //alert("live=="+$stateParams.match_status)
            this.id = setInterval(() => {
                this.ajax.datalist('get-game-score-feeds', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: this.fixture_id,
                    adv_title: 'Home'
                }).subscribe((res) => {
                    this.getgamescorefeeds(res);
                }, error => {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                })
                this.ajax.datalist('get-player-score', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: this.fixture_id,
                    adv_title: 'Home'
                }).subscribe((res) => {
                    this.getplayerscoreaction(res);
                }, error => {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                })
                this.graphRefresh();
            }, 15000);

        }

    }
    graphRefresh() {

        // $(document).ready(function(e) {
        this.showcontent = 'show';
        //START:Ajax Function
        // http://queenzend.com/yjfl/score/default/get-player-score
        // http://queenzend.com/yjfl/score/matchscore/get-player-score
        // http://smjfllive.com.au/score/matchscore/get-player-score
        this.ajax.postaction('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Game Details'
        }).subscribe((data: any) => {
            this.cmnfun.hideLoader();
            this.data = data
            this.matchStatus = this.data.fixureData.status;
            let response = JSON.stringify(data);

            this.newTotalHomeTeamScore = this.data.totalHomeTeamScore;
            this.newTotalAwayTeamScore = this.data.totalAwayTeamScore;

            this.quaterEnd = [];
            this.quaterEnd = this.data.quaterEnd;


            if (response != null) {
                //START:HOME TEAM DATA
                if (this.data.homeTeamScore != null) {
                    let quaterHScore = ["0.0", "0.0", "0.0", "0.0"];
                    //START:Home TEam SCORE EACH FUNCTIon
                    $.each(this.data.homeTeamScore, function (key, obj) {

                        if (obj.stat_id == 1 || obj.stat_id == 2 || obj.stat_id == 3) {
                            if (obj.stat_id == 1) //calculation for total goal
                            {
                                let Q = obj.quater;
                                let totaValQ1 = quaterHScore[Q - 1];
                                //alert(totaValQ);
                                if (Q == 1) {

                                    totaValQ1 = quaterHScore[0];
                                    let totaValQ = totaValQ1.split(".");
                                    let totaQG = parseInt(totaValQ[0]) + 1;
                                    let totalValQ1RB = parseInt(totaValQ[1]);
                                    quaterHScore[0] = totaQG + "." + totalValQ1RB;

                                }
                                else if (Q == 2) {

                                    //quarter2 cal
                                    let totaValQ1 = quaterHScore[1];
                                    let totaValQ2 = totaValQ1.split(".");
                                    let totaQ2G = parseInt(totaValQ2[0]) + 1;
                                    quaterHScore[1] = totaQ2G + "." + totaValQ2[1];

                                }
                                else if (Q == 3) {

                                    //quarter3 cal
                                    let totaValQ4 = quaterHScore[2];
                                    let totaValQ3 = totaValQ4.split(".");
                                    let totaQ3G = parseInt(totaValQ3[0]) + 1;
                                    quaterHScore[2] = totaQ3G + "." + totaValQ3[1];

                                }
                                else if (Q == 4) {

                                    //quarter4 cal
                                    let totaValQ5 = quaterHScore[3];
                                    let totaValQ4 = totaValQ5.split(".");
                                    let totaQ4G = parseInt(totaValQ4[0]) + 1;
                                    quaterHScore[3] = totaQ4G + "." + totaValQ4[1];

                                }

                            }//END:calculation for total goal
                            else //calculation for total RB
                            {

                                //Calulation for display total quarter values in
                                let Q = obj.quater;
                                let totaValQ1 = quaterHScore[Q - 1];
                                //alert(totaValQ);
                                if (Q == 1) {
                                    //totaValQ = "0.0";
                                    totaValQ1 = quaterHScore[0];
                                    let totaValQ = totaValQ1.split(".");
                                    let totaQG = parseInt(totaValQ[0]);
                                    let totalValQ1RB = parseInt(totaValQ[1]) + 1;
                                    quaterHScore[0] = totaQG + "." + totalValQ1RB;


                                }
                                else if (Q == 2) {

                                    //quarter2 cal
                                    let totaValQ3 = quaterHScore[1];
                                    let totaValQ2 = totaValQ3.split(".");
                                    let RBQ2 = parseInt(totaValQ2[1]);
                                    RBQ2++;
                                    let totaQ2G = parseInt(totaValQ2[0]);
                                    quaterHScore[1] = totaQ2G + "." + RBQ2;

                                }
                                else if (Q == 3) {

                                    //quarter3 cal
                                    let totaValQ4 = quaterHScore[2];
                                    let totaValQ3 = totaValQ4.split(".");
                                    let totaQ3G = parseInt(totaValQ3[0]);
                                    let RBQ3 = parseInt(totaValQ3[1]);
                                    RBQ3++;
                                    quaterHScore[2] = totaQ3G + "." + RBQ3;

                                }
                                else if (Q == 4) {

                                    //quarter4 cal
                                    let totaValQ5 = quaterHScore[3];
                                    let totaValQ4 = totaValQ5.split(".");
                                    let totaQ4G = parseInt(totaValQ4[0]);
                                    let RBQ4 = parseInt(totaValQ4[1]);
                                    RBQ4++;
                                    quaterHScore[3] = totaQ4G + "." + RBQ4;

                                }

                            }//calculation for total RB
                        }

                        //START:total scores calculations
                        //console.log('Home Team Scores');console.log('q1-'+quaterHScore[0]); console.log('q2-'+quaterHScore[1]); console.log('q3-'+quaterHScore[2]); console.log('q4-'+quaterHScore[3]);  console.log('-----');
                        if (quaterHScore[0] !== '0.0') {
                            $("#q1HomeScore").html(quaterHScore[0]);
                        }
                        else {
                            $("#q1HomeScore").html('-');
                        }
                        //for q2 score
                        if (quaterHScore[1] !== '0.0') {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            let q12Total = q2G + "." + q2RB;
                            //console.log(q12Total);
                            $("#q2HomeScore").html(q12Total);
                            $('.totalHomeQuarerScore').html(q12Total);
                        }
                        else {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            let q2HTotal = q2G + "." + q2RB;
                            $('.totalHomeQuarerScore').html(q2HTotal);
                            $("#q2HomeScore").html('-');
                        }
                        //END:q2 score

                        //For q3 score
                        if (quaterHScore[2] !== '0.0') {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q3Score = quaterHScore[2].split(".");
                            let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            let q3Total = q3G + "." + q3RB;
                            $("#q3HomeScore").html(q3Total);
                            $('.totalHomeQuarerScore').html(q3Total);
                        }
                        else {

                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q3Score = quaterHScore[2].split(".");
                            let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            let q3Htotal = q3G + "." + q3RB;
                            $('.totalHomeQuarerScore').html(q3Htotal);
                            $("#q3HomeScore").html('-');
                        }
                        //END:q3 score

                        //For q4 score
                        if (quaterHScore[3] !== '0.0') {

                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q3Score = quaterHScore[2].split(".");
                            let q4Score = quaterHScore[3].split(".");
                            let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            let q4Total = q4G + "." + q4RB;
                            $("#q4HomeScore").html(q4Total);
                            $('.totalHomeQuarerScore').html(q4Total);
                        }
                        else {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q3Score = quaterHScore[2].split(".");
                            let q4Score = quaterHScore[3].split(".");
                            let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            let q4Htotal = q4G + "." + q4RB;
                            $('.totalHomeQuarerScore').html(q4Htotal);
                            $("#q4HomeScore").html('-');
                        }
                        //END:q3 score

                        //To display total scores

                        if (quaterHScore[0] !== '0.0') {
                            let q1Score = quaterHScore[0].split(".");
                            let q1HTot: any = (parseInt(q1Score[0]) * 6) + parseInt(q1Score[1]);
                            $('.totalHoMeScores').html(q1HTot);
                            //console.log('q1-'+q1HTot);

                        }
                        if (quaterHScore[1] !== '0.0') {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            let q2HTot: any = q2G * 6 + q2RB;
                            $('.totalHoMeScores').html(q2HTot);
                            //console.log('q2-'+q2HTot);
                        }
                        if (quaterHScore[2] !== '0.0') {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q3Score = quaterHScore[2].split(".");
                            let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            let q3HTot: any = q3G * 6 + q3RB;
                            $('.totalHoMeScores').html(q3HTot);
                            //console.log('q3-'+q3HTot);
                        }
                        if (quaterHScore[3] !== '0.0') {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q3Score = quaterHScore[2].split(".");
                            let q4Score = quaterHScore[3].split(".");
                            let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            let q4HTot: any = q4G * 6 + q4RB;
                            $('.totalHoMeScores').html(q4HTot);
                            //console.log('q4-'+q4HTot);
                        }
                        //END:total scores calculations

                        //END:genrate home team players score


                    });//END:Home TEam SCORE EACH FUNCTIon

                }
                //END:HOME TEAM DATA

                //START:AWAY TEAM DATA
                let quaterAScore = ["0.0", "0.0", "0.0", "0.0"];
                let quaterHScore = ["0.0", "0.0", "0.0", "0.0"];
                if (data.awayTeamScore != null) {

                    $.each(data.awayTeamScore, function (key, obj) {
                        if (obj.stat_id == 1 || obj.stat_id == 2 || obj.stat_id == 3) {
                            if (obj.stat_id == 1) {
                                let Q = obj.quater;
                                let totaValQ1 = quaterAScore[Q - 1];
                                //alert(totaValQ);
                                if (Q == 1) {
                                    //totaValQ = "0.0";
                                    totaValQ1 = quaterAScore[0];
                                    let totaValQ = totaValQ1.split(".");
                                    let totaQG = parseInt(totaValQ[0]) + 1;
                                    let totalValQ1RB = parseInt(totaValQ[1]);
                                    quaterAScore[0] = totaQG + "." + totalValQ1RB;
                                    //$('#q1HomeScore').html(quaterHScore[Q-1]);

                                }
                                else if (Q == 2) {

                                    //quarter2 cal
                                    let totaValQ3 = quaterAScore[1];
                                    let totaValQ2 = totaValQ3.split(".");
                                    let totaQ2G = parseInt(totaValQ2[0]) + 1;
                                    quaterAScore[1] = totaQ2G + "." + totaValQ2[1];

                                }
                                else if (Q == 3) {

                                    //quarter3 cal
                                    let totaValQ4 = quaterAScore[2];
                                    let totaValQ3 = totaValQ4.split(".");
                                    let totaQ3G = parseInt(totaValQ3[0]) + 1;
                                    quaterAScore[2] = totaQ3G + "." + totaValQ3[1];

                                }
                                else if (Q == 4) {

                                    //quarter4 cal
                                    let totaValQ5 = quaterAScore[3];
                                    let totaValQ4 = totaValQ5.split(".");
                                    let totaQ4G = parseInt(totaValQ4[0]) + 1;
                                    quaterAScore[3] = totaQ4G + "." + totaValQ4[1];

                                }

                                //END:Calulation for display total quarter values in


                            }
                            else {

                                //Calulation for display total quarter values in
                                let Q = obj.quater;
                                let totaValQ1 = quaterAScore[Q - 1];
                                //alert(totaValQ);
                                if (Q == 1) {
                                    //totaValQ = "0.0";
                                    totaValQ1 = quaterAScore[0];
                                    let totaValQ = totaValQ1.split(".");
                                    let totaQG = parseInt(totaValQ[0]);
                                    let totalValQ1RB = parseInt(totaValQ[1]) + 1;
                                    quaterAScore[0] = totaQG + "." + totalValQ1RB;


                                }
                                else if (Q == 2) {

                                    //quarter2 cal
                                    let totaValQ3 = quaterAScore[1];
                                    let totaValQ2 = totaValQ3.split(".");
                                    let RBQ2 = parseInt(totaValQ2[1]);
                                    RBQ2++;
                                    let totaQ2G = parseInt(totaValQ2[0]);
                                    quaterAScore[1] = totaQ2G + "." + RBQ2;

                                }
                                else if (Q == 3) {

                                    //quarter3 cal
                                    let totaValQ4 = quaterAScore[2];
                                    let totaValQ3 = totaValQ4.split(".");
                                    let totaQ3G = parseInt(totaValQ3[0]);
                                    let RBQ3 = parseInt(totaValQ3[1]);
                                    RBQ3++;
                                    quaterAScore[2] = totaQ3G + "." + RBQ3;

                                }
                                else if (Q == 4) {

                                    //quarter4 cal
                                    let totaValQ5 = quaterAScore[3];
                                    let totaValQ4 = totaValQ5.split(".");
                                    let totaQ4G = parseInt(totaValQ4[0]);
                                    let RBQ4 = parseInt(totaValQ4[1]);
                                    RBQ4++;
                                    quaterAScore[3] = totaQ4G + "." + RBQ4;

                                }

                                //END:Calulation for display total quarter values in


                            }

                        }


                        //START:Away Team total scores calculations
                        //console.log('Away Team Scores');console.log('q1-'+quaterAScore[0]); console.log('q2-'+quaterAScore[1]); console.log('q3-'+quaterAScore[2]); console.log('q4-'+quaterAScore[3]);  console.log('-----');
                        if (quaterAScore[0] !== '0.0') {
                            $("#q1AwayScore").html(quaterAScore[0]);
                        }
                        else {
                            $("#q2AwayScore").html('0.0');
                        }
                        //for q2 score
                        if (quaterAScore[1] !== '0.0') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q12G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            let q12RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            let q12Total = q12G + "." + q12RB;
                            $("#q2AwayScore").html(q12Total);
                            $('.totalAwayQuarerScore').html(q12Total);
                        }
                        else {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            let q2ATotal = q2G + "." + q2RB;
                            $('.totalAwayQuarerScore').html(q2ATotal);
                            $("#q2AwayScore").html('-');
                        }
                        //END:q2 score

                        //For q3 score
                        if (quaterAScore[2] !== '0.0') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q3Score = quaterAScore[2].split(".");
                            let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            let q3Total = q3G + "." + q3RB;
                            $("#q3AwayScore").html(q3Total);
                            $('.totalAwayQuarerScore').html(q3Total);
                        }
                        else {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q3Score = quaterAScore[2].split(".");
                            let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            let q3ATotal = q3G + "." + q3RB;
                            $('.totalAwayQuarerScore').html(q3ATotal);
                            $("#q3AwayScore").html('-');
                        }
                        //END:q3 score

                        //For q4 score
                        if (quaterAScore[3] !== '0.0') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q3Score = quaterAScore[2].split(".");
                            let q4Score = quaterAScore[3].split(".");
                            let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            let q4Total = q4G + "." + q4RB;
                            $("#q4AwayScore").html(q4Total);
                            $('.totalAwayQuarerScore').html(q4Total);
                        }
                        else {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q3Score = quaterAScore[2].split(".");
                            let q4Score = quaterAScore[3].split(".");
                            let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            let q4ATotal = q4G + "." + q4RB;
                            $('.totalAwayQuarerScore').html(q4ATotal);
                            $("#q4AwayScore").html('-');
                        }
                        //END:q3 score

                        //To display total scores
                        if (quaterAScore[0] !== '0.0') {
                            let q1Score = quaterAScore[0].split(".");
                            let q1ATot: any = (parseInt(q1Score[0]) * 6) + parseInt(q1Score[1]);
                            $('.totalAwAyScores').html(q1ATot);
                        }
                        if (quaterAScore[1] !== '0.0') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            let q2ATot: any = (q2G * 6) + q2RB;
                            $('.totalAwAyScores').html(q2ATot);
                        }
                        if (quaterAScore[2] !== '0.0') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q3Score = quaterAScore[2].split(".");
                            let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            let q3ATot: any = (q3G * 6) + q3RB;
                            $('.totalAwAyScores').html(q3ATot);
                        }
                        if (quaterAScore[3] !== '0.0') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q3Score = quaterAScore[2].split(".");
                            let q4Score = quaterAScore[3].split(".");
                            let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            let q4ATot: any = (q4G * 6) + q4RB;
                            $('.totalAwAyScores').html(q4ATot);
                        }
                        //END:Away Team total scores calculations

                        //END:Away Team total scores calculations
                    });

                }//END:AWAY TEAM DATA

                //START:SCORE CHART GRAPH

                let homeTeamScore = (data.homeTeamScore);
                let awayTeamScore = (data.awayTeamScore);
                let merged = homeTeamScore.concat(awayTeamScore);

                let scores = [];
                let i = 1, goalHScore: any = 0, rbBHscore: any = 0, totalHScore: any = 0, goalAScore = 0, rbBAscore = 0, totalAScore = 0, actualTime: any, splitTime: any, minuteVal: any, totalSec;
                let newMerge = [];


                let cmp = function (x, y) {
                    return x > y ? 1 : x < y ? -1 : 0;
                };
                let cmp1 = function (x, y) {
                    data = x.split(":");
                    let data_time1: any = ((parseInt(data[0]) * 60) + data[1]);
                    data = y.split(":");
                    let data_time2: any = ((parseInt(data[0]) * 60) + data[1]);
                    return data_time1 > data_time2 ? 1 : data_time1 < data_time2 ? -1 : 0;

                };

                //sort quater,act_time in ascending
                merged.sort(function (a, b) {
                    //note the minus before -cmp, for descending order
                    return cmp(
                        [cmp(a.quater, b.quater), cmp1(a.act_time, b.act_time)],
                        [cmp(b.quater, a.quater), cmp1(b.act_time, a.act_time)]
                    );
                });

                $.each(merged, function (key5, value5) {
                    if (value5.stat_id == '1' || value5.stat_id == '2' || value5.stat_id == '3')
                        newMerge.push(value5);

                });

                //console.log('==old merged ARRAY=='); console.log(merged);console.log(merged.length);console.log('======');console.log('==new merged ARRAY==');console.log(newMerge);console.log(newMerge.length);
                //let res;
                let finalQr = 0;
                let timeTotalGlobal = 0;
                let qrTimeLimit = Array();
                let flagchk = true;
                let temp = 1;
                let tempMin = 0;
                let maxScore: any = 0;
                let tempQr = 1;
                let tempValue = 0;
                let minSore = 0;
                let minScore = 0;
                let timeDuration = 26;
                $.each(newMerge, function (key3, value3) {

                    if (flagchk) {
                        qrTimeLimit[0] = 0; flagchk = false;
                        tempMin = 0;
                        qrTimeLimit[temp] = 1;

                    }
                    else {

                        if (temp != value3.quater) {



                            temp = value3.quater;

                            let actualTime1: any = newMerge[key3 - 1].act_time;
                            actualTime1 = actualTime1.split(":");


                            qrTimeLimit[temp] = parseInt(qrTimeLimit[temp - 1]) + (parseInt(actualTime1[0]) * 60) + parseInt(actualTime1[1]);


                        }
                    }
                    finalQr = value3.quater;
                    actualTime = value3.act_time;
                    splitTime = actualTime.split(":");
                    minuteVal = splitTime[1];
                    totalSec = (minuteVal / 60).toFixed(2);
                    /*
                       if(tempQr == value3.quater)
                       {
                           timeTotalGlobal=parseInt(parseInt(splitTime[0]*60)+parseInt(splitTime[1])+parseInt(tempMin));
                           //console.log("tempMin Q"+value3.quater+" "+tempMin);
                          // console.log('tempQr eq='+timeTotalGlobal);
                          //console.log("================");
                       }
                       else
                       {
                            tempQr =  value3.quater;
                            tempMin = timeTotalGlobal;
                            timeTotalGlobal= parseInt(parseInt(tempMin) + parseInt(splitTime[0]*60) + parseInt(splitTime[1]));
                            //console.log("tempMin- Q"+value3.quater+" "+tempMin);
                            //console.log('tempQr neq='+timeTotalGlobal);
                            //console.log("================");
                
                       }*/

                    let addQrTime: any = (value3.quater - 1) * timeDuration * 60;
                    timeTotalGlobal = ((parseInt(splitTime[0]) * 60) + parseInt(splitTime[1]) + parseInt(addQrTime));

                    if ((value3.team_type) == 'home') {
                        if (value3.quater == '1') {
                            if (value3.stat_id == '1') {
                                // goalHScore+=6;
                                goalHScore = parseInt(goalHScore) + 6;

                            }
                            else {
                                //rbBHscore+=1;
                                rbBHscore = parseInt(rbBHscore) + 1;
                            }
                        }
                        else if (value3.quater == '2') {
                            if (value3.stat_id == '1') {
                                //goalHScore+=6;
                                goalHScore = parseInt(goalHScore) + 6;

                            }
                            else {
                                // rbBHscore+=1;
                                rbBHscore = parseInt(rbBHscore) + 1;
                            }
                        }
                        else if (value3.quater == '3') {
                            if (value3.stat_id == '1') {
                                // goalHScore+=6;
                                goalHScore = parseInt(goalHScore) + 6;
                            }
                            else {
                                //rbBHscore+=1;
                                rbBHscore = parseInt(rbBHscore) + 1;
                            }
                        }
                        else if (value3.quater == '4') {
                            if (value3.stat_id == '1') {
                                //goalHScore+=6;
                                goalHScore = parseInt(goalHScore) + 6;
                            }
                            else {
                                // rbBHscore+=1;
                                rbBHscore = parseInt(rbBHscore) + 1;
                            }
                        }
                        totalHScore = parseInt(goalHScore + rbBHscore);
                        scores.push([timeTotalGlobal, totalHScore]);
                        if (maxScore < totalHScore)
                            maxScore = totalHScore;
                        if (totalHScore <= 0) {
                            if (minScore > totalHScore)
                                minScore = totalHScore;
                        }
                    }
                    else {
                        if (value3.quater == '1') {
                            let q1Flag = true;
                            if (value3.stat_id == '1') {
                                // goalHScore-=6;
                                goalHScore = parseInt(goalHScore) - 6;
                            }
                            else {
                                //rbBHscore-=1;
                                rbBHscore = parseInt(rbBHscore) - 1;
                            }
                        }
                        else if (value3.quater == '2') {
                            let q2Flag = true;
                            if (value3.stat_id == '1') {
                                //goalHScore-=6;
                                goalHScore = parseInt(goalHScore) - 6;
                            }
                            else {
                                //rbBHscore-=1;
                                rbBHscore = parseInt(rbBHscore) - 1;
                            }
                        }
                        else if (value3.quater == '3') {
                            let q3Flag = true;
                            if (value3.stat_id == '1') {
                                //goalHScore-=6;
                                goalHScore = parseInt(goalHScore) - 6;
                            }
                            else {
                                // rbBHscore-=1;
                                rbBHscore = parseInt(rbBHscore) - 1;
                            }
                        }
                        else if (value3.quater == '4') {
                            let q4Flag = true;
                            if (value3.stat_id == '1') {
                                //goalHScore-=6;
                                goalHScore = parseInt(goalHScore) - 6;
                            }
                            else {
                                rbBHscore -= 1;
                                rbBHscore = parseInt(rbBHscore) - 1;
                            }
                        }
                        totalHScore = parseInt(goalHScore + rbBHscore);
                        scores.push([timeTotalGlobal, totalHScore]);
                        if (maxScore < totalHScore)
                            maxScore = totalHScore;
                        if (totalHScore <= 0) {
                            if (minScore > totalHScore)
                                minScore = totalHScore;
                        }
                    }


                    i += 1;

                });
                //console.log(scores);


                //console.log(maxScore);
                let ticks1 = [];
                if ((quaterAScore[0] !== '0.0') || (quaterHScore[0] !== '0.0')) {
                    if (qrTimeLimit.length > 0) {
                        ticks1 = [[30, 'Q1']];
                        //ticks1=ticks1/2;
                        if ($('#q1AwayScore').html() == '-') {

                            $('#q1AwayScore').html(quaterAScore[0]);
                        }
                        if ($('#q1HomeScore').html() == '-') {
                            $('#q1HomeScore').html(quaterHScore[0]);
                        }

                    }
                }
                else {
                    if ($('#q1AwayScore').html() == '-') {
                        $('#q1AwayScore').html(quaterAScore[0]);
                    }
                    if ($('#q1HomeScore').html() == '-') {
                        $('#q1HomeScore').html(quaterHScore[0]);
                    }
                }
                if ((quaterAScore[1] !== '0.0') || (quaterHScore[1] !== '0.0')) {
                    if (qrTimeLimit.length > 1) {
                        ticks1 = [[360, 'Q1'], [qrTimeLimit[1], 'Q2']];
                        if ($('#q2AwayScore').html() == '-') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            let q2ATotal = q2G + "." + q2RB;
                            $('#q2AwayScore').html(q2ATotal);
                        }
                        if ($('#q2HomeScore').html() == '-') {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            let q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            let q2HTotal = q2G + "." + q2RB;
                            $('#q2HomeScore').html(q2HTotal);
                        }

                    }
                }
                if ((quaterAScore[2] !== '0.0') || (quaterHScore[2] !== '0.0')) {
                    if (qrTimeLimit.length > 2) {
                        ticks1 = [[0, 'Q1'], [qrTimeLimit[1], 'Q2'], [qrTimeLimit[2], 'Q3']];
                        if ($('#q3AwayScore').html() == '-') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q3Score = quaterAScore[2].split(".");
                            let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            let q3ATotal = q3G + "." + q3RB;
                            $('#q3AwayScore').html(q3ATotal);
                        }
                        if ($('#q3HomeScore').html() == '-') {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q3Score = quaterHScore[2].split(".");
                            let q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            let q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            let q3Htotal = q3G + "." + q3RB;
                            $('#q3HomeScore').html(q3Htotal);
                        }

                    }
                }
                if ((quaterAScore[3] !== '0.0') || (quaterHScore[3] !== '0.0')) {
                    if (qrTimeLimit.length > 3) {
                        //  alert(qrTimeLimit[4]);

                        ticks1 = [[0, 'Q1'], [qrTimeLimit[2], 'Q2'], [qrTimeLimit[3], 'Q3'], [qrTimeLimit[4], 'Q4']];
                        //alert($('#q4HomeScore').html());
                        if ($('#q4AwayScore').html() == '-') {
                            let q1Score = quaterAScore[0].split(".");
                            let q2Score = quaterAScore[1].split(".");
                            let q3Score = quaterAScore[2].split(".");
                            let q4Score = quaterAScore[3].split(".");
                            let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            let q4ATotal = q4G + "." + q4RB;
                            $('#q4AwayScore').html(q4ATotal);
                        }
                        if ($('#q4HomeScore').html() == '-') {
                            let q1Score = quaterHScore[0].split(".");
                            let q2Score = quaterHScore[1].split(".");
                            let q3Score = quaterHScore[2].split(".");
                            let q4Score = quaterHScore[3].split(".");
                            let q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            let q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            let q4Htotal = q4G + "." + q4RB;
                            $('#q4HomeScore').html(q4Htotal);

                        }

                    }
                }

                //console.log("len ::"+qrTimeLimit.length);

                if (Math.abs(minScore) > maxScore) maxScore = Math.abs(minScore);

                maxScore = parseInt(maxScore + 5);
                let modifedScore = [[0, 0]];
                let lastTempValue = 0;
                $.each(scores, function (index, item) {
                    modifedScore.push([item[0], lastTempValue]);
                    modifedScore.push([item[0], item[1]]);

                    lastTempValue = item[1];



                });

                //console.log(modifedScore);
                //console.log(ticks1[3][0]);

                /*if($("#teamStatus").val()!=10)
                modifedScore.push([4800,lastTempValue]);
                //ticks1= [[0,'Q1'],[timeDuration*60,'Q2'],[timeDuration*2*60,'Q3'],[timeDuration*3*60,'Q4']];
                ticks1= [[0,''],[timeDuration*60,'Q1'],[timeDuration*2*60,'Q2'],[timeDuration*3*60,'Q3'],[timeDuration*4*60,'Q4']];*/

                //if($("#teamStatus").val()==1)

                if ($("#teamStatus").val() == 1)
                    modifedScore.push([timeDuration * 4 * 60, lastTempValue]);


                // angular.forEach(this.quaterEnd, function(value,index){
                this.quaterEnd.forEach((value, key3) => {
                    //alert(value.quater+"---"+index);
                    this.endQuarterValue = value.quater;
                    this.stat_title = value.stat_title;
                });
                //alert(this.endQuarterValue +""+this.stat_title);

                if (this.endQuarterValue == 1 && this.stat_title == 'End')
                    modifedScore.push([timeDuration * 1 * 60, lastTempValue]);

                if (this.endQuarterValue == 2 && this.stat_title == 'End')
                    modifedScore.push([timeDuration * 2 * 60, lastTempValue]);

                if (this.endQuarterValue == 3 && this.stat_title == 'End')
                    modifedScore.push([timeDuration * 3 * 60, lastTempValue]);

                if (this.endQuarterValue == 4 && this.stat_title == 'End')
                    modifedScore.push([timeDuration * 4 * 60, lastTempValue]);

                if (this.stat_title == 'Start')
                    modifedScore.push([timeDuration * (this.endQuarterValue - 1) * 60, lastTempValue]);

                console.log(modifedScore);

                /*else if(matchStatus==1 && q1Flag == true)
                modifedScore.push([timeDuration*60,lastTempValue]);*/

                ticks1 = [[timeDuration * 60, 'Q1'], [timeDuration * 2 * 60, 'Q2'], [timeDuration * 3 * 60, 'Q3'], [timeDuration * 4 * 60, 'Q4']];
                let QtrScore = [[3.2], [2.3]];

                let options = {
                    canvas: false,
                    series: {
                        lines: { show: true, fill: false, lineWidth: 2 }
                    },
                    grid: {
                        color: 'transparent',

                        markings: [

                            { xaxis: { from: 0, to: timeDuration * 60 }, color: 'rgba(255, 255, 255, 1)' },
                            { xaxis: { from: timeDuration * 60, to: timeDuration * 2 * 60 }, color: 'rgba(255, 255, 255, 1)' },
                            { xaxis: { from: timeDuration * 2 * 60, to: timeDuration * 3 * 60 }, color: 'rgba(255, 255, 255, 1)' },
                            { xaxis: { from: timeDuration * 3 * 60, to: timeDuration * 4 * 60 }, color: 'rgba(255, 255, 255, 1)' }
                        ]

                    },
                    yaxis: { min: -maxScore, max: maxScore, position: "right", color: "rgb(111,124,148)" },
                    tooltip: true,
                    xaxis: {
                        ticks: ticks1, min: 0, max: timeDuration * 4 * 60, color: "rgb(111,124,148)",
                        font: { color: 'rgb(121,133,155)', family: 'Gotham-Bold', size: 10 }
                    },
                    colors: ["rgb(33,186,38)"],
                };
                // alert("hh");
                console.log(ticks1);
                console.log(modifedScore);
                $.plot($("#scoreChart"), [{ data: modifedScore }], options);
                $.plot($("#scoreChartmin"), [{ data: modifedScore }], options);

                $("#scoreChartmin").hide();
                $("#scoreChartminh").hide();

                //END:SCORE CHART GRAPH
                $(".tickLabel").each(function () {
                    let removeMinusText = $(this).text();
                    $(this).text(removeMinusText.replace("-", ""));

                })

                //END:DISPLAY TEAM WIN STATUS

            }//END:RESPONSE NULL OR NOT


        }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            let msg = "Sorry but there was an error: ";
        });

        //END:Ajax Function

        // });

    }

    // statspage///////////////////////////////////////////////////////////////
    gotostatspage() {

        let loaderCount = 0;

        console.log('gotostat');
        // clearInterval(this.id);
        this.cmnfun.showLoader('Please wait...');
        this.ajax.postaction('get-player-score-for-stat-team', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            quaters: this.selectedOption,
            adv_title: 'Stats-Club'
        }).subscribe((res) => {
            if (loaderCount === 0) {
                this.cmnfun.hideLoader();
                loaderCount++;
            }

            this.getplayerscoreforstatteam(res);
        }, error => {
            this.cmnfun.hideLoader();
            this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })

        this.homeTeamScoreStat = [];
        this.awayTeamScoreStat = [];
        this.showDataTable = false;
        if (this.statusName == 'COMPLETE') {
            //alert("complete=="+$stateParams.match_status)
            clearInterval(this.id);

        } else {
            //alert("live=="+$stateParams.match_status)
            this.id = setInterval(() => {
                // datalist
                this.ajax.postaction('get-player-score-for-stat-team', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: this.fixture_id,
                    quaters: this.selectedOption,
                    adv_title: 'Stats-Club'
                }).subscribe((res) => {
                    this.getplayerscoreforstatteam(res);
                }, error => {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                })
            }, 10000);

        }


    }
    // update function
    UpdateScores() {
        console.log('updates function');
        if (this.statusName == 'COMPLETE') {
            //alert("complete=="+$stateParams.match_status)
            clearInterval(this.id);

        } else {
            //alert("live=="+$stateParams.match_status)
            this.id = setInterval(() => {
                // datalist
                this.ajax.postaction('get-player-score-for-stat-team', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: this.fixture_id,
                    quaters: this.selectedOption,
                    adv_title: 'Stats-Club'
                }).subscribe((res) => {
                    this.getplayerscoreforstatteam(res);
                }, error => {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                })
            }, 10000);

        }
    }




    getplayerscoreforstatteam(data) {
        this.newTotalHomeTeamScore = data.totalHomeTeamScore;
        this.newTotalAwayTeamScore = data.totalAwayTeamScore;

        this.baseUrl = data.baseUrl;
        this.homeTeam = data.homeTeam;
        this.awayTeam = data.awayTeam;

        this.adv = data.adv.headerAdv;
        /*FOR TEAM TAB*/

        this.homeTeam = data.homeTeam;
        this.awayTeam = data.awayTeam;

        console.log("Home Stat" + JSON.stringify(this.homeTeam.team_abbrevation));
        console.log("away Stat" + JSON.stringify(this.awayTeam.team_abbrevation));
        console.log("Home" + JSON.stringify(this.homeTeam.team_image));
        console.log("away" + JSON.stringify(this.awayTeam.team_image));

        this.stats = data.stats;

        /****************** new stat webservice ********************/

        this.awayTeamWithStatPoint = data.awayTeamWithStatPoint;
        this.homeTeamWithStatPoint = data.homeTeamWithStatPoint;

        /****************** new stat webservice ********************/
        this.homeTeamPlayers = data.homeTeamPlayers;;
        this.modifiedState = [
            "G",
            "B",
            "K",
            "H",
            "Disposals",
            "RB",
            "I50",
            "M",
            "T",
            "FF",
            "HO",
            "EFF",
            "TC",
            "CC",
            "SC",
            "BC"
        ];

        this.stats.push({
            id: "22",
            order_number: "19",
            points: "1",
            stat_abbrevation: "TC",
            stat_name: "Total Clearances"
        },
            {
                id: "23",
                order_number: "29",
                points: "1",
                stat_abbrevation: "CC",
                stat_name: "Centre Clearances"
            },
            {
                id: "24",
                order_number: "30",
                points: "1",
                stat_abbrevation: "SC",
                stat_name: "Stoppage Clearances"
            },
            {
                id: "25",
                order_number: "31",
                points: "1",
                stat_abbrevation: "BC",
                stat_name: "Boundary Clearances"
            },
        )

        // angular.forEach(this.modifiedState,function(item,index){
        this.modifiedState.forEach((item, index) => {
            //alert(item+"==="+index)
            if (this.homeTeamWithStatPoint[item] == undefined || this.homeTeamWithStatPoint[item] == 'undefined')
                this.homeTeamScoreStat[item] = 0;
            else
                this.homeTeamScoreStat[item] = this.homeTeamWithStatPoint[item];


            if (this.awayTeamWithStatPoint[item] == undefined || this.awayTeamWithStatPoint[item] == 'undefined')
                this.awayTeamScoreStat[item] = 0;
            else
                this.awayTeamScoreStat[item] = this.awayTeamWithStatPoint[item];
            //this.stat.push({name:index,count:0});

            if (item == 'Disposals') {
                this.homeTeamScoreStat['Disposals'] = this.homeTeamScoreStat['H'] + this.homeTeamScoreStat['K'];
                this.awayTeamScoreStat['Disposals'] = this.awayTeamScoreStat['H'] + this.awayTeamScoreStat['K'];
            }

            if (item == 'EFF') {

                /* this.hAdd = this.homeTeamScoreStat['G']+this.homeTeamScoreStat['B']+this.homeTeamScoreStat['RB'];
                this.effVal = this.homeTeamScoreStat['I50']
                this.hDiv =  parseInt(this.hAdd/this.effVal).toFixed(2);
                alert(this.hAdd+"=="+this.effVal+"=="+this.hDiv) */


                let hAdd = this.homeTeamScoreStat['G'] + this.homeTeamScoreStat['B'] + this.homeTeamScoreStat['RB'];
                let hEffVal = this.homeTeamScoreStat['I50'];
                let hDiv = hAdd / hEffVal;

                let aAdd = this.awayTeamScoreStat['G'] + this.awayTeamScoreStat['B'] + this.awayTeamScoreStat['RB'];
                let aEffVal = this.awayTeamScoreStat['I50'];
                let aDiv = aAdd / aEffVal;
                //alert(hAdd+"......"+hEffVal+"......"+hDiv)
                if (isNaN(hDiv) || hDiv == Infinity) {
                    hDiv = 0;
                    this.hEFF = (hDiv * 100).toFixed(2);
                    this.homeEFF = parseInt(this.hEFF.split('.')[0]);
                    this.homeEFFWidth = parseInt(this.hEFF.split('.')[0]);
                } else {
                    //alert(3)
                    this.hEFF = (hDiv * 100).toFixed(2);
                    //this.homeEFF =  parseInt(this.hEFF.split('.')[0]);
                    this.homeEFF = Math.round(this.hEFF);
                    this.homeEFFWidth = parseInt(this.hEFF.split('.')[0]);
                    //alert(this.hEFF+"=="+this.homeEFF+"=="+this.homeEFFWidth)
                }

                if (isNaN(aDiv) || aDiv == Infinity) {
                    aDiv = 0;
                    this.aEFF = (aDiv * 100).toFixed(2);
                    this.awayEFF = parseInt(this.aEFF.split('.')[0]);
                    this.awayEFFWidth = parseInt(this.aEFF.split('.')[0]);
                } else {
                    this.aEFF = (aDiv * 100).toFixed(2);
                    //this.awayEFF =  parseInt(this.aEFF.split('.')[0]);
                    this.awayEFF = Math.round(this.aEFF);
                    this.awayEFFWidth = parseInt(this.aEFF.split('.')[0]);
                    //alert(this.aEFF+"=="+this.awayEFF+"=="+this.awayEFFWidth)
                }

                if (this.homeEFF > this.awayEFF && this.homeEFF <= 100) {
                    this.hColor = 'green';
                    this.aColor = 'gray';
                } else if (this.homeEFF < this.awayEFF && this.awayEFF <= 100) {
                    this.aColor = 'green';
                    this.hColor = 'gray';
                } else if (this.homeEFF > this.awayEFF && this.homeEFF > 100) {
                    this.hColor = 'green';
                    this.aColor = 'gray';
                    this.homeEFFWidth = "100";
                } else if (this.homeEFF < this.awayEFF && this.awayEFF > 100) {
                    this.aColor = 'green';
                    this.hColor = 'gray';
                    this.awayEFFWidth = "100";
                } else if (this.homeEFF == 0 && this.awayEFF == 0) {
                    this.aColor = 'orange';
                    this.hColor = 'orange';
                } else if (this.homeEFF == this.awayEFF) {
                    this.aColor = 'orange';
                    this.hColor = 'orange';
                }

            }


        });

        this.homeTeamScoreStat['B'] = this.homeTeamScoreStat['B'] + this.homeTeamScoreStat['RB'];
        this.awayTeamScoreStat['B'] = this.awayTeamScoreStat['B'] + this.awayTeamScoreStat['RB'];




        this.modifiedStateSeq = [];
        // angular.forEach(this.modifiedState,function(item,index){
        this.modifiedState.forEach((item, index) => {
            // angular.forEach(this.stats , function(obj){
            this.stats.forEach((obj, index) => {
                // alert(JSON.stringify(obj))
                //   alert(item+"===="+JSON.stringify(obj))

                if (item == obj.stat_abbrevation) {


                    this.modifiedStateSeq.push(obj);

                }

            });



            if (item == 'Disposals') {
                this.homeTeamScoreStat['Disposals'] = this.homeTeamScoreStat['H'] + this.homeTeamScoreStat['K'];
                this.awayTeamScoreStat['Disposals'] = this.awayTeamScoreStat['H'] + this.awayTeamScoreStat['K'];

                let homeColor = '#60BA72';
                let awayColor = '#596682';

                // alert('hometeam :'+this.homeTeamScoreStat['Disposals']+' '+'Awayteam :'+ this.awayTeamScoreStat['Disposals'])

                if (this.homeTeamScoreStat['Disposals'] > this.awayTeamScoreStat['Disposals'] && this.homeTeamScoreStat['Disposals'] < 100) {

                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: homeColor, awayTeamColor: awayColor, awayTeamWidth: "51%", homeTeamWidth: "71%" });

                } else if ((this.homeTeamScoreStat['Disposals'] > this.awayTeamScoreStat['Disposals']) && (this.homeTeamScoreStat['Disposals'] >= 100 && this.homeTeamScoreStat['Disposals'] <= 150)) {

                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: homeColor, awayTeamColor: awayColor, awayTeamWidth: "75%", homeTeamWidth: "81%" });

                } else if (this.homeTeamScoreStat['Disposals'] > this.awayTeamScoreStat['Disposals'] && this.homeTeamScoreStat['Disposals'] > 200) {

                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: homeColor, awayTeamColor: awayColor, awayTeamWidth: "90%", homeTeamWidth: "96%" });

                } else if (this.homeTeamScoreStat['Disposals'] < this.awayTeamScoreStat['Disposals'] && this.awayTeamScoreStat['Disposals'] < 100) {
                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: awayColor, awayTeamColor: homeColor, awayTeamWidth: "71%", homeTeamWidth: "51%" });

                } else if ((this.homeTeamScoreStat['Disposals'] < this.awayTeamScoreStat['Disposals']) && (this.awayTeamScoreStat['Disposals'] >= 100 && this.awayTeamScoreStat['Disposals'] <= 150)) {
                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: awayColor, awayTeamColor: homeColor, awayTeamWidth: "81%", homeTeamWidth: "75%" });

                } else if (this.homeTeamScoreStat['Disposals'] < this.awayTeamScoreStat['Disposals'] && this.awayTeamScoreStat['Disposals'] > 200) {
                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: awayColor, awayTeamColor: homeColor, awayTeamWidth: "96%", homeTeamWidth: "90%" });

                } else if (this.homeTeamScoreStat['Disposals'] == this.awayTeamScoreStat['Disposals']) {
                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: 'orange', awayTeamColor: 'orange', awayTeamWidth: "51%", homeTeamWidth: "51%" });

                } else if (this.homeTeamScoreStat['Disposals'] < this.awayTeamScoreStat['Disposals'] && this.awayTeamScoreStat['Disposals'] < 200) {

                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: "#596682", awayTeamColor: "#60BA72", awayTeamWidth: "81%", homeTeamWidth: "51%" });

                } else if (this.homeTeamScoreStat['Disposals'] > this.awayTeamScoreStat['Disposals'] && this.homeTeamScoreStat['Disposals'] > 150 && this.awayTeamScoreStat['Disposals'] > 150) {

                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: "#60BA72", awayTeamColor: "#596682", homeTeamWidth: "96%", awayTeamWidth: "90%" });
                    //  hometeam greater 151 and awayteam 149.
                } else if (this.homeTeamScoreStat['Disposals'] > this.awayTeamScoreStat['Disposals'] && this.homeTeamScoreStat['Disposals'] > 150 && this.awayTeamScoreStat['Disposals'] < 150) {

                    this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: "#60BA72", awayTeamColor: "#596682", homeTeamWidth: "91%", awayTeamWidth: "51%" });
                    //  hometeam greater and awayteam less than 150.
                }
                //this.modifiedStateSeq.push({id:10000,stat_name:"Disposals",stat_abbrevation:"Disposals",homeTeamColor:"#60BA72",awayTeamColor:"#596682",awayTeamWidth:"51%",homeTeamWidth:"81.48148148148148%"});
            }

        });

        // angular.forEach(this.stats,function(item,index){
        this.stats.forEach((item, index) => {
            this.getColorWidth(index, this.homeTeamScoreStat[item.stat_abbrevation], this.awayTeamScoreStat[item.stat_abbrevation]);

        });

        // alert(JSON.stringify(this.modifiedStateSeq));
        console.log(this.modifiedStateSeq);
        console.log(this.homeTeamScoreStat['TC']);
        this.cmnfun.hideLoader();


    }
    getColorWidth(key, homeTeamValue, awayTeamValue) {

        let barValueH = homeTeamValue;
        let barValueA = awayTeamValue;
        let homeBarsSpanVal = homeTeamValue;
        let awayBarsSpanVal = awayTeamValue;


        if (homeBarsSpanVal > awayBarsSpanVal) {

            this.stats[key].homeTeamColor = '#60BA72';
            this.stats[key].awayTeamColor = '#596682';
            this.stats[key].homeTeamOnlyColor = 'green';
            this.stats[key].awayTeamOnlyColor = 'gray';
            let maxAway = 5;

            let modifedMaxValue: any = parseFloat(barValueH + maxAway);
            let percentageUnit: any = parseFloat(100 / modifedMaxValue);

            if (barValueA == 0)
                this.stats[key].awayTeamWidth = "22%";
            else {

                if (parseFloat(percentageUnit * barValueA) < 20)
                    this.stats[key].awayTeamWidth = "22%";
                else
                    this.stats[key].awayTeamWidth = parseFloat(percentageUnit * barValueA) + "%";
            }
            this.stats[key].homeTeamWidth = parseFloat(percentageUnit * barValueH) + "%";


        }
        else if (awayBarsSpanVal > homeBarsSpanVal) {

            this.stats[key].awayTeamColor = '#60BA72';
            this.stats[key].homeTeamColor = '#596682';
            this.stats[key].homeTeamOnlyColor = 'gray';
            this.stats[key].awayTeamOnlyColor = 'green';
            let maxAway = 5;


            let modifedMaxValue: any = parseFloat(barValueA + maxAway);
            modifedMaxValue = parseFloat(barValueA + maxAway);
            let percentageUnit = parseFloat(100 / modifedMaxValue);

            this.stats[key].awayTeamWidth = parseFloat(percentageUnit * barValueA) + "%";

            if (barValueH == 0)
                this.stats[key].homeTeamWidth = "22%";
            else {
                if (parseFloat(percentageUnit * barValueH) < 20)
                    this.stats[key].homeTeamWidth = "22%";
                else
                    this.stats[key].homeTeamWidth = parseFloat(percentageUnit * barValueH) + "%";
            }
        }

        else if ((awayBarsSpanVal == homeBarsSpanVal) && (awayBarsSpanVal != 0 || homeBarsSpanVal != 0)) {
            this.stats[key].awayTeamColor = 'Orange';
            this.stats[key].homeTeamColor = 'Orange';

            let maxAway = 5;
            let modifedMaxValue = parseFloat(awayBarsSpanVal + maxAway);

            let percentageUnit: any = parseFloat(100 / modifedMaxValue);
            this.stats[key].awayTeamWidth = parseFloat(percentageUnit * awayBarsSpanVal) + "%";
            this.stats[key].homeTeamWidth = parseFloat(percentageUnit * homeBarsSpanVal) + "%";
        }
        else if (awayBarsSpanVal == 0 || homeBarsSpanVal == 0) {
            this.stats[key].awayTeamColor = 'orange';
            this.stats[key].homeTeamColor = 'orange';
            this.stats[key].awayTeamWidth = '20%';
            this.stats[key].homeTeamWidth = '20%';
        }
    }
    selectstats(item) {
        this.showAd = false;
        if (item == 'team') {
            this.selectedOption = ['all'];
            this.ga.trackView('Stats Teams - Game');
            if (this.statschoose2 != 'team') {
                this.statschoose2 = 'team';
                this.cmnfun.showLoader('Please wait...');
                this.statschoose = 'team';
                this.ajax.postaction('get-player-score-for-stat-team', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    quaters: this.selectedOption,
                    fixtureId: this.fixture_id,
                    adv_title: 'Stats-Club'
                }).subscribe((res) => {
                    this.getplayerscoreforstatteam(res);
                }, error => {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                })
            }
        }
        else {
            this.ga.trackView('Stats Players - Game');
            if (this.statschoose2 != 'Player') {
                this.jd_active = 'GB';
                this.CoachQ = ['all'];
                this.statschoose2 = 'Player';
                this.statschoose = 'Player';
                this.cmnfun.showLoader('Please wait...');
                this.gotoplayers();
            }
        }
    }

    gotoplayers() {
        this.fixture_id = this.details.fixture_id;
        this.stateRoundNo = this.details.fixture_id.roundNo;
        this.ajax.postaction('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            quaters: this.CoachQ,
            adv_title: 'Stats-Club'
        }).subscribe((res) => {
            console.log('1' + res);
            $('#playerStatsTable').DataTable().destroy();
            this.getplayerscoreplayer(res);
        }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
        this.homeTeamScoreStat = [];
        this.awayTeamScoreStat = [];
        this.showDataTable = false;
        this.cntt = 0;
        this.orderByFieldName = 'GB';
        this.reverse = false;
        this.sortBY('GB');
    }
    getGBData(g_value, b_value, rb_value, key, obj, k_value, h_value) {
        let goal: any = 0;
        let b: any = 0;
        let rb: any = 0;

        let k = 0;
        let h = 0;

        if (g_value == undefined) goal = 0; else goal = g_value;
        if (b_value == undefined) b = 0; else b = b_value;
        if (rb_value == undefined) rb = 0; else rb = rb_value;

        if (k_value == undefined) k = 0; else k = k_value;
        if (h_value == undefined) h = 0; else h = h_value;

        this.homeAwayTeamPlayerWithScore[key].GB = (parseInt(goal) * 6) + parseInt(b + rb);
        this.homeTeamPlayers1[key].GB = (parseInt(goal) * 6) + parseInt(b + rb);

        //this.homeTeamPlayers1[key].D = parseInt(k_value + h_value) ;

        let GB_score: any = goal + "." + parseInt(b + rb);
        if (GB_score == 0)
            return "0.0";
        else
            return GB_score;
    }
    sortBY(stat) {
        // $(document).ready(function(){
        // $("tr:nth-child(3) td,").addClass("jd_test");
        // });
        // sort by stat features in sortBy
        // if(stat == 'gb'){
        this.jd_active = stat;
        //   stat = 'GB';
        // }else if(stat == 'GB'){

        // }else{
        //   this.jd_active = stat;
        // }
        $('.jd_advContainer1').addClass('jd_rmBorder');
        $('.jd_advContainer2').addClass('jd_rmBorder');
        $('.jb-plaer table.dataTable tbody tr:nth-child(3) td').removeClass('jd_warning');
        console.log('stat' + stat + 'jd_active' + this.jd_active);
        if (this.reverse == true) {
            this.reverse = false;
            this.orderByFieldName = stat;
            //	$(this).addClass("active1");
        } else {
            this.reverse = false;
            this.orderByFieldName = stat;
        }
    }

    getValue(key, statScore, statName) {
        if (statScore == undefined || statScore == 'undefined') {
            this.homeAwayTeamPlayerWithScore[key][statName] = 0;
            this.homeTeamPlayers1[key][statName] = 0;
            return 0;
        } else {
            this.homeAwayTeamPlayerWithScore[key][statName] = parseInt(this.homeAwayTeamPlayerWithScore[key][statName]);
            if (isNaN(statScore)) return 0; else return statScore;
        }
    }

    getValueD(key, statScore1, statScore2, statName, pn) {
        let Disposal = 0;
        let H = 0;
        let K = 0;
        if (statScore1 == undefined || statScore1 == 'undefined') {
            K = 0;
        } else {
            K = statScore1;
        }

        if (statScore2 == undefined || statScore2 == 'undefined') {
            H = 0;
        } else {
            H = statScore2;
        }

        Disposal = K + H;
        return Disposal;
    }

    callAlert(name) { alert(name); return name; };
    sortBYType(name) {
        //    alert('aaaa')
        // alert('a');
        console.log('Sortby' + name);
        this.orderByFieldName = 'type';
        if (this.reverse) this.reverse = false; else this.reverse = true;

    }
    getplayerscoreplayer(data) {
        this.newTotalHomeTeamScore = data.totalHomeTeamScore;
        this.newTotalAwayTeamScore = data.totalAwayTeamScore;

        this.baseUrl = data.baseUrl;
        this.homeTeam = data.homeTeam;
        this.awayTeam = data.awayTeam;

        this.adv = data.adv.headerAdv;
        //Data For Player Tab Start
        //this.baseUrl=data.baseUrl;
        this.stats = data.stats;

        //Player Jumper Image
        this.homeTeamImages = data.homeTeamImages;
        this.awayTeamImages = data.awayTeamImages;
        // this.showDataTable = true;
        //this.hometeamImage=homeTeamImages

        //Team Images (Home + Away)
        this.homeTeam = data.homeTeam;
        this.awayTeam = data.awayTeam;


        //HomeTeam Data
        this.homeTeamPlayers = data.homeTeamPlayers;
        this.homeTeamPlayers1 = data.homeTeamPlayers;

        this.awayTeamPlayers = data.awayTeamPlayers;
        this.totalTeamPlayerScore = data.total_player;

        this.array1 = this.homeTeamPlayers1.concat(this.awayTeamPlayers);
        this.homeTeamPlayers1 = this.array1;

        //    angular.forEach(this.homeTeamPlayers1,function(value,index){
        this.homeTeamPlayers1.forEach((value, index) => {
            //alert(value.type);
            if (value.type == undefined || value.type == '' || value.type == '') {

                this.homeTeamPlayers1[index].type = "home";
                //alert(this.homeTeamPlayers1[index].type);
            }
        });

        /*angular.forEach(this.awayTeamPlayers,function(value,index){
               //alert(value.type);
               if(value.type == undefined || value.type == '' || value.type == ''){
    
               this.awayTeamPlayers[index].type ="away" ;
    
               }
        });*/

        //Team Score data:
        this.homeTeamScore = data.homeTeamScore;
        this.awayTeamScore = data.awayTeamScore;

        // 		this.activeAwaytab=1;
        // 		this.activeHometab=1;
        // 		this.sortNactiveHome=function(){

        // 		this.activeAwaytab=0;
        // 		this.activeHometab=1;
        // 	}
        // this.sortNactiveAway=function(){

        // 	this.activeHometab=0;
        // 	this.activeAwaytab=1;
        // }
        //For Home Team Player Name::
        this.homePlayerData = [];
        this.awayPlayerData = [];
        this.homeAwayTeamPlayerWithScore = []
        // angular.forEach(this.homeTeamPlayers,function(value,index){
        this.homeTeamPlayers.forEach((value, index) => {
            //alert("homePlayerId"+value.player_id)

            // let fullName = value.fullName;
            let first_name = value.first_name
            let res = first_name.split(" ");
            let playerName = first_name.substring(0, 1) + ". " + value.surname;
            let playerNameLen = playerName.length;
            let playerFName = playerName;
            // let playerFName = ((playerName.length <= 8) ? playerName : playerName.substr(0, 8) + '..');
            let playerNo = value.player_number;
            let playerId = value.player_id;
            let type = 'home';

            //this.homePlayerData.push({playerFName:playerFName, playerNo:playerNo,playerId:playerId});
            value.playerFName = playerFName;
            this.homePlayerData.push({ playerFName: playerFName, playerNo: playerNo, playerId: playerId, type: value.type });
            this.homeAwayTeamPlayerWithScore.push(value);
            //alert(playerFName)

        });
        // angular.forEach(this.awayTeamPlayers,function(value,index){
        this.awayTeamPlayers.forEach((value, index) => {
            //alert("homePlayerId"+value.player_id)

            // let fullName = value.fullName;
            let first_name = value.first_name;
            let res = first_name.split(" ");
            let playerName = first_name.substring(0, 1) + ". " + value.surname;
            let playerNameLen = playerName.length;
            let playerFName = playerName;
            // let playerFName = ((playerName.length <= 8) ? playerName : playerName.substr(0, 8) + '..');
            let playerNo = value.player_number;
            let playerId = value.player_id;
            let type = 'away';

            //this.homePlayerData.push({playerFName:playerFName, playerNo:playerNo,playerId:playerId});
            value.playerFName = playerFName;
            this.awayPlayerData.push({ playerFName: playerFName, playerNo: playerNo, playerId: playerId });
            this.homeAwayTeamPlayerWithScore.push(value);
            //alert(playerFName)

            if (value.type == undefined || value.type == '' || value.type == '') {

                this.awayTeamPlayers[index].type = "away";
                this.awayPlayerData.push({ playerFName: playerFName, playerNo: playerNo, playerId: playerId, type: this.awayTeamPlayers[index].type });
                this.homeAwayTeamPlayerWithScore.push(value);

            } else {
                this.awayPlayerData.push({ playerFName: playerFName, playerNo: playerNo, playerId: playerId, type: value.type });
                this.homeAwayTeamPlayerWithScore.push(value);

            }
        });
        console.log(this.homeTeamPlayers1);
        setTimeout(() => {
            $('.allTeam').removeClass("activated2");
            let windowWidth = (window.innerWidth);
            let windowHeight = (window.innerHeight) - 129;
            var jqvar = this;
            $(document).ready(function () {
                $('#playerStatsTable').DataTable().destroy();
                $('#playerStatsTable').DataTable({
                    scrollY: true,
                    scrollX: true,
                    scrollCollapse: true,
                    paging: false,
                    "columnDefs": [{
                        "targets": 1,
                        "orderable": true
                    }],
                    "aoColumns": [
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] },
                        { "orderSequence": ["desc", "asc"] }
                    ],
                    info: false,
                    "bPaginate": false,
                    "bFilter": false,
                    "bInfo": false,
                    "bSortable": false,
                    "ordering": true,
                    "order": [1, "desc"],
                    fixedColumns: {
                        leftColumns: 1,
                        // rightColumns: 0
                    },
                    "fixedHeader": {
                        header: true,
                    }

                });
                //     table.order.fixed( {
                //       pre: [ 1, 'desc' ]
                $('.playerStatsTable').off('click', 'tr').on('click', 'tr', function () {
                    console.log('clickedagain');
                    var p = $(this).children("td").eq(0).attr('data-t1');
                    if (p != undefined) {
                        jqvar.GotoIndividual(p);
                    }
                });
                //   } );
                // Enable THEAD scroll bars
                $('.dataTables_scrollHead').css('overflow', 'scroll');

                // Sync THEAD scrolling with TBODY
                $('.dataTables_scrollHead').on('scroll', function () {
                    $('.dataTables_scrollBody').scrollLeft($(this).scrollLeft());
                });
            });



            this.showAd = true;
            console.log(this.showAd);
            $('.jb-plaer table.dataTable tbody tr:nth-child(3) td').addClass('jd_warning');
            $('.allTeam').addClass("jd_active_sort");
            $(".homeTeam").parent().removeClass("sorting_asc");

            $('.homeTeam').on('click', function () {
                $('.jd_advContainer1').addClass('jd_rmBorder');
                $('.jd_advContainer2').addClass('jd_rmBorder');
                $('.jb-plaer table.dataTable tbody tr:nth-child(3) td').removeClass('jd_warning');

                if ($('.awayTeam1').hasClass("jd_active_sort")) {
                    $('.awayTeam1').removeClass("jd_active_sort");
                } else if ($('.allTeam').hasClass("jd_active_sort")) {
                    $('.allTeam').removeClass("jd_active_sort");
                }
                $(this).addClass("jd_active_sort");
                // this.sortBYType("home");  home players
                console.log("hhjhjh");

                if ($(this).hasClass("activated1")) {
                    $(this).addClass("jd_active_sort");
                    console.log("kjkjnbjjhhh----home");
                    $(this).removeClass("activated1");
                    $(".homeTeam").addClass("activated1");
                    $("#playerStatsTable tbody tr").each(function () {
                        // alert($(this).children("td").eq(0).attr('data-t'));
                        //    this.homeTeamPlayers1.forEach(obj => {
                        //     if(obj.type=='home'){
                        //         this.homeTeamPlayers1.push(obj);
                        //         console.log(this.homeTeamPlayers1);
                        //     }
                        // })
                        if ($(this).children("td").eq(0).attr('data-t') == 'home') {
                            $(this).show();



                        } else {

                            $(this).hide();
                        }

                    })

                } else {
                    $(this).addClass("jd_active_sort");
                    console.log("hhhmjkjjl--away");
                    $(this).addClass("activated1");

                    $("#playerStatsTable tbody tr").each(function () {
                        //   alert($(this).children("td").eq(0).attr('data-t'));

                        if ($(this).children("td").eq(0).attr('data-t') == 'away') {

                            $(this).show();

                        } else {

                            $(this).hide();
                        }

                    })

                    if ($('#btn1').hasClass("activated1") && $('#btn2').hasClass("activated1")) {
                        $("#playerStatsTable tbody tr").each(function () {
                            $(this).show();

                        });

                    }


                }

                setTimeout(function () { selfval.sortBYval(selfval.jd_active); }, 200);
            });
            var selfval = this;
            $('.awayTeam1').on('click', function () {

                $('.jd_advContainer1').addClass('jd_rmBorder');
                $('.jd_advContainer2').addClass('jd_rmBorder');
                if ($('.homeTeam').hasClass("jd_active_sort")) {

                    $('.homeTeam').removeClass("jd_active_sort");
                } else if ($('.allTeam').hasClass("jd_active_sort")) {
                    $('.allTeam').removeClass("jd_active_sort");

                }
                $('.jb-plaer table.dataTable tbody tr:nth-child(3) td').removeClass('jd_warning');
                console.log("hhh");
                if ($(this).hasClass("activated1")) {
                    console.log("hhh----away");
                    $(this).addClass("jd_active_sort");
                    $(this).removeClass("activated1");
                    $(".awayTeam1").addClass("activated1");

                    $("#playerStatsTable tbody tr").each(function () {

                        console.log('foreach');
                        if ($(this).children("td").eq(0).attr('data-t') == 'away') {
                            $(this).show();

                        } else {

                            $(this).hide();
                        }

                    })


                } else {
                    $(this).addClass("jd_active_sort");
                    console.log("hhuhijh");
                    $(this).addClass("activated1");

                    $("#playerStatsTable tbody tr").each(function () {
                        // alert($(this).children("td").eq(0).attr('data-t'));

                        if ($(this).children("td").eq(0).attr('data-t') == 'home') {

                            $(this).show();

                        } else {

                            $(this).hide();
                        }

                    })
                    if ($('#btn1').hasClass("activated1") && $('#btn2').hasClass("activated1")) {
                        $("#playerStatsTable tbody tr").each(function () {
                            $(this).show();

                        });
                    }

                }
                setTimeout(function () { selfval.sortBYval(selfval.jd_active); }, 200);

                // this.sortBYType("away");
            });

            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }

            var selfarr = this;
            $('.allTeam').on('click', function () {
                $('.jd_advContainer1').addClass('jd_rmBorder');
                $('.jd_advContainer2').addClass('jd_rmBorder');
                if ($('.homeTeam').hasClass("jd_active_sort")) {
                    $('.homeTeam').removeClass("jd_active_sort");
                } else if ($('.awayTeam1').hasClass("jd_active_sort")) {
                    $('.awayTeam1').removeClass("jd_active_sort");
                }
                $('.allTeam').addClass("jd_active_sort");
                $('.jb-plaer table.dataTable tbody tr:nth-child(3) td').removeClass('jd_warning');
                console.log("all--");
                if ($(this).hasClass("activated3")) {
                    console.log("all--");
                    $(this).removeClass("activated3");
                    $(".allTeam").addClass("activated3");
                    $("#playerStatsTable tbody tr").each(function (index, value) {
                        $(this).show();

                    })
                    // $('.jd_advContainer1').removeClass('jd_rmBorder');
                    // selfarr.SortAll();
                    //   var arr = $("#playerStatsTable tbody tr");
                    //   arr = shuffle(arr);
                    //   arr.each(function (index,value) {
                    //       $(this).show();
                    // })
                    // console.log(arr);
                    setTimeout(function () { selfval.sortBYval(selfval.jd_active); }, 200);
                }

            })

            // get individual player id from datatable function
            var self = this;
            // $("tr[role='row']").on("click",function() {
            //   var plyId = ($(this).children("td").eq(0).attr('data-t1'));
            //   console.log(plyId)
            //   if(plyId != undefined){
            //     // self.GotoIndividual(plyId);
            //   }
            // });
            //

            this.cmnfun.hideLoader();
        }, 100);
        // $ionicLoading.hide();
        //Player End
        this.showDataTable = true;
    }
    clickhunk() {
        // alert('hello');
    }
    sortBYval(val) {
        // this.sortBY('GB');
        var idname = this.jd_active;
        $("." + idname).trigger("click");
        $("." + idname).click(function () {

        });
        //   this.sortBY(this.jd_active);
        // }else{
        //   this.jd_active = stat;
        // }
        $('.jd_advContainer1').addClass('jd_rmBorder');
        $('.jd_advContainer2').addClass('jd_rmBorder');
        $('.jb-plaer table.dataTable tbody tr:nth-child(3) td').removeClass('jd_warning');
        console.log('stat' + this.jd_active + 'jd_active' + this.jd_active);
        if (this.reverse == true) {
            this.reverse = false;
            this.orderByFieldName = this.jd_active;
            //	$(this).addClass("active1");
        } else {
            this.reverse = false;
            this.orderByFieldName = this.jd_active;
            //$(this).addClass("active1");
        }

    }

    // sort players stat by quater function datatable
    CoachSort(val) {
        if (val == 'all' && this.CoachQ.indexOf('all') > -1) {
            this.CoachQ = [];
            this.CoachQ.push('all');
        } else if (val == 'all' && this.CoachQ.indexOf('all') == -1) {
            this.CoachQ = [];
            this.CoachQ.push('all');
        } else if (val != 'all' && this.CoachQ.indexOf('all') > -1) {
            this.CoachQ = [];
            this.CoachQ.push(val);
        } else {
            if (this.CoachQ.indexOf(val) == -1) {
                this.CoachQ.push(val);
            } else {
                var index = this.CoachQ.indexOf(val);
                this.CoachQ.splice(index, 1);
                if (this.CoachQ.length == 0) {
                    this.CoachQ.push('all');
                }
            }
        }
        if (this.CoachQ.length > 3) {
            this.CoachQ = [];
            this.CoachQ.push('all');
        }
        console.log(this.CoachQ);
        this.cmnfun.showLoader('Please wait...');
        this.ajax.postaction('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            quaters: this.CoachQ,
            adv_title: 'Stats-Club'
        }).subscribe((res) => {
            this.cmnfun.hideLoader();
            $('#playerStatsTable').DataTable().destroy();
            $('#playerStatsTable').DataTable().destroy();
            this.getplayerscoreplayer(res);
        }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
    }


    // sort team stat by quater function
    SelectedSort(val) {
        if (val == 'all' && this.selectedOption.indexOf('all') > -1) {
            this.selectedOption = [];
            this.selectedOption.push('all');
        } else if (val == 'all' && this.selectedOption.indexOf('all') == -1) {
            this.selectedOption = [];
            this.selectedOption.push('all');
        } else if (val != 'all' && this.selectedOption.indexOf('all') > -1) {
            this.selectedOption = [];
            this.selectedOption.push(val);
        } else {
            if (this.selectedOption.indexOf(val) == -1) {
                this.selectedOption.push(val);
            } else {
                var index = this.selectedOption.indexOf(val);
                this.selectedOption.splice(index, 1);
                if (this.selectedOption.length == 0) {
                    this.selectedOption.push('all');
                }
            }
        }
        if (this.selectedOption.length > 3) {
            this.selectedOption = [];
            this.selectedOption.push('all');
        }
        console.log(this.selectedOption);
        this.cmnfun.showLoader('Please wait...');
        this.ajax.postaction('get-player-score-for-stat-team', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            quaters: this.selectedOption,
            adv_title: 'Stats-Club'
        }).subscribe((res) => {
            this.cmnfun.hideLoader();
            this.getplayerscoreforstatteam(res);
        }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
    }

    // toggle function for quater wise sort function
    notify() {
        console.log("Toggled: " + this.isToggled);
    }

    // stat difference gett
    StatDiff(homeTeamStat, awayTeamStat) {
        if (homeTeamStat != undefined && awayTeamStat != undefined) {
            let StatVal = awayTeamStat - homeTeamStat;
            if (StatVal > 0) {
                return '+' + StatVal;
            } else {
                return StatVal;
            }
        } else {
            return 0;
        }
    }

    StatDiff2(homeTeamStat, awayTeamStat) {
        if (homeTeamStat != undefined && awayTeamStat != undefined) {
            let StatVal = homeTeamStat - awayTeamStat;
            if (StatVal > 0) {
                return '+' + StatVal;
            } else {
                return StatVal;
            }
        } else {
            return 0;
        }
    }

    // goto individual player
    GotoIndividual(playerid) {
        console.log(playerid);
        this.navCtrl.push('PlayerstatindividualPage', { player_id: playerid, fixture_id: this.fixture_id, CoachValue: true, "Parent": this });
    }

    WatchAudio() {
        // var thatlink1 = 'https://www.rsn.net.au/digital-radio-2/';
        let target = "_system";
        this.inapp.create(this.LiveAudio, target, this.options);
        // let options: StreamingAudioOptions = {
        //               successCallback: () => { console.log('Finished Audio') },
        //               errorCallback: (e) => { console.log('Error: ', e)
        //               alert(e)
        //              },
        //               bgImage : '../../assets/imgs/LoginLogo.png'
        //           };
        //           //https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3
        //           //https://www.rsn.net.au/digital-radio-2/
        //    this.streamingMedia.playAudio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', options);

        //     const options: ThemeableBrowserOptions = {
        //       statusbar: {
        //           color: '#ffffffff'
        //       },
        //       toolbar: {
        //           height: 44,
        //           color: '#f0f0f0ff'
        //       },
        //       title: {
        //           color: '#003264ff',
        //           showPageTitle: true
        //       },
        //       backButton: {
        //           image: 'back',
        //           imagePressed: 'back_pressed',
        //           align: 'left',
        //           event: 'backPressed'
        //       },
        //       forwardButton: {
        //           image: 'forward',
        //           imagePressed: 'forward_pressed',
        //           align: 'left',
        //           event: 'forwardPressed'
        //       },
        //       closeButton: {
        //           image: 'close',
        //           imagePressed: 'close_pressed',
        //           align: 'left',
        //           event: 'closePressed'
        //       },
        //       customButtons: [
        //           {
        //               image: 'share',
        //               imagePressed: 'share_pressed',
        //               align: 'right',
        //               event: 'sharePressed'
        //           }
        //       ],
        //       menu: {
        //           image: 'menu',
        //           imagePressed: 'menu_pressed',
        //           title: 'Test',
        //           cancel: 'Cancel',
        //           align: 'right',
        //           items: [
        //               {
        //                   event: 'helloPressed',
        //                   label: 'Hello World!'
        //               },
        //               {
        //                   event: 'testPressed',
        //                   label: 'Test!'
        //               }
        //           ]
        //       },
        //       backButtonCanClose: true
        //  };

        //  const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.LiveAudio, '_self', options);

    }

    WatchVideo() {
        // var thatlink = 'https://youtu.be/xjSgKDjzscw';
        // let target = "_blank";
        // this.inapp.create(this.LiveVideo,target,this.options);
        var filename = this.LiveVideo.substring(this.LiveVideo.lastIndexOf('/') + 1);
        // console.log(filename);
        this.youtube.openVideo(filename);
        // let options: StreamingVideoOptions = {
        //       successCallback: () => { console.log('Finished Video') },
        //       errorCallback: (e) => { console.log('Error: ', e)
        //       alert(e)
        //      },
        //       orientation: 'portrait'
        //   };
        //   // http://www.sample-videos.com/
        // this.streamingMedia.playVideo('https://youtu.be/xjSgKDjzscw', options);
    }

    // all sort datatable function
    SortAll() {
        let sortdata = ['all'];
        this.cmnfun.showLoader('Please wait...');
        this.ajax.postaction('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            quaters: sortdata,
            adv_title: 'Stats-Club'
        }).subscribe((res) => {
            $('#playerStatsTable').DataTable().destroy();
            this.cmnfun.hideLoader();
            this.getplayerscoreplayer(res);
        }, error => {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
    }

}


// popover

@Component({

    template: `
  <div class="main-div" padding>
  <p class="gamepasstitle">Game Pass $2.99</p>
  <p class="roundtxt" *ngIf="details.roundName != ''">{{details.roundName}}</p>
  <p class="roundtxt" *ngIf="details.roundName == ''">Round {{details.roundNo}}</p>
   <ion-row>
   <ion-col class="Center">
   <img class="popimg" src="{{path}}{{homeTeam.team_image}}">
   <p class="poptxt">{{homeTeam.team_abbrevation}}</p>
   </ion-col>
   <span class="Vstext">VS</span>
   <ion-col class="Center">
   <img  class="popimg" src="{{path}}{{awayTeam.team_image}}">
   <p class="poptxt">{{awayTeam.team_abbrevation}}</p>
   </ion-col>
   </ion-row>
  <button class="popbutton" (click)="close()" ion-button>Cancel</button>
  <button class="popbutton" (click)="BuyConsume('game_pass')" ion-button>Continue</button>
  </div>
  `
})
export class gamepasspage {
    Purchase: any = [];
    resData: any;
    homeTeam: any;
    awayTeam: any;
    teamid: any;
    compid: any;
    isLogin: boolean = false;
    details: any;
    path: any = environment.baseURL;
    constructor(
        public processproduct: ProductListProvider,
        public ga: FirebaseAnalyticsProvider,
        private alertCtrl: AlertController,
        public Storage: Storage,
        public ajax: AjaxProvider,
        public events: Events,
        public cmnfun: CommomfunctionProvider,
        public localData: LocalDataProvider,
        public navctrl: NavController,
        public iap: InAppPurchase,
        public platform: Platform,
        public viewCtrl: ViewController,
        public params: NavParams) {
        this.platform.ready().then(() => {
            this.iap.getProducts([GamePass])
                .then((products) => {
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        console.log(this.params.get('MatchData'));
        let data = this.params.get('MatchData');
        this.details = data.matchData;
        this.homeTeam = data.homeTeam;
        this.awayTeam = data.awayTeam;

        // get user fav team and competition
        this.Storage.get('UserTeamData').then((val) => {
            if (val) {
                this.compid = val.selectedcompetition.competition_id;
                this.teamid = val.selectedteam.team_id;
            }
        });

        // check whether user is login or not.
        this.Storage.get('userData').then((val) => {
            if (val) {
                this.isLogin = true;
            }
        });
    }

    close() {
        this.viewCtrl.dismiss('cancel');
    }

    // Buy consume product single game pass
    BuyConsume(product) {
        this.cmnfun.showLoader('Please wait...');
        console.log(product)
        let transactionId;
        this.iap
            .buy(GamePass)
            .then(data => {
                this.iap.consume(data.productType, data.receipt, data.signature)
                transactionId = data.transactionId;
            })
            .then(() => {
                let PurchaseData = {
                    device_id: this.localData.GetDevice(),
                    fixture_id: this.details.fixture_id,
                    competition_id: 0,
                    team_id: 0,
                    product_id: GamePass,
                    transaction_id: transactionId
                }
                this.Purchase.push(PurchaseData);
                this.ajax.PaymentpostApi(this.Purchase).subscribe((res) => {
                    this.cmnfun.hideLoader();
                    console.log(res);
                    this.resData = res;
                    this.localData.StoreUserDeviceData(this.resData);
                    this.Storage.set("UserDeviceData", this.resData);
                    this.localData.StoreUserFav(this.resData);
                    this.processproduct.InsertPurchase(this.resData);
                    this.events.publish('changebanner:changed', true);
                    this.events.publish('menuchange2:changed', 'HomePage');
                    this.ga.trackEvent("Payment", "Done", "Payment", 1);
                    // if (this.isLogin == true) {
                    this.viewCtrl.dismiss('success');
                    // } else {
                    //   this.localData.LoginState('InnermatchcenterPage', 'pay');
                    //   this.localData.StoreYear(2019);
                    //   this.navctrl.push('LoginPage',{iap:'true3'});
                    // }
                }, error => {
                    this.cmnfun.hideLoader();
                    this.cmnfun.showToast('Some thing Unexpected happen please try again');
                })
            }
                //  console.log('product was successfully consumed!')
            )
            .catch(err => {
                this.cmnfun.hideLoader();
                this.cmnfun.showToast(err.errorMessage);
            })
    }

}

