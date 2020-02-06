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
import { IonicPage, NavController, NavParams, Slides, ModalController, Content, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the PostmatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PostmatchPage = /** @class */ (function () {
    function PostmatchPage(zone, inapp, events, plt, ga, youtube, modalCtrl, ajax, cmnfun, navCtrl, navParams) {
        var _this = this;
        this.zone = zone;
        this.inapp = inapp;
        this.events = events;
        this.plt = plt;
        this.ga = ga;
        this.youtube = youtube;
        this.modalCtrl = modalCtrl;
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.comptitionlists = [];
        this.postMatchData = [];
        this.headerimage = '';
        this.advDisplay = 'show';
        this.path = 'http://vafalive.com.au';
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('PostMatch Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    PostmatchPage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    PostmatchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PostmatchPage');
        this.cmnfun.showLoading('Please wait...');
        this.ajax.getcompetionlist('get-all-competitions-postmatchwise', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
        }, 'postmatch');
    };
    PostmatchPage.prototype.onScroll = function () {
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
    PostmatchPage.prototype.ionViewDidEnter = function () {
        if (this.postMatchData.length != 0) {
            this.slides.startAutoplay();
        }
    };
    PostmatchPage.prototype.slideChanged = function () {
        this.slides.startAutoplay();
    };
    PostmatchPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('competitionlistpostmatch:changed');
        this.slides.stopAutoplay();
    };
    PostmatchPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("res");
        this.events.subscribe('competitionlistpostmatch:changed', function (res) {
            if (res !== undefined && res !== "") {
                _this.comptitionlists = res.competition;
                _this.selectables = _this.comptitionlists[0].competitions_name;
                _this.competition_id = _this.comptitionlists[0].competition_id;
                _this.ajax.postMethod('get-compition-post-match', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    competition_id: _this.competition_id
                }).subscribe(function (res) {
                    _this.postMatchData = res;
                    console.log(_this.postMatchData);
                    if (_this.postMatchData.code == 2) {
                        _this.cmnfun.HideLoading();
                        _this.cmnfun.showLoading('Post Match Not Found!');
                    }
                    else {
                        // 	angular.forEach( this.postMatchData.potmatch,function(v,k){
                        // 	var cDate = v.pm_date;
                        // 	$scope.pmdate = cDate.split(" "); 
                        // 	$scope.pmTime = $scope.pmdate[1].split(":");
                        //  });
                        _this.headerAdv = _this.postMatchData.headerAdv;
                        _this.footerAdv = _this.postMatchData.footerAdv;
                        _this.headerimage = _this.postMatchData.headerAdv[0].ad_image;
                        _this.headerurl = _this.postMatchData.headerAdv[0].ad_url;
                        //  $timeout(function(){
                        // 	 $ionicSlideBoxDelegate.update();
                        //  }, 100);
                        _this.cmnfun.HideLoading();
                    }
                }, function (error) {
                    _this.cmnfun.showToast('Some thing Unexpected happen please try again');
                    _this.cmnfun.HideLoading();
                });
                // this.cmnfun.showLoading('Please wait...');
            }
        });
    };
    PostmatchPage.prototype.youtubepage = function (item) {
        var filename = item.video.substring(item.video.lastIndexOf('/') + 1);
        this.youtube.openVideo(filename);
    };
    PostmatchPage.prototype.gotomodel = function () {
        var _this = this;
        var modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
        var me = this;
        modal.onDidDismiss(function (data) {
            _this.cmnfun.showLoading('Please wait...');
            _this.selectables = data.competitions_name;
            _this.competition_id = data.competition_id;
            _this.ajax.postMethod('get-compition-post-match', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                competition_id: _this.competition_id
            }).subscribe(function (res) {
                _this.postMatchData = res;
                console.log(_this.postMatchData);
                _this.scrollToTop();
                if (_this.postMatchData.code == 2) {
                    _this.cmnfun.HideLoading();
                    _this.cmnfun.showLoading('Post Match Not Found!');
                }
                else {
                    _this.headerAdv = _this.postMatchData.headerAdv;
                    _this.footerAdv = _this.postMatchData.footerAdv;
                    _this.headerimage = _this.postMatchData.headerAdv[0].ad_image;
                    _this.headerurl = _this.postMatchData.headerAdv[0].ad_url;
                    _this.cmnfun.HideLoading();
                }
            }, function (error) {
                _this.cmnfun.showToast('Some thing Unexpected happen please try again');
                _this.cmnfun.HideLoading();
            });
        });
        modal.present();
    };
    PostmatchPage.prototype.goToAddSite = function (ad_url) {
        var browser = this.inapp.create(ad_url);
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], PostmatchPage.prototype, "slides", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], PostmatchPage.prototype, "content", void 0);
    PostmatchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-postmatch',
            templateUrl: 'postmatch.html',
        }),
        __metadata("design:paramtypes", [NgZone, InAppBrowser, Events, Platform, GoogleAnalytics, YoutubeVideoPlayer, ModalController, AjaxProvider, CommomfunctionProvider, NavController, NavParams])
    ], PostmatchPage);
    return PostmatchPage;
}());
export { PostmatchPage };
//# sourceMappingURL=postmatch.js.map