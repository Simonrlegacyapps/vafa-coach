var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
// import { LivestatsPage } from '../../pages/livestats/livestats';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignUpPage = /** @class */ (function () {
    function SignUpPage(events, ajax, cmnfun, navCtrl, navParams, Storage) {
        var _this = this;
        this.events = events;
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Storage = Storage;
        this.user = {
            name: '',
            password: ''
        };
        this.fulluserdetails = [];
        this.showPassword = false;
        Storage.get('userEmail').then(function (val) {
            if (val) {
                _this.email = val;
            }
        });
    }
    SignUpPage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = console).log;
                        return [4 /*yield*/, this.Storage.get('userEmail')];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        console.log('ionViewDidLoad SignUpPage');
                        return [2 /*return*/];
                }
            });
        });
    };
    SignUpPage.prototype.toggleShowPassword = function () {
        this.showPassword = !this.showPassword;
    };
    SignUpPage.prototype.signUp = function () {
        var _this = this;
        if (this.user.name == '' || this.user.password == '') {
            this.cmnfun.showToast('Please fill all fields');
        }
        else {
            this.cmnfun.showLoading('Please wait...');
            this.ajax.post('custom/email-webuser', {
                username: this.user.name,
                email: this.email,
                password: this.user.password
            }).subscribe(function (res) {
                _this.cmnfun.HideLoading();
                console.log(res);
                _this.fulluserdetails = res;
                _this.Storage.set("subscriptionRemain", _this.fulluserdetails.subscription_remain);
                _this.Storage.set("userData", JSON.stringify(_this.fulluserdetails.webuser));
                _this.Storage.set('checkLogin', _this.fulluserdetails.webuser);
                _this.subscriptionCheck = 1; // change made on 21 June 17 instead of data.subscription in if also
                if (_this.subscriptionCheck == 1) {
                    _this.userSubscription = 1;
                    var item = {
                        isLogin: 1,
                        disableLogin: 1
                    };
                    _this.Storage.set('subscription', 1);
                    _this.events.publish('userlogin:changed', item);
                    _this.navCtrl.setRoot('LivestatsPage', { disableLogin: 1, isLogin: 1 });
                    // this.navCtrl.push('LivestatsPage');
                }
                else {
                    _this.userSubscription = 1;
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
        }
    };
    SignUpPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-sign-up',
            templateUrl: 'sign-up.html',
        }),
        __metadata("design:paramtypes", [Events, AjaxProvider, CommomfunctionProvider, NavController, NavParams, Storage])
    ], SignUpPage);
    return SignUpPage;
}());
export { SignUpPage };
//# sourceMappingURL=sign-up.js.map