import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { ProductListProvider } from '../../providers/product-list/product-list';
import { SocialSharing } from '@ionic-native/social-sharing';
import { normalizeURL } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';

const TermsLink = 'http://vafalive.com.au/termsconds';

@IonicPage()
@Component({
  selector: 'page-newaccount',
  templateUrl: 'newaccount.html',
})


export class NewaccountPage {
  isLogin: boolean = false;
  defaulturl: 'assets/imgs/logo.png';
  // path: any = 'http://vafalive.com.au/web/';
  path: any = environment.baseURL + '/web/';
  // path: any = 'http://52.89.30.220/';

  Dataresponse: any;
  resData: any = [];
  userSubscription: any;
  ShowCount: number = 0;
  ApiResponse: any;

  loadimg: boolean = false;

  under18: boolean = false;
  above18: boolean = false;

  userdata: any = {
    first_name: '',
    user_email: '',
    user_image: '',
    user_age: '',
    mobile_number: '',
    last_name: '',
    device_Id: ''
  }

  UserTeamData: any = {
    selectedcompetition: '',
    selectedteam: '',
  }

  MyFavTeam: any;
  competitionlist: any = [];
  teamlist: any = [];
  selectedteam: any = '';
  selectedcompetition: any = '';
  list: any = '';
  type: any = '';

  MyTeam: any = {
    team: '',
    competition: '',
    product: ''
  }

  lazyLoadImage: any = '../assets/user.svg';

  imageURI: any = '';
  imageFileName: any;
  base64Image: any;
  deviceId: any = '';
  state: boolean = false;

  teamcomp: any = '';

  constructor(public navCtrl: NavController,
    public cmnfun: CommomfunctionProvider,
    private transfer: FileTransfer,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private camera: Camera,
    private filePath: FilePath,
    public plt: Platform, public ga: FirebaseAnalyticsProvider,
    public ajax: AjaxProvider,
    public SocialSharing: SocialSharing,
    public prolist: ProductListProvider,
    public localData: LocalDataProvider,
    public toastCtrl: ToastController,
    public inapp: InAppBrowser,
    public actionSheetCtrl: ActionSheetController,
    public nav: Nav, public events: Events, private storage: Storage, public navParams: NavParams) {

    this.storage.get('checkLogin').then((val) => {
      if (val) {
        // console.log(val);
        this.isLogin = true;
      }
    });
    this.storage.get('FullData').then((val) => {
      if (val) {
        // console.log(val);
        this.localData.StoreUserFav(val);
      }
    });
    this.deviceId = this.localData.GetDevice();
    // this.MyFavTeam = this.localData.GetUserFav();

    this.storage.get('userData').then((val) => {
      if (val) {
        this.userdata = JSON.parse(val);
        // console.log(this.userdata);
      } else if (this.isLogin == false) {
        // console.log(this.localData.getlocalprofile());
        this.userdata = this.localData.getlocalprofile();
      }
    });

    if (this.userdata.user_image != null && this.userdata.user_image != undefined && this.userdata.user_image != '') {
      this.userdata.user_image = this.userdata.user_image;
    }

    // console.log(this.MyFavTeam)
    // if ((this.MyFavTeam.FavComp != '' && this.MyFavTeam.FavComp != undefined) && (this.MyFavTeam.FavTeam != '' && this.MyFavTeam.FavTeam != undefined)) {
    //   this.MyTeam = {
    //     team: this.MyFavTeam.FavTeam,
    //     competition: this.MyFavTeam.FavComp,
    //     product: '',
    //   }
    //   this.storage.set('mteam', this.MyTeam);
    // } else {
    this.storage.get('UserTeamData').then((val) => {
      // console.log(val)
      if (val) {
        console.log(val)
        this.teamcomp = val.selectedcompetition.competition_id;
        this.MyTeam = {
          team: val.selectedteam.team_name,
          competition: val.selectedcompetition.competitions_name,
          product: '',
        }
        if (val.selectedteam != '' && val.selectedcompetition != '') {
          this.UserTeamData = {
            selectedcompetition: val.selectedcompetition,
            selectedteam: val.selectedteam,
          }
        } else if (val.selectedcompetition != '' && val.selectedteam == '') {
          this.UserTeamData.selectedcompetition = val.selectedcompetition;
        } else if (val.selectedcompetition == '' && val.selectedteam != '') {
          this.UserTeamData.selectedteam = val.selectedteam;
        }

      } else {
        this.storage.get('mteam').then((val) => {
          if (val) {
            this.MyTeam = {
              team: val.team,
              competition: val.competition,
              product: '',
            }
          }
        });
      }

    });
    // }

    //  local-image-upload
    events.subscribe('LocalImageUpdated', (Image) => {
      this.imageURI = Image;
    });
    //

    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('My Account');
          this.ga.trackTiming('My Account', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
  }


  ionViewDidLoad() {
    // get all team and competition
    this.ajax.postMethodct('get-all-competitions-v2').subscribe((res) => {
      console.log(res);
      this.competitionlist = res;
      // console.log(this.competitionlist);
    })
    this.ajax.postMethodct('get-all-teams').subscribe((res) => {
      this.teamlist = res;
      // console.log(this.teamlist);
    })
  }

  ionViewDidLeave() {
    // this.events.unsubscribe('Profile_updated');
  }

  ionViewDidEnter() {
    this.storage.get('UserDeviceData').then((val) => {
      if (val) {
        // console.log(val)
        if (val.devicedata.payment_status == 1) {
          let product = this.prolist.GetProductType(val.devicedata.product);
          this.MyTeam.product = product;
        }
      }
    });
    console.log(this.userdata.user_age);
  }

  //Privacy and terms
  Privacy() {
    this.navCtrl.push('CustomPrivacyPage');
  }
  Terms() {
    this.navCtrl.push('CustomBrowserPage');
  }
  //

  Purchasehistory() {
    this.navCtrl.push('PurchasehistoryPage');
  }

  // Logout
  Aclogout() {
    let alert = this.alertCtrl.create({
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            //logout api
            var LogoutData = {
              email: this.userdata.user_email,
            }
            this.ajax.post('custom/user-logout', LogoutData).subscribe((res) => {
              console.log(res);
              this.ApiResponse = res;
              this.storage.remove('userData');
              this.storage.remove('FullData');
              this.storage.remove('checkLogin');
              this.localData.StoreData('');
              this.localData.StoreUserFav('');
              this.localData.LocalUserData('first_name', '');
              this.localData.LocalUserData('last_name', '');
              this.localData.LocalUserData('mobile_number', '');
              this.localData.LocalUserData('user_email', '');
              this.localData.LocalUserData('user_image', '');
              this.events.publish('userlogin', false);
              this.events.publish('menuchange2:changed', 'HomePage');
              this.navCtrl.setRoot(HomePage);
            }, error => {
              this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          }
        }
      ]
    });
    alert.present();
  }

  gotopage(val) {
    // console.log(this.list);
    // console.log(val)
    // console.log(this.type);
    let modal = this.modalCtrl.create('AccountmodelteamPage', { list: this.list, type: this.type, header: val });
    let me = this;
    modal.onDidDismiss(data => {
      // console.log(data);
      if (data.type == 'competitions') {
        this.selectedcompetition = data.value;
        this.teamcomp = this.selectedcompetition.seasons[0].competition_id;
        // console.log(this.selectedcompetition);
        this.ajax.datalist('get-all-teams-by-competitions', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.selectedcompetition.seasons[0].competition_id
        }).subscribe((res) => {
          this.teamlist = res;
        }, error => {
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
        this.MyTeam.team = '';
        if (this.selectedcompetition.competition_id != undefined) {
          if (this.isLogin == true) {
            let update = {
              id: this.userdata.id,
              field: 'favourite_competition_id',
              data: this.selectedcompetition.competition_id
            }
            this.cmnfun.Loading('Updating..');
            this.ajax.EditUserData(update).subscribe((res) => {
              this.cmnfun.HideLoading();
              // console.log(res);
              this.Dataresponse = res;
              this.localData.StoreData(this.Dataresponse.webuser);
              this.localData.StoreUserFav(this.Dataresponse);
              this.storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
              this.storage.set('FullData', this.Dataresponse);
              this.MyTeam.competition = this.selectedcompetition.competitions_name;
              this.UserTeamData.selectedcompetition = this.selectedcompetition;
              this.storage.set('UserTeamData', this.UserTeamData);
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          } else {
            this.MyTeam.competition = this.selectedcompetition.competitions_name;
            this.UserTeamData.selectedcompetition = this.selectedcompetition;
            this.storage.set('UserTeamData', this.UserTeamData);
          }
        }
      }
      else {
        this.selectedteam = data.value;
        // console.log(this.selectedteam);
        if (this.selectedteam.team_id != undefined) {
          if (this.isLogin == true) {
            let update = {
              id: this.userdata.id,
              field: 'favourite_team_id',
              data: this.selectedteam.team_id
            }
            this.cmnfun.Loading('Updating..');
            this.ajax.EditUserData(update).subscribe((res) => {
              this.cmnfun.HideLoading();
              // console.log(res);
              this.Dataresponse = res;
              this.localData.StoreData(this.Dataresponse.webuser);
              this.localData.StoreUserFav(this.Dataresponse);
              this.storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
              this.storage.set('FullData', this.Dataresponse);
              this.MyTeam.team = this.selectedteam.team_name;
              this.UserTeamData.selectedteam = this.selectedteam;
              // console.log(this.UserTeamData)
              this.storage.set('UserTeamData', this.UserTeamData);
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          } else {
            this.MyTeam.team = this.selectedteam.team_name;
            // console.log(this.MyTeam)
            // this.UserTeamData.selectedcompetition = this.selectedcompetition;
            this.UserTeamData.selectedteam = this.selectedteam;
            // console.log(this.UserTeamData)
            this.storage.set('UserTeamData', this.UserTeamData);
          }

        }

      }
    });
    modal.present();
  }

  gotocheckcompetitionteam(item) {
    if (item == 'competitions') {
      this.list = this.competitionlist.competition;
      this.type = 'competitions';
      this.gotopage(true);
    }
    else {
      // console.log(this.teamcomp);
      if (this.teamcomp != '' && this.teamcomp != undefined) {
        this.ajax.datalist('get-all-teams-by-competitions', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.teamcomp
        }).subscribe((res) => {
          this.teamlist = res;
          this.list = this.teamlist.teams;
          this.type = 'teams'
          this.gotopage(false);
        }, error => {
          // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
      } else {
        this.list = this.teamlist.teams;
        this.type = 'teams'
        this.gotopage(false);
      }
      // this.list = this.teamlist.teams;


    }
  }




  // goto landing page
  GotoPay() {
    // console.log(this.MyTeam.product);
    // if (this.isLogin == true) {
    //   if (this.MyTeam.product == '' || this.MyTeam.product == undefined || this.MyTeam.product == null) {
    //     this.ga.trackEvent("My Account - Premium Pass", "Selected", "Premium Pass - Purchase", 1);
    //     this.nav.setRoot('LandingpagePage');
    //   } else if (this.MyTeam.product == 'Premium') {
    //     this.ga.trackEvent("My Account - Premium Pass", "Selected", "Premium Pass - Purchase", 1);
    //     this.nav.setRoot('LandingpagePage');
    //   } else if (this.MyTeam.product == '2019 Team Pass') {
    //     this.ga.trackEvent("My Account - Premium Pass", "Selected", "Premium Pass - Purchase", 1);
    //     this.nav.setRoot('LandingpagePage');
    //   } else if (this.MyTeam.product == 'Premium Plus') {
    //     this.ga.trackEvent("My Account - Premium Pass", "Selected", "Premium Pass - Purchase", 1);
    //     this.nav.setRoot('LandingpagePage');
    //   } else if(this.MyTeam.product == '2019 Competition Pass'){
    //     this.nav.setRoot('LandingpagePage');
    //   } else if (this.MyTeam.product == '2019 VAFA Pass'){
    //     let alert = this.alertCtrl.create({
    //       subTitle: 'CONGRATULATIONS\nyou have the top\nPREMIUM PASS',
    //       cssClass: 'CusttoastCtrl',
    //       buttons: ['Dismiss']
    //     });
    //     alert.present();
    //   } else if (this.MyTeam.product == '2019 Game Pass'){
    this.nav.setRoot('LandingpagePage');
    //   }
    // } else if (this.MyTeam.product != '2019 VAFA Pass' || this.MyTeam.product == '' && this.isLogin == false) {
    //   this.localData.LoginState('LandingpagePage', '');
    //   this.navCtrl.push('LoginPage', { iap: 'true' });
    // }
  }


  // user profile update
  EditUserDetails(val, type) {
    if (this.isLogin == true) {
      let modal = this.modalCtrl.create('EditUserModelPage', { type: type, value: val });
      let me = this;
      modal.onDidDismiss(data => {
        // console.log(data);
        if (data) {
          if (this.isLogin == true) {
            this.cmnfun.Loading('Updating..');
            this.ajax.EditUserData(data).subscribe((res) => {
              this.cmnfun.HideLoading();
              // console.log(res);
              this.Dataresponse = res;
              this.localData.StoreData(this.Dataresponse.webuser);
              this.localData.setlocaldata(this.Dataresponse.webuser);
              this.storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
              this.storage.set('FullData', this.Dataresponse);
              this.userdata = this.Dataresponse.webuser;
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          } else {
            this.cmnfun.Loading('Saving..');
            this.localData.LocalUserData(data.field, data.data);
            setTimeout(() => {
              this.userdata = this.localData.getlocalprofile();
              this.cmnfun.HideLoading();
            }, 100);
          }
        }
      });
      modal.present();
    } else {
      let alert = this.alertCtrl.create({
        message: 'Login',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.localData.LoginState('', '');
              this.navCtrl.push('LoginPage');
            }
          }
        ]
      });
      alert.present();
    }
  }

  // user age update
  EditAge() {
    // console.log(this.userdata.user_age)
    if (this.userdata.user_age == '18 or above') {
      this.above18 = true;
      this.under18 = false;
    } else if (this.userdata.user_age == 'Under 18') {
      this.under18 = true;
      this.above18 = false;
    }
    let alert = this.alertCtrl.create({
      cssClass: 'CustomJd-radioalert'
    });
    alert.setTitle('Select Age');


    alert.addInput({
      type: 'radio',
      label: '18 or above',
      value: '18 or above',
      checked: this.above18
    });

    alert.addInput({
      type: 'radio',
      label: 'Under 18',
      value: 'Under 18',
      checked: this.under18
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Save',
      handler: data => {
        // console.log('age data:', data);
        this.userdata.user_age = data;
        if (data) {
          if (this.isLogin == true) {
            let editData: any = {
              id: this.userdata.id,
              field: 'user_age',
              data: this.userdata.user_age
            }
            // console.log(editData)
            this.cmnfun.Loading('Updating..');
            this.ajax.EditUserData(editData).subscribe((res) => {
              this.cmnfun.HideLoading();
              // console.log(res);
              this.Dataresponse = res;
              this.localData.StoreData(this.Dataresponse.webuser);
              this.localData.setlocaldata(this.Dataresponse.webuser);
              this.storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
              this.storage.set('FullData', this.Dataresponse);
              this.userdata = this.Dataresponse.webuser;
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          } else {
            this.cmnfun.Loading('Saving..');
            this.localData.LocalUserData('user_age', this.userdata.user_age);
            setTimeout(() => {
              this.userdata = this.localData.getlocalprofile();
              this.cmnfun.HideLoading();
            }, 100);
          }
        }
      }
    });
    alert.present();

  }

  Aclogin() {
    this.localData.LoginState('', '');
    this.navCtrl.push('LoginPage');
  }


  // social sharing for mail
  Support() {
    let subject = 'VAFA Live Support'
    console.log(subject);
    this.SocialSharing.shareViaEmail('', subject, ['support@completesportsmanagement.com.au']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  //


  // Profile image upload functions

  getImageGallary() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then((imageData) => {
      if (this.plt.is('android')) {
        this.filePath.resolveNativePath(imageData)
          .then(filePath =>
            this.imageURI = filePath
          )
      } else {
        this.imageURI = normalizeURL(imageData);
      }
      this.uploadFile(this.imageURI);
    }, (err) => {
      console.log(err);
      // this.cmnfun.showToast(err);
    });
  }


  getImageCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      correctOrientation: true,
      allowEdit: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = normalizeURL(imageData);
      this.uploadFile(this.imageURI);
    }, (err) => {
      console.log(err);
      // this.cmnfun.showToast(err);
    });
  }

  ActionSheet() {
    if (this.isLogin == true) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Upload Image',
        buttons: [
          {
            text: 'Camera',
            handler: () => {
              console.log('Camera clicked');
              this.getImageCamera();
            }
          },
          {
            text: 'Gallery',
            handler: () => {
              console.log('Gallary clicked');
              this.getImageGallary();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });

      actionSheet.present();
    } else {
      let alert = this.alertCtrl.create({
        message: 'Login',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.localData.LoginState('', '');
              this.navCtrl.push('LoginPage');
            }
          }
        ]
      });
      alert.present();
    }
  }

  uploadFile(url) {
    if (this.isLogin == true) {
      if (!url) {
        return;
      }
      const fileTransfer: FileTransferObject = this.transfer.create();

      let imgpath = url.toString();
      let imageName = imgpath.substring(imgpath.lastIndexOf('/') + 1);

      let options: FileUploadOptions = {
        fileKey: 'user_image',
        fileName: imageName,
        chunkedMode: false,
        mimeType: "image/jpeg",
        params: { 'id': this.userdata.id },
        headers: {}
      }

      fileTransfer.upload(imgpath, environment.baseURL + '/score/custom/save-image-email', options)
        .then((data) => {
          this.resData = data.response;
          this.resData = JSON.parse(this.resData);
          this.userdata.user_image = this.resData.webuser.user_image;
          this.localData.StoreData(this.resData.webuser);
          this.storage.set("userData", JSON.stringify(this.resData.webuser));
          this.localData.setlocaldata(this.resData.webuser);
          this.storage.set('FullData', this.resData);
          this.userdata = this.resData.webuser;
          this.cmnfun.showToast("Image uploaded successfully");
        }, (err) => {
          console.log(err);
          // this.cmnfun.showToast(err);
        });
    } else {
      this.localData.LocalUserData('user_image', url);
      this.userdata = this.localData.getlocalprofile();
      this.cmnfun.HideLoading();
    }





  }

}
