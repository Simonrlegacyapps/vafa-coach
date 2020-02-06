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
import { IonicPage, NavController, ViewController, ModalController, NavParams, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { HomePage } from '../../pages/home/home';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
// import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the LandingpagePage page.
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var proId1 = 'vafa_premium';
var proId2 = 'vafa_premium_plus';
var PPLink = 'https://www.completesportsmanagement.com.au/privacy';
var TermsLink = 'http://vafalive.com.au/termsconds';
var LandingpagePage = /** @class */ (function () {
    function LandingpagePage(storage, plt, iap, events, ga, uniqueDeviceID, inapp, localData, cmnfun, ajax, navCtrl, viewCtrl, modalCtrl, navParams) {
        var _this = this;
        this.storage = storage;
        this.plt = plt;
        this.iap = iap;
        this.events = events;
        this.ga = ga;
        this.uniqueDeviceID = uniqueDeviceID;
        this.inapp = inapp;
        this.localData = localData;
        this.cmnfun = cmnfun;
        this.ajax = ajax;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.paymentname = 'vafa_premium_plus';
        this.userpayment = {
            user_id: '',
            device_id: '',
            first_name: '',
            last_name: '',
            mobile_number: '',
            email: '',
            transaction_id: '',
            product_id: '',
            competition_id: '',
            team_id: ''
        };
        this.UserTeamData = {
            selectedcompetition: '',
            teamlist: '',
            selectedteam: '',
            yearcheck: ''
        };
        this.ProductDetails = [];
        this.competitionlist = [];
        this.teamlist = [];
        this.selectedteam = '';
        this.selectedcompetition = '';
        this.list = '';
        this.type = '';
        this.yearcheck = '';
        this.pamentshow = false;
        this.userdata = this.localData.GetData();
        this.deviceId = this.localData.GetDevice();
        this.MyFavTeam = this.localData.GetUserFav();
        this.ajax.postMethodct('get-all-competitions').subscribe(function (res) {
            console.log(res);
            _this.competitionlist = res;
            console.log(_this.competitionlist);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        this.ajax.postMethodct('get-all-teams').subscribe(function (res) {
            // this.cmnfun.HideLoading();
            _this.teamlist = res;
            console.log(_this.teamlist);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
        this.storage.get('FullData').then(function (val) {
            if (val) {
                if (val.webuserteam !== null) {
                    _this.selectedteam = val.webuserteam;
                    _this.userpayment.team_id = val.webuserteam.team_id;
                }
                if (val.webusercompetition !== null) {
                    _this.selectedcompetition = val.webusercompetition;
                    _this.userpayment.competition_id = val.webusercompetition.competition_id;
                }
            }
        });
        this.events.subscribe('changefulldata:changed', function (res) {
            var data = _this.localData.getallfulldata();
            if (data) {
                if (data.webuserteam !== null) {
                    _this.selectedteam = data.webuserteam;
                    _this.userpayment.team_id = data.webuserteam.team_id;
                }
                if (data.webusercompetition !== null) {
                    _this.selectedcompetition = data.webusercompetition;
                    _this.userpayment.competition_id = data.webusercompetition.competition_id;
                }
            }
        });
        // this.storage.get('UserTeamData').then((val) => {
        //           if (val) {
        //             // this.pamentshow=true;
        //           }
        //           });
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('Paymentflow Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    LandingpagePage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get('userData')];
                    case 1:
                        _a.resData = _b.sent();
                        this.resData = JSON.parse(this.resData);
                        if (this.resData != null) {
                            this.paymentname = this.resData.user_product;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LandingpagePage.prototype.yearset = function (item) {
        this.yearcheck = item;
    };
    LandingpagePage.prototype.gotopage = function () {
        var _this = this;
        var modal = this.modalCtrl.create('CompetitionTeamPage', { list: this.list, type: this.type });
        var me = this;
        modal.onDidDismiss(function (data) {
            if (data.type == 'competitions') {
                _this.deviceId = _this.localData.GetDevice();
                // this.cmnfun.showLoading('Please wait...');
                _this.selectedcompetition = data.value;
                console.log(_this.selectedcompetition);
                var update = {
                    device_id: _this.deviceId,
                    field: 'favourite_competition_id',
                    data: _this.selectedcompetition.competition_id
                };
                _this.cmnfun.Loading('Updating..');
                _this.ajax.EditUserData(update).subscribe(function (res) {
                    _this.cmnfun.HideLoading();
                    console.log(res);
                    _this.Dataresponse = res;
                    _this.localData.StoreData(_this.Dataresponse.webuser);
                    _this.localData.StoreUserFav(_this.Dataresponse);
                    _this.storage.set("userData", JSON.stringify(_this.Dataresponse.webuser));
                    _this.storage.set('FullData', _this.Dataresponse);
                });
            }
            else {
                _this.deviceId = _this.localData.GetDevice();
                _this.selectedteam = data.value;
                var update = {
                    device_id: _this.deviceId,
                    field: 'favourite_team_id',
                    data: _this.selectedteam.team_id
                };
                _this.cmnfun.Loading('Updating..');
                _this.ajax.EditUserData(update).subscribe(function (res) {
                    _this.cmnfun.HideLoading();
                    console.log(res);
                    _this.Dataresponse = res;
                    _this.localData.StoreData(_this.Dataresponse.webuser);
                    _this.localData.StoreUserFav(_this.Dataresponse);
                    _this.storage.set("userData", JSON.stringify(_this.Dataresponse.webuser));
                    _this.storage.set('FullData', _this.Dataresponse);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
        });
        modal.present();
    };
    LandingpagePage.prototype.gotocheckcompetitionteam = function (item) {
        if (item == 'competitions') {
            this.list = this.competitionlist.competition;
            this.type = 'competitions';
            this.gotopage();
        }
        else {
            if (this.selectedcompetition != '') {
                this.list = this.teamlist.teams;
                this.type = 'teams';
                this.gotopage();
            }
            else {
                alert("please choose competition");
            }
        }
    };
    LandingpagePage.prototype.gotohome = function () {
        this.UserTeamData.selectedcompetition = this.selectedcompetition;
        this.UserTeamData.selectedteam = this.selectedteam;
        this.UserTeamData.yearcheck = this.yearcheck;
        this.storage.set('UserTeamData', this.UserTeamData);
        this.events.publish('menuchange2:changed', 'HomePage');
        this.navCtrl.setRoot(HomePage);
    };
    LandingpagePage.prototype.Terms = function () {
        this.navCtrl.push('CustomBrowserPage');
    };
    LandingpagePage.prototype.privacy = function () {
        this.navCtrl.push('CustomPrivacyPage');
    };
    LandingpagePage.prototype.gotopament = function () {
        this.UserTeamData.selectedcompetition = this.selectedcompetition;
        this.UserTeamData.selectedteam = this.selectedteam;
        this.UserTeamData.yearcheck = this.yearcheck;
        this.userpayment.team_id = this.selectedteam.team_id;
        this.userpayment.competition_id = this.selectedcompetition.competition_id;
        this.storage.set('UserTeamData', this.UserTeamData);
        // this.storage.get('userData').then((val) => {
        //       if (val) {
        this.pamentshow = true;
        //       }
        //       else {
        //       this.navCtrl.push('LoginPage',{gotopayment:'true'});
        //       }
        //       });
        // this.pamentshow=true;
    };
    LandingpagePage.prototype.paymentBuy = function (val) {
        var product_id;
        if (val == 1) {
            product_id = proId1;
        }
        else if (val == 2) {
            product_id = proId2;
        }
        this.userpayment.product_id = product_id;
        console.log(this.userpayment);
        this.navCtrl.push('UserdetailsmodelPage', { paymentdetails: this.userpayment });
    };
    LandingpagePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-landingpage',
            templateUrl: 'landingpage.html',
        }),
        __metadata("design:paramtypes", [Storage,
            Platform,
            InAppPurchase,
            Events,
            GoogleAnalytics,
            UniqueDeviceID,
            InAppBrowser,
            LocalDataProvider,
            CommomfunctionProvider,
            AjaxProvider, NavController, ViewController, ModalController, NavParams])
    ], LandingpagePage);
    return LandingpagePage;
}());
export { LandingpagePage };
//# sourceMappingURL=landingpage.js.map