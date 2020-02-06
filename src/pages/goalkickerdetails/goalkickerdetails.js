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
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the GoalkickerdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GoalkickerdetailsPage = /** @class */ (function () {
    function GoalkickerdetailsPage(inapp, ajax, plt, ga, events, cmnfun, navCtrl, navParams) {
        var _this = this;
        this.inapp = inapp;
        this.ajax = ajax;
        this.plt = plt;
        this.ga = ga;
        this.events = events;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.path = 'http://vafalive.com.au';
        this.goaldeatls = [];
        this.details = {};
        this.footerAdv = [];
        this.headerAdv = [];
        this.player_id = '';
        this.details = navParams.get('details');
        this.player_id = this.details.player_id;
        this.team_id = this.details.team_id;
        this.pName = this.details.pName;
        this.pNo = this.details.pNo;
        this.teamName = this.details.teamName;
        this.pImage = this.details.pImage;
        this.pGoals = this.details.pGoals;
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('GoalKickersDetails Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    GoalkickerdetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.showhide = 0;
        if (this.goaldeatls.length == 0) {
            console.log('ionViewDidLoad GoalkickerdetailsPage');
            this.ajax.datalist('get-team-players-goal-kickers-details', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                player_id: this.player_id,
                team_id: this.team_id
            }).subscribe(function (res) {
                _this.getteamplayersgoalkickersdetails(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        }
    };
    GoalkickerdetailsPage.prototype.goToAddSite = function (ad_url) {
        var browser = this.inapp.create(ad_url);
    };
    GoalkickerdetailsPage.prototype.getteamplayersgoalkickersdetails = function (res) {
        console.log(res);
        this.goaldeatls = res;
        this.goalKickersName = res.teamPlayerData.player_name;
        var goalKickername = this.goalKickersName.split(' ');
        this.firstName = goalKickername[0];
        this.lastName = goalKickername[1];
        this.goalKickersTeamName = res.teamPlayerData.team_team;
        this.goalKickersNumber = res.teamPlayerData.player_number;
        this.goalKickersimage = res.teamPlayerData.player_image;
        this.playerTotalGoal = res.playerTotalGoal;
        this.teamGoal = res.teamGoal;
        //ADVERTISEMENT:
        this.headerAdv = res.headerAdv;
        console.log(this.headerAdv[0].ad_image);
        this.footerAdv = res.footerAdv;
        console.log(this.footerAdv[0].ad_image);
    };
    GoalkickerdetailsPage.prototype.ionViewWillLeave = function () {
        // this.events.unsubscribe('datalist_get-team-players-goal-kickers-details:changed');
        this.showhide = 1;
    };
    GoalkickerdetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-goalkickerdetails',
            templateUrl: 'goalkickerdetails.html',
        }),
        __metadata("design:paramtypes", [InAppBrowser, AjaxProvider, Platform, GoogleAnalytics, Events, CommomfunctionProvider, NavController, NavParams])
    ], GoalkickerdetailsPage);
    return GoalkickerdetailsPage;
}());
export { GoalkickerdetailsPage };
//# sourceMappingURL=goalkickerdetails.js.map