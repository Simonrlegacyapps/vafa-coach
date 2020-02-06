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
import { IonicPage, Slides, NavController, NavParams, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
/**
 * Generated class for the NewsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewsDetailsPage = /** @class */ (function () {
    function NewsDetailsPage(navCtrl, youtube, plt, ga, navParams, socialSharing, cmnfun) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.youtube = youtube;
        this.plt = plt;
        this.ga = ga;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.cmnfun = cmnfun;
        this.newsdetails = {};
        this.path = 'http://vafalive.com.au';
        this.newsdetails = navParams.get('newdetails');
        console.log(this.newsdetails);
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('NewsDetails Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    NewsDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewsDetailsPage');
    };
    NewsDetailsPage.prototype.fbShare = function (img, title, createdAt) {
        var _this = this;
        var text = title + "  " + createdAt;
        this.socialSharing.shareViaFacebook(text, img, '').then(function () {
            // Sharing via email is possible
        }).catch(function () {
            _this.cmnfun.showToast('Sharing via FB is not possible');
        });
    };
    NewsDetailsPage.prototype.twitterShare = function (img, title, createdAt) {
        var _this = this;
        var text = title + "  " + createdAt;
        this.socialSharing.shareViaTwitter(text, img, '').then(function () {
            // Sharing via email is possible
        }).catch(function () {
            _this.cmnfun.showToast('Sharing via twitter is not possible');
        });
    };
    NewsDetailsPage.prototype.gmailShare = function (img, title, createdAt) {
        var _this = this;
        var text = title + "  " + createdAt;
        this.socialSharing.shareViaEmail(text, 'YJFL Live Match', [], img).then(function () {
            // Sharing via email is possible
        }).catch(function () {
            _this.cmnfun.showToast('Sharing via email is not possible');
        });
    };
    NewsDetailsPage.prototype.youtubepage = function (item) {
        var filename = item.video.substring(item.video.lastIndexOf('/') + 1);
        this.youtube.openVideo(filename);
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], NewsDetailsPage.prototype, "slides", void 0);
    NewsDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-news-details',
            templateUrl: 'news-details.html',
        }),
        __metadata("design:paramtypes", [NavController, YoutubeVideoPlayer, Platform, GoogleAnalytics, NavParams, SocialSharing, CommomfunctionProvider])
    ], NewsDetailsPage);
    return NewsDetailsPage;
}());
export { NewsDetailsPage };
//# sourceMappingURL=news-details.js.map