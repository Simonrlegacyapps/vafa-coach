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
import { IonicPage, NavController, NavParams, ViewController, Nav, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { HomePage } from '../../pages/home/home';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
var proId1 = 'vafa_premium';
var proId2 = 'vafa_premium_plus';
var UserdetailsmodelPage = /** @class */ (function () {
    function UserdetailsmodelPage(navCtrl, ajax, iap, plt, viewCtrl, loadingCtrl, actionSheetCtrl, events, cmnfun, nav, ga, localData, storage, transfer, camera, uniqueDeviceID, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.ajax = ajax;
        this.iap = iap;
        this.plt = plt;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.events = events;
        this.cmnfun = cmnfun;
        this.nav = nav;
        this.ga = ga;
        this.localData = localData;
        this.storage = storage;
        this.transfer = transfer;
        this.camera = camera;
        this.uniqueDeviceID = uniqueDeviceID;
        this.navParams = navParams;
        this.path = 'http://vafalive.com.au/web/';
        this.numberarray = [];
        this.User = {
            first_name: '',
            last_name: '',
            mobile_number: '',
            email: '',
            device_id: ''
        };
        this.userimage = '';
        this.deviceId = '';
        this.imageURI = '';
        this.paymentdetails = [];
        this.emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        this.mobileValid = /^[(]{0,1}[0]{1}[)\.\]{0,1}[4]{1}[\.\]{0,1}[0-9]{8}$/;
        this.valid = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/;
        this.userData = this.localData.GetData();
        this.deviceId = this.localData.GetDevice();
        console.log(this.userData);
        this.paymentdetails = navParams.get('paymentdetails');
        console.log(this.paymentdetails);
        if (this.userData) {
            this.userimage = this.userData.user_image;
        }
        // this.storage.get('userData').then((val)=>{
        //   if(val){
        //     let userdetails=JSON.parse(val);
        if (this.userData) {
            this.User = {
                first_name: this.userData.first_name,
                last_name: this.userData.last_name,
                mobile_number: this.userData.mobile_number,
                email: this.userData.user_email,
                device_id: this.userData.device_id,
                competition_id: this.paymentdetails.competition_id,
                team_id: this.paymentdetails.team_id,
                product_id: this.paymentdetails.product_id,
                transaction_id: ''
            };
        }
        else {
            this.User = {
                first_name: '',
                last_name: '',
                mobile_number: '',
                email: '',
                device_id: this.userData.device_id,
                competition_id: this.paymentdetails.competition_id,
                team_id: this.paymentdetails.team_id,
                product_id: this.paymentdetails.product_id,
                transaction_id: ''
            };
        }
        //   }else{
        //     this.User={
        //           first_name:'',
        //           last_name:'',
        //           mobile_number:'',
        //           email:'',
        //           device_id:this.deviceId,
        //           competition_id:this.paymentdetails.competition_id,
        //           team_id:this.paymentdetails.team_id,
        //           product_id:this.paymentdetails.product_id,
        //           transaction_id:''
        //         }
        //   }
        // });      
        this.plt.ready().then(function () {
            _this.iap.getProducts([proId1, proId2])
                .then(function (products) {
                // this.ProductDetails=products;
            })
                .catch(function (err) {
                console.log(err);
            });
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('Payment Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    UserdetailsmodelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserdetailsmodelPage');
    };
    UserdetailsmodelPage.prototype.getImageGallary = function () {
        var _this = this;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI
        }).then(function (imageData) {
            _this.imageURI = imageData;
            _this.uploadFile(_this.imageURI);
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            console.log(err);
            _this.cmnfun.showToast(err);
        });
    };
    UserdetailsmodelPage.prototype.getImageCamera = function () {
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
    UserdetailsmodelPage.prototype.ActionSheet = function () {
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
    UserdetailsmodelPage.prototype.uploadFile = function (url) {
        var _this = this;
        if (!url) {
            return;
        }
        this.cmnfun.Loading('Uploading..');
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
            console.log(data + "Uploaded Successfully");
            _this.resData = data.response;
            _this.resData = JSON.parse(_this.resData);
            _this.localData.StoreData(_this.resData.webuser);
            _this.userimage = _this.resData.webuser.user_image;
            _this.storage.set("userData", JSON.stringify(_this.resData.webuser));
            _this.cmnfun.showToast("Image uploaded successfully");
        }, function (err) {
            console.log(err);
            _this.cmnfun.HideLoading();
            _this.cmnfun.showToast(err);
        });
    };
    UserdetailsmodelPage.prototype.ViewNumber = function (val) {
        if (val.length == 5) {
            this.User.mobile_number = val.replace(/(.{4})/, '$1 ').trim();
        }
        if (val.length == 9) {
            this.User.mobile_number = val.replace(/(.{8})/, '$1 ').trim();
        }
    };
    UserdetailsmodelPage.prototype.UserSubmit = function () {
        var _this = this;
        if (this.User.first_name == '') {
            this.cmnfun.CustshowToast('Enter first name');
        }
        else if (this.User.last_name == '') {
            this.cmnfun.CustshowToast('Enter last name');
        }
        else if (this.User.email == '' || !this.emailValid.test(this.User.email)) {
            this.cmnfun.CustshowToast('Please enter valid email!');
        }
        else if (this.User.mobile == '' || !this.valid.test(this.User.mobile_number)) {
            this.cmnfun.CustshowToast('Enter valid mobile number');
        }
        else {
            console.log(this.User);
            this.cmnfun.Loading('Processing your payment now..');
            this.iap
                .buy(this.User.product_id)
                .then(function (data) {
                if (data) {
                    // alert(JSON.stringify(data));       
                    _this.User.transaction_id = data.transactionId;
                    _this.ajax.PaymentpostApi(_this.User).subscribe(function (res) {
                        _this.cmnfun.HideLoading();
                        console.log(res);
                        _this.resData = res;
                        _this.localData.StoreData(_this.resData.webuser);
                        _this.localData.StoreUserFav(_this.resData);
                        _this.storage.set('PaymentProcess', 1);
                        _this.storage.set("userData", JSON.stringify(_this.resData.webuser));
                        _this.storage.set('checkLogin', _this.resData.webuser);
                        _this.storage.set('FullData', _this.resData);
                        _this.events.publish('changebanner:changed', true);
                        // this.events.publish('gotostats:changed','NewaccountPage' );
                        _this.events.publish('menuchange2:changed', 'HomePage');
                        _this.ga.trackEvent('Payment', 'Done', 'Users')
                            .then(function () {
                            _this.navCtrl.setRoot(HomePage);
                        });
                        // this.navCtrl.setRoot('NewaccountPage');   
                    }, function (error) {
                        // alert(JSON.stringify(error));
                        _this.cmnfun.HideLoading();
                        _this.cmnfun.showToast('Some thing Unexpected happen please try again');
                    });
                }
            })
                .catch(function (err) {
                _this.cmnfun.HideLoading();
                console.log(err);
                _this.cmnfun.showToast(err.message);
            });
        }
    };
    UserdetailsmodelPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-userdetailsmodel',
            templateUrl: 'userdetailsmodel.html',
        }),
        __metadata("design:paramtypes", [NavController, AjaxProvider, InAppPurchase, Platform,
            ViewController,
            LoadingController,
            ActionSheetController,
            Events,
            CommomfunctionProvider,
            Nav,
            GoogleAnalytics,
            LocalDataProvider,
            Storage,
            FileTransfer,
            Camera,
            UniqueDeviceID,
            NavParams])
    ], UserdetailsmodelPage);
    return UserdetailsmodelPage;
}());
export { UserdetailsmodelPage };
//# sourceMappingURL=userdetailsmodel.js.map