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
import { IonicPage, NavController, Slides, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { Events } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the LivestatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LivestatsPage = /** @class */ (function () {
    function LivestatsPage(events, Storage, plt, ga, navCtrl, navParams) {
        var _this = this;
        this.events = events;
        this.Storage = Storage;
        this.plt = plt;
        this.ga = ga;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.disableLogin = navParams.get('disableLogin');
        this.isLogin = navParams.get('isLogin');
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('LiveStatus Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    LivestatsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LivestatsPage');
    };
    LivestatsPage.prototype.gotologin = function () {
        this.navCtrl.push('LoginPage');
    };
    LivestatsPage.prototype.logout = function () {
        var _this = this;
        this.Storage.clear().then(function () {
            _this.userSubscription = 0;
            var item = {
                isLogin: 0,
                disableLogin: 0
            };
            _this.events.publish('userlogin:changed', item);
            _this.events.publish('menuchange:changed', { title: 'News', component: HomePage, icon: 'assets/imgs/menuIcon/newsIcon.png', itemseleted: 'seleted' });
            //  this.navCtrl.setRoot(HomePage);
        });
    };
    LivestatsPage.prototype.slideChanged = function () {
        this.slides.startAutoplay();
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], LivestatsPage.prototype, "slides", void 0);
    LivestatsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-livestats',
            templateUrl: 'livestats.html',
        }),
        __metadata("design:paramtypes", [Events, Storage, Platform, GoogleAnalytics, NavController, NavParams])
    ], LivestatsPage);
    return LivestatsPage;
}());
export { LivestatsPage };
//# sourceMappingURL=livestats.js.map