var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Content, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the FixturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FixturePage = /** @class */ (function () {
    function FixturePage(zone, plt, ga, inapp, ajax, modalCtrl, events, cmnfun, navCtrl, navParams) {
        var _this = this;
        this.zone = zone;
        this.plt = plt;
        this.ga = ga;
        this.inapp = inapp;
        this.ajax = ajax;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.totalround = [];
        this.totalClub = [];
        this.clubScores = [];
        this.roundNo = '0_0';
        this.team_id = '0_0';
        this.path = 'http://vafalive.com.au';
        this.comptitionlists = [];
        this.selectables = [];
        this.teamRoundDetail = [];
        this.headerAdv = [];
        this.roundScoresNew = [];
        this.roundkey = [];
        this.clubScoresNew = [];
        this.result = [];
        this.type = 'Round';
        this.advDisplay = 'show';
        this.fisttime = 0;
        this.test = 0;
        this.selectedCompetitionName = function (competition_id) {
            var _this = this;
            //alert(competition_id);
            this.competition_id = competition_id;
            if (this.fixtureType == 'Round') {
                this.ajax.datalist('get-round-competition-fixture', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    competition_id: this.competition_id,
                    round: this.roundNo
                }).subscribe(function (res) {
                    _this.getroundcompetitionfixture(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
            else {
                // UserManagement. fixtureClubData();
                this.ajax.datalist('get-competition-clubs', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    compition_id: this.competition_id,
                    team_id: this.team_id
                }).subscribe(function (res) {
                    _this.getcompetitionclubs(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
        };
        this.selecteClub = function (teamIdd, competition_id) {
            var _this = this;
            this.cmnfun.showLoading('Please wait...');
            this.team_id = teamIdd;
            this.ajax.datalist('get-club-wise-fixture', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                team_id: this.team_id,
                competition_id: competition_id
            }).subscribe(function (res) {
                _this.getclubwisefixture(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        };
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('Fixture Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    FixturePage.prototype.onScroll = function () {
        var _this = this;
        //   this.content.ionScrollEnd.subscribe((data)=>{
        this.scrollTop = this.content.scrollTop;
        var storeData = this.scrollTop;
        if (storeData >= 210) {
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
    // gotochecked(i)
    // {
    //   if(i==1 && this.count==0)
    //     {
    //       this.count=1;
    //       this.
    //     }
    // }
    // scrollToBottom(): void {
    //   setTimeout(() => {
    //     this.myScrollContainer.nativeElement.scrollLeft = this.myScrollContainer.nativeElement.scrollWidth;
    //   }, 100);
    // }
    FixturePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad FixturePage');
        this.cmnfun.showLoading('Please wait...');
        this.ajax.postMethod('get-rounds', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
        }).subscribe(function (res) {
            _this.result = res;
            // this.totalround = this.result.totalRounds;
            _this.teamRoundDetail = _this.result.fixture;
            _this.ajax.getcompetionlist('get-all-competitions', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
            }, 'fixtures');
            //   setTimeout(() => {
            //     this.content.scrollToTop();
            // },1000);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        this.events.subscribe('competitionlistfixtures:changed', function (res) {
            _this.comptitionlists = res.competition;
            _this.selectables = _this.comptitionlists[0].competitions_name;
            _this.competition_id = _this.comptitionlists[0].competition_id;
            _this.ajax.datalist('get-round-competition-fixture', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                competition_id: _this.competition_id,
                round: _this.roundNo
            }).subscribe(function (res) {
                _this.getroundcompetitionfixture(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        });
    };
    FixturePage.prototype.getroundcompetitionfixture = function (res) {
        var _this = this;
        console.log(res);
        this.teamRoundDetail = res.fixture;
        this.totalround = res.totalRounds;
        console.log(this.totalround);
        console.log(res.fixture);
        //ADVERTISEMENT:
        this.headerAdv = res.headerAdv;
        this.footerAdv = res.footerAdv;
        //current_round start
        this.roundNo = res.current_round;
        console.log(res.current_round);
        this.roundScores = res.roundScores;
        this.ajax.datalist('get-round-wise-fixture', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            competition_id: this.competition_id,
            round: this.roundNo
        }).subscribe(function (res) {
            _this.getroundwisefixture(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    FixturePage.prototype.getroundwisefixture = function (res) {
        var _this = this;
        console.log(res);
        if (res.message != 'No Data Found') {
            this.teamRoundDetail = res.fixture;
            this.headerAdv = res.headerAdv;
            this.footerAdv = res.footerAdv;
            this.roundScores = res.roundScores;
            // this.roundkey=[];
            // this.roundScores.forEach((element,key) => {
            //   this.roundkey.push(key);
            //   // this.roundScoresNew.push(key);
            // });
            console.log(this.roundScores);
        }
        this.cmnfun.HideLoading();
        this.ajax.datalist('get-competition-clubs', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            compition_id: this.competition_id,
            team_id: this.team_id
        }).subscribe(function (res) {
            _this.getcompetitionclubs(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    ;
    FixturePage.prototype.getcompetitionclubs = function (res) {
        var _this = this;
        this.totalClub = res.club;
        this.totalClub.sort(function (a, b) {
            var textA = a.team_name.toUpperCase();
            var textB = b.team_name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        if (this.team_id == '0_0') {
            this.team_id = this.totalClub[0].team_id;
        }
        console.log(this.totalClub);
        this.clubScores = res.roundScores;
        console.log(this.clubScores);
        this.oldDate = '';
        this.clubScoresNew = [];
        if (this.totalClub == '' || this.totalClub == null) {
            this.team_id = '0_0';
            this.ajax.datalist('get-competition-clubs', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                compition_id: this.competition_id,
                team_id: this.team_id
            }).subscribe(function (res) {
                _this.getcompetitionclubs(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        }
        else {
            for (var key in this.clubScores) {
                this.newArray = this.clubScores[key];
                this.oldDate = key;
                this.newArray.forEach(function (eachObj) {
                    _this.newDate = eachObj.planned_date;
                    if (_this.oldDate == _this.newDate) {
                        _this.clubScoresNew.push(eachObj);
                    }
                });
            }
        }
        this.cmnfun.HideLoading();
        if (this.fisttime == 0) {
            // this.scrollToBottom();
            this.fisttime++;
        }
        //alert(JSON.stringify($scope.roundScoresNew))
    };
    ;
    FixturePage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe('competitionlistfixtures:changed');
        // this.events.unsubscribe('datalist_get-round-competition-fixture:changed');
        // this.events.unsubscribe('datalist_get-round-wise-fixture:changed:changed');
        // this.events.unsubscribe('datalist_get-competition-clubs:changed');
        // this.events.unsubscribe('datalist_get-club-wise-fixture:changed');
    };
    FixturePage.prototype.getclubwisefixture = function (res) {
        var _this = this;
        this.clubScores = res.roundScores;
        console.log(this.clubScores);
        this.oldDate = '';
        this.clubScoresNew = [];
        for (var key in this.clubScores) {
            this.newArray = this.clubScores[key];
            this.oldDate = key;
            this.newArray.forEach(function (eachObj) {
                _this.newDate = eachObj.planned_date;
                if (_this.oldDate == _this.newDate) {
                    _this.clubScoresNew.push(eachObj);
                }
            });
        }
        this.cmnfun.HideLoading();
        //alert(JSON.stringify($scope.roundScoresNew))
    };
    ;
    FixturePage.prototype.selectRound = function (round, competitionid) {
        var _this = this;
        this.roundNo = round;
        this.cmnfun.showLoading('Please wait...');
        this.ajax.datalist('get-round-wise-fixture', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            competition_id: competitionid,
            round: round
        }).subscribe(function (res) {
            _this.getroundwisefixture(res);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    FixturePage.prototype.selectedFixtureType = function (type) {
        var _this = this;
        if (type == 'Round') {
            // this.cmnfun.showLoading('Please wait...');
            this.type = 'Round';
            this.plt.ready().then(function () {
                _this.ga.startTrackerWithId('UA-118996199-1')
                    .then(function () {
                    console.log('Google analytics is ready now');
                    _this.ga.trackView('FixtureRound Page');
                })
                    .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
            });
            // this.fisttime=0;
            //   this.ajax.datalist('get-round-competition-fixture',{
            //         accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            //         competition_id:this.competition_id,
            //         round:this.roundNo
            //        }).subscribe((res) => {
            //         this.getroundcompetitionfixture(res);
            //     }, error => {
            //       // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            //     })
        }
        else {
            this.type = 'Club';
            this.team_id = '0_0';
            this.ajax.datalist('get-competition-clubs', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                compition_id: this.competition_id,
                team_id: this.team_id
            }).subscribe(function (res) {
                _this.getcompetitionclubs(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
            this.plt.ready().then(function () {
                _this.ga.startTrackerWithId('UA-118996199-1')
                    .then(function () {
                    console.log('Google analytics is ready now');
                    _this.ga.trackView('FixtureClub Page');
                })
                    .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
            });
        }
    };
    FixturePage.prototype.goToAddSite = function (ad_url) {
        var browser = this.inapp.create(ad_url);
    };
    FixturePage.prototype.openMap = function (ad_url) {
        var browser = this.inapp.create('http://maps.google.com/maps?q=' + ad_url);
    };
    FixturePage.prototype.gotomodel = function () {
        var _this = this;
        this.fisttime = 0;
        var modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
        var me = this;
        modal.onDidDismiss(function (data) {
            _this.selectables = data.competitions_name;
            _this.competition_id = data.competition_id;
            _this.cmnfun.showLoading('Please wait...');
            if (_this.type == 'Round') {
                _this.ajax.datalist('get-round-competition-fixture', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    competition_id: _this.competition_id,
                    round: _this.roundNo
                }).subscribe(function (res) {
                    _this.getroundcompetitionfixture(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
            else {
                _this.team_id = '0_0';
                _this.ajax.datalist('get-competition-clubs', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    compition_id: _this.competition_id,
                    team_id: _this.team_id
                }).subscribe(function (res) {
                    _this.getcompetitionclubs(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
        });
        modal.present();
    };
    __decorate([
        ViewChild('scrollMe'),
        __metadata("design:type", ElementRef)
    ], FixturePage.prototype, "myScrollContainer", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], FixturePage.prototype, "content", void 0);
    FixturePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-fixture',
            templateUrl: 'fixture.html',
        }),
        __metadata("design:paramtypes", [NgZone, Platform, GoogleAnalytics, InAppBrowser, AjaxProvider, ModalController, Events, CommomfunctionProvider, NavController, NavParams])
    ], FixturePage);
    return FixturePage;
}());
export { FixturePage };
//# sourceMappingURL=fixture.js.map