var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import 'datatables.net-fixedheader';
// import * as $ from 'jquery';
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
var InnermatchcenterPage = /** @class */ (function () {
    function InnermatchcenterPage(platform, ga, alertCtrl, zone, inapp, Storage, ajax, events, cmnfun, navCtrl, navParams) {
        this.platform = platform;
        this.ga = ga;
        this.alertCtrl = alertCtrl;
        this.zone = zone;
        this.inapp = inapp;
        this.Storage = Storage;
        this.ajax = ajax;
        this.events = events;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.path = 'http://vafalive.com.au';
        this.type = 'SCORE';
        this.showcontent = 'hide';
        this.i = 0;
        this.statcheck = 'SCORE';
        this.playerStatsTable0 = 'playerStatsTable';
        this.btn10 = 'btn1';
        this.btn20 = 'btn2';
        this.advDisplay = 'show';
        this.GB0 = 'GB';
        this.buttonId0 = 'buttonId';
        this.details = {};
        this.advertisementFooter = [];
        this.lastScore = {};
        this.homeTeamAbbr = {};
        this.awayTeamAbbr = {};
        this.HomeTeamScore = [];
        //   actionpage
        this.newMerge = [];
        this.data = [];
        this.scrollTop = 0;
        this.homeTeamData = [];
        this.awayTeamData = [];
        this.quaterEnd = [];
        this.actionScoreFeed1 = [];
        this.actionScoreFeed = [];
        this.homePlayerData = [];
        this.awayPlayerData = [];
        this.pamentshow = 0;
        this.homeTeamScoreStat = [];
        this.awayTeamScoreStat = [];
        this.showDataTable = false;
        this.homeTeam = [];
        this.awayTeam = [];
        this.adv = [{}];
        this.modifiedStateSeq = [];
        this.homeTeamPlayers1 = [];
        this.homeAwayTeamPlayerWithScore = [];
        this.reverse = false;
        this.array1 = [];
        this.SortHomePlayer = false;
        this.SortAwayPlayer = true;
        this.details = navParams.get('details');
        console.log(this.details);
        //       this.platform.ready().then(() => {
        //    this.ga.startTrackerWithId('UA-118996199-1')
        // .then(() => {
        //   console.log('Google analytics is ready now');
        //      this.ga.trackView('InnerMatchCenter Page');
        // })
        // .catch(e => console.log('Error starting GoogleAnalytics', e));
        //     })
    }
    InnermatchcenterPage.prototype.ionViewWillLeave = function () {
        clearInterval(this.id);
        clearInterval(this.scoreid);
    };
    InnermatchcenterPage.prototype.goToAddSite = function (ad_url) {
        var browser = this.inapp.create(ad_url);
    };
    InnermatchcenterPage.prototype.onScroll = function () {
        var _this = this;
        //   this.content.ionScrollEnd.subscribe((data)=>{
        //  setTimeout(() => {  
        this.scrollTop = this.content.scrollTop;
        var storeData = this.scrollTop;
        if (this.type == 'stats') {
            if (storeData >= 195) {
                console.log("80");
                this.zone.run(function () {
                    _this.advDisplay = 'hide';
                });
            }
            else {
                this.zone.run(function () {
                    _this.advDisplay = 'show';
                });
            }
        }
        if (storeData > 0) {
            console.log("80");
            console.log(storeData);
            this.fullGraph = 1;
            this.graphImgShowHide = 0;
            this.shortGraph = 0;
            this.headerImg = 1;
            this.showfooter = "show";
            this.zone.run(function () {
                _this.shortAdvhideshow = 0;
            });
            $("#scoreChart").hide();
            $("#scoreChartmin").show();
            $("#scoreChartminh").show();
        }
        else {
            //  if(this.i>=10)
            // {
            //    this.i=0;
            // }
            // if(this.i==1)
            //     {
            this.shortGraph = 1;
            this.zone.run(function () {
                _this.shortAdvhideshow = 1;
                _this.graphImgShowHide = 1;
            });
            this.headerImg = 0;
            this.fullGraph = 0;
            this.showfooter = 'hide';
            console.log("100");
            console.log(storeData);
            $("#scoreChart").show();
            $("#scoreChartmin").hide();
            $("#scoreChartminh").hide();
            //         }
            // this.i++;
        }
        //  },200);
        // });
    };
    InnermatchcenterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.cmnfun.showLoading('Please wait...');
        this.fixture_id = this.details.fixture_id;
        this.stateRoundNo = this.details.fixture_id.roundNo;
        this.statusName = this.details.match_status;
        this.manual_score_recording = this.details.manual_score_recording;
        this.roundName = this.details.roundName;
        if (this.manual_score_recording == 1) {
            this.disableBtn = true;
        }
        else {
            this.disableBtn = false;
        }
        this.ajax.datalist('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Home'
        }).subscribe(function (res) {
            _this.getplayerscore(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    InnermatchcenterPage.prototype.getplayerscore = function (res) {
        var _this = this;
        // console.log(res);
        this.baseUrl = res.baseUrl;
        this.manual_score_recording = res.manual_score_recording;
        if (this.manual_score_recording == 1) {
            this.disableBtn = true;
        }
        else {
            this.disableBtn = false;
        }
        this.newTotalHomeTeamScore = res.totalHomeTeamScore;
        this.newTotalAwayTeamScore = res.totalAwayTeamScore;
        //ADVERTISEMENT::
        this.advertisementHeader = res.adv.headerAdv;
        this.advertisementFooter = res.adv.footerAdv[0];
        console.log(this.advertisementHeader);
        console.log(this.advertisementFooter);
        this.lastScore = res.lastScore;
        console.log(this.lastScore);
        this.homeTeamAbbr = res.homeTeam;
        this.awayTeamAbbr = res.awayTeam;
        console.log(this.homeTeamAbbr);
        console.log(this.awayTeamAbbr);
        this.homeTeamImg = res.homeTeamImages;
        this.awayTeamImg = res.awayTeamImages;
        this.HomeTeamScore = [];
        this.HomeTeamScore = res.homeTeamScore;
        this.awayTeamScore = res.awayTeamScore;
        if (res.homeTeamScore != '') {
            var quaterHScore_1 = ["0.0", "0.0", "0.0", "0.0"];
            //START:Home TEam SCORE EACH FUNCTIon 
            this.HomeTeamScore.forEach(function (obj) {
                if (obj.stat_id == 1 || obj.stat_id == 2 || obj.stat_id == 3) {
                    if (obj.stat_id == 1) //calculation for total goal  
                     {
                        var Q = obj.quater;
                        var totaValQ = quaterHScore_1[Q - 1];
                        if (Q == 1) {
                            ////console.log("Q1");
                            totaValQ = quaterHScore_1[0];
                            var totaValQ1 = totaValQ.split(".");
                            var totaQG = parseInt(totaValQ1[0]) + 1;
                            var totalValQ1RB = parseInt(totaValQ1[1]);
                            quaterHScore_1[0] = totaQG + "." + totalValQ1RB;
                            // this.quaterHScore1 = quaterHScore[0];
                            ////console.log("this.quaterHScore1 =="+this.quaterHScore1);
                        }
                        else if (Q == 2) {
                            ////console.log("Q2");
                            var totaValQ2 = quaterHScore_1[1];
                            var totaValQ3 = totaValQ2.split(".");
                            var totaQ2G = parseInt(totaValQ3[0]) + 1;
                            quaterHScore_1[1] = totaQ2G + "." + totaValQ3[1];
                            //this.quaterHScore2 = quaterHScore[1];
                            ////console.log("this.quaterHScore2 =="+this.quaterHScore2);
                        }
                        else if (Q == 3) {
                            //quarter3 cal
                            var totaValQ3 = quaterHScore_1[2];
                            var totaValQ4 = totaValQ3.split(".");
                            var totaQ3G = parseInt(totaValQ4[0]) + 1;
                            quaterHScore_1[2] = totaQ3G + "." + totaValQ4[1];
                            //this.quaterHScore3 = quaterHScore[2];
                            ////console.log("this.quaterHScore3 =="+this.quaterHScore3);
                        }
                        else if (Q == 4) {
                            //quarter4 cal
                            var totaValQ4 = quaterHScore_1[3];
                            var totaValQ5 = totaValQ4.split(".");
                            var totaQ4G = parseInt(totaValQ5[0]) + 1;
                            quaterHScore_1[3] = totaQ4G + "." + totaValQ5[1];
                            //this.quaterHScore4 = quaterHScore[3];
                            ////console.log("this.quaterHScore4 =="+this.quaterHScore4);
                        }
                    } //END:calculation for total goal  
                    else //calculation for total RB  
                     {
                        //Calulation for display total quarter values in 
                        var Q = obj.quater;
                        var totaValQ = quaterHScore_1[Q - 1];
                        //////console.log(totaValQ);
                        if (Q == 1) {
                            //totaValQ = "0.0";
                            var totaValQ_1 = quaterHScore_1[0];
                            var totaValQ1 = totaValQ_1.split(".");
                            var totaQG = parseInt(totaValQ1[0]);
                            var totalValQ1RB = parseInt(totaValQ1[1]) + 1;
                            quaterHScore_1[0] = totaQG + "." + totalValQ1RB;
                            // this.rushBehind1 = quaterHScore[0];
                            ////console.log("this.rushBehind1 =="+this.rushBehind1);
                        }
                        else if (Q == 2) {
                            //quarter2 cal
                            var totaValQ2 = quaterHScore_1[1];
                            var totaValQ3 = totaValQ2.split(".");
                            var RBQ2 = parseInt(totaValQ3[1]);
                            RBQ2++;
                            var totaQ2G = parseInt(totaValQ3[0]);
                            quaterHScore_1[1] = totaQ2G + "." + RBQ2;
                            _this.rushBehind2 = quaterHScore_1[1];
                            ////console.log("this.rushBehind2 =="+this.rushBehind2);
                        }
                        else if (Q == 3) {
                            //quarter3 cal
                            var totaValQ3 = quaterHScore_1[2];
                            var totaValQ4 = totaValQ3.split(".");
                            var totaQ3G = parseInt(totaValQ4[0]);
                            var RBQ3 = parseInt(totaValQ4[1]);
                            RBQ3++;
                            quaterHScore_1[2] = totaQ3G + "." + RBQ3;
                            _this.rushBehind3 = quaterHScore_1[2];
                            ////console.log("this.rushBehind3 =="+this.rushBehind3);
                        }
                        else if (Q == 4) {
                            //quarter4 cal
                            var totaValQ4 = quaterHScore_1[3];
                            var totaValQ5 = totaValQ4.split(".");
                            var totaQ4G = parseInt(totaValQ5[0]);
                            var RBQ4 = parseInt(totaValQ5[1]);
                            RBQ4++;
                            quaterHScore_1[3] = totaQ4G + "." + RBQ4;
                            _this.rushBehind4 = quaterHScore_1[3];
                            ////console.log("this.rushBehind4 =="+this.rushBehind4);
                        }
                    } //calculation for total RB  
                }
                ////console.log("quaterHScore[0]!==="+quaterHScore[0]);
                //START:total scores calculations
                //////console.log('Home Team Scores');////console.log('q1-'+quaterHScore[0]); ////console.log('q2-'+quaterHScore[1]); ////console.log('q3-'+quaterHScore[2]); ////console.log('q4-'+quaterHScore[3]);  ////console.log('-----');
                if (quaterHScore_1[0] != '') {
                    // $("#q1HomeScore").html(quaterHScore[0]);  
                    _this.q1HomeScore = quaterHScore_1[0];
                }
                else {
                    // $("#q1HomeScore").html('-'); 
                    _this.q1HomeScore = '-';
                    ////console.log(" this.q1HomeScore1=="+this.q1HomeScore); 
                }
                //for q2 score
                ////console.log("quaterHScore[1]"+quaterHScore[1]);
                if (quaterHScore_1[1] !== '0.0' || _this.lastScore.quater >= 2) {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    var q12Total = q2G + "." + q2RB;
                    //////console.log(q12Total);
                    // $("#q2HomeScore").html(q12Total);
                    // $('.totalHomeQuarerScore').html(q12Total);  
                    _this.q2HomeScore = q12Total;
                    _this.totalHomeQuarerScore = q12Total;
                    ////console.log(this.q2HomeScore); ////console.log(this.totalHomeQuarerScore); 
                }
                // }
                else {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    var q2HTotal = q2G + "." + q2RB;
                    //$('.totalHomeQuarerScore').html(q2HTotal);  
                    // $("#q2HomeScore").html('-');
                    _this.q2HomeScore = '-';
                    _this.totalHomeQuarerScore = q2HTotal;
                    ////console.log("q2 else1"+this.q2HomeScore); ////console.log("q2 else2"+this.totalHomeQuarerScore); 
                }
                //END:q2 score
                //For q3 score
                if (quaterHScore_1[2] !== '0.0' || _this.lastScore.quater >= 3) {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q3Score = quaterHScore_1[2].split(".");
                    var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    var q3Total = q3G + "." + q3RB;
                    // $("#q3HomeScore").html(q3Total); 
                    //$('.totalHomeQuarerScore').html(q3Total);  
                    _this.q3HomeScore = q3Total;
                    _this.totalHomeQuarerScore = q3Total;
                    ////console.log(this.q3HomeScore); ////console.log(this.totalHomeQuarerScore); 
                }
                else {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q3Score = quaterHScore_1[2].split(".");
                    var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    var q3Htotal = q3G + "." + q3RB;
                    // $('.totalHomeQuarerScore').html(q3Htotal); 
                    // $("#q3HomeScore").html('-');
                    _this.q3HomeScore = '-';
                    _this.totalHomeQuarerScore = q3Htotal;
                    ////console.log(this.q3HomeScore); ////console.log(this.totalHomeQuarerScore); 
                }
                // }
                //END:q3 score
                //For q4 score
                if (quaterHScore_1[3] !== '0.0' || _this.lastScore.quater >= 4) {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q3Score = quaterHScore_1[2].split(".");
                    var q4Score = quaterHScore_1[3].split(".");
                    var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    var q4Total = q4G + "." + q4RB;
                    // $("#q4HomeScore").html(q4Total);
                    // $('.totalHomeQuarerScore').html(q4Total);  
                    _this.q4HomeScore = q4Total;
                    _this.totalHomeQuarerScore = q4Total;
                    ////console.log(this.q4HomeScore); ////console.log(this.totalHomeQuarerScore); 
                }
                else {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q3Score = quaterHScore_1[2].split(".");
                    var q4Score = quaterHScore_1[3].split(".");
                    var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    var q4Htotal = q4G + "." + q4RB;
                    // $('.totalHomeQuarerScore').html(q4Htotal); 
                    // $("#q4HomeScore").html('-');
                    _this.q4HomeScore = '-';
                    _this.totalHomeQuarerScore = q4Htotal;
                    ////console.log(this.q4HomeScore); ////console.log(this.totalHomeQuarerScore);
                }
                //END:q3 score
                //To display total scores
                if (quaterHScore_1[0] !== '0.0') {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q1HTot = (parseInt(q1Score[0]) * 6) + parseInt(q1Score[1]);
                    //$('.totalHoMeScores').html(q1HTot); 
                    //////console.log('q1-'+q1HTot);
                    _this.totalHoMeScores = q1HTot;
                    ////console.log(this.totalHoMeScores);
                }
                if (quaterHScore_1[1] !== '0.0') {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    var q2HTot = q2G * 6 + q2RB;
                    //$('.totalHoMeScores').html(q2HTot); 
                    //////console.log('q2-'+q2HTot);
                    _this.totalHoMeScores = q2HTot;
                    ////console.log(this.totalHoMeScores);
                }
                if (quaterHScore_1[2] !== '0.0') {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q3Score = quaterHScore_1[2].split(".");
                    var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    var q3HTot = q3G * 6 + q3RB;
                    //$('.totalHoMeScores').html(q3HTot); 
                    //////console.log('q3-'+q3HTot);
                    _this.totalHoMeScores = q3HTot;
                    ////console.log(this.totalHoMeScores);
                }
                if (quaterHScore_1[3] !== '0.0') {
                    var q1Score = quaterHScore_1[0].split(".");
                    var q2Score = quaterHScore_1[1].split(".");
                    var q3Score = quaterHScore_1[2].split(".");
                    var q4Score = quaterHScore_1[3].split(".");
                    var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    var q4HTot = q4G * 6 + q4RB;
                    //$('.totalHoMeScores').html(q4HTot); 
                    //////console.log('q4-'+q4HTot);
                    _this.totalHoMeScores = q4HTot;
                    ////console.log(this.totalHoMeScores);
                }
                //END:total scores calculations   
                //END:genrate home team players score                 
            }); //END:Home TEam SCORE EACH FUNCTIon
        }
        //END:HOME TEAM res  
        //START:AWAY TEAM res
        if (res.awayTeamScore != null) {
            var quaterAScore_1 = ["0.0", "0.0", "0.0", "0.0"];
            this.awayTeamScore.forEach(function (obj) {
                if (obj.stat_id == 1 || obj.stat_id == 2 || obj.stat_id == 3) {
                    if (obj.stat_id == 1) {
                        var Q = obj.quater;
                        var totaValQ = quaterAScore_1[Q - 1];
                        //alert(totaValQ);
                        if (Q == 1) {
                            //totaValQ = "0.0";
                            totaValQ = quaterAScore_1[0];
                            var totaValQ1 = totaValQ.split(".");
                            var totaQG = parseInt(totaValQ1[0]) + 1;
                            var totalValQ1RB = parseInt(totaValQ1[1]);
                            quaterAScore_1[0] = totaQG + "." + totalValQ1RB;
                            //$('#q1HomeScore').html(quaterHScore[Q-1]);
                            //this.q1HomeScore = quaterHScore[Q-1];
                            ////console.log("away1==="+this.q1HomeScore1);
                        }
                        else if (Q == 2) {
                            //quarter2 cal
                            var totaValQ2 = quaterAScore_1[1];
                            var totaValQ3 = totaValQ2.split(".");
                            var totaQ2G = parseInt(totaValQ3[0]) + 1;
                            quaterAScore_1[1] = totaQ2G + "." + totaValQ3[1];
                            //this.q1HomeScore2 = quaterAScore[1];
                            ////console.log("away2==="+this.q1HomeScore2);
                        }
                        else if (Q == 3) {
                            //quarter3 cal
                            var totaValQ3 = quaterAScore_1[2];
                            var totaValQ4 = totaValQ3.split(".");
                            var totaQ3G = parseInt(totaValQ4[0]) + 1;
                            quaterAScore_1[2] = totaQ3G + "." + totaValQ4[1];
                            //this.q1HomeScore3 = quaterAScore[2];
                            ////console.log("away3==="+this.q1HomeScore3);
                        }
                        else if (Q == 4) {
                            //quarter4 cal
                            var totaValQ4 = quaterAScore_1[3];
                            var totaValQ5 = totaValQ4.split(".");
                            var totaQ4G = parseInt(totaValQ5[0]) + 1;
                            quaterAScore_1[3] = totaQ4G + "." + totaValQ5[1];
                            //this.q1HomeScore4 = quaterAScore[3];
                            ////console.log("away4==="+this.q1HomeScore4);
                        }
                        //END:Calulation for display total quarter values in 
                    }
                    else {
                        //Calulation for display total quarter values in 
                        var Q = obj.quater;
                        var totaValQ = quaterAScore_1[Q - 1];
                        //alert(totaValQ);
                        if (Q == 1) {
                            //totaValQ = "0.0";
                            totaValQ = quaterAScore_1[0];
                            var totaValQ1 = totaValQ.split(".");
                            var totaQG = parseInt(totaValQ1[0]);
                            var totalValQ1RB = parseInt(totaValQ1[1]) + 1;
                            quaterAScore_1[0] = totaQG + "." + totalValQ1RB;
                            //  this.q1HomeScore = quaterAScore[0];
                            //alert("q1==="+this.q1HomeScore);
                        }
                        else if (Q == 2) {
                            //quarter2 cal
                            var totaValQ2 = quaterAScore_1[1];
                            var totaValQ3 = totaValQ2.split(".");
                            var RBQ2 = parseInt(totaValQ3[1]);
                            RBQ2++;
                            var totaQ2G = parseInt(totaValQ3[0]);
                            quaterAScore_1[1] = totaQ2G + "." + RBQ2;
                            //  this.q1HomeScore = quaterAScore[1];
                            ////console.log("q2==="+this.q1HomeScore);
                        }
                        else if (Q == 3) {
                            //quarter3 cal
                            var totaValQ3 = quaterAScore_1[2];
                            var totaValQ4 = totaValQ3.split(".");
                            var totaQ3G = parseInt(totaValQ4[0]);
                            var RBQ3 = parseInt(totaValQ4[1]);
                            RBQ3++;
                            quaterAScore_1[2] = totaQ3G + "." + RBQ3;
                            //  this.q1HomeScore = quaterAScore[2];
                            ////console.log("q3==="+this.q1HomeScore);
                        }
                        else if (Q == 4) {
                            //quarter4 cal
                            var totaValQ4 = quaterAScore_1[3];
                            var totaValQ5 = totaValQ4.split(".");
                            var totaQ4G = parseInt(totaValQ5[0]);
                            var RBQ4 = parseInt(totaValQ5[1]);
                            RBQ4++;
                            quaterAScore_1[3] = totaQ4G + "." + RBQ4;
                            //this.q1HomeScore = quaterAScore[3];
                            ////console.log("q4==="+this.q1HomeScore);
                        }
                        //END:Calulation for display total quarter values in 
                    }
                }
                //START:Away Team total scores calculations
                //////console.log('Away Team Scores');////console.log('q1-'+quaterAScore[0]); ////console.log('q2-'+quaterAScore[1]); ////console.log('q3-'+quaterAScore[2]); ////console.log('q4-'+quaterAScore[3]);  ////console.log('-----');
                if (quaterAScore_1[0] !== '0.0') {
                    //$("#q1AwayScore").html(quaterAScore[0]); 
                    _this.q1AwayScore = quaterAScore_1[0];
                    ////console.log("q1AwayScore==="+this.q1AwayScore);
                }
                else {
                    //$("#q2AwayScore").html('0.0'); 
                    _this.q1AwayScore = '0.0';
                    _this.q2AwayScore = '0.0';
                    ////console.log("q2AwayScore"+this.q2AwayScore); 
                }
                //for q2 score
                if (quaterAScore_1[1] !== '0.0' || _this.lastScore.quater >= 2) {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q12G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    var q12RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    var q12Total = q12G + "." + q12RB;
                    // $("#q2AwayScore").html(q12Total);
                    // $('.totalAwayQuarerScore').html(q12Total);  
                    _this.q2AwayScore = q12Total;
                    _this.totalAwayQuarerScore = q12Total;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q2AwayScore);
                }
                else {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    var q2ATotal = q2G + "." + q2RB;
                    // $('.totalAwayQuarerScore').html(q2ATotal);
                    //$("#q2AwayScore").html('-');
                    _this.q2AwayScore = '-';
                    _this.totalAwayQuarerScore = q2ATotal;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q2AwayScore);
                }
                //END:q2 score
                //For q3 score
                if (quaterAScore_1[2] !== '0.0' || _this.lastScore.quater >= 3) {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q3Score = quaterAScore_1[2].split(".");
                    var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    var q3Total = q3G + "." + q3RB;
                    //$("#q3AwayScore").html(q3Total); 
                    // $('.totalAwayQuarerScore').html(q3Total); 
                    _this.q3AwayScore = q3Total;
                    _this.totalAwayQuarerScore = q3Total;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q3Total); 
                }
                else {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q3Score = quaterAScore_1[2].split(".");
                    var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    var q3ATotal = q3G + "." + q3RB;
                    //$('.totalAwayQuarerScore').html(q3ATotal);
                    //$("#q3AwayScore").html('-'); 
                    _this.q3AwayScore = '-';
                    _this.totalAwayQuarerScore = q3ATotal;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q3AwayScore); 
                }
                //END:q3 score
                //For q4 score
                if (quaterAScore_1[3] !== '0.0' || _this.lastScore.quater >= 4) {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q3Score = quaterAScore_1[2].split(".");
                    var q4Score = quaterAScore_1[3].split(".");
                    var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    var q4Total = q4G + "." + q4RB;
                    //$("#q4AwayScore").html(q4Total);
                    // $('.totalAwayQuarerScore').html(q4Total);  
                    _this.q4AwayScore = q4Total;
                    _this.totalAwayQuarerScore = q4Total;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q4AwayScore);  
                }
                else {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q3Score = quaterAScore_1[2].split(".");
                    var q4Score = quaterAScore_1[3].split(".");
                    var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    var q4ATotal = q4G + "." + q4RB;
                    // $('.totalAwayQuarerScore').html(q4ATotal);
                    // $("#q4AwayScore").html('-');
                    _this.q4AwayScore = '-';
                    _this.totalAwayQuarerScore = q4ATotal;
                    ////console.log("totalAwayQuarerScore==="+this.totalAwayQuarerScore);
                    ////console.log("q2AwayScore==="+this.q4AwayScore);  
                }
                //END:q3 score
                //To display total scores
                if (quaterAScore_1[0] !== '0.0') {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q1ATot = (parseInt(q1Score[0]) * 6) + parseInt(q1Score[1]);
                    // $('.totalAwAyScores').html(q1ATot); 
                    _this.totalAwAyScores = q1ATot;
                    ////console.log("totalAwAyScores==="+this.totalAwAyScores);
                }
                if (quaterAScore_1[1] !== '0.0') {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    var q2ATot = (q2G * 6) + q2RB;
                    // $('.totalAwAyScores').html(q2ATot); 
                    _this.totalAwAyScores = q2ATot;
                    ////console.log("totalAwAyScores==="+this.totalAwAyScores); 
                }
                if (quaterAScore_1[2] !== '0.0') {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q3Score = quaterAScore_1[2].split(".");
                    var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    var q3ATot = (q3G * 6) + q3RB;
                    //$('.totalAwAyScores').html(q3ATot);  
                    _this.totalAwAyScores = q3ATot;
                    ////console.log("totalAwAyScores==="+this.totalAwAyScores); 
                }
                if (quaterAScore_1[3] !== '0.0') {
                    var q1Score = quaterAScore_1[0].split(".");
                    var q2Score = quaterAScore_1[1].split(".");
                    var q3Score = quaterAScore_1[2].split(".");
                    var q4Score = quaterAScore_1[3].split(".");
                    var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    var q4ATot = (q4G * 6) + q4RB;
                    // $('.totalAwAyScores').html(q4ATot);  
                    _this.totalAwAyScores = q4ATot;
                    ////console.log("totalAwAyScores==="+this.totalAwAyScores); 
                }
                else {
                    _this.totalAwAyScores = 0;
                }
                //END:Away Team total scores calculations
                //END:Away Team total scores calculations
            });
        } //END:AWAY TEAM res
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
        }
        else if (this.teamStatus == 10) {
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
                var str1 = "It's all locked up";
                if (this.newTotalHomeTeamScore == this.newTotalAwayTeamScore) {
                    this.winTeamStatus = "It's all locked up";
                    this.winTeamScore = '';
                }
            }
        }
        //END:DISPLAY TEAM WIN STATUS
        this.showcontent = 'show';
        this.cmnfun.HideLoading();
        this.scoreid = setInterval(function () {
            _this.ajax.datalist('get-player-score', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                fixtureId: _this.fixture_id,
                adv_title: 'Home'
            }).subscribe(function (res) {
                console.log(res);
                _this.getplayerscore(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        }, 10000);
    };
    ;
    InnermatchcenterPage.prototype.goToActionPage = function (type) {
        var _this = this;
        this.type = type;
        if (this.type == 'ACTION') {
            this.statcheck = 'ACTION';
            clearInterval(this.scoreid);
            this.actionpage();
            this.statschoose2 = 'Player';
            this.platform.ready().then(function () {
                _this.ga.startTrackerWithId('UA-118996199-1')
                    .then(function () {
                    console.log('Google analytics is ready now');
                    _this.ga.trackView('Action Page');
                })
                    .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
            });
        }
        else if (this.type == 'SCORE') {
            this.statcheck = 'SCORE';
            this.statschoose2 = 'Player';
            clearInterval(this.id);
            this.cmnfun.showLoading('Please wait...');
            this.ajax.datalist('get-player-score', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                fixtureId: this.fixture_id,
                adv_title: 'Home'
            }).subscribe(function (res) {
                _this.getplayerscore(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
            this.platform.ready().then(function () {
                _this.ga.startTrackerWithId('UA-118996199-1')
                    .then(function () {
                    console.log('Google analytics is ready now');
                    _this.ga.trackView('Score Page');
                })
                    .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
            });
        }
        // $state.go('app.action',{fixture_id: this.fixture_id, roundNo: this.stateRoundNo, homeTeamScore: this.totalHoMeScores, awayTeamScore : this.totalAwAyScores, match_status:this.statusName});
    };
    InnermatchcenterPage.prototype.goTostats = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('Status Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
        this.statschoose2 = 'team';
        clearInterval(this.id);
        clearInterval(this.scoreid);
        this.cmnfun.showLoading('Please wait...');
        this.ajax.postMethodct('get-server-time').subscribe(function (res) {
            _this.cmnfun.HideLoading();
            console.log(res);
            _this.type = 'stats';
            _this.statschoose = 'team';
            if (res == 'true') {
                _this.Storage.get('onetimeenterdate').then(function (val) {
                    if (!val) {
                        _this.Storage.set('onetimeenterdate', 1);
                        var alert_1 = _this.alertCtrl.create({
                            title: 'Welcome to your Premium Pass free trial.',
                            message: 'Your free trial will expire on 4th May 2018',
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function () {
                                        _this.pamentshow = 1;
                                        _this.gotostatspage();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                    }
                    else {
                        _this.pamentshow = 1;
                        _this.gotostatspage();
                    }
                });
            }
            else {
                // let alert = this.alertCtrl.create({
                //     title: 'Your Premium Pass free trial has now finished.',
                //     message: 'Update your App today to view Premium content',
                //     buttons: [
                //         {
                //             text: 'OK',
                //             handler: () => {
                _this.Storage.get('userData').then(function (val) {
                    var Details = JSON.parse(val);
                    // if (val) {
                    //     // this.pamentshow = 1;
                    //     // this.gotostatspage();
                    //      if (this.platform.is('ios')) {
                    //         const browser = this.inapp.create('https://itunes.apple.com/in/app/vafa-live/id1359792023?mt=8');
                    //     } else if (this.platform.is('android')) {
                    //         const browser = this.inapp.create('https://play.google.com/store/apps/details?id=com.support.vafalive&hl=en');
                    //     }
                    // }
                    // else {
                    //      if (this.platform.is('ios')) {
                    //         const browser = this.inapp.create('https://itunes.apple.com/us/genre/ios-games-simulation/id7015?mt=8&letter=V');
                    //     } else if (this.platform.is('android')) {
                    //         const browser = this.inapp.create('https://play.google.com/store/apps/details?id=com.support.vafalive&hl=en');
                    //     }
                    // }
                    if (Details.payment_status == 1) {
                        if (Details.user_product == 'vafa_premium') {
                            if (Details.user_competition_id == _this.details.competion_id && (Details.user_team_id == _this.details.awateam_id || Details.user_team_id == _this.details.hometeam_id)) {
                                _this.pamentshow = 1;
                                _this.gotostatspage();
                            }
                            else {
                                var alertpopup = _this.alertCtrl.create({
                                    title: 'UPGRADE your PREMIUM PASS to PREMIUM PLUS today',
                                    cssClass: 'Upgradebutton',
                                    buttons: [
                                        {
                                            text: 'UPGRADE NOW',
                                            handler: function () {
                                                _this.ga.trackEvent('Status', 'Upgrade', 'Clicks')
                                                    .then(function () {
                                                    console.log('Live status');
                                                    _this.navCtrl.push('LandingpagePage');
                                                })
                                                    .catch(function () {
                                                    console.log('Live status Failed');
                                                });
                                            }
                                        },
                                        {
                                            text: 'MAYBE LATER',
                                            handler: function () {
                                                _this.goToActionPage(_this.statcheck);
                                            }
                                        }
                                    ]
                                });
                                alertpopup.present();
                            }
                        }
                        else {
                            _this.pamentshow = 1;
                            _this.gotostatspage();
                        }
                    }
                    else {
                        var alertpop = _this.alertCtrl.create({
                            title: 'UPGRADE your experience.',
                            message: 'Purchase a PREMIUM PASS today',
                            cssClass: 'Upgradebutton',
                            buttons: [
                                {
                                    text: 'UPGRADE NOW',
                                    handler: function () {
                                        _this.navCtrl.push('LandingpagePage');
                                    }
                                },
                                {
                                    text: 'MAYBE LATER',
                                    handler: function () {
                                        _this.goToActionPage(_this.statcheck);
                                    }
                                }
                            ]
                        });
                        alertpop.present();
                    }
                });
            }
            // }
            // ]
            // });
            // alert.present();
            // }
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        // }
        // else {
        //     this.events.publish('gotostats:changed', 'goto');
        // }
        // })
    };
    // actionpage///////////////////////////////////////////\
    InnermatchcenterPage.prototype.getgamescorefeeds = function (res) {
        var _this = this;
        this.actionScoreFeed1 = [];
        this.actionScoreFeed = res.score_feed;
        //console.log("Scroll"+ JSON.stringify(this.actionScoreFeed));
        this.actionScoreFeed.forEach(function (value) {
            //alert("Stat Title"+ value.stat_title);
            if (value.stat_title == 'Goals') {
                _this.stat_title = 'Goal';
            }
            else if (value.stat_title == 'Rush Behinds') {
                _this.stat_title = 'Rush Behind';
            }
            else if (value.stat_title == 'Behinds') {
                _this.stat_title = 'Behind';
            }
            else if (value.stat_title != 'Goals' || value.stat_title != 'Rush Behinds' || value.stat_title == 'Behinds') {
                _this.stat_title = value.stat_title;
            }
            _this.actionScoreFeed1.push({
                quater: value.quater,
                act_time: value.act_time,
                stat_id: value.stat_id,
                team_type: value.team_type,
                stat_title: _this.stat_title,
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
        //console.log("Scroll team type"+ this.actionScoreFeed1);
    };
    ;
    InnermatchcenterPage.prototype.getplayerscoreaction = function (res) {
        var _this = this;
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
        var homeTeamScore_1 = res.homeTeamScore;
        var awayTeamScore_1 = res.awayTeamScore;
        var merged_1 = homeTeamScore_1.concat(awayTeamScore_1);
        //console.log("merged_1");
        //console.log( merged_1 );
        this.merged = this.homeTeamScore + this.awayTeamScore;
        //console.log("merged"+  this.merged );
        var scores = [];
        var i = 1, goalHScore = 0, rbBHscore = 0, totalHScore = 0, goalAScore = 0, rbBAscore = 0, totalAScore = 0, actualTime, splitTime, minuteVal, totalSec;
        var newMerge = [];
        var cmp2 = function (x, y) {
            return x > y ? 1 : x < y ? -1 : 0;
        };
        var cmp3 = function (x, y) {
            var data = x.split(":");
            var data_time1 = (parseInt(data[0]) * 60) + data[1];
            data = y.split(":");
            var data_time2 = (parseInt(data[0]) * 60) + data[1];
            return data_time1 > data_time2 ? 1 : data_time1 < data_time2 ? -1 : 0;
        };
        merged_1.sort(function (a, b) {
            //console.log("hh");
            //console.log(a);
            //console.log(b);
            //note the minus before -cmp, for descending order
            return cmp2([cmp2(a.quater, b.quater), cmp2(a.act_time, b.act_time)], [cmp2(b.quater, a.quater), cmp3(b.act_time, a.act_time)]);
        });
        //console.log("++++++++++++++++++++");
        // //console.log(merged_1);
        this.newMerge = [];
        this.merged = merged_1;
        //   angular.forEach( this.merged, function(value5, key5) {
        this.merged.forEach(function (value5) {
            if (value5.stat_id == '1' || value5.stat_id == '2' || value5.stat_id == '3')
                _this.newMerge.push(value5);
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
        var quaterHScore = ["0.0", "0.0", "0.0", "0.0"];
        var quaterAScore = ["0.0", "0.0", "0.0", "0.0"];
        var finalQr = 0;
        var timeTotalGlobal = 0;
        var qrTimeLimit = Array();
        var flagchk = true;
        var temp = 1;
        var tempMin = 0;
        var maxScore = 0;
        var tempQr = 1;
        var tempValue = 0;
        var minSore = 0;
        var minScore = 0;
        var timeDuration = 20;
        //   angular.forEach(this.newMerge, function( value3 ,key3) {
        this.newMerge.forEach(function (value3, key3) {
            if (flagchk) {
                qrTimeLimit[0] = 0;
                flagchk = false;
                tempMin = 0;
                qrTimeLimit[temp] = 1;
            }
            else {
                if (temp != value3.quater) {
                    temp = value3.quater;
                    var actualTime2 = _this.newMerge[key3 - 1].act_time;
                    var actualTime1 = actualTime2.split(":");
                    qrTimeLimit[temp] = parseInt(qrTimeLimit[temp - 1]) + (parseInt(actualTime1[0]) * 60) + parseInt(actualTime1[1]);
                }
            }
            finalQr = value3.quater;
            actualTime = value3.act_time;
            splitTime = actualTime.split(":");
            minuteVal = splitTime[1];
            var TotalSec = (parseInt(splitTime[0]) * 60) + parseInt(splitTime[1]);
            totalSec = (minuteVal / 60).toFixed(2);
            var TotalTime = parseFloat(splitTime[0] + (splitTime[1]) / 60);
            var addQrTime = (value3.quater - 1) * timeDuration * 60;
            timeTotalGlobal = parseInt((splitTime[0] * 60) + (splitTime[1]) + (addQrTime));
            // alert(actualTime+","+TotalSec+"--"+timeTotalGlobal);
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
                        goalHScore = goalHScore + 6;
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
        var ticks1 = [];
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
                    var q1Score = quaterAScore[0].split(".");
                    var q2Score = quaterAScore[1].split(".");
                    var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    var q2ATotal = q2G + "." + q2RB;
                    // $('#q2AwayScore').html(q2ATotal);
                    this.q2AwayScore = q2ATotal;
                }
                //if($('#q2HomeScore').html()=='-')
                if (this.q2HomeScore == '-') {
                    var q1Score = quaterHScore[0].split(".");
                    var q2Score = quaterHScore[1].split(".");
                    var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                    var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                    var q2HTotal = q2G + "." + q2RB;
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
                    var q1Score = quaterAScore[0].split(".");
                    var q2Score = quaterAScore[1].split(".");
                    var q3Score = quaterAScore[2].split(".");
                    var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    var q3ATotal = q3G + "." + q3RB;
                    // $('#q3AwayScore').html(q3ATotal);
                    this.q3AwayScore = q3ATotal;
                }
                //if($('#q3HomeScore').html()=='-')
                if (this.q3HomeScore == '-') {
                    var q1Score = quaterHScore[0].split(".");
                    var q2Score = quaterHScore[1].split(".");
                    var q3Score = quaterHScore[2].split(".");
                    var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                    var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                    var q3Htotal = q3G + "." + q3RB;
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
                    var q1Score = quaterAScore[0].split(".");
                    var q2Score = quaterAScore[1].split(".");
                    var q3Score = quaterAScore[2].split(".");
                    var q4Score = quaterAScore[3].split(".");
                    var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    var q4ATotal = q4G + "." + q4RB;
                    //$('#q4AwayScore').html(q4ATotal);
                    this.q4AwayScore = q4ATotal;
                }
                //if($('#q4HomeScore').html()=='-')
                if (this.q4HomeScore == '-') {
                    var q1Score = quaterHScore[0].split(".");
                    var q2Score = quaterHScore[1].split(".");
                    var q3Score = quaterHScore[2].split(".");
                    var q4Score = quaterHScore[3].split(".");
                    var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                    var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                    var q4Htotal = q4G + "." + q4RB;
                    //$('#q4HomeScore').html(q4Htotal);
                    this.q4HomeScore = q4Htotal;
                }
            }
        }
        //console.log("len ::"+qrTimeLimit.length); 
        if (Math.abs(minScore) > maxScore)
            maxScore = Math.abs(minScore);
        maxScore = maxScore + 5;
        var modifedScore = [[0, 0]];
        var lastTempValue = 0;
        // angular.forEach(scores,function(item,index)
        scores.forEach(function (item, index) {
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
    ;
    InnermatchcenterPage.prototype.actionpage = function () {
        var _this = this;
        clearInterval(this.id);
        this.showcontent = 'hide';
        this.cmnfun.showLoading('Please wait...');
        this.ajax.datalist('get-game-score-feeds', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Home'
        }).subscribe(function (res) {
            _this.getgamescorefeeds(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        this.shortGraph = 1;
        this.fullGraph = 0;
        this.graphImgShowHide = 1;
        this.shortAdvhideshow = 1;
        this.headerImg = 0;
        this.ajax.datalist('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Home'
        }).subscribe(function (res) {
            _this.getplayerscoreaction(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        this.graphRefresh();
        if (this.statusName == 'COMPLETE') {
            clearInterval(this.id);
        }
        else {
            //alert("live=="+$stateParams.match_status)
            this.id = setInterval(function () {
                _this.ajax.datalist('get-game-score-feeds', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: _this.fixture_id,
                    adv_title: 'Home'
                }).subscribe(function (res) {
                    _this.getgamescorefeeds(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
                _this.ajax.datalist('get-player-score', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: _this.fixture_id,
                    adv_title: 'Home'
                }).subscribe(function (res) {
                    _this.getplayerscoreaction(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
                _this.graphRefresh();
            }, 15000);
        }
    };
    InnermatchcenterPage.prototype.graphRefresh = function () {
        var _this = this;
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
        }).subscribe(function (data) {
            _this.cmnfun.HideLoading();
            _this.data = data;
            _this.matchStatus = _this.data.fixureData.status;
            var response = JSON.stringify(data);
            _this.newTotalHomeTeamScore = _this.data.totalHomeTeamScore;
            _this.newTotalAwayTeamScore = _this.data.totalAwayTeamScore;
            _this.quaterEnd = [];
            _this.quaterEnd = _this.data.quaterEnd;
            if (response != null) {
                //START:HOME TEAM DATA
                if (_this.data.homeTeamScore != null) {
                    var quaterHScore_2 = ["0.0", "0.0", "0.0", "0.0"];
                    //START:Home TEam SCORE EACH FUNCTIon                    
                    $.each(_this.data.homeTeamScore, function (key, obj) {
                        if (obj.stat_id == 1 || obj.stat_id == 2 || obj.stat_id == 3) {
                            if (obj.stat_id == 1) //calculation for total goal  
                             {
                                var Q = obj.quater;
                                var totaValQ1 = quaterHScore_2[Q - 1];
                                //alert(totaValQ);
                                if (Q == 1) {
                                    totaValQ1 = quaterHScore_2[0];
                                    var totaValQ = totaValQ1.split(".");
                                    var totaQG = parseInt(totaValQ[0]) + 1;
                                    var totalValQ1RB = parseInt(totaValQ[1]);
                                    quaterHScore_2[0] = totaQG + "." + totalValQ1RB;
                                }
                                else if (Q == 2) {
                                    //quarter2 cal
                                    var totaValQ1_1 = quaterHScore_2[1];
                                    var totaValQ2 = totaValQ1_1.split(".");
                                    var totaQ2G = parseInt(totaValQ2[0]) + 1;
                                    quaterHScore_2[1] = totaQ2G + "." + totaValQ2[1];
                                }
                                else if (Q == 3) {
                                    //quarter3 cal
                                    var totaValQ4 = quaterHScore_2[2];
                                    var totaValQ3 = totaValQ4.split(".");
                                    var totaQ3G = parseInt(totaValQ3[0]) + 1;
                                    quaterHScore_2[2] = totaQ3G + "." + totaValQ3[1];
                                }
                                else if (Q == 4) {
                                    //quarter4 cal
                                    var totaValQ5 = quaterHScore_2[3];
                                    var totaValQ4 = totaValQ5.split(".");
                                    var totaQ4G = parseInt(totaValQ4[0]) + 1;
                                    quaterHScore_2[3] = totaQ4G + "." + totaValQ4[1];
                                }
                            } //END:calculation for total goal  
                            else //calculation for total RB  
                             {
                                //Calulation for display total quarter values in 
                                var Q = obj.quater;
                                var totaValQ1 = quaterHScore_2[Q - 1];
                                //alert(totaValQ);
                                if (Q == 1) {
                                    //totaValQ = "0.0";
                                    totaValQ1 = quaterHScore_2[0];
                                    var totaValQ = totaValQ1.split(".");
                                    var totaQG = parseInt(totaValQ[0]);
                                    var totalValQ1RB = parseInt(totaValQ[1]) + 1;
                                    quaterHScore_2[0] = totaQG + "." + totalValQ1RB;
                                }
                                else if (Q == 2) {
                                    //quarter2 cal
                                    var totaValQ3 = quaterHScore_2[1];
                                    var totaValQ2 = totaValQ3.split(".");
                                    var RBQ2 = parseInt(totaValQ2[1]);
                                    RBQ2++;
                                    var totaQ2G = parseInt(totaValQ2[0]);
                                    quaterHScore_2[1] = totaQ2G + "." + RBQ2;
                                }
                                else if (Q == 3) {
                                    //quarter3 cal
                                    var totaValQ4 = quaterHScore_2[2];
                                    var totaValQ3 = totaValQ4.split(".");
                                    var totaQ3G = parseInt(totaValQ3[0]);
                                    var RBQ3 = parseInt(totaValQ3[1]);
                                    RBQ3++;
                                    quaterHScore_2[2] = totaQ3G + "." + RBQ3;
                                }
                                else if (Q == 4) {
                                    //quarter4 cal
                                    var totaValQ5 = quaterHScore_2[3];
                                    var totaValQ4 = totaValQ5.split(".");
                                    var totaQ4G = parseInt(totaValQ4[0]);
                                    var RBQ4 = parseInt(totaValQ4[1]);
                                    RBQ4++;
                                    quaterHScore_2[3] = totaQ4G + "." + RBQ4;
                                }
                            } //calculation for total RB  
                        }
                        //START:total scores calculations
                        //console.log('Home Team Scores');console.log('q1-'+quaterHScore[0]); console.log('q2-'+quaterHScore[1]); console.log('q3-'+quaterHScore[2]); console.log('q4-'+quaterHScore[3]);  console.log('-----');
                        if (quaterHScore_2[0] !== '0.0') {
                            $("#q1HomeScore").html(quaterHScore_2[0]);
                        }
                        else {
                            $("#q1HomeScore").html('-');
                        }
                        //for q2 score
                        if (quaterHScore_2[1] !== '0.0') {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            var q12Total = q2G + "." + q2RB;
                            //console.log(q12Total);
                            $("#q2HomeScore").html(q12Total);
                            $('.totalHomeQuarerScore').html(q12Total);
                        }
                        else {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            var q2HTotal = q2G + "." + q2RB;
                            $('.totalHomeQuarerScore').html(q2HTotal);
                            $("#q2HomeScore").html('-');
                        }
                        //END:q2 score
                        //For q3 score
                        if (quaterHScore_2[2] !== '0.0') {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q3Score = quaterHScore_2[2].split(".");
                            var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            var q3Total = q3G + "." + q3RB;
                            $("#q3HomeScore").html(q3Total);
                            $('.totalHomeQuarerScore').html(q3Total);
                        }
                        else {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q3Score = quaterHScore_2[2].split(".");
                            var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            var q3Htotal = q3G + "." + q3RB;
                            $('.totalHomeQuarerScore').html(q3Htotal);
                            $("#q3HomeScore").html('-');
                        }
                        //END:q3 score
                        //For q4 score
                        if (quaterHScore_2[3] !== '0.0') {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q3Score = quaterHScore_2[2].split(".");
                            var q4Score = quaterHScore_2[3].split(".");
                            var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            var q4Total = q4G + "." + q4RB;
                            $("#q4HomeScore").html(q4Total);
                            $('.totalHomeQuarerScore').html(q4Total);
                        }
                        else {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q3Score = quaterHScore_2[2].split(".");
                            var q4Score = quaterHScore_2[3].split(".");
                            var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            var q4Htotal = q4G + "." + q4RB;
                            $('.totalHomeQuarerScore').html(q4Htotal);
                            $("#q4HomeScore").html('-');
                        }
                        //END:q3 score
                        //To display total scores
                        if (quaterHScore_2[0] !== '0.0') {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q1HTot = (parseInt(q1Score[0]) * 6) + parseInt(q1Score[1]);
                            $('.totalHoMeScores').html(q1HTot);
                            //console.log('q1-'+q1HTot);
                        }
                        if (quaterHScore_2[1] !== '0.0') {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            var q2HTot = q2G * 6 + q2RB;
                            $('.totalHoMeScores').html(q2HTot);
                            //console.log('q2-'+q2HTot);
                        }
                        if (quaterHScore_2[2] !== '0.0') {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q3Score = quaterHScore_2[2].split(".");
                            var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            var q3HTot = q3G * 6 + q3RB;
                            $('.totalHoMeScores').html(q3HTot);
                            //console.log('q3-'+q3HTot);
                        }
                        if (quaterHScore_2[3] !== '0.0') {
                            var q1Score = quaterHScore_2[0].split(".");
                            var q2Score = quaterHScore_2[1].split(".");
                            var q3Score = quaterHScore_2[2].split(".");
                            var q4Score = quaterHScore_2[3].split(".");
                            var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            var q4HTot = q4G * 6 + q4RB;
                            $('.totalHoMeScores').html(q4HTot);
                            //console.log('q4-'+q4HTot);
                        }
                        //END:total scores calculations   
                        //END:genrate home team players score                 
                    }); //END:Home TEam SCORE EACH FUNCTIon
                }
                //END:HOME TEAM DATA   
                //START:AWAY TEAM DATA
                var quaterAScore_2 = ["0.0", "0.0", "0.0", "0.0"];
                var quaterHScore = ["0.0", "0.0", "0.0", "0.0"];
                if (data.awayTeamScore != null) {
                    $.each(data.awayTeamScore, function (key, obj) {
                        if (obj.stat_id == 1 || obj.stat_id == 2 || obj.stat_id == 3) {
                            if (obj.stat_id == 1) {
                                var Q = obj.quater;
                                var totaValQ1 = quaterAScore_2[Q - 1];
                                //alert(totaValQ);
                                if (Q == 1) {
                                    //totaValQ = "0.0";
                                    totaValQ1 = quaterAScore_2[0];
                                    var totaValQ = totaValQ1.split(".");
                                    var totaQG = parseInt(totaValQ[0]) + 1;
                                    var totalValQ1RB = parseInt(totaValQ[1]);
                                    quaterAScore_2[0] = totaQG + "." + totalValQ1RB;
                                    //$('#q1HomeScore').html(quaterHScore[Q-1]);
                                }
                                else if (Q == 2) {
                                    //quarter2 cal
                                    var totaValQ3 = quaterAScore_2[1];
                                    var totaValQ2 = totaValQ3.split(".");
                                    var totaQ2G = parseInt(totaValQ2[0]) + 1;
                                    quaterAScore_2[1] = totaQ2G + "." + totaValQ2[1];
                                }
                                else if (Q == 3) {
                                    //quarter3 cal
                                    var totaValQ4 = quaterAScore_2[2];
                                    var totaValQ3 = totaValQ4.split(".");
                                    var totaQ3G = parseInt(totaValQ3[0]) + 1;
                                    quaterAScore_2[2] = totaQ3G + "." + totaValQ3[1];
                                }
                                else if (Q == 4) {
                                    //quarter4 cal
                                    var totaValQ5 = quaterAScore_2[3];
                                    var totaValQ4 = totaValQ5.split(".");
                                    var totaQ4G = parseInt(totaValQ4[0]) + 1;
                                    quaterAScore_2[3] = totaQ4G + "." + totaValQ4[1];
                                }
                                //END:Calulation for display total quarter values in 
                            }
                            else {
                                //Calulation for display total quarter values in 
                                var Q = obj.quater;
                                var totaValQ1 = quaterAScore_2[Q - 1];
                                //alert(totaValQ);
                                if (Q == 1) {
                                    //totaValQ = "0.0";
                                    totaValQ1 = quaterAScore_2[0];
                                    var totaValQ = totaValQ1.split(".");
                                    var totaQG = parseInt(totaValQ[0]);
                                    var totalValQ1RB = parseInt(totaValQ[1]) + 1;
                                    quaterAScore_2[0] = totaQG + "." + totalValQ1RB;
                                }
                                else if (Q == 2) {
                                    //quarter2 cal
                                    var totaValQ3 = quaterAScore_2[1];
                                    var totaValQ2 = totaValQ3.split(".");
                                    var RBQ2 = parseInt(totaValQ2[1]);
                                    RBQ2++;
                                    var totaQ2G = parseInt(totaValQ2[0]);
                                    quaterAScore_2[1] = totaQ2G + "." + RBQ2;
                                }
                                else if (Q == 3) {
                                    //quarter3 cal
                                    var totaValQ4 = quaterAScore_2[2];
                                    var totaValQ3 = totaValQ4.split(".");
                                    var totaQ3G = parseInt(totaValQ3[0]);
                                    var RBQ3 = parseInt(totaValQ3[1]);
                                    RBQ3++;
                                    quaterAScore_2[2] = totaQ3G + "." + RBQ3;
                                }
                                else if (Q == 4) {
                                    //quarter4 cal
                                    var totaValQ5 = quaterAScore_2[3];
                                    var totaValQ4 = totaValQ5.split(".");
                                    var totaQ4G = parseInt(totaValQ4[0]);
                                    var RBQ4 = parseInt(totaValQ4[1]);
                                    RBQ4++;
                                    quaterAScore_2[3] = totaQ4G + "." + RBQ4;
                                }
                                //END:Calulation for display total quarter values in 
                            }
                        }
                        //START:Away Team total scores calculations
                        //console.log('Away Team Scores');console.log('q1-'+quaterAScore[0]); console.log('q2-'+quaterAScore[1]); console.log('q3-'+quaterAScore[2]); console.log('q4-'+quaterAScore[3]);  console.log('-----');
                        if (quaterAScore_2[0] !== '0.0') {
                            $("#q1AwayScore").html(quaterAScore_2[0]);
                        }
                        else {
                            $("#q2AwayScore").html('0.0');
                        }
                        //for q2 score
                        if (quaterAScore_2[1] !== '0.0') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q12G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            var q12RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            var q12Total = q12G + "." + q12RB;
                            $("#q2AwayScore").html(q12Total);
                            $('.totalAwayQuarerScore').html(q12Total);
                        }
                        else {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            var q2ATotal = q2G + "." + q2RB;
                            $('.totalAwayQuarerScore').html(q2ATotal);
                            $("#q2AwayScore").html('-');
                        }
                        //END:q2 score
                        //For q3 score
                        if (quaterAScore_2[2] !== '0.0') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q3Score = quaterAScore_2[2].split(".");
                            var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            var q3Total = q3G + "." + q3RB;
                            $("#q3AwayScore").html(q3Total);
                            $('.totalAwayQuarerScore').html(q3Total);
                        }
                        else {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q3Score = quaterAScore_2[2].split(".");
                            var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            var q3ATotal = q3G + "." + q3RB;
                            $('.totalAwayQuarerScore').html(q3ATotal);
                            $("#q3AwayScore").html('-');
                        }
                        //END:q3 score
                        //For q4 score
                        if (quaterAScore_2[3] !== '0.0') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q3Score = quaterAScore_2[2].split(".");
                            var q4Score = quaterAScore_2[3].split(".");
                            var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            var q4Total = q4G + "." + q4RB;
                            $("#q4AwayScore").html(q4Total);
                            $('.totalAwayQuarerScore').html(q4Total);
                        }
                        else {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q3Score = quaterAScore_2[2].split(".");
                            var q4Score = quaterAScore_2[3].split(".");
                            var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            var q4ATotal = q4G + "." + q4RB;
                            $('.totalAwayQuarerScore').html(q4ATotal);
                            $("#q4AwayScore").html('-');
                        }
                        //END:q3 score
                        //To display total scores
                        if (quaterAScore_2[0] !== '0.0') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q1ATot = (parseInt(q1Score[0]) * 6) + parseInt(q1Score[1]);
                            $('.totalAwAyScores').html(q1ATot);
                        }
                        if (quaterAScore_2[1] !== '0.0') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            var q2ATot = (q2G * 6) + q2RB;
                            $('.totalAwAyScores').html(q2ATot);
                        }
                        if (quaterAScore_2[2] !== '0.0') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q3Score = quaterAScore_2[2].split(".");
                            var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            var q3ATot = (q3G * 6) + q3RB;
                            $('.totalAwAyScores').html(q3ATot);
                        }
                        if (quaterAScore_2[3] !== '0.0') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q3Score = quaterAScore_2[2].split(".");
                            var q4Score = quaterAScore_2[3].split(".");
                            var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            var q4ATot = (q4G * 6) + q4RB;
                            $('.totalAwAyScores').html(q4ATot);
                        }
                        //END:Away Team total scores calculations
                        //END:Away Team total scores calculations
                    });
                } //END:AWAY TEAM DATA
                //START:SCORE CHART GRAPH
                var homeTeamScore = (data.homeTeamScore);
                var awayTeamScore = (data.awayTeamScore);
                var merged = homeTeamScore.concat(awayTeamScore);
                var scores_1 = [];
                var i_1 = 1, goalHScore_1 = 0, rbBHscore_1 = 0, totalHScore_1 = 0, goalAScore = 0, rbBAscore = 0, totalAScore = 0, actualTime_1, splitTime_1, minuteVal_1, totalSec_1;
                var newMerge_1 = [];
                var cmp_1 = function (x, y) {
                    return x > y ? 1 : x < y ? -1 : 0;
                };
                var cmp1_1 = function (x, y) {
                    data = x.split(":");
                    var data_time1 = parseInt(parseInt(data[0] * 60) + data[1]);
                    data = y.split(":");
                    var data_time2 = parseInt(parseInt(data[0] * 60) + data[1]);
                    return data_time1 > data_time2 ? 1 : data_time1 < data_time2 ? -1 : 0;
                };
                //sort quater,act_time in ascending 
                merged.sort(function (a, b) {
                    //note the minus before -cmp, for descending order
                    return cmp_1([cmp_1(a.quater, b.quater), cmp1_1(a.act_time, b.act_time)], [cmp_1(b.quater, a.quater), cmp1_1(b.act_time, a.act_time)]);
                });
                $.each(merged, function (key5, value5) {
                    if (value5.stat_id == '1' || value5.stat_id == '2' || value5.stat_id == '3')
                        newMerge_1.push(value5);
                });
                //console.log('==old merged ARRAY=='); console.log(merged);console.log(merged.length);console.log('======');console.log('==new merged ARRAY==');console.log(newMerge);console.log(newMerge.length);
                //let res;
                var finalQr_1 = 0;
                var timeTotalGlobal_1 = 0;
                var qrTimeLimit_1 = Array();
                var flagchk_1 = true;
                var temp_1 = 1;
                var tempMin_1 = 0;
                var maxScore_1 = 0;
                var tempQr = 1;
                var tempValue = 0;
                var minSore = 0;
                var minScore_1 = 0;
                var timeDuration_1 = 26;
                $.each(newMerge_1, function (key3, value3) {
                    if (flagchk_1) {
                        qrTimeLimit_1[0] = 0;
                        flagchk_1 = false;
                        tempMin_1 = 0;
                        qrTimeLimit_1[temp_1] = 1;
                    }
                    else {
                        if (temp_1 != value3.quater) {
                            temp_1 = value3.quater;
                            var actualTime1 = newMerge_1[key3 - 1].act_time;
                            actualTime1 = actualTime1.split(":");
                            qrTimeLimit_1[temp_1] = parseInt(qrTimeLimit_1[temp_1 - 1]) + parseInt(actualTime1[0] * 60) + parseInt(actualTime1[1]);
                        }
                    }
                    finalQr_1 = value3.quater;
                    actualTime_1 = value3.act_time;
                    splitTime_1 = actualTime_1.split(":");
                    minuteVal_1 = splitTime_1[1];
                    var TotalSec = parseInt(parseInt(splitTime_1[0] * 60) + parseInt(splitTime_1[1]));
                    totalSec_1 = (minuteVal_1 / 60).toFixed(2);
                    var TotalTime = parseFloat(splitTime_1[0] + (splitTime_1[1]) / 60);
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
                    var addQrTime = (value3.quater - 1) * timeDuration_1 * 60;
                    timeTotalGlobal_1 = parseInt(parseInt(splitTime_1[0] * 60) + parseInt(splitTime_1[1]) + parseInt(addQrTime));
                    // alert(actualTime+","+TotalSec+"--"+timeTotalGlobal);
                    if ((value3.team_type) == 'home') {
                        if (value3.quater == '1') {
                            if (value3.stat_id == '1') {
                                // goalHScore+=6;
                                goalHScore_1 = parseInt(parseInt(goalHScore_1) + 6);
                            }
                            else {
                                //rbBHscore+=1;
                                rbBHscore_1 = parseInt(parseInt(rbBHscore_1) + 1);
                            }
                        }
                        else if (value3.quater == '2') {
                            if (value3.stat_id == '1') {
                                //goalHScore+=6;
                                goalHScore_1 = parseInt(parseInt(goalHScore_1) + 6);
                            }
                            else {
                                // rbBHscore+=1;
                                rbBHscore_1 = parseInt(parseInt(rbBHscore_1) + 1);
                            }
                        }
                        else if (value3.quater == '3') {
                            if (value3.stat_id == '1') {
                                // goalHScore+=6;
                                goalHScore_1 = parseInt(parseInt(goalHScore_1) + 6);
                            }
                            else {
                                //rbBHscore+=1;
                                rbBHscore_1 = parseInt(parseInt(rbBHscore_1) + 1);
                            }
                        }
                        else if (value3.quater == '4') {
                            if (value3.stat_id == '1') {
                                //goalHScore+=6;
                                goalHScore_1 = parseInt(parseInt(goalHScore_1) + 6);
                            }
                            else {
                                // rbBHscore+=1;
                                rbBHscore_1 = parseInt(parseInt(rbBHscore_1) + 1);
                            }
                        }
                        totalHScore_1 = parseInt(goalHScore_1 + rbBHscore_1);
                        scores_1.push([timeTotalGlobal_1, totalHScore_1]);
                        if (maxScore_1 < totalHScore_1)
                            maxScore_1 = totalHScore_1;
                        if (totalHScore_1 <= 0) {
                            if (minScore_1 > totalHScore_1)
                                minScore_1 = totalHScore_1;
                        }
                    }
                    else {
                        if (value3.quater == '1') {
                            var q1Flag = true;
                            if (value3.stat_id == '1') {
                                // goalHScore-=6;
                                goalHScore_1 = parseInt(parseInt(goalHScore_1) - 6);
                            }
                            else {
                                //rbBHscore-=1;
                                rbBHscore_1 = parseInt(parseInt(rbBHscore_1) - 1);
                            }
                        }
                        else if (value3.quater == '2') {
                            var q2Flag = true;
                            if (value3.stat_id == '1') {
                                //goalHScore-=6;
                                goalHScore_1 = parseInt(parseInt(goalHScore_1) - 6);
                            }
                            else {
                                //rbBHscore-=1;
                                rbBHscore_1 = parseInt(parseInt(rbBHscore_1) - 1);
                            }
                        }
                        else if (value3.quater == '3') {
                            var q3Flag = true;
                            if (value3.stat_id == '1') {
                                //goalHScore-=6;
                                goalHScore_1 = parseInt(parseInt(goalHScore_1) - 6);
                            }
                            else {
                                // rbBHscore-=1;
                                rbBHscore_1 = parseInt(parseInt(rbBHscore_1) - 1);
                            }
                        }
                        else if (value3.quater == '4') {
                            var q4Flag = true;
                            if (value3.stat_id == '1') {
                                //goalHScore-=6;
                                goalHScore_1 = parseInt(parseInt(goalHScore_1) - 6);
                            }
                            else {
                                rbBHscore_1 -= 1;
                                rbBHscore_1 = parseInt(parseInt(rbBHscore_1) - 1);
                            }
                        }
                        totalHScore_1 = parseInt(goalHScore_1 + rbBHscore_1);
                        scores_1.push([timeTotalGlobal_1, totalHScore_1]);
                        if (maxScore_1 < totalHScore_1)
                            maxScore_1 = totalHScore_1;
                        if (totalHScore_1 <= 0) {
                            if (minScore_1 > totalHScore_1)
                                minScore_1 = totalHScore_1;
                        }
                    }
                    i_1 += 1;
                });
                //console.log(scores);
                //console.log(maxScore);
                var ticks1 = [];
                if ((quaterAScore_2[0] !== '0.0') || (quaterHScore[0] !== '0.0')) {
                    if (qrTimeLimit_1.length > 0) {
                        ticks1 = [[30, 'Q1']];
                        //ticks1=ticks1/2;
                        if ($('#q1AwayScore').html() == '-') {
                            $('#q1AwayScore').html(quaterAScore_2[0]);
                        }
                        if ($('#q1HomeScore').html() == '-') {
                            $('#q1HomeScore').html(quaterHScore[0]);
                        }
                    }
                }
                else {
                    if ($('#q1AwayScore').html() == '-') {
                        $('#q1AwayScore').html(quaterAScore_2[0]);
                    }
                    if ($('#q1HomeScore').html() == '-') {
                        $('#q1HomeScore').html(quaterHScore[0]);
                    }
                }
                if ((quaterAScore_2[1] !== '0.0') || (quaterHScore[1] !== '0.0')) {
                    if (qrTimeLimit_1.length > 1) {
                        ticks1 = [[360, 'Q1'], [qrTimeLimit_1[1], 'Q2']];
                        if ($('#q2AwayScore').html() == '-') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            var q2ATotal = q2G + "." + q2RB;
                            $('#q2AwayScore').html(q2ATotal);
                        }
                        if ($('#q2HomeScore').html() == '-') {
                            var q1Score = quaterHScore[0].split(".");
                            var q2Score = quaterHScore[1].split(".");
                            var q2G = parseInt(q1Score[0]) + parseInt(q2Score[0]);
                            var q2RB = parseInt(q1Score[1]) + parseInt(q2Score[1]);
                            var q2HTotal = q2G + "." + q2RB;
                            $('#q2HomeScore').html(q2HTotal);
                        }
                    }
                }
                if ((quaterAScore_2[2] !== '0.0') || (quaterHScore[2] !== '0.0')) {
                    if (qrTimeLimit_1.length > 2) {
                        ticks1 = [[0, 'Q1'], [qrTimeLimit_1[1], 'Q2'], [qrTimeLimit_1[2], 'Q3']];
                        if ($('#q3AwayScore').html() == '-') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q3Score = quaterAScore_2[2].split(".");
                            var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            var q3ATotal = q3G + "." + q3RB;
                            $('#q3AwayScore').html(q3ATotal);
                        }
                        if ($('#q3HomeScore').html() == '-') {
                            var q1Score = quaterHScore[0].split(".");
                            var q2Score = quaterHScore[1].split(".");
                            var q3Score = quaterHScore[2].split(".");
                            var q3G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]);
                            var q3RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]);
                            var q3Htotal = q3G + "." + q3RB;
                            $('#q3HomeScore').html(q3Htotal);
                        }
                    }
                }
                if ((quaterAScore_2[3] !== '0.0') || (quaterHScore[3] !== '0.0')) {
                    if (qrTimeLimit_1.length > 3) {
                        //  alert(qrTimeLimit[4]);
                        ticks1 = [[0, 'Q1'], [qrTimeLimit_1[2], 'Q2'], [qrTimeLimit_1[3], 'Q3'], [qrTimeLimit_1[4], 'Q4']];
                        //alert($('#q4HomeScore').html());
                        if ($('#q4AwayScore').html() == '-') {
                            var q1Score = quaterAScore_2[0].split(".");
                            var q2Score = quaterAScore_2[1].split(".");
                            var q3Score = quaterAScore_2[2].split(".");
                            var q4Score = quaterAScore_2[3].split(".");
                            var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            var q4ATotal = q4G + "." + q4RB;
                            $('#q4AwayScore').html(q4ATotal);
                        }
                        if ($('#q4HomeScore').html() == '-') {
                            var q1Score = quaterHScore[0].split(".");
                            var q2Score = quaterHScore[1].split(".");
                            var q3Score = quaterHScore[2].split(".");
                            var q4Score = quaterHScore[3].split(".");
                            var q4G = parseInt(q1Score[0]) + parseInt(q2Score[0]) + parseInt(q3Score[0]) + parseInt(q4Score[0]);
                            var q4RB = parseInt(q1Score[1]) + parseInt(q2Score[1]) + parseInt(q3Score[1]) + parseInt(q4Score[1]);
                            var q4Htotal = q4G + "." + q4RB;
                            $('#q4HomeScore').html(q4Htotal);
                        }
                    }
                }
                //console.log("len ::"+qrTimeLimit.length);
                if (Math.abs(minScore_1) > maxScore_1)
                    maxScore_1 = Math.abs(minScore_1);
                maxScore_1 = parseInt(maxScore_1 + 5);
                var modifedScore_1 = [[0, 0]];
                var lastTempValue_1 = 0;
                $.each(scores_1, function (index, item) {
                    modifedScore_1.push([item[0], lastTempValue_1]);
                    modifedScore_1.push([item[0], item[1]]);
                    lastTempValue_1 = item[1];
                });
                //console.log(modifedScore);
                //console.log(ticks1[3][0]);
                /*if($("#teamStatus").val()!=10)
                modifedScore.push([4800,lastTempValue]);
                //ticks1= [[0,'Q1'],[timeDuration*60,'Q2'],[timeDuration*2*60,'Q3'],[timeDuration*3*60,'Q4']];
                ticks1= [[0,''],[timeDuration*60,'Q1'],[timeDuration*2*60,'Q2'],[timeDuration*3*60,'Q3'],[timeDuration*4*60,'Q4']];*/
                //if($("#teamStatus").val()==1)
                if ($("#teamStatus").val() == 1)
                    modifedScore_1.push([timeDuration_1 * 4 * 60, lastTempValue_1]);
                // angular.forEach(this.quaterEnd, function(value,index){
                _this.quaterEnd.forEach(function (value, key3) {
                    //alert(value.quater+"---"+index);
                    _this.endQuarterValue = value.quater;
                    _this.stat_title = value.stat_title;
                });
                //alert(this.endQuarterValue +""+this.stat_title);
                if (_this.endQuarterValue == 1 && _this.stat_title == 'End')
                    modifedScore_1.push([timeDuration_1 * 1 * 60, lastTempValue_1]);
                if (_this.endQuarterValue == 2 && _this.stat_title == 'End')
                    modifedScore_1.push([timeDuration_1 * 2 * 60, lastTempValue_1]);
                if (_this.endQuarterValue == 3 && _this.stat_title == 'End')
                    modifedScore_1.push([timeDuration_1 * 3 * 60, lastTempValue_1]);
                if (_this.endQuarterValue == 4 && _this.stat_title == 'End')
                    modifedScore_1.push([timeDuration_1 * 4 * 60, lastTempValue_1]);
                if (_this.stat_title == 'Start')
                    modifedScore_1.push([timeDuration_1 * (_this.endQuarterValue - 1) * 60, lastTempValue_1]);
                console.log(modifedScore_1);
                /*else if(matchStatus==1 && q1Flag == true)
                modifedScore.push([timeDuration*60,lastTempValue]);*/
                ticks1 = [[timeDuration_1 * 60, 'Q1'], [timeDuration_1 * 2 * 60, 'Q2'], [timeDuration_1 * 3 * 60, 'Q3'], [timeDuration_1 * 4 * 60, 'Q4']];
                var options = {
                    canvas: false,
                    series: {
                        lines: { show: true, fill: true, fillColor: 'rgba(255,187,42, 0.2)', lineWidth: 4 }
                    },
                    grid: {
                        color: 'transparent',
                        markings: [
                            { xaxis: { from: 0, to: timeDuration_1 * 60 }, color: 'rgba(39, 54, 86, 1)' },
                            { xaxis: { from: timeDuration_1 * 60, to: timeDuration_1 * 2 * 60 }, color: 'rgba(25, 39, 67, 1)' },
                            { xaxis: { from: timeDuration_1 * 2 * 60, to: timeDuration_1 * 3 * 60 }, color: 'rgba(39, 54, 86, 1)' },
                            { xaxis: { from: timeDuration_1 * 3 * 60, to: timeDuration_1 * 4 * 60 }, color: 'rgba(25, 39, 67, 1)' }
                        ]
                    },
                    yaxis: { min: -maxScore_1, max: maxScore_1, position: "right", color: "rgb(111,124,148)" },
                    tooltip: true,
                    xaxis: {
                        ticks: ticks1, min: 0, max: 24 * 4 * 60, color: "rgb(111,124,148)",
                        font: { color: 'rgb(121,133,155)', family: 'Gotham-Bold', size: 11 }
                    },
                    colors: ["rgb(255,187,42)"],
                };
                // alert("hh");
                console.log(modifedScore_1);
                var plotObj = $.plot($("#scoreChart"), [{ data: modifedScore_1 }], options);
                var plotObj1 = $.plot($("#scoreChartmin"), [{ data: modifedScore_1 }], options);
                $("#scoreChartmin").hide();
                $("#scoreChartminh").hide();
                //END:SCORE CHART GRAPH  
                $(".tickLabel").each(function () {
                    var removeMinusText = $(this).text();
                    $(this).text(removeMinusText.replace("-", ""));
                });
                //END:DISPLAY TEAM WIN STATUS   
            } //END:RESPONSE NULL OR NOT 
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            var msg = "Sorry but there was an error: ";
        });
        //END:Ajax Function
        // });
    };
    // statspage///////////////////////////////////////////////////////////////
    InnermatchcenterPage.prototype.gotostatspage = function () {
        var _this = this;
        // clearInterval(this.id);
        this.cmnfun.showLoading('Please wait...');
        this.ajax.postaction('get-player-score-for-stat-team', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Stats-Club'
        }).subscribe(function (res) {
            _this.getplayerscoreforstatteam(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        this.homeTeamScoreStat = [];
        this.awayTeamScoreStat = [];
        this.showDataTable = false;
        if (this.statusName == 'COMPLETE') {
            //alert("complete=="+$stateParams.match_status)
            clearInterval(this.id);
        }
        else {
            //alert("live=="+$stateParams.match_status)
            this.id = setInterval(function () {
                _this.ajax.datalist('get-player-score-for-stat-team', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: _this.fixture_id,
                    adv_title: 'Stats-Club'
                }).subscribe(function (res) {
                    _this.getplayerscoreforstatteam(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }, 15000);
        }
    };
    InnermatchcenterPage.prototype.getplayerscoreforstatteam = function (data) {
        var _this = this;
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
        this.homeTeamPlayers = data.homeTeamPlayers;
        ;
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
            "EFF"
        ];
        // angular.forEach(this.modifiedState,function(item,index){
        this.modifiedState.forEach(function (item, index) {
            //alert(item+"==="+index)
            if (_this.homeTeamWithStatPoint[item] == undefined || _this.homeTeamWithStatPoint[item] == 'undefined')
                _this.homeTeamScoreStat[item] = 0;
            else
                _this.homeTeamScoreStat[item] = _this.homeTeamWithStatPoint[item];
            if (_this.awayTeamWithStatPoint[item] == undefined || _this.awayTeamWithStatPoint[item] == 'undefined')
                _this.awayTeamScoreStat[item] = 0;
            else
                _this.awayTeamScoreStat[item] = _this.awayTeamWithStatPoint[item];
            //this.stat.push({name:index,count:0});
            if (item == 'Disposals') {
                _this.homeTeamScoreStat['Disposals'] = _this.homeTeamScoreStat['H'] + _this.homeTeamScoreStat['K'];
                _this.awayTeamScoreStat['Disposals'] = _this.awayTeamScoreStat['H'] + _this.awayTeamScoreStat['K'];
            }
            if (item == 'EFF') {
                /* this.hAdd = this.homeTeamScoreStat['G']+this.homeTeamScoreStat['B']+this.homeTeamScoreStat['RB'];
                this.effVal = this.homeTeamScoreStat['I50']
                this.hDiv =  parseInt(this.hAdd/this.effVal).toFixed(2);
                alert(this.hAdd+"=="+this.effVal+"=="+this.hDiv) */
                var hAdd = _this.homeTeamScoreStat['G'] + _this.homeTeamScoreStat['B'] + _this.homeTeamScoreStat['RB'];
                var hEffVal = _this.homeTeamScoreStat['I50'];
                var hDiv = hAdd / hEffVal;
                var aAdd = _this.awayTeamScoreStat['G'] + _this.awayTeamScoreStat['B'] + _this.awayTeamScoreStat['RB'];
                var aEffVal = _this.awayTeamScoreStat['I50'];
                var aDiv = aAdd / aEffVal;
                //alert(hAdd+"......"+hEffVal+"......"+hDiv)
                if (isNaN(hDiv) || hDiv == 'Infinity') {
                    hDiv = 0;
                    _this.hEFF = (hDiv * 100).toFixed(2);
                    _this.homeEFF = parseInt(_this.hEFF.split('.')[0]);
                    _this.homeEFFWidth = parseInt(_this.hEFF.split('.')[0]);
                }
                else {
                    //alert(3)
                    _this.hEFF = (hDiv * 100).toFixed(2);
                    //this.homeEFF =  parseInt(this.hEFF.split('.')[0]);
                    _this.homeEFF = Math.round(_this.hEFF);
                    _this.homeEFFWidth = parseInt(_this.hEFF.split('.')[0]);
                    //alert(this.hEFF+"=="+this.homeEFF+"=="+this.homeEFFWidth)
                }
                if (isNaN(aDiv) || aDiv == 'Infinity') {
                    aDiv = 0;
                    _this.aEFF = (aDiv * 100).toFixed(2);
                    _this.awayEFF = parseInt(_this.aEFF.split('.')[0]);
                    _this.awayEFFWidth = parseInt(_this.aEFF.split('.')[0]);
                }
                else {
                    _this.aEFF = (aDiv * 100).toFixed(2);
                    //this.awayEFF =  parseInt(this.aEFF.split('.')[0]);
                    _this.awayEFF = Math.round(_this.aEFF);
                    _this.awayEFFWidth = parseInt(_this.aEFF.split('.')[0]);
                    //alert(this.aEFF+"=="+this.awayEFF+"=="+this.awayEFFWidth)
                }
                if (_this.homeEFF > _this.awayEFF && _this.homeEFF <= 100) {
                    _this.hColor = 'green';
                    _this.aColor = 'gray';
                }
                else if (_this.homeEFF < _this.awayEFF && _this.awayEFF <= 100) {
                    _this.aColor = 'green';
                    _this.hColor = 'gray';
                }
                else if (_this.homeEFF > _this.awayEFF && _this.homeEFF > 100) {
                    _this.hColor = 'green';
                    _this.aColor = 'gray';
                    _this.homeEFFWidth = "100";
                }
                else if (_this.homeEFF < _this.awayEFF && _this.awayEFF > 100) {
                    _this.aColor = 'green';
                    _this.hColor = 'gray';
                    _this.awayEFFWidth = "100";
                }
                else if (_this.homeEFF == 0 && _this.awayEFF == 0) {
                    _this.aColor = 'orange';
                    _this.hColor = 'orange';
                }
                else if (_this.homeEFF == _this.awayEFF) {
                    _this.aColor = 'orange';
                    _this.hColor = 'orange';
                }
            }
        });
        this.homeTeamScoreStat['B'] = this.homeTeamScoreStat['B'] + this.homeTeamScoreStat['RB'];
        this.awayTeamScoreStat['B'] = this.awayTeamScoreStat['B'] + this.awayTeamScoreStat['RB'];
        this.modifiedStateSeq = [];
        // angular.forEach(this.modifiedState,function(item,index){
        this.modifiedState.forEach(function (item, index) {
            // angular.forEach(this.stats , function(obj){
            _this.stats.forEach(function (obj, index) {
                //alert(JSON.stringify(obj))
                //   alert(item+"===="+JSON.stringify(obj))
                if (item == obj.stat_abbrevation) {
                    _this.modifiedStateSeq.push(obj);
                }
            });
            if (item == 'Disposals') {
                _this.homeTeamScoreStat['Disposals'] = _this.homeTeamScoreStat['H'] + _this.homeTeamScoreStat['K'];
                _this.awayTeamScoreStat['Disposals'] = _this.awayTeamScoreStat['H'] + _this.awayTeamScoreStat['K'];
                var homeColor = '#60BA72';
                var awayColor = '#596682';
                if (_this.homeTeamScoreStat['Disposals'] > _this.awayTeamScoreStat['Disposals'] && _this.homeTeamScoreStat['Disposals'] < 100) {
                    _this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: homeColor, awayTeamColor: awayColor, awayTeamWidth: "51%", homeTeamWidth: "71%" });
                }
                else if ((_this.homeTeamScoreStat['Disposals'] > _this.awayTeamScoreStat['Disposals']) && (_this.homeTeamScoreStat['Disposals'] >= 100 && _this.homeTeamScoreStat['Disposals'] <= 150)) {
                    _this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: homeColor, awayTeamColor: awayColor, awayTeamWidth: "75%", homeTeamWidth: "81%" });
                }
                else if (_this.homeTeamScoreStat['Disposals'] > _this.awayTeamScoreStat['Disposals'] && _this.homeTeamScoreStat['Disposals'] > 200) {
                    _this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: homeColor, awayTeamColor: awayColor, awayTeamWidth: "90%", homeTeamWidth: "96%" });
                }
                else if (_this.homeTeamScoreStat['Disposals'] < _this.awayTeamScoreStat['Disposals'] && _this.awayTeamScoreStat['Disposals'] < 100) {
                    _this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: awayColor, awayTeamColor: homeColor, awayTeamWidth: "71%", homeTeamWidth: "51%" });
                }
                else if ((_this.homeTeamScoreStat['Disposals'] < _this.awayTeamScoreStat['Disposals']) && (_this.awayTeamScoreStat['Disposals'] >= 100 && _this.awayTeamScoreStat['Disposals'] <= 150)) {
                    _this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: awayColor, awayTeamColor: homeColor, awayTeamWidth: "81%", homeTeamWidth: "75%" });
                }
                else if (_this.homeTeamScoreStat['Disposals'] < _this.awayTeamScoreStat['Disposals'] && _this.awayTeamScoreStat['Disposals'] > 200) {
                    _this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: awayColor, awayTeamColor: homeColor, awayTeamWidth: "96%", homeTeamWidth: "90%" });
                }
                else if (_this.homeTeamScoreStat['Disposals'] == _this.awayTeamScoreStat['Disposals']) {
                    _this.modifiedStateSeq.push({ id: 10000, stat_name: "Disposals", stat_abbrevation: "Disposals", homeTeamColor: 'orange', awayTeamColor: 'orange', awayTeamWidth: "51%", homeTeamWidth: "51%" });
                }
                //this.modifiedStateSeq.push({id:10000,stat_name:"Disposals",stat_abbrevation:"Disposals",homeTeamColor:"#60BA72",awayTeamColor:"#596682",awayTeamWidth:"51%",homeTeamWidth:"81.48148148148148%"});
            }
        });
        // angular.forEach(this.stats,function(item,index){
        this.stats.forEach(function (item, index) {
            _this.getColorWidth(index, _this.homeTeamScoreStat[item.stat_abbrevation], _this.awayTeamScoreStat[item.stat_abbrevation]);
        });
        // alert(JSON.stringify(this.modifiedStateSeq));
        this.cmnfun.HideLoading();
    };
    InnermatchcenterPage.prototype.getColorWidth = function (key, homeTeamValue, awayTeamValue) {
        var barValueH = homeTeamValue;
        var barValueA = awayTeamValue;
        var homeBarsSpanVal = homeTeamValue;
        var awayBarsSpanVal = awayTeamValue;
        if (homeBarsSpanVal > awayBarsSpanVal) {
            this.stats[key].homeTeamColor = '#60BA72';
            this.stats[key].awayTeamColor = '#596682';
            this.stats[key].homeTeamOnlyColor = 'green';
            this.stats[key].awayTeamOnlyColor = 'gray';
            var maxAway = 5;
            var modifedMaxValue = parseFloat(barValueH + maxAway);
            var percentageUnit = parseFloat(100 / modifedMaxValue);
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
            var maxAway = 5;
            var modifedMaxValue = parseFloat(barValueA + maxAway);
            modifedMaxValue = parseFloat(barValueA + maxAway);
            var percentageUnit = parseFloat(100 / modifedMaxValue);
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
            var maxAway = 5;
            var modifedMaxValue = parseFloat(awayBarsSpanVal + maxAway);
            var percentageUnit = parseFloat(100 / modifedMaxValue);
            this.stats[key].awayTeamWidth = parseFloat(percentageUnit * awayBarsSpanVal) + "%";
            this.stats[key].homeTeamWidth = parseFloat(percentageUnit * homeBarsSpanVal) + "%";
        }
        else if (awayBarsSpanVal == 0 || homeBarsSpanVal == 0) {
            this.stats[key].awayTeamColor = 'orange';
            this.stats[key].homeTeamColor = 'orange';
            this.stats[key].awayTeamWidth = '20%';
            this.stats[key].homeTeamWidth = '20%';
        }
    };
    InnermatchcenterPage.prototype.selectstats = function (item) {
        var _this = this;
        //   alert("hh");
        if (item == 'team') {
            if (this.statschoose2 != 'team') {
                this.statschoose2 = 'team';
                this.cmnfun.showLoading('Please wait...');
                this.statschoose = 'team';
                this.ajax.postaction('get-player-score-for-stat-team', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    fixtureId: this.fixture_id,
                    adv_title: 'Stats-Club'
                }).subscribe(function (res) {
                    _this.getplayerscoreforstatteam(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
        }
        else {
            if (this.statschoose2 != 'Player') {
                this.statschoose2 = 'Player';
                this.statschoose = 'Player';
                this.cmnfun.showLoading('Please wait...');
                this.gotoplayers();
            }
        }
    };
    InnermatchcenterPage.prototype.gotoplayers = function () {
        var _this = this;
        this.fixture_id = this.details.fixture_id;
        this.stateRoundNo = this.details.fixture_id.roundNo;
        this.ajax.postaction('get-player-score', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            fixtureId: this.fixture_id,
            adv_title: 'Stats-Club'
        }).subscribe(function (res) {
            console.log('1' + res);
            $('#playerStatsTable').dataTable().fnDestroy();
            _this.getplayerscoreplayer(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        this.homeTeamScoreStat = [];
        this.awayTeamScoreStat = [];
        this.showDataTable = false;
        this.cntt = 0;
        this.orderByFieldName = 'GB';
        this.reverse = false;
        this.sortBY('GB');
    };
    InnermatchcenterPage.prototype.getGBData = function (g_value, b_value, rb_value, key, obj, k_value, h_value) {
        var goal = 0;
        var b = 0;
        var rb = 0;
        var k = 0;
        var h = 0;
        if (g_value == undefined)
            goal = 0;
        else
            goal = g_value;
        if (b_value == undefined)
            b = 0;
        else
            b = b_value;
        if (rb_value == undefined)
            rb = 0;
        else
            rb = rb_value;
        if (k_value == undefined)
            k = 0;
        else
            k = k_value;
        if (h_value == undefined)
            h = 0;
        else
            h = h_value;
        this.homeAwayTeamPlayerWithScore[key].GB = parseInt(parseInt(goal * 6) + parseInt(b + rb));
        this.homeTeamPlayers1[key].GB = parseFloat(parseInt(parseInt(goal * 6) + parseInt(b + rb)));
        //this.homeTeamPlayers1[key].D = parseInt(k_value + h_value) ;
        var GB_score = goal + "." + parseInt(b + rb);
        if (GB_score == 0)
            return "0.0";
        else
            return GB_score;
    };
    InnermatchcenterPage.prototype.sortBY = function (stat) {
        //alert(stat+"----"+this.reverse)
        if (this.reverse == true) {
            this.reverse = false;
            this.orderByFieldName = stat;
            //	$(this).addClass("active1");
        }
        else {
            this.reverse = false;
            this.orderByFieldName = stat;
            //$(this).addClass("active1");
        }
    };
    InnermatchcenterPage.prototype.getValue = function (key, statScore, statName) {
        if (statScore == undefined || statScore == 'undefined') {
            this.homeAwayTeamPlayerWithScore[key][statName] = 0;
            this.homeTeamPlayers1[key][statName] = 0;
            return 0;
        }
        else {
            this.homeAwayTeamPlayerWithScore[key][statName] = parseInt(this.homeAwayTeamPlayerWithScore[key][statName]);
            if (isNaN(statScore))
                return 0;
            else
                return statScore;
        }
    };
    InnermatchcenterPage.prototype.getValueD = function (key, statScore1, statScore2, statName, pn) {
        var Disposal = 0;
        var H = 0;
        var K = 0;
        if (statScore1 == undefined || statScore1 == 'undefined') {
            K = 0;
        }
        else {
            K = statScore1;
        }
        if (statScore2 == undefined || statScore2 == 'undefined') {
            H = 0;
        }
        else {
            H = statScore2;
        }
        Disposal = K + H;
        return Disposal;
    };
    InnermatchcenterPage.prototype.callAlert = function (name) { alert(name); return name; };
    ;
    InnermatchcenterPage.prototype.sortBYType = function (name) {
        alert('a');
        console.log('Sortby' + name);
        this.orderByFieldName = 'type';
        if (this.reverse)
            this.reverse = false;
        else
            this.reverse = true;
    };
    InnermatchcenterPage.prototype.getplayerscoreplayer = function (data) {
        var _this = this;
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
        this.showDataTable = true;
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
        this.homeTeamPlayers1.forEach(function (value, index) {
            //alert(value.type);
            if (value.type == undefined || value.type == '' || value.type == '') {
                _this.homeTeamPlayers1[index].type = "home";
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
        this.homeAwayTeamPlayerWithScore = [];
        // angular.forEach(this.homeTeamPlayers,function(value,index){
        this.homeTeamPlayers.forEach(function (value, index) {
            //alert("homePlayerId"+value.player_id)
            var fullName = value.fullName;
            var first_name = value.first_name;
            var res = first_name.split(" ");
            var playerName = first_name.substring(0, 1) + ". " + value.surname;
            var playerNameLen = playerName.length;
            var playerFName = ((playerName.length <= 8) ? playerName : playerName.substr(0, 8) + '..');
            var playerNo = value.player_number;
            var playerId = value.player_id;
            var type = 'home';
            //this.homePlayerData.push({playerFName:playerFName, playerNo:playerNo,playerId:playerId});
            value.playerFName = playerFName;
            _this.homePlayerData.push({ playerFName: playerFName, playerNo: playerNo, playerId: playerId, type: value.type });
            _this.homeAwayTeamPlayerWithScore.push(value);
            //alert(playerFName)
        });
        // angular.forEach(this.awayTeamPlayers,function(value,index){
        this.awayTeamPlayers.forEach(function (value, index) {
            //alert("homePlayerId"+value.player_id)
            var fullName = value.fullName;
            var first_name = value.first_name;
            var res = first_name.split(" ");
            var playerName = first_name.substring(0, 1) + ". " + value.surname;
            var playerNameLen = playerName.length;
            var playerFName = ((playerName.length <= 8) ? playerName : playerName.substr(0, 8) + '..');
            var playerNo = value.player_number;
            var playerId = value.player_id;
            var type = 'away';
            //this.homePlayerData.push({playerFName:playerFName, playerNo:playerNo,playerId:playerId});
            value.playerFName = playerFName;
            _this.awayPlayerData.push({ playerFName: playerFName, playerNo: playerNo, playerId: playerId });
            _this.homeAwayTeamPlayerWithScore.push(value);
            //alert(playerFName)
            if (value.type == undefined || value.type == '' || value.type == '') {
                _this.awayTeamPlayers[index].type = "away";
                _this.awayPlayerData.push({ playerFName: playerFName, playerNo: playerNo, playerId: playerId, type: _this.awayTeamPlayers[index].type });
                _this.homeAwayTeamPlayerWithScore.push(value);
            }
            else {
                _this.awayPlayerData.push({ playerFName: playerFName, playerNo: playerNo, playerId: playerId, type: value.type });
                _this.homeAwayTeamPlayerWithScore.push(value);
            }
        });
        console.log(this.homeTeamPlayers1);
        setTimeout(function () {
            var windowWidth = (window.innerWidth);
            var windowHeight = (window.innerHeight) - 129;
            $(document).ready(function () {
                var table = $('#playerStatsTable').DataTable({
                    scrollY: windowHeight,
                    scrollX: true,
                    scrollCollapse: true,
                    paging: false,
                    "columnDefs": [{
                            "targets": 0,
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
                        { "orderSequence": ["desc", "asc"] }
                    ],
                    info: false,
                    "bPaginate": false,
                    "bFilter": false,
                    "bInfo": false,
                    "bSortable": true,
                    "ordering": true,
                    "order": [0, "desc"],
                    fixedColumns: {
                        leftColumns: 1,
                        rightColumns: 0
                    }
                });
            });
            $(".homeTeam").parent().removeClass("sorting_asc");
            $('.homeTeam').on('click', function () {
                // this.sortBYType("home");  home players
                console.log("hhjhjh");
                if ($(this).hasClass("activated1")) {
                    console.log("kjkjnbjjhhh");
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
                        }
                        else {
                            $(this).hide();
                        }
                    });
                }
                else {
                    console.log("hhhmjkjjl");
                    $(this).addClass("activated1");
                    $("#playerStatsTable tbody tr").each(function () {
                        //   alert($(this).children("td").eq(0).attr('data-t'));
                        if ($(this).children("td").eq(0).attr('data-t') == 'away') {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });
                    if ($('#btn1').hasClass("activated1") && $('#btn2').hasClass("activated1")) {
                        $("#playerStatsTable tbody tr").each(function () {
                            $(this).show();
                        });
                    }
                }
            });
            $('.awayTeam1').on('click', function () {
                console.log("hhh");
                if ($(this).hasClass("activated1")) {
                    console.log("hhh");
                    $(this).removeClass("activated1");
                    $(".awayTeam1").addClass("activated1");
                    $("#playerStatsTable tbody tr").each(function () {
                        if ($(this).children("td").eq(0).attr('data-t') == 'away') {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });
                }
                else {
                    console.log("hhuhijh");
                    $(this).addClass("activated1");
                    $("#playerStatsTable tbody tr").each(function () {
                        // alert($(this).children("td").eq(0).attr('data-t'));
                        if ($(this).children("td").eq(0).attr('data-t') == 'home') {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                    });
                    if ($('#btn1').hasClass("activated1") && $('#btn2').hasClass("activated1")) {
                        $("#playerStatsTable tbody tr").each(function () {
                            $(this).show();
                        });
                    }
                }
                // this.sortBYType("away");
            });
        }, 1000);
        // $ionicLoading.hide();
        //Player End
        this.cmnfun.HideLoading();
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], InnermatchcenterPage.prototype, "content", void 0);
    InnermatchcenterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-innermatchcenter',
            templateUrl: 'innermatchcenter.html',
        }),
        __metadata("design:paramtypes", [Platform, GoogleAnalytics, AlertController, NgZone, InAppBrowser, Storage, AjaxProvider, Events, CommomfunctionProvider, NavController, NavParams])
    ], InnermatchcenterPage);
    return InnermatchcenterPage;
}());
export { InnermatchcenterPage };
//# sourceMappingURL=innermatchcenter.js.map