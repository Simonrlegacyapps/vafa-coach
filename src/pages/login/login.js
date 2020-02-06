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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(events, ajax, cmnfun, Storage, fb, navCtrl, navParams) {
        var _this = this;
        this.events = events;
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.Storage = Storage;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isLoggedIn = false;
        this.fulluserdetails = [];
        fb.getLoginStatus()
            .then(function (res) {
            console.log(res.status);
            if (res.status === "connect") {
                _this.isLoggedIn = true;
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log(e); });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.emailLogin = function () {
        this.navCtrl.push('EmailloginPage');
    };
    LoginPage.prototype.getUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
            .then(function (res) {
            console.log(res);
            _this.users = res;
            var imageURL = "http://graph.facebook.com/" + userid + "/picture?type=large";
            _this.userImageUrl = imageURL;
            _this.userToken = userid;
            _this.userName = res.name;
            ;
            _this.userEmail = res.email;
            _this.userData();
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    LoginPage.prototype.fblogin = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status === "connected") {
                _this.isLoggedIn = true;
                _this.getUserDetail(res.authResponse.userID);
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log(e); });
    };
    LoginPage.prototype.userData = function () {
        var _this = this;
        this.cmnfun.showLoading('Please wait...');
        this.ajax.post('custom/facebook-webuser', {
            username: this.userName,
            email: this.userEmail,
            user_image: this.userImageUrl,
            device_id: this.userToken
        }).subscribe(function (res) {
            _this.cmnfun.HideLoading();
            console.log(res);
            _this.fulluserdetails = res;
            //  window.localStorage.setItem("subscription",1);
            // $scope.subscriptionreamin= window.localStorage.getItem("subscriptionRemain");
            _this.Storage.set("subscriptionRemain", _this.fulluserdetails.subscription_remain);
            _this.Storage.set("userData", JSON.stringify(_this.fulluserdetails.webuser));
            _this.Storage.set('checkLogin', _this.fulluserdetails.webuser);
            _this.Storage.set('subscription', 1);
            _this.subscriptionCheck = 1; // change made on 21 June 17 instead of data.subscription in if also
            if (_this.subscriptionCheck == 1) {
                var item = {
                    isLogin: 1,
                    disableLogin: 1
                };
                _this.events.publish('userlogin:changed', item);
                _this.navCtrl.setRoot('LivestatsPage', { disableLogin: 1, isLogin: 1 });
            }
            else {
                var item1 = {
                    isLogin: 0,
                    disableLogin: 0
                };
                _this.events.publish('userlogin:changed', item1);
            }
        }, function (error) {
            _this.cmnfun.HideLoading();
            _this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [Events, AjaxProvider, CommomfunctionProvider, Storage, Facebook, NavController, NavParams])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map