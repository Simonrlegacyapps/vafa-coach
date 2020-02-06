var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the CustomBrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TermsLink = 'http://vafalive.com.au/termsconds';
var CustomBrowserPage = /** @class */ (function () {
    function CustomBrowserPage(navCtrl, sanitize, navParams, plt, ga) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.sanitize = sanitize;
        this.navParams = navParams;
        this.plt = plt;
        this.ga = ga;
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('TermsAndConditions Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    CustomBrowserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomBrowserPage');
    };
    CustomBrowserPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-custom-browser',
            templateUrl: 'custom-browser.html',
        }),
        __metadata("design:paramtypes", [NavController, DomSanitizer, NavParams, Platform, GoogleAnalytics])
    ], CustomBrowserPage);
    return CustomBrowserPage;
}());
export { CustomBrowserPage };
//# sourceMappingURL=custom-browser.js.map