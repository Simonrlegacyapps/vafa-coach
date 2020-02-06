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
import { SocialSharing } from '@ionic-native/social-sharing';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the MatchreportdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MatchreportdetailsPage = /** @class */ (function () {
    function MatchreportdetailsPage(ajax, socialSharing, plt, ga, cmnfun, events, navCtrl, navParams) {
        var _this = this;
        this.ajax = ajax;
        this.socialSharing = socialSharing;
        this.plt = plt;
        this.ga = ga;
        this.cmnfun = cmnfun;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.reportdetails = [];
        this.matchreportdetails = [];
        this.createddate = {};
        this.fixtureReport = [];
        this.matchReportFixtureScore = [];
        this.path = 'http://vafalive.com.au';
        this.matchReportGoalKicker = [];
        this.reportid = navParams.get('repordid');
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('MatchReportDetails Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    MatchreportdetailsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // alert("hai");
        this.cmnfun.showLoading('Please wait...');
        this.ajax.postMethod('get-fixture-match-report-details', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
            report_id: this.reportid
        }).subscribe(function (res) {
            _this.reportdetails = res;
            console.log(_this.reportdetails);
            _this.matchreportdetails = _this.reportdetails.match_report_details[0];
            console.log(_this.matchreportdetails);
            var created = _this.matchreportdetails.created_at.split("-");
            _this.createddate = created[1];
            _this.fixture_user = _this.reportdetails.fixture.user_name;
            _this.fixture_ground = _this.reportdetails.fixture.ground;
            _this.fixture_planned_time = _this.reportdetails.fixture.planned_time;
            _this.fixtureReport = _this.reportdetails.fixture_report;
            _this.matchReportFixtureScore = _this.reportdetails.match_report_fixture_score;
            _this.matchReportGoalKicker = _this.reportdetails.score;
            _this.away_team = _this.matchReportFixtureScore.fixtureFinalScore.away_team;
            _this.home_team = _this.matchReportFixtureScore.fixtureFinalScore.home_team;
            _this.quater1Score = _this.matchReportFixtureScore.fixtureQ1Score;
            console.log("matchReportGoalKicker" + JSON.stringify(_this.quater1Score.home_team_goal_rbb_total));
            _this.advertisementFooter = _this.reportdetails.footerAdv;
            _this.quater2Score = _this.matchReportFixtureScore.fixtureQ2Score;
            _this.home_team_goal2 = parseInt(_this.quater1Score.home_team_goal) + parseInt(_this.quater2Score.home_team_goal);
            console.log("2-----" + _this.home_team_goal2);
            _this.home_team_goal_rbb_total2 = parseInt(_this.quater1Score.home_team_goal_rbb_total) + parseInt(_this.quater2Score.home_team_goal_rbb_total);
            console.log("2---" + _this.home_team_goal_rbb_total2);
            _this.home_team_total_score2 = parseInt(_this.quater1Score.home_team_total_score) + parseInt(_this.quater2Score.home_team_total_score);
            console.log("2---" + _this.home_team_total_score2);
            _this.away_team_goal2 = parseInt(_this.quater1Score.away_team_goal) + parseInt(_this.quater2Score.away_team_goal);
            console.log("2---" + _this.away_team_goal2);
            _this.away_team_goal_rbb_total2 = parseInt(_this.quater1Score.away_team_goal_rbb_total) + parseInt(_this.quater2Score.away_team_goal_rbb_total);
            console.log("2---" + _this.away_team_goal_rbb_total2);
            _this.away_team_total_score2 = parseInt(_this.quater1Score.away_team_total_score) + parseInt(_this.quater2Score.away_team_total_score);
            console.log("2---" + _this.away_team_total_score2);
            _this.quater3Score = _this.matchReportFixtureScore.fixtureQ3Score;
            _this.home_team_goal3 = _this.home_team_goal2 + parseInt(_this.quater3Score.home_team_goal);
            console.log("3----" + _this.home_team_goal3);
            _this.home_team_goal_rbb_total3 = parseInt(_this.home_team_goal_rbb_total2) + parseInt(_this.quater3Score.home_team_goal_rbb_total);
            console.log("3----" + _this.home_team_goal_rbb_total3);
            _this.home_team_total_score3 = parseInt(_this.home_team_total_score2) + parseInt(_this.quater3Score.home_team_total_score);
            console.log("3----" + _this.home_team_total_score3);
            _this.away_team_goal3 = parseInt(_this.away_team_goal2) + parseInt(_this.quater3Score.away_team_goal);
            console.log("3----" + _this.away_team_goal3);
            _this.away_team_goal_rbb_total3 = parseInt(_this.away_team_goal_rbb_total2) + parseInt(_this.quater3Score.away_team_goal_rbb_total);
            console.log("3----" + _this.away_team_goal_rbb_total3);
            _this.away_team_total_score3 = parseInt(_this.away_team_total_score2) + parseInt(_this.quater3Score.away_team_total_score);
            console.log("3----" + _this.away_team_total_score3);
            _this.cmnfun.HideLoading();
        }, function (error) {
            _this.cmnfun.showToast('Some thing Unexpected happen please try again');
            _this.cmnfun.HideLoading();
        });
        // this.cmnfun.showLoading('Please wait...');
    };
    MatchreportdetailsPage.prototype.fbShare = function (img, title, createdAt, pm_vdo) {
        var _this = this;
        var text = title + "  " + createdAt;
        this.socialSharing.shareViaFacebook(text, img, pm_vdo).then(function () {
            // Sharing via email is possible
        }).catch(function () {
            _this.cmnfun.showToast('Sharing via FB is not possible');
        });
    };
    MatchreportdetailsPage.prototype.twitterShare = function (img, title, createdAt, pm_vdo) {
        var _this = this;
        var text = title + "  " + createdAt;
        this.socialSharing.shareViaTwitter(text, img, pm_vdo).then(function () {
            // Sharing via email is possible
        }).catch(function () {
            _this.cmnfun.showToast('Sharing via twitter is not possible');
        });
    };
    MatchreportdetailsPage.prototype.gmailShare = function (img, title, createdAt, pm_vdo) {
        var _this = this;
        var text = title + "  " + createdAt;
        this.socialSharing.shareViaEmail(text, 'YJFL Live Match', [], img).then(function () {
            // Sharing via email is possible
        }).catch(function () {
            _this.cmnfun.showToast('Sharing via email is not possible');
        });
    };
    MatchreportdetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-matchreportdetails',
            templateUrl: 'matchreportdetails.html',
        }),
        __metadata("design:paramtypes", [AjaxProvider, SocialSharing, Platform, GoogleAnalytics, CommomfunctionProvider, Events, NavController, NavParams])
    ], MatchreportdetailsPage);
    return MatchreportdetailsPage;
}());
export { MatchreportdetailsPage };
//# sourceMappingURL=matchreportdetails.js.map