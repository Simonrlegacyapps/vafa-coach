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
/**
 * Generated class for the EmailloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EmailloginPage = /** @class */ (function () {
    function EmailloginPage(ajax, cmnfun, navCtrl, navParams, Storage) {
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Storage = Storage;
        this.user = { email: '' };
        this.userdetails = [];
        this.emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        this.PaymentProcess = this.navParams.get('gotopayment');
    }
    EmailloginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EmailloginPage');
    };
    EmailloginPage.prototype.registerdEmailCheck = function () {
        var _this = this;
        if (this.user.email == '' || !this.emailValid.test(this.user.email)) {
            this.cmnfun.showToast('Please enter valid email!');
        }
        else {
            this.ajax.post('custom/check-email-webuser', {
                email: this.user.email,
            }).subscribe(function (res) {
                console.log(res);
                _this.userdetails = res;
                _this.Storage.set('userData', JSON.stringify(_this.userdetails.webuser));
                // this.Storage.set('subscriptionRemain', JSON.stringify(res.subscription_remain));
                // this.Storage.set('userData1', JSON.stringify(res.webuser));
                if (_this.userdetails.code == 2) {
                    _this.Storage.set('userEmail', _this.userdetails.email);
                    _this.navCtrl.push('SignUpPage');
                }
                if (_this.userdetails.code == 1) {
                    _this.Storage.set('userEmail', _this.userdetails.webuser.user_email);
                    _this.Storage.set('subscriptionRemain', JSON.stringify(_this.userdetails.subscription_remain));
                    _this.Storage.set('userData1', JSON.stringify(_this.userdetails.webuser));
                    if (_this.PaymentProcess == 'true') {
                        _this.navCtrl.push('RegisteredpassPage', { gotopayment: 'true' });
                    }
                    else {
                        _this.navCtrl.push('RegisteredpassPage', { gotopayment: 'false' });
                    }
                }
            }, function (error) {
                _this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        }
    };
    EmailloginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-emaillogin',
            templateUrl: 'emaillogin.html',
        }),
        __metadata("design:paramtypes", [AjaxProvider, CommomfunctionProvider, NavController, NavParams, Storage])
    ], EmailloginPage);
    return EmailloginPage;
}());
export { EmailloginPage };
//# sourceMappingURL=emaillogin.js.map