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
import { IonicPage, NavController, Slides, ModalController, NavParams, Content, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the MatchreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MatchreportPage = /** @class */ (function () {
    function MatchreportPage(zone, inapp, plt, ga, ajax, cmnfun, modalCtrl, events, navCtrl, navParams) {
        var _this = this;
        this.zone = zone;
        this.inapp = inapp;
        this.plt = plt;
        this.ga = ga;
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.advDisplay = 'show';
        this.comptitionlists = [];
        this.selectables = [];
        this.MatchreportData = [];
        this.report = [];
        this.headerimage = '';
        this.path = 'http://vafalive.com.au';
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('MatchReport Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    MatchreportPage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    MatchreportPage.prototype.ionViewDidEnter = function () {
        if (this.MatchreportData.length != 0) {
            this.slides.startAutoplay();
        }
    };
    MatchreportPage.prototype.onScroll = function () {
        var _this = this;
        //   this.content.ionScrollEnd.subscribe((data)=>{
        this.scrollTop = this.content.scrollTop;
        var storeData = this.scrollTop;
        if (storeData >= 250) {
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
    };
    MatchreportPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('competitionlistmatchreport:changed');
        this.slides.stopAutoplay();
    };
    MatchreportPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PostmatchPage');
        this.cmnfun.showLoading('Please wait...');
        this.ajax.getcompetionlist('get-all-competitions-matchreportwise', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
        }, 'matchreport');
    };
    MatchreportPage.prototype.slideChanged = function () {
        this.slides.startAutoplay();
    };
    MatchreportPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("res");
        this.events.subscribe('competitionlistmatchreport:changed', function (res) {
            if (res !== undefined && res !== "") {
                _this.comptitionlists = res.competition;
                if (_this.comptitionlists.length != 0) {
                    _this.selectables = _this.comptitionlists[0].competitions_name;
                    _this.competition_id = _this.comptitionlists[0].competition_id;
                }
                _this.ajax.postMethod('get-compition-fixture-match-report', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    competition_id: _this.competition_id
                }).subscribe(function (res) {
                    _this.cmnfun.HideLoading();
                    _this.MatchreportData = res;
                    console.log(_this.MatchreportData);
                    if (_this.MatchreportData.code == 2) {
                        _this.cmnfun.showLoading('Match Report Not Found!');
                    }
                    else {
                        // 	angular.forEach( this.postMatchData.potmatch,function(v,k){
                        // 	var cDate = v.pm_date;
                        // 	$scope.pmdate = cDate.split(" "); 
                        // 	$scope.pmTime = $scope.pmdate[1].split(":");
                        //  });
                        if (_this.MatchreportData.match_report) {
                            _this.headerAdv = _this.MatchreportData.headerAdv;
                            _this.footerAdv = _this.MatchreportData.footerAdv;
                            _this.headerimage = _this.MatchreportData.headerAdv[0].ad_image;
                            _this.headerurl = _this.MatchreportData.headerAdv[0].ad_url;
                        }
                        //  $timeout(function(){
                        // 	 $ionicSlideBoxDelegate.update();
                        //  }, 100);
                    }
                }, function (error) {
                    _this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
                // this.cmnfun.showLoading('Please wait...');
            }
        });
    };
    MatchreportPage.prototype.goToMatchReportDetail = function (reportId) {
        this.navCtrl.push('MatchreportdetailsPage', { repordid: reportId });
    };
    MatchreportPage.prototype.gotomodel = function () {
        var _this = this;
        var modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
        var me = this;
        modal.onDidDismiss(function (data) {
            _this.cmnfun.showLoading('Please wait...');
            _this.selectables = data.competitions_name;
            _this.competition_id = data.competition_id;
            _this.ajax.postMethod('get-compition-fixture-match-report', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                competition_id: _this.competition_id
            }).subscribe(function (res) {
                _this.cmnfun.HideLoading();
                _this.MatchreportData = res;
                console.log(_this.MatchreportData);
                _this.scrollToTop();
                if (_this.MatchreportData.code == 2) {
                    _this.cmnfun.showLoading('Match Report Not Found!');
                }
                else {
                    _this.headerAdv = _this.MatchreportData.headerAdv;
                    _this.footerAdv = _this.MatchreportData.footerAdv;
                    _this.headerimage = _this.MatchreportData.headerAdv[0].ad_image;
                    _this.headerurl = _this.MatchreportData.headerAdv[0].ad_url;
                }
            }, function (error) {
                _this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        });
        modal.present();
    };
    MatchreportPage.prototype.goToAddSite = function (ad_url) {
        var browser = this.inapp.create(ad_url);
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], MatchreportPage.prototype, "slides", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], MatchreportPage.prototype, "content", void 0);
    MatchreportPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-matchreport',
            templateUrl: 'matchreport.html',
        }),
        __metadata("design:paramtypes", [NgZone, InAppBrowser, Platform, GoogleAnalytics, AjaxProvider, CommomfunctionProvider, ModalController, Events, NavController, NavParams])
    ], MatchreportPage);
    return MatchreportPage;
}());
export { MatchreportPage };
//# sourceMappingURL=matchreport.js.map