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
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
/**
 * Generated class for the ForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgotpassPage = /** @class */ (function () {
    function ForgotpassPage(ajax, cmnfun, navCtrl, navParams) {
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.data = { userEmail: '' };
        this.result = [];
    }
    ForgotpassPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotpassPage');
    };
    ForgotpassPage.prototype.changePassword = function () {
        var _this = this;
        if (this.data.userEmail == '') {
            alert('Enter valid email!');
        }
        else {
            this.cmnfun.showLoading('Please wait...');
            this.ajax.post('new/forget-password', {
                email: this.data.userEmail
            }).subscribe(function (res) {
                _this.cmnfun.HideLoading();
                console.log(res);
                _this.result = res;
                if (_this.result.code == 1) {
                    _this.cmnfun.showToast('Changed Password link successfully sent on your email!');
                    _this.navCtrl.push('RegisteredpassPage');
                }
                else if (_this.result.code == 4) {
                    _this.cmnfun.showToast('Please enter registered email!');
                }
            }, function (error) {
                _this.cmnfun.HideLoading();
                _this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        }
    };
    ForgotpassPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-forgotpass',
            templateUrl: 'forgotpass.html',
        }),
        __metadata("design:paramtypes", [AjaxProvider, CommomfunctionProvider, NavController, NavParams])
    ], ForgotpassPage);
    return ForgotpassPage;
}());
export { ForgotpassPage };
//# sourceMappingURL=forgotpass.js.map