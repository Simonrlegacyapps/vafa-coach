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
import { IonicPage, NavController, NavParams, Nav, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
var TermsLink = 'http://vafalive.com.au/termsconds';
var NewaccountPage = /** @class */ (function () {
    function NewaccountPage(navCtrl, cmnfun, transfer, alertCtrl, modalCtrl, camera, plt, ga, ajax, SocialSharing, localData, toastCtrl, inapp, actionSheetCtrl, nav, events, storage, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.cmnfun = cmnfun;
        this.transfer = transfer;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.camera = camera;
        this.plt = plt;
        this.ga = ga;
        this.ajax = ajax;
        this.SocialSharing = SocialSharing;
        this.localData = localData;
        this.toastCtrl = toastCtrl;
        this.inapp = inapp;
        this.actionSheetCtrl = actionSheetCtrl;
        this.nav = nav;
        this.events = events;
        this.storage = storage;
        this.navParams = navParams;
        this.path = 'http://vafalive.com.au/web/';
        this.resData = [];
        this.ShowCount = 0;
        this.userdata = {
            first_name: '',
            user_email: '',
            user_image: '',
            mobile_number: '',
            last_name: '',
            device_Id: ''
        };
        this.competitionlist = [];
        this.teamlist = [];
        this.selectedteam = '';
        this.selectedcompetition = '';
        this.list = '';
        this.type = '';
        this.MyTeam = {
            team: '',
            competition: '',
            product: ''
        };
        this.imageURI = '';
        this.deviceId = '';
        this.userdata = this.localData.GetData();
        this.deviceId = this.localData.GetDevice();
        this.MyFavTeam = this.localData.GetUserFav();
        // alert(JSON.stringify(this.MyFavTeam));
        // alert(this.MyFavTeam.FavTeam);
        console.log(this.userdata);
        this.MyTeam = {
            team: this.MyFavTeam.FavTeam,
            competition: this.MyFavTeam.FavComp,
            product: '',
        };
        if (this.userdata.user_product) {
            if (this.userdata.user_product == 'vafa_premium') {
                this.MyTeam.product = 'Premium';
            }
            else if (this.userdata.user_product == 'vafa_premium_plus') {
                this.MyTeam.product = 'Premium Plus';
            }
            else {
                this.MyTeam.product = '';
            }
        }
        if (this.userdata.user_image != null && this.userdata.user_image != undefined && this.userdata.user_image != '') {
            this.userdata.user_image = this.userdata.user_image;
        }
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
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('Account Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    // Aclogout() {
    // this.storage.clear().then(() => {
    // this.userSubscription = 0;
    // var item = {
    // isLogin: 0,
    // disableLogin: 0
    // }
    // this.events.publish('userlogin:changed', item);
    // this.events.publish('menuchange:changed', { title: 'News', component: HomePage, icon: 'assets/imgs/menuIcon/newsIcon.png', itemseleted: 'seleted' });
    // this.navCtrl.setRoot(HomePage);
    // });
    // }
    NewaccountPage.prototype.gotopage = function () {
        var _this = this;
        console.log(this.list);
        console.log(this.type);
        var modal = this.modalCtrl.create('CompetitionTeamPage', { list: this.list, type: this.type });
        var me = this;
        modal.onDidDismiss(function (data) {
            console.log(data);
            if (data.type == 'competitions') {
                _this.selectedcompetition = data.value;
                console.log(_this.selectedcompetition);
                if (_this.selectedcompetition.competition_id != undefined) {
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
                        _this.MyTeam.competition = _this.selectedcompetition.competitions_name;
                    }, function (error) {
                        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                    });
                }
            }
            else {
                _this.selectedteam = data.value;
                console.log(_this.selectedteam);
                if (_this.selectedteam.team_id != undefined) {
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
                        _this.MyTeam.team = _this.selectedteam.team_name;
                    }, function (error) {
                        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                    });
                }
            }
        });
        modal.present();
    };
    NewaccountPage.prototype.gotocheckcompetitionteam = function (item) {
        if (item == 'competitions') {
            this.list = this.competitionlist.competition;
            this.type = 'competitions';
            this.gotopage();
        }
        else {
            this.list = this.teamlist.teams;
            this.type = 'teams';
            this.gotopage();
        }
    };
    NewaccountPage.prototype.Terms = function () {
        this.navCtrl.push('CustomBrowserPage');
    };
    NewaccountPage.prototype.GotoPay = function () {
        console.log(this.MyTeam.product);
        if (this.MyTeam.product == '' || this.MyTeam.product == undefined || this.MyTeam.product == null) {
            this.nav.setRoot('LandingpagePage');
        }
        else if (this.MyTeam.product == 'Premium') {
            this.nav.setRoot('LandingpagePage');
        }
        else if (this.MyTeam.product == 'Premium Plus') {
            var alert_1 = this.alertCtrl.create({
                subTitle: 'CONGRATULATIONS\nyou have the top\nPREMIUM PASS',
                cssClass: 'CusttoastCtrl',
                buttons: ['Dismiss']
            });
            alert_1.present();
            // let toast = this.toastCtrl.create({
            // message: 'CONGRATULATIONS\nyou have the top\nPREMIUM PASS',
            // cssClass: 'CusttoastCtrl',
            // duration: 100500,
            // position: 'middle'
            // });
            // toast.present();
        }
    };
    NewaccountPage.prototype.EditUserDetails = function (val, type) {
        var _this = this;
        var modal = this.modalCtrl.create('EditUserModelPage', { type: type, value: val });
        var me = this;
        modal.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                _this.cmnfun.Loading('Updating..');
                _this.ajax.EditUserData(data).subscribe(function (res) {
                    _this.cmnfun.HideLoading();
                    console.log(res);
                    _this.Dataresponse = res;
                    _this.localData.StoreData(_this.Dataresponse.webuser);
                    _this.storage.set("userData", JSON.stringify(_this.Dataresponse.webuser));
                    _this.storage.set('FullData', _this.Dataresponse);
                    _this.userdata = _this.Dataresponse.webuser;
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
        });
        modal.present();
    };
    NewaccountPage.prototype.Support = function () {
        // if(this.userdata.first_name=='' || this.userdata.first_name==null || this.userdata.first_name==undefined){
        //   this.cmnfun.showToast('Please enter your first name');
        // }else if(this.userdata.last_name=='' || this.userdata.last_name==null || this.userdata.last_name==undefined){
        //   this.cmnfun.showToast('Please enter your last name');
        // }else{
        var subject = 'VAFA Live Support';
        // +'-'+this.userdata.first_name+' '+this.userdata.last_name;
        console.log(subject);
        this.SocialSharing.shareViaEmail('', subject, ['admin@completesportsmanagement.com.au']).then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
        // }
    };
    NewaccountPage.prototype.getImageGallary = function () {
        var _this = this;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI
        }).then(function (imageData) {
            _this.imageURI = imageData;
            _this.uploadFile(_this.imageURI);
        }, function (err) {
            console.log(err);
            _this.cmnfun.showToast(err);
        });
    };
    NewaccountPage.prototype.getImageCamera = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
            _this.uploadFile(_this.imageURI);
        }, function (err) {
            console.log(err);
            _this.cmnfun.showToast(err);
        });
    };
    NewaccountPage.prototype.ActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        console.log('Camera clicked');
                        _this.getImageCamera();
                    }
                },
                {
                    text: 'Gallary',
                    handler: function () {
                        console.log('Gallary clicked');
                        _this.getImageGallary();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    NewaccountPage.prototype.uploadFile = function (url) {
        var _this = this;
        // alert(url);
        if (!url) {
            return;
        }
        this.cmnfun.showLoading('Uploading..');
        var fileTransfer = this.transfer.create();
        var imgpath = url.toString();
        var imageName = imgpath.substring(imgpath.lastIndexOf('/') + 1);
        var options = {
            fileKey: 'user_image',
            fileName: imageName,
            chunkedMode: false,
            mimeType: "image/jpeg",
            params: { 'deviceid': this.deviceId },
            headers: {}
        };
        fileTransfer.upload(imgpath, 'http://vafalive.com.au/score/custom/save-image', options)
            .then(function (data) {
            _this.cmnfun.HideLoading();
            _this.resData = data.response;
            _this.resData = JSON.parse(_this.resData);
            _this.userdata.user_image = _this.resData.webuser.user_image;
            _this.localData.StoreData(_this.resData.webuser);
            _this.imageURI = '';
            _this.storage.set("userData", JSON.stringify(_this.resData.webuser));
            _this.cmnfun.showToast("Image uploaded successfully");
        }, function (err) {
            console.log(err);
            _this.cmnfun.HideLoading();
            _this.cmnfun.showToast(err);
        });
    };
    NewaccountPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-newaccount',
            templateUrl: 'newaccount.html',
        }),
        __metadata("design:paramtypes", [NavController,
            CommomfunctionProvider,
            FileTransfer,
            AlertController,
            ModalController,
            Camera,
            Platform, GoogleAnalytics,
            AjaxProvider,
            SocialSharing,
            LocalDataProvider,
            ToastController,
            InAppBrowser,
            ActionSheetController,
            Nav, Events, Storage, NavParams])
    ], NewaccountPage);
    return NewaccountPage;
}());
export { NewaccountPage };
//# sourceMappingURL=newaccount.js.map