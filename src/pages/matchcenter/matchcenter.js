var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import * as moment from 'moment';
/**
 * Generated class for the MatchcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MatchcenterPage = /** @class */ (function () {
    function MatchcenterPage(inapp, plt, ga, alertCtrl, ajax, modalCtrl, events, cmnfun, navCtrl, navParams) {
        var _this = this;
        this.inapp = inapp;
        this.plt = plt;
        this.ga = ga;
        this.alertCtrl = alertCtrl;
        this.ajax = ajax;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.objectKeys = Object.keys;
        this.totalround = [];
        this.roundScores = [];
        this.roundNo = '';
        this.path = 'http://vafalive.com.au';
        this.comptitionlists = [];
        this.selectables = [];
        this.secondround = {};
        this.changeWinning = function (str) {
            return str.replace("Winning", "Up");
        };
        this.selectRound = function (roundNo, competitionNo) {
            var _this = this;
            console.log(roundNo);
            console.log(competitionNo);
            this.cmnfun.showLoading('Please wait...');
            this.roundNo = roundNo;
            this.competition_id = competitionNo;
            this.ajax.datalist('get-round-wise-match-score', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                round: this.roundNo,
                competition_id: this.competition_id
            }).subscribe(function (res) {
                _this.getroundwise(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        };
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('Match Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    // scrollToBottom(): void {
    //   setTimeout(() => {
    //     this.myScrollContainer.nativeElement.scrollLeft = this.myScrollContainer.nativeElement.scrollWidth;
    //   }, 100);
    // }
    MatchcenterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // var date = new Date();
        this.ddMMMMyyyy = moment(new Date()).format("DD MM YYYY");
        console.log(this.ddMMMMyyyy);
        var ddMMMMyyyy = this.ddMMMMyyyy.split('');
        this.sysDatee = ddMMMMyyyy[0];
        this.sysMonth = ddMMMMyyyy[1];
        this.sysYear = ddMMMMyyyy[2];
        this.cmnfun.showLoading('Please wait...');
        this.ajax.getcompetionlist('get-all-competitions', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        }, 'matchcenter');
        this.events.subscribe('competitionlistmatchcenter:changed', function (res) {
            _this.comptitionlists = res.competition;
            console.log(_this.comptitionlists);
            _this.selectables = _this.comptitionlists[0].competitions_name;
            _this.competition_id = _this.comptitionlists[0].competition_id;
            if (_this.roundNo == '') {
                console.log(_this.competition_id);
                _this.ajax.datalist('get-competition-wise-match-score', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    competition_id: _this.competition_id
                }).subscribe(function (res) {
                    _this.getroundwise(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
            else {
                console.log(" this.roundNo");
                _this.selectRound(_this.roundNo, _this.competition_id);
            }
        });
    };
    MatchcenterPage.prototype.getroundwise = function (res) {
        var _this = this;
        console.log(res);
        if (res.message == 'No Data Found') {
            this.cmnfun.HideLoading();
            this.ajax.datalist('get-all-round-and-score', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                competition_id: '-'
            }).subscribe(function (res) {
                _this.secondround = res;
                if (_this.roundNo == '') {
                    _this.roundNo = _this.secondround.current_round;
                    _this.totalround = _this.secondround.totalRounds;
                    // this.scrollToBottom();
                }
                console.log(_this.totalround);
                _this.totalRoundsData = _this.secondround.footerAdv;
                // console.log("add" + this.totalRoundsData[0].ad_image);
                _this.roundScores = _this.secondround.roundScores;
                console.log(_this.roundScores);
                console.log(_this.roundNo);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        }
        else {
            this.cmnfun.HideLoading();
            if (this.roundNo == '') {
                this.roundNo = res.current_round;
                this.totalround = res.totalRounds;
                // this.scrollToBottom();
            }
            console.log(this.totalround);
            this.totalRoundsData = res.footerAdv;
            // console.log("add" + this.totalRoundsData[0].ad_image);
            this.roundScores = res.roundScores;
            console.log(this.roundScores);
            console.log(this.roundNo);
        }
    };
    ;
    MatchcenterPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('competitionlistmatchcenter:changed');
        this.events.unsubscribe('datalist:changed');
    };
    MatchcenterPage.prototype.goToAddSite = function (ad_url) {
        var browser = this.inapp.create(ad_url);
    };
    MatchcenterPage.prototype.gotomodel = function () {
        var _this = this;
        var modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
        var me = this;
        modal.onDidDismiss(function (data) {
            _this.cmnfun.showLoading('Please wait...');
            _this.selectables = data.competitions_name;
            _this.competition_id = data.competition_id;
            _this.roundNo = '';
            _this.ajax.datalist('get-competition-wise-match-score', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                competition_id: _this.competition_id
            }).subscribe(function (res) {
                _this.getroundwise(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        });
        modal.present();
    };
    MatchcenterPage.prototype.selectedTeamScore = function (fictureId, round, matchStatus, status, manual_score_recording, roundName, awateamid, hometeamid, competionid) {
        this.roundName = roundName;
        this.matchStatus = status;
        var date = matchStatus.split(',');
        this.SeverMatchDate = date[1];
        var getServerDate = date[1].split(' ');
        this.serverDatee = getServerDate[1];
        this.serverMonth = getServerDate[2];
        this.serverYear = getServerDate[3];
        if (status == 'UPCOMING') {
            if ((this.serverDatee == this.sysDatee || this.serverMonth == this.sysMonth || this.serverYear == this.sysYear) && (manual_score_recording == 0 || manual_score_recording == 1)) {
                this.navCtrl.push('InnermatchcenterPage', { details: { fixture_id: fictureId, roundNo: this.roundNo, match_status: this.matchStatus, manual_score_recording: manual_score_recording, roundName: this.roundName, awateam_id: awateamid, hometeam_id: hometeamid, competion_id: competionid } });
                // $state.go('app.score',);
            }
            else if ((this.serverDatee != this.sysDatee || this.serverMonth != this.sysMonth || this.serverYear != this.sysYear) && (manual_score_recording == 1)) {
                this.navCtrl.push('InnermatchcenterPage', { details: { fixture_id: fictureId, roundNo: this.roundNo, match_status: this.matchStatus, manual_score_recording: manual_score_recording, roundName: this.roundName, awateam_id: awateamid, hometeam_id: hometeamid, competion_id: competionid } });
                //  $state.go('app.score',{);
            }
            else if ((this.serverDatee != this.sysDatee || this.serverMonth != this.sysMonth || this.serverYear != this.sysYear) && (manual_score_recording == 0)) {
                //  $ionicPopup.alert({
                //   title: '',
                //   template: '<p style="text-align:center;">Check back again when this game is Live or Completed</p>'
                // });
                var alert_1 = this.alertCtrl.create({
                    subTitle: 'Check back again when this game is Live or Completed',
                    buttons: ['Ok'],
                    cssClass: 'jb-alert'
                });
                alert_1.present();
            }
        }
        else {
            this.navCtrl.push('InnermatchcenterPage', { details: { fixture_id: fictureId, roundNo: this.roundNo, match_status: this.matchStatus, manual_score_recording: manual_score_recording, roundName: this.roundName, awateam_id: awateamid, hometeam_id: hometeamid, competion_id: competionid } });
            //  $state.go('app.score',);
        }
    };
    __decorate([
        ViewChild('scrollMe'),
        __metadata("design:type", ElementRef)
    ], MatchcenterPage.prototype, "myScrollContainer", void 0);
    MatchcenterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-matchcenter',
            templateUrl: 'matchcenter.html',
        }),
        __metadata("design:paramtypes", [InAppBrowser, Platform, GoogleAnalytics, AlertController, AjaxProvider, ModalController, Events, CommomfunctionProvider, NavController, NavParams])
    ], MatchcenterPage);
    return MatchcenterPage;
}());
export { MatchcenterPage };
//# sourceMappingURL=matchcenter.js.map