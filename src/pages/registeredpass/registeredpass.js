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
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the RegisteredpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisteredpassPage = /** @class */ (function () {
    function RegisteredpassPage(events, ajax, cmnfun, Storage, navCtrl, navParams) {
        var _this = this;
        this.events = events;
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.Storage = Storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getPassword1 = { user_password: '' };
        this.showPassword = false;
        this.fulluserdetails = [];
        Storage.get('userEmail').then(function (val) {
            if (val) {
                _this.email = val;
                console.log(_this.email);
            }
        });
        this.PaymentProcess = this.navParams.get('gotopayment');
    }
    RegisteredpassPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisteredpassPage');
    };
    RegisteredpassPage.prototype.toggleShowPassword = function () {
        this.showPassword = !this.showPassword;
    };
    RegisteredpassPage.prototype.goToAccountTab = function () {
        var _this = this;
        if (this.getPassword1.user_password == "") {
            this.cmnfun.showToast('Please enter password');
        }
        else {
            this.cmnfun.showLoading('Please wait...');
            this.ajax.post('custom/login-webuser', {
                email: this.email,
                password: this.getPassword1.user_password
            }).subscribe(function (res) {
                _this.cmnfun.HideLoading();
                console.log(res);
                _this.fulluserdetails = res;
                _this.Storage.set("subscriptionRemain", _this.fulluserdetails.subscription_remain);
                _this.Storage.set("userData", JSON.stringify(_this.fulluserdetails.webuser));
                _this.Storage.set('checkLogin', _this.fulluserdetails.webuser);
                if (_this.fulluserdetails.code == 3) {
                    _this.subscriptionCheck = 1; // change made on 21 June 17  instead of  if(this.subscription==1){
                    if (_this.subscriptionCheck == 1) {
                        _this.userSubscription = 1;
                        var item = {
                            isLogin: 1,
                            disableLogin: 1
                        };
                        _this.Storage.set('subscription', 1);
                        _this.events.publish('userlogin:changed', item);
                        // this.navCtrl.setRoot('LivestatsPage', { disableLogin: 1, isLogin: 1 });
                        // this.navCtrl.push('LivestatsPage');
                        if (_this.PaymentProcess == 'true' || _this.fulluserdetails.webuser.payment_status == 0) {
                            _this.navCtrl.push('LandingpagePage');
                        }
                        else {
                            // this.navCtrl.setRoot('LivestatsPage', { disableLogin: 1, isLogin: 1 });
                            _this.navCtrl.setRoot(HomePage);
                        }
                    }
                    else {
                        _this.userSubscription = 1;
                        var item1 = {
                            isLogin: 0,
                            disableLogin: 0
                        };
                        _this.events.publish('userlogin:changed', item1);
                    }
                }
                else if (_this.fulluserdetails.code == 4) {
                    _this.cmnfun.showToast('entered password is incorrect');
                }
                else if (_this.fulluserdetails.code == 7) {
                    _this.cmnfun.showToast('somthing went wrong. Try Again !');
                }
                else if (_this.fulluserdetails.code == 1) {
                    _this.subscriptionCheck = 1; // change made on 21 June 17  instead of  if(this.subscription==1){
                    if (_this.subscriptionCheck == 1) {
                        _this.userSubscription = 1;
                        var item2 = {
                            isLogin: 1,
                            disableLogin: 1
                        };
                        _this.Storage.set('subscription', 1);
                        _this.events.publish('userlogin:changed', item2);
                        // this.navCtrl.setRoot('LivestatsPage', { disableLogin: 1, isLogin: 1 });
                        // this.navCtrl.push('LivestatsPage');
                        if (_this.PaymentProcess == 'true') {
                            _this.navCtrl.push('LandingpagePage');
                        }
                        else {
                            // this.navCtrl.setRoot('LivestatsPage', { disableLogin: 1, isLogin: 1 });
                            _this.navCtrl.push('LandingpagePage');
                        }
                    }
                    else {
                        _this.userSubscription = 1;
                        var item3 = {
                            isLogin: 0,
                            disableLogin: 0
                        };
                        _this.events.publish('userlogin:changed', item3);
                        if (_this.PaymentProcess == 'true') {
                            _this.navCtrl.push('LandingpagePage');
                        }
                        else {
                            // this.navCtrl.setRoot('LivestatsPage', { disableLogin: 1, isLogin: 1 });
                            _this.navCtrl.push('LandingpagePage');
                        }
                    }
                }
            }, function (error) {
                _this.cmnfun.HideLoading();
                _this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        }
    };
    RegisteredpassPage.prototype.forgotpass = function () {
        this.navCtrl.push('ForgotpassPage');
    };
    RegisteredpassPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-registeredpass',
            templateUrl: 'registeredpass.html',
        }),
        __metadata("design:paramtypes", [Events, AjaxProvider, CommomfunctionProvider, Storage, NavController, NavParams])
    ], RegisteredpassPage);
    return RegisteredpassPage;
}());
export { RegisteredpassPage };
//# sourceMappingURL=registeredpass.js.map