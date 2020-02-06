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
import { IonicPage, NavController, ModalController, NavParams, Content, Keyboard, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Searchbar } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the GoalkickersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GoalkickersPage = /** @class */ (function () {
    function GoalkickersPage(zone, plt, ga, keyboard, inapp, ajax, modalCtrl, events, cmnfun, navCtrl, navParams) {
        var _this = this;
        this.zone = zone;
        this.plt = plt;
        this.ga = ga;
        this.keyboard = keyboard;
        this.inapp = inapp;
        this.ajax = ajax;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.advDisplay = 'show';
        this.searchTerm = '';
        this.items = [];
        this.path = 'http://vafalive.com.au';
        this.comptitionlists = [];
        this.selectables = [];
        this.getAllTeams = [];
        this.allTeamData = [];
        this.goalKickers = [];
        this.headerAdv = [];
        this.footerAdv = [];
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('GoalKickers Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    GoalkickersPage.prototype.toggleSearch = function () {
        var _this = this;
        this.searchTerm = '';
        this.toggled = this.toggled ? false : true;
        this.items = this.goalKickers;
        if (this.toggled == true) {
            setTimeout(function () {
                _this.searchbar.setFocus();
            }, 150);
        }
    };
    GoalkickersPage.prototype.toggleSearchcancel = function () {
        var _this = this;
        this.toggled = this.toggled ? false : true;
        if (this.toggled == true) {
            setTimeout(function () {
                _this.searchbar.setFocus();
            }, 150);
        }
    };
    GoalkickersPage.prototype.identify = function (index, value) {
        return value.player_id;
    };
    GoalkickersPage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    GoalkickersPage.prototype.initializeItems = function () {
        this.items = this.goalKickers;
    };
    GoalkickersPage.prototype.submitSearch = function () {
        this.keyboard.close();
        this.toggled = this.toggled ? false : true;
        this.searchTerm = '';
        // this.items = this.goalKickers;
    };
    GoalkickersPage.prototype.triggerInput = function (ev) {
        var _this = this;
        // Reset items back to all of the items
        // this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = [];
            this.goalKickers.forEach(function (item, keys) {
                if (item.player_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    _this.items.push(item);
                }
            });
        }
        else {
            this.items = this.goalKickers;
        }
    };
    GoalkickersPage.prototype.getallteamsbycompetitions = function (res) {
        var _this = this;
        console.log(res);
        this.getAllTeams = res.teams;
        this.allTeamData = res.teams;
        this.selectablesTeam = this.allTeamData[0].team_name;
        this.team_id = this.allTeamData[0].team_id;
        this.ajax.datalist('get-team-players-goal-kickers-filter', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            team_id: this.team_id,
            compition_id: this.competition_id
        }).subscribe(function (res) {
            _this.getteamplayersgoalkickersfilter(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    ;
    GoalkickersPage.prototype.getallcompetitions = function (res) {
        var _this = this;
        console.log(res);
        this.comptitionlists = res.competition;
        this.selectables = this.comptitionlists[0].competitions_name;
        this.competition_id = this.comptitionlists[0].competition_id;
        this.ajax.datalist('get-all-teams-by-competitions', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            competition_id: this.competition_id,
        }).subscribe(function (res) {
            _this.getallteamsbycompetitions(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    GoalkickersPage.prototype.getteamplayersgoalkickersfilter = function (res) {
        console.log(res);
        this.headerAdv = res.headerAdv;
        this.footerAdv = res.footerAdv;
        this.goalKickers = res.playerGoal;
        this.items = this.goalKickers;
        this.cmnfun.HideLoading();
    };
    ;
    GoalkickersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad GoalkickersPage');
        this.cmnfun.showLoading('Please wait...');
        this.ajax.datalist('get-all-competitions', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        }).subscribe(function (res) {
            _this.getallcompetitions(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    GoalkickersPage.prototype.onScroll = function () {
        var _this = this;
        //   this.content.ionScrollEnd.subscribe((data)=>{
        this.scrollTop = this.content.scrollTop;
        var storeData = this.scrollTop;
        if (storeData >= 180) {
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
    GoalkickersPage.prototype.ionViewWillLeave = function () {
        // this.events.unsubscribe('datalist_get-team-players-goal-kickers-filter:changed');
        // this.events.unsubscribe('datalist_get-all-teams-by-competitions:changed');
        // this.events.unsubscribe('competitionlistgoalkickers:changed');
    };
    GoalkickersPage.prototype.goToAddSite = function (ad_url) {
        var browser = this.inapp.create(ad_url);
    };
    GoalkickersPage.prototype.goToGoalKickerDetailsPage = function (player_id, team_id, pName, pNo, teamName, pImage, pGoals) {
        this.navCtrl.push('GoalkickerdetailsPage', { details: { player_id: player_id, team_id: team_id, pName: pName, pNo: pNo, teamName: teamName, pImage: pImage, pGoals: pGoals } });
    };
    GoalkickersPage.prototype.selectedType = function (type) {
        var _this = this;
        if (type == 'competion') {
            var modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
            var me = this;
            modal.onDidDismiss(function (data) {
                _this.selectables = data.competitions_name;
                _this.competition_id = data.competition_id;
                _this.cmnfun.showLoading('Please wait...');
                _this.ajax.datalist('get-all-teams-by-competitions', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    competition_id: _this.competition_id,
                }).subscribe(function (res) {
                    _this.scrollToTop();
                    _this.getallteamsbycompetitions(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            });
            modal.present();
        }
        else {
            var modal = this.modalCtrl.create('TeamlistPage', { items: this.allTeamData });
            var me = this;
            modal.onDidDismiss(function (data) {
                console.log(data);
                _this.selectablesTeam = data.team_name;
                _this.team_id = data.team_id;
                _this.cmnfun.showLoading('Please wait...');
                _this.ajax.datalist('get-team-players-goal-kickers-filter', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    team_id: _this.team_id,
                    compition_id: _this.competition_id
                }).subscribe(function (res) {
                    _this.scrollToTop();
                    _this.getteamplayersgoalkickersfilter(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            });
            modal.present();
        }
    };
    __decorate([
        ViewChild('searchbar'),
        __metadata("design:type", Searchbar)
    ], GoalkickersPage.prototype, "searchbar", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], GoalkickersPage.prototype, "content", void 0);
    GoalkickersPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-goalkickers',
            templateUrl: 'goalkickers.html',
        }),
        __metadata("design:paramtypes", [NgZone, Platform, GoogleAnalytics, Keyboard, InAppBrowser, AjaxProvider, ModalController, Events, CommomfunctionProvider, NavController, NavParams])
    ], GoalkickersPage);
    return GoalkickersPage;
}());
export { GoalkickersPage };
//# sourceMappingURL=goalkickers.js.map