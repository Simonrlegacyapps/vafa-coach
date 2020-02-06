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
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { AjaxProvider } from '../providers/ajax/ajax';
import { HomePage } from '../pages/home/home';
import { MatchreportPage } from '../pages/matchreport/matchreport';
import { MatchcenterPage } from '../pages/matchcenter/matchcenter';
import { FixturePage } from '../pages/fixture/fixture';
import { PostmatchPage } from '../pages/postmatch/postmatch';
import { LadderPage } from '../pages/ladder/ladder';
import { TeamstatPage } from '../pages/teamstat/teamstat';
import { GoalkickersPage } from '../pages/goalkickers/goalkickers';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { LocalDataProvider } from '../providers/local-data/local-data';
import { CommomfunctionProvider } from '../providers/commomfunction/commomfunction';
var MyApp = /** @class */ (function () {
    function MyApp(Storage, events, ajax, platform, uniqueDeviceID, statusBar, cmnfn, localData, splashScreen) {
        //       this.ajax.CheckDeviceData(this.deviceData).subscribe((res) => {
        //   console.log(res);
        //   this.localData.StoreDevice(this.deviceData.deviceid);
        //   this.Storage.set('MydeviceID',this.deviceData.deviceid);
        //   this.resData = res;
        //  this.localData.StoreData(this.resData.webuser);
        //  this.localData.StoreUserFav(this.resData);
        //   this.Storage.set("userData", JSON.stringify(this.resData.webuser));
        this.Storage = Storage;
        this.events = events;
        this.ajax = ajax;
        this.platform = platform;
        this.uniqueDeviceID = uniqueDeviceID;
        this.statusBar = statusBar;
        this.cmnfn = cmnfn;
        this.localData = localData;
        this.splashScreen = splashScreen;
        this.deviceData = {
            deviceid: '18a361awq-ac95-9288-3533-800744157458'
        };
        this.disableBanner = 0;
        this.disableLogin = 0;
        this.isLogin = 0;
        this.seletedTitle = 'News';
        this.accountselect = 'notseleted';
        //   this.Storage.set('FullData',this.resData);
        //       if(this.resData.webuser.payment_status==0 || this.resData.webuser.payment_status==null){
        //         this.disableBanner=0;
        //       }else{
        //          this.events.publish('changebanner:changed',true);
        //         this.disableBanner=1;
        //       }
        //       this.disableLogin = 1;
        //       this.isLogin = 1;
        //   }, error => {
        // // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        //  })
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'News', component: HomePage, icon: 'assets/imgs/menuIcon/newsIcon.png', itemseleted: 'seleted' },
            { title: 'Match Centre', component: MatchcenterPage, icon: 'assets/imgs/menuIcon/machCEnterIconNew.png', itemseleted: 'notseleted' },
            { title: 'Fixtures', component: FixturePage, icon: 'assets/imgs/menuIcon/FixturesIcon.png', itemseleted: 'notseleted' },
            { title: 'Post Match', component: PostmatchPage, icon: 'assets/imgs/menuIcon/PostMatchIcon.png', itemseleted: 'notseleted' },
            { title: 'Ladder', component: LadderPage, icon: 'assets/imgs/menuIcon/LadderIcon.png', itemseleted: 'notseleted' },
            { title: 'Match Report', component: MatchreportPage, icon: 'assets/imgs/menuIcon/MatchReportIcon.png', itemseleted: 'notseleted' },
            { title: 'Goal Kickers', component: GoalkickersPage, icon: 'assets/imgs/menuIcon/GoalKickersIcon.png', itemseleted: 'notseleted' },
            { title: 'Team Stat', component: TeamstatPage, icon: 'assets/imgs/menuIcon/GoalKickersIcon.png', itemseleted: 'notseleted' }
        ];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.Storage.get('firsttime').then(function (val) {
            if (val) {
                _this.rootPage = HomePage;
                _this.Storage.get('userData').then(function (val) {
                    if (val) {
                        var user_check = JSON.parse(val);
                        _this.localData.StoreData(user_check);
                        _this.localData.StoreDevice(user_check.device_id);
                        if (user_check.payment_status == 0 || user_check.payment_status == null) {
                            _this.disableBanner = 0;
                        }
                        else {
                            _this.events.publish('changebanner:changed', true);
                            _this.disableBanner = 1;
                        }
                    }
                    else {
                        _this.uniqueDeviceID.get()
                            .then(function (uuid) {
                            var deviceData = {
                                deviceid: uuid
                            };
                            _this.localData.StoreDevice(uuid);
                            _this.Storage.set('MydeviceID', uuid);
                            _this.ajax.CheckDeviceData(deviceData).subscribe(function (res) {
                                console.log(res);
                                _this.resData = res;
                                _this.localData.StoreData(_this.resData.webuser);
                                _this.localData.StoreUserFav(_this.resData);
                                // alert(JSON.stringify(this.resData));
                                _this.Storage.set("subscriptionRemain", _this.resData.subscription_remain);
                                _this.Storage.set("userData", JSON.stringify(_this.resData.webuser));
                                _this.Storage.set('checkLogin', _this.resData.webuser);
                                _this.Storage.set('FullData', _this.resData);
                                if (_this.resData.webuser.payment_status == 0 || _this.resData.webuser.payment_status == null) {
                                    _this.disableBanner = 0;
                                }
                                else {
                                    _this.events.publish('changebanner:changed', true);
                                    _this.disableBanner = 1;
                                    _this.nav.setRoot(HomePage);
                                }
                                _this.disableLogin = 1;
                                _this.isLogin = 1;
                                //  setTimeout(() => {
                                //   this.events.publish('changefulldata:changed',true);
                                // },600);
                            }, function (error) {
                                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                            });
                        })
                            .catch(function (error) { return console.log(error); });
                    }
                });
            }
            else {
                _this.Storage.set('firsttime', 1);
                _this.rootPage = 'LandingpagePage';
                _this.cmnfn.Load();
                _this.uniqueDeviceID.get()
                    .then(function (uuid) {
                    var deviceData = {
                        deviceid: uuid
                    };
                    _this.localData.StoreDevice(uuid);
                    _this.Storage.set('MydeviceID', uuid);
                    _this.ajax.CheckDeviceData(deviceData).subscribe(function (res) {
                        console.log(res);
                        _this.resData = res;
                        _this.localData.StoreData(_this.resData.webuser);
                        _this.localData.StoreUserFav(_this.resData);
                        // alert(JSON.stringify(this.resData));
                        _this.Storage.set("subscriptionRemain", _this.resData.subscription_remain);
                        _this.Storage.set("userData", JSON.stringify(_this.resData.webuser));
                        _this.Storage.set('checkLogin', _this.resData.webuser);
                        _this.Storage.set('FullData', _this.resData);
                        if (_this.resData.webuser.payment_status == 0 || _this.resData.webuser.payment_status == null) {
                            _this.disableBanner = 0;
                        }
                        else {
                            _this.events.publish('changebanner:changed', true);
                            _this.disableBanner = 1;
                            _this.cmnfn.HideLoading();
                            _this.nav.setRoot(HomePage);
                        }
                        _this.disableLogin = 1;
                        _this.isLogin = 1;
                        setTimeout(function () {
                            _this.events.publish('changefulldata:changed', true);
                            _this.cmnfn.HideLoading();
                        }, 600);
                    }, function (error) {
                        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                    });
                })
                    .catch(function (error) { return console.log(error); });
            }
        });
        this.events.subscribe('userlogin:changed', function (res) {
            console.log(res);
            _this.disableLogin = res.disableLogin;
            _this.isLogin = res.isLogin;
        });
        this.events.subscribe('changebanner:changed', function (res) {
            console.log(res);
            _this.disableBanner = 1;
        });
        this.events.subscribe('menuchange:changed', function (res) {
            _this.openPage(res);
        });
        this.events.subscribe('menuchange2:changed', function (res) {
            _this.HomeSelect();
        });
        this.events.subscribe('gotostats:changed', function (res) {
            _this.accessDenied();
        });
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // this.statusBar.styleDefault();
            _this.statusBar.styleLightContent();
            _this.statusBar.backgroundColorByHexString('#04235C');
            _this.splashScreen.hide();
        });
        // this.ajax.postMethod('get-all-competitions',{
        // 						accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        // 					}).subscribe((res) => {
        //       console.log(res);
        //       this.events.publish('competitionlist:changed', res);
        //       // console.log(this.newsData);
        // 	}, error => {
        // 		// this.cmnfun.showToast('Some thing Unexpected happen please try again');
        //   })
    };
    MyApp.prototype.LandingPage = function () {
        this.nav.setRoot('LandingpagePage');
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        console.log(this.seletedTitle);
        if (page.title != this.seletedTitle) {
            this.pages.forEach(function (eachObj) {
                console.log(eachObj.title);
                if (page.title == eachObj.title) {
                    eachObj.itemseleted = 'seleted';
                }
                else {
                    eachObj.itemseleted = 'notseleted';
                }
            });
            this.accountselect = 'notseleted';
            this.seletedTitle = page.title;
            this.nav.setRoot(page.component);
        }
    };
    MyApp.prototype.accessDenied = function () {
        this.pages.forEach(function (eachObj) {
            eachObj.itemseleted = 'notseleted';
        });
        this.accountselect = 'seleted';
        // this.Storage.get('userData').then((val) => {
        //   if (val) {
        //     val=JSON.parse(val);
        //     if(val.payment_status==1){
        //       this.seletedTitle = 'NewaccountPage';
        //           this.nav.setRoot('NewaccountPage', { disableLogin: this.disableLogin, isLogin: this.isLogin });
        //         }else{
        //            this.Storage.get('PaymentProcess').then((val) => {
        //       if(val==1)
        //         {
        this.seletedTitle = 'NewaccountPage';
        this.nav.setRoot('NewaccountPage', { disableLogin: this.disableLogin, isLogin: this.isLogin });
        //         }
        //         else{
        //             this.nav.setRoot('LandingpagePage');
        //         }
        //     });
        //         }
        //   }
        //   else{
        //    this.nav.push('LoginPage');
        //   }
        // })
    };
    MyApp.prototype.HomeSelect = function () {
        var _this = this;
        this.pages.forEach(function (eachObj) {
            if ('News' == eachObj.title) {
                eachObj.itemseleted = 'seleted';
                _this.seletedTitle = 'News';
            }
            else {
                eachObj.itemseleted = 'notseleted';
            }
        });
        this.accountselect = 'notseleted';
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Storage,
            Events,
            AjaxProvider,
            Platform,
            UniqueDeviceID,
            StatusBar,
            CommomfunctionProvider,
            LocalDataProvider,
            SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map