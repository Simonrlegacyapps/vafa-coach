var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
// import { Geolocation } from '@ionic-native/geolocation';
// import { Storage } from '@ionic/storage';
// import { AjaxProvider } from '../ajax/ajax';
/*
  Generated class for the CommomfunctionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var CommomfunctionProvider = /** @class */ (function () {
    // longitude:any;
    function CommomfunctionProvider(toastCtrl, loadingCtrl) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        console.log('Hello CommomfunctionProvider Provider');
    }
    CommomfunctionProvider.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            cssClass: 'toastCtrl',
            duration: 1500,
            position: 'top'
        });
        toast.present();
    };
    CommomfunctionProvider.prototype.CustshowToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            cssClass: 'toastCtrl',
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'OK'
        });
        toast.present();
    };
    CommomfunctionProvider.prototype.showLoading = function (msg) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            cssClass: 'my-loading-class',
        });
        this.loading.present();
        setTimeout(function () {
            _this.loading.dismiss();
        }, 12000);
    };
    CommomfunctionProvider.prototype.Loading = function (msg) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: msg,
            cssClass: 'loading-class-my'
        });
        this.loading.present();
        setTimeout(function () {
            _this.loading.dismiss();
        }, 5000);
    };
    CommomfunctionProvider.prototype.Load = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'WELCOME\nVAFA Live Official App.',
            cssClass: 'CustLoadCtrl',
        });
        this.loading.present();
        setTimeout(function () {
            _this.loading.dismiss();
        }, 5000);
    };
    CommomfunctionProvider.prototype.HideLoading = function () {
        this.loading.dismiss();
    };
    CommomfunctionProvider.prototype.HideLoad = function () {
        this.loading.dismiss();
    };
    CommomfunctionProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ToastController, LoadingController])
    ], CommomfunctionProvider);
    return CommomfunctionProvider;
}());
export { CommomfunctionProvider };
//# sourceMappingURL=commomfunction.js.map