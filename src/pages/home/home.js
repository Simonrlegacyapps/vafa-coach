var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
var HomePage = /** @class */ (function () {
    function HomePage(inapp, plt, ga, events, ajax, cmnfun, navCtrl) {
        var _this = this;
        this.inapp = inapp;
        this.plt = plt;
        this.ga = ga;
        this.events = events;
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.newsData = [];
        this.comptitionlists = [];
        this.headerimage = '';
        this.path = 'http://vafalive.com.au';
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('News Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    HomePage.prototype.ionViewWillLeave = function () {
        this.slides.stopAutoplay();
    };
    HomePage.prototype.ionViewDidEnter = function () {
        if (this.newsData.length != 0) {
            this.slides.startAutoplay();
        }
    };
    HomePage.prototype.doRefresh = function (refresher) { refresher.complete(); };
    HomePage.prototype.slideChanged = function () {
        this.slides.startAutoplay();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad LandingpagePage');
        //  this.events.subscribe('competitionlist:changed', res => {
        //    console.log(res);
        //   if(res !== undefined && res !== ""){
        // this.comptitionlists=res.competition;          
        // get-all-competition-news
        // competition_id:this.comptitionlists[0].competition_id
        // console.log(this.comptitionlists[0].competition_id);
        // alert('');
        this.cmnfun.showLoading('Please wait...');
        this.ajax.postMethod('get-all-news', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
        }).subscribe(function (res) {
            _this.cmnfun.HideLoading();
            _this.newsData = res;
            if (_this.newsData.code == 1) {
                console.log(_this.newsData);
                _this.headerimage = _this.newsData.headerAdv[0].ad_image;
                _this.headerurl = _this.newsData.headerAdv[0].ad_url;
            }
        }, function (error) {
            _this.cmnfun.HideLoading();
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        //   }
        //  })
    };
    HomePage.prototype.openpage = function (item) {
        this.navCtrl.push('NewsDetailsPage', { newdetails: item });
    };
    HomePage.prototype.goToAddSite = function (ad_url) {
        var browser = this.inapp.create(ad_url);
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [InAppBrowser, Platform, GoogleAnalytics, Events, AjaxProvider, CommomfunctionProvider, NavController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map