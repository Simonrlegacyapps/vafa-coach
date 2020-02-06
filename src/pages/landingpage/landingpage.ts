import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController, NavParams, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { HomePage } from '../../pages/home/home';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { ProductListProvider } from '../../providers/product-list/product-list';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { AlertController } from 'ionic-angular';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';

const proId0 = '2018_premium_william_buck_premier_womens_caulfield_grammarians';
const proId1 = '2018_premium_william_buck_womens_fitzroy_acu';
const proId2 = '2018_premium_william_buck_premier_womens_kew_fc';
const proId3 = '2018_premium_william_buck_premier_womens_marcellin';
const proId4 = '2018_premium_william_buck_premier_womens_melbourne_uni';
const proId5 = '2018_premium_william_buck_premier_womens_old_trinity';
const proId6 = '2018_premium_william_buck_premier_womens_old_xaverians';
const proId7 = '2018_premium_william_buck_premier_womens_skob_saints';
const PremiumPlus = '2018_premium_william_buck_premier_womens_all_teams';
const proId8 = '2019_team_pass_fitzroy_acu_william_buck_premier_womens';
const proId9 = '2019_team_pass_kew_fc_william_buck_premier_womens';
const proId10 = '2019_team_pass_marcellin_william_buck_premier_womens';
const proId11 = '2019_team_pass_melbourne_uni_william_buck_premier_womens';
const proId12 = '2019_team_pass_old_trinity_william_buck_premier_womens';
const proId13 = '2019_team_pass_skob_saints_william_buck_premier_womens';
const proId14 = '2019_team_pass_west_brunswick_william_buck_premier_womens';
const proId15 = '2019_team_pass_st_marys_salesian_william_buck_premier_womens';
const PremiumPlus2019 = '2019_competition_pass_william_buck_premier_womens';
const proId16 = '2019_team_pass_old_brighton_william_buck_premier';
const proId17 = '2019_team_pass_university_blues_william_buck_premier';
const proId18 = '2019_team_pass_old_melburnians_william_buck_premier';
const proId19 = '2019_team_pass_old_xaverians_william_buck_premier';
const proId20 = '2019_team_pass_st_bernards_william_buck_premier';
const proId21 = '2019_team_pass_old_trinity_grammarians_william_buck_premier';
const proId22 = '2019_team_pass_st_kevins_william_buck_premier';
const proId23 = '2019_team_pass_collegians_william_buck_premier';
const proId24 = '2019_team_pass_old_carey_william_buck_premier';
const proId25 = '2019_team_pass_de_la_salle_william_buck_premier';
const WilliamBuckPremier2019 = '2019_competition_pass_william_buck_premier';
const GamePass = 'game_pass';
const VafaPass = 'vafa_pass';


// const proId1 = 'vafa_premium0001';
// const proId2 = 'vafa_premium_plus0002';

const PPLink = 'https://www.completesportsmanagement.com.au/privacy';
const TermsLink = 'http://vafalive.com.au/termsconds';

@IonicPage()
@Component({
  selector: 'page-landingpage',
  templateUrl: 'landingpage.html',
})
export class LandingpagePage {
  path:any = environment.baseURL;
  ProductSet: number;

  HideTeam: boolean = true;
  HideComp: boolean = false;
  showOption : boolean  = false;

  PurchaseComp: boolean = false;
  PurchaseTeam : boolean = false;

  Matchyear: any = '2019';

  ProData: any = [];
  isLogin: boolean = false;
  tempdata: any = [];
  higherproductid: any = '';

  User: any = {
    device_id: '',
    fixture_id: '',
    competition_id: '',
    team_id: '',
    product_id: '',
    transaction_id: ''
  }

  lowerproduct: any = '';
  lowerproductid: any = '';
  higherproduct: any = '';
  higherpurchasedate: any = '';
  userData: any;
  c_productid: any = '';
  c_product: any = '';
  c_purchasedate: any = '';

  resData: any;
  responseData: any;
  Dataresponse: any;
  paymentname: any = 'vafa_premium_plus';

  UserTeamData: any = {
    compyear : '',
    selectedcompetition: '',
    selectedteam: '',
    yearcheck: ''
  }

  above18:boolean = false;
  under18:boolean = false;

  ProductDetails: any = [];
  competitionlist: any = [];
  teamlist: any = [];
  selectedteam: any = '';
  selectedcompetition: any = '';
  list: any = '';
  type: any = '';
  yearcheck: any = '';
  deviceId: any;
  UserDeviceData: any = [];
  pamentshow: boolean = false; MyFavTeam: any;
  LocalUserDevice: any = [];

  MyProducts : any = [];
  rData: any;
  paidUser : number = 0;
  hideTeamPass : boolean = false;

  LoginUser : any = '';
  constructor(private storage: Storage,
    private plt: Platform,
    private iap: InAppPurchase,
    public events: Events,
    private alertCtrl: AlertController,
    private ga: FirebaseAnalyticsProvider,
    private uniqueDeviceID: UniqueDeviceID,
    public processproduct: ProductListProvider,
    public inapp: InAppBrowser,
    public localData: LocalDataProvider,
    private streamingMedia: StreamingMedia,
    public cmnfun: CommomfunctionProvider,
    public ajax: AjaxProvider, public navCtrl: NavController, public viewCtrl: ViewController, private modalCtrl: ModalController, public navParams: NavParams) {
    // get device id
    this.deviceId = this.localData.GetDevice();
    console.log(this.deviceId);
    // get age check
    let uage = this.localData.getlocalprofile();
    this.yearcheck = uage.user_age;

    // showpass parameter


    // hide premium for upgrade options from match center.
    if(this.localData.Getupgrade() != '' && this.localData.Getupgrade() != undefined){
      let cid = this.localData.Getupgrade();
      this.processproduct.setplusproduct(cid);
      this.hideTeamPass = true;
      this.pamentshow = true;
    }

    // check products list purchased from localstorage.
    this.storage.get('UserDeviceData').then((data) => {
      if (data) {
        let paid = data.payment;
        if(paid.length > 0){
          paid.forEach(element => {
            let productitem = this.processproduct.GetProductType(element.product_id);
            this.MyProducts.push(productitem);
          });
        }
      }
      console.log(this.MyProducts);
    });


    if(this.localData.getYear() != undefined) {
      this.Matchyear = this.localData.getYear();
      // this.localData.StoreYear(undefined);
    }

    //
    this.storage.get('userData').then((val) => {
      if (val) {
        this.isLogin = true;
        let user_check = JSON.parse(val);
            console.log(user_check)
        this.LoginUser = user_check.id;
      }
    });
    //

    this.LocalUserDevice = this.localData.GetUserDeviceData();
    if (this.LocalUserDevice) {
      // get user team and competition
      // details from server
      this.UserDeviceData = this.LocalUserDevice.devicedata;
      // details from server
      if (this.LocalUserDevice.devicedata.payment_status == 1) {
        let product = this.processproduct.GetProductType(this.LocalUserDevice.devicedata.product);
        console.log(product)
        this.paymentname = product;
      }
      //
      this.User.device_id = this.deviceId;
      console.log(this.LocalUserDevice)
    //  check team and competitions for old users with year
    if((this.paymentname == 'Premium' || this.paymentname == 'Premium Plus') && this.Matchyear == '2018'){
      if (this.LocalUserDevice.webuserteam !== null || this.LocalUserDevice.webuserteam == false) {
        this.selectedteam = this.LocalUserDevice.webuserteam;
      }
      if (this.LocalUserDevice.webusercompetition !== null) {
        this.selectedcompetition = this.LocalUserDevice.webusercompetition;
      }
      if (this.selectedcompetition != '' && this.selectedteam != '' && this.localData.Getupgrade() == '') {
        // get product_id
        this.processproduct.SetUserProduct(this.selectedteam, this.selectedcompetition,this.Matchyear);
        this.processproduct.setplusproduct(this.selectedcompetition.competition_id);
      } else {
        // show from local storage
        this.storage.get('UserTeamData').then((val) => {
          if (val) {
            console.log(val);
            // this.selectedteam = val.selectedteam;
            // this.selectedcompetition = val.selectedcompetition;
            // this.yearcheck = val.yearcheck;
            // this.processproduct.SetUserProduct(this.selectedteam, this.selectedcompetition,this.Matchyear);
          }
        });
      }
    }
    }
    //
    //

    this.plt.ready().then(() => {
    this.iap.getProducts([proId0, proId1, proId2, proId3, proId4, proId5, proId6, proId7, PremiumPlus ,
      proId8, proId9, proId10, proId11, proId12, proId13, proId14, proId15, proId16, proId17, proId18, proId19, proId20, proId21, proId22,
      proId23, proId24, proId25, PremiumPlus2019, WilliamBuckPremier2019, GamePass, VafaPass])
        .then((products) => {
        })
        .catch((err) => {
          console.log(err);
        });
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackTiming('Onboarding', 1000, 'Duration', 'Time');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    })
    // 1st time load data from local stored in account
    let dv_id = this.localData.GetDevice();
    this.ajax.GetAllPurchases({device_id : dv_id }).subscribe((res)=>{
      this.rData = res;
     if(this.rData.code == 2){
      console.log(this.rData.payment.length);
      this.paidUser = this.rData.payment.length;
      if(this.selectedteam !='' && this.selectedcompetition !='' && this.yearcheck!='' && this.paidUser == 0){
        // this.pamentshow = true;
      }
     }
    })
  }


  // team selection for payment
  TeamSelect(val){
    this.selectedcompetition = '';
    this.selectedteam = '';
    if(val == 19){
      this.ProductSet = 19;
    }else{
      this.ProductSet = 18;
    }
    this.showOption = true;
    this.HideTeam = false;
    this.PurchaseTeam = true;
  }

  CompSelect(val){
    this.selectedcompetition = '';
    if(val == 19){
      this.ProductSet = 19;
    }else{
      this.ProductSet = 18;
    }
    this.showOption = true;
    this.PurchaseComp = true;
  }

  ionViewWillLeave(){
    this.localData.Upgrade('');
  }

  ionViewDidLoad() {
    if(this.navCtrl.getPrevious().name != undefined && this.navCtrl.getPrevious().name == 'InnermatchcenterPage' || this.navCtrl.getPrevious().name == 'LoginPage' || this.navCtrl.getPrevious().name == 'SignUpPage' || this.navCtrl.getPrevious().name == 'RegisteredpassPage' &&   this.navParams.get('showPass') == true || this.localData.LoginTo()=='LandingpagePage'){
      this.pamentshow = true;
    }
    // get all competition and teams
    // this.ajax.GetMatchComp('get-all-competitions-by-year-v1', {year : this.Matchyear}).subscribe((res) => {
    //   this.competitionlist = res;
    //   console.log(this.competitionlist);
    // })

    this.ajax.postMethodct('get-all-competitions-v2').subscribe((res) => {
      console.log(res);
      this.competitionlist = res;
      console.log(this.competitionlist);
    })

    // this.ajax.GetMatchTeam({year : this.Matchyear, competition_id : ''}).subscribe((res) => {
    //   this.teamlist = res;
    //   console.log(this.teamlist);
    // })


    // load stored team and competition
    this.storage.get('UserTeamData').then((val) => {
      if (val) {
        console.log(val)
        console.log(this.Matchyear);
        console.log(this.localData.Getupgrade())
         if(val.compyear == this.Matchyear){
          if (val.selectedcompetition != '' && val.selectedteam != '' && (this.localData.Getupgrade() == '' || this.localData.Getupgrade() == undefined)) {
            this.selectedteam = val.selectedteam;
            this.selectedcompetition = val.selectedcompetition;
            this.yearcheck = val.yearcheck;
            // this.processproduct.SetUserProduct(this.selectedteam, this.selectedcompetition, this.Matchyear);
            // this.processproduct.setplusproduct(this.selectedcompetition.competition_id);
            if(this.localData.LoginTo() == 'LandingpagePage' && this.localData.getLoginparam() == 'all set'){
                this.pamentshow = true;
                this.localData.LoginState('', '');
            }
          }else if(val.selectedcompetition != ''){
            this.selectedcompetition = val.selectedcompetition;
          }
         }
      }
    });
  }


  DemoVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Finished Video') },
      errorCallback: (e) => { console.log('Error: ', e) },
      orientation: 'portrait'
    };
    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4', options);
  }

   // age edit
   editage(age) {
     console.log(age);
     if(age == '18 or above') this.above18 = true;
     else this.under18 = true;
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
        console.log(data);
        this.yearcheck = data;
        if (data == '18 or above') {
          this.UserTeamData.yearcheck = '18 or above';
          this.localData.LocalUserData('user_age', '18 or above');
        } else {
          this.UserTeamData.yearcheck = 'Under 18';
          this.localData.LocalUserData('user_age', 'Under 18');
        }
      }
    });
    alert.present();

  }



  yearset(item) {
    this.ga.trackView('Onboarding – Age Selection');
    this.yearcheck = item;
    if (item == '18 or above') {
      this.UserTeamData.yearcheck = '18 or above';
      this.localData.LocalUserData('user_age', '18 or above');
      this.events.publish('menuchange2:changed', 'HomePage');
      this.navCtrl.setRoot(HomePage);
    } else {
      this.UserTeamData.yearcheck = 'Under 18';
      this.localData.LocalUserData('user_age', 'Under 18');
      this.events.publish('menuchange2:changed', 'HomePage');
      this.navCtrl.setRoot(HomePage);
    }
  }

  gotopage() {
    let modal = this.modalCtrl.create('CompetitionTeamPage', { list: this.list, type: this.type });
    let me = this;
    modal.onDidDismiss(data => {
      if (data) {
        if (data.type == 'competitions') {
          this.ga.trackView('Onboarding – Competition Selection');
          this.ga.trackEvent('Onboarding – Competition Selection', 'Selected', 'Onboarding – Competition Selection', 1);
          this.deviceId = this.localData.GetDevice();
          // this.cmnfun.showLoading('Please wait...');
          this.selectedcompetition = data.value;
          console.log(this.selectedcompetition);
          this.ajax.GetMatchTeam({year : this.Matchyear, competition_id : this.selectedcompetition.competition_id}).subscribe((res) => {
            this.teamlist = res;
            console.log(this.teamlist);
            this.localData.StoreTeamlist(this.teamlist.teams);
            this.selectedteam = '';
          })
          this.processproduct.setplusproduct(this.selectedcompetition.competition_id);
          if (this.isLogin == true && this.showOption == false) {
            let update = {
              id:  this.LoginUser,
              field: 'favourite_competition_id',
              data: this.selectedcompetition.competition_id
            }
            this.cmnfun.Loading('Updating..');
            this.ajax.EditUserData(update).subscribe((res) => {
              this.cmnfun.HideLoading();
              console.log(res);
              this.Dataresponse = res;
              this.localData.StoreData(this.Dataresponse.webuser);
              // this.localData.StoreUserFav(this.Dataresponse);
              // this.storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
              // this.storage.set('FullData', this.Dataresponse);
            });
          }else{
            this.UserTeamData.selectedcompetition = this.selectedcompetition;
            this.storage.set('UserTeamData', this.UserTeamData);
          }
          // if(this.showOption == true && this.PurchaseComp && this.ProductSet == 19){
          //   if(this.selectedcompetition != '') this.paymentBuy(4);
          // }else if(this.showOption == true && this.PurchaseComp && this.ProductSet == 18){
          //   if(this.selectedcompetition != '') this.paymentBuy(2);
          // }
        }
        else {
          this.ga.trackView('Onboarding – Team Selection');
          this.ga.trackEvent('Onboarding – Team Selection', 'Selected', 'Onboarding – Team Selection', 1);
          this.deviceId = this.localData.GetDevice();
          this.selectedteam = data.value;
          this.processproduct.SetUserProduct(this.selectedteam, this.selectedcompetition,  this.Matchyear);
          this.processproduct.setplusproduct(this.selectedcompetition.competition_id);
          if (this.isLogin == true && this.showOption == false) {
            let update = {
              id:  this.LoginUser,
              field: 'favourite_team_id',
              data: this.selectedteam.team_id
            }
            this.cmnfun.Loading('Updating..');
            this.ajax.EditUserData(update).subscribe((res) => {
              this.cmnfun.HideLoading();
              console.log(res);
              this.Dataresponse = res;
              this.localData.StoreData(this.Dataresponse.webuser);
              this.localData.StoreUserFav(this.Dataresponse);
              // this.storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
              // this.storage.set('FullData', this.Dataresponse);
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          }else{
            this.UserTeamData.selectedteam = this.selectedteam;
            this.storage.set('UserTeamData', this.UserTeamData);
          }
          if(this.showOption == true && this.PurchaseTeam && this.ProductSet == 19){
            if(this.selectedcompetition != '') {
            // this.paymentBuy(3);
            }
          }else if(this.showOption == true && this.PurchaseTeam && this.ProductSet == 18){
            // if(this.selectedcompetition != '')  this.paymentBuy(1);
          }
        }
      }
    });
    modal.present();
  }
  gotocheckcompetitionteam(item) {
    if (item == 'competitions') {
      this.ga.trackEvent('Onboarding – Competition Selection', 'Selected', 'Onboarding – Competition Selection', 1);
      this.list = this.competitionlist.competition;
      this.type = 'competitions';
      this.gotopage();
    }
    else {
      if (this.selectedcompetition != '') {
        this.list = this.teamlist.teams;
        if(this.list == undefined) {
          this.list = this.localData.GetTeamlist();
        }
        this.type = 'teams'
        this.gotopage();
      }
      else {
        alert("please choose competition")
      }
    }
  }


  gotohome() {
      this.localData.StoreYear(undefined);
    // if (this.selectedcompetition == '' && this.selectedteam == '') {
    //   this.ga.trackEvent("Onboarding – Competition Selection Skip", "Skip", "Onboarding - Competition Selection", 1);
    // } else if (this.selectedcompetition != '' && this.selectedteam == '') {
    //   this.ga.trackEvent("Onboarding – Team Selection Skip", "Skip", "Onboarding - Team Selection", 1);
    // } else if (this.selectedteam != '' && this.selectedcompetition != '' && this.yearcheck == '') {
    //   this.ga.trackEvent("Onboarding – Age Selection Skip", "Skip", "Onboarding – Age Selection", 1);
    // } else if (this.pamentshow == true) {
    //   this.ga.trackEvent("Premium Pass Skip", "Skip", "Premium Pass", 1);
    // }
    // if (this.selectedcompetition != '' && this.selectedteam != '') {
    //   this.UserTeamData.selectedcompetition = this.selectedcompetition;
    //   this.UserTeamData.selectedteam = this.selectedteam;
    //   this.UserTeamData.yearcheck = this.yearcheck;
    //   this.UserTeamData.compyear = this.Matchyear;
    //   this.storage.set('UserTeamData', this.UserTeamData);
    // }
    // this.ga.trackEvent("Upgrade", "Skipped", "Onboarding", 1);
    // this.ga.trackEvent("Onboarding – No Thanks", "Selected", "Onboarding", 1);
    // this.localData.SetBack('','','','');
    this.events.publish('menuchange2:changed', 'HomePage');
    this.navCtrl.setRoot(HomePage);
  }


  Terms() {
    this.ga.trackView('Onboarding – Terms and Conditions');
    this.navCtrl.push('CustomBrowserPage');
  }

  privacy() {
    this.ga.trackView(' Onboarding – Privacy Policy');
    this.navCtrl.push('CustomPrivacyPage');
  }


  gotopament() {
    if (this.isLogin == true) {
      this.ga.trackView('Onboarding – Age Selection');
      this.ga.trackView('Premium Pass - Purchase');
      this.ga.trackEvent("Onboarding – Buy a Premium Pass", "Selected", "Onboarding", 1);
      this.UserTeamData.selectedcompetition = this.selectedcompetition;
      this.UserTeamData.selectedteam = this.selectedteam;
      this.UserTeamData.yearcheck = this.yearcheck;
      this.UserTeamData.compyear = this.Matchyear;
      console.log(this.UserTeamData)
      this.storage.set('UserTeamData', this.UserTeamData);
      this.pamentshow = true;
    } else {
      this.UserTeamData.selectedcompetition = this.selectedcompetition;
      this.UserTeamData.selectedteam = this.selectedteam;
      this.UserTeamData.yearcheck = this.yearcheck;
      this.UserTeamData.compyear = this.Matchyear;
      console.log(this.UserTeamData)
      this.storage.set('UserTeamData', this.UserTeamData);
      this.localData.LoginState('LandingpagePage', 'all set');
      this.navCtrl.push('LoginPage', { iap: 'true' });
    }
  }



  paymentBuy(val) {
    let product_id;
    let paidstatus = 1;
    if (val == 1) {
      this.ga.trackEvent("Premium Pass", "Selected", "PREMIUM", 1);
      product_id = this.processproduct.GetUserProduct();
    } else if (val == 2) {
      this.ga.trackEvent("Premium Pass", "Selected", "PREMIUM PLUS", 1);
      // product_id = PremiumPlus;
      product_id = this.processproduct.getplusproduct();
    } else if (val == 3) {
      // 2019 premium pass
      this.ga.trackEvent("Team Pass", "Selected", "2019", 1);
      product_id = this.processproduct.GetUserProduct();
    } else if (val == 4) {
      this.ga.trackEvent("Competition Pass", "Selected", "2019", 1);
      product_id = this.processproduct.getplusproduct();
      // product_id = PremiumPlus2019;
    } else if (val == 5) {
      this.ga.trackEvent("VAFA Pass", "Selected", "2019", 1);
      product_id = VafaPass;
    }
    this.User.product_id = product_id;
    console.log(this.User)
    this.cmnfun.Loading('Please wait processing payment.');
    this.iap.restorePurchases().then(purchases => {
      if (purchases != []) {
        purchases.forEach(element => {
          // check whether user selected product is purchased previously or not.
          if (element.productId == proId0 && this.User.product_id == proId0) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id: this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == proId1 && this.User.product_id == proId1) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == proId2 && this.User.product_id == proId2) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == proId3 && this.User.product_id == proId3) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == proId4 && this.User.product_id == proId4) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == proId5 && this.User.product_id == proId5) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == proId6 && this.User.product_id == proId6) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == proId7 && this.User.product_id == proId7) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == PremiumPlus && this.User.product_id == PremiumPlus) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
          }  // add 2019 products here to check
           else if (element.productId == proId8 && this.User.product_id == proId8){
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
           } else if (element.productId == proId9 && this.User.product_id == proId9){
             paidstatus = 0;
             this.processproduct.RestoreTeam(element.productId);
             this.User.transaction_id = element.transactionId;
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: this.User.product_id,
              fixture_id: 0,
              transaction_id: this.User.transaction_id
            }
            this.ProData.push(PurchaseD);
           } else if (element.productId == proId10 && this.User.product_id == proId10) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             fixture_id: 0,
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == proId11 && this.User.product_id == proId11){
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             fixture_id: 0,
             transaction_id: this.User.transaction_id
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == proId12 && this.User.product_id == proId12) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             fixture_id: 0,
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == proId13 && this.User.product_id == proId13) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             fixture_id: 0,
             transaction_id: this.User.transaction_id
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == proId14 && this.User.product_id == proId14) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             fixture_id: 0,
             transaction_id: this.User.transaction_id
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == proId15 && this.User.product_id == proId15) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             fixture_id: 0,
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == PremiumPlus2019 && this.User.product_id == PremiumPlus2019) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             fixture_id: 0,
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == VafaPass && this.User.product_id == VafaPass) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }  else if (element.productId == proId16 && this.User.product_id == proId16) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == proId17 && this.User.product_id == proId17) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == proId18 && this.User.product_id == proId18) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           } else if (element.productId == proId19 && this.User.product_id == proId19) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }
          //  test products
          else if (element.productId == proId20 && this.User.product_id == proId20) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }  else if (element.productId == proId21 && this.User.product_id == proId21) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }  else if (element.productId == proId22 && this.User.product_id == proId22) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }  else if (element.productId == proId23 && this.User.product_id == proId23) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }  else if (element.productId == proId24 && this.User.product_id == proId24) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }  else if (element.productId == proId25 && this.User.product_id == proId25) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }  else if (element.productId == WilliamBuckPremier2019 && this.User.product_id == WilliamBuckPremier2019) {
            paidstatus = 0;
            this.processproduct.RestoreTeam(element.productId);
            this.User.transaction_id = element.transactionId;
           let PurchaseD = {
             device_id: this.User.device_id,
             competition_id: this.processproduct.GetCompetitionid(),
             team_id:this.processproduct.GetTeamid(),
             product_id: this.User.product_id,
             transaction_id: this.User.transaction_id,
             fixture_id: 0
           }
           this.ProData.push(PurchaseD);
           }
        });
        if (paidstatus == 1) {
          this.Buy();
        } else {
          this.AlreadyPurchased();
        }
      } else {
          this.Buy();
      }
    })
      .catch((err) => {
        this.cmnfun.HideLoading();
        this.cmnfun.showToast(err.errorMessage);
      });
  }


  //  In-App Purchase functionalities //
  Restore() {
    console.log(this.User);
    let product1 = 0;
    let product2 = 0;
    let product3 = 0;
    let product4 = 0;
    let product5 = 0;
    this.cmnfun.Loading('Please wait processing payment.');
    this.iap.restorePurchases().then(purchases => {
      if (purchases != []) {
        // this.processproduct.IapRestorePurchase(purchases); // store purchase history
        purchases.forEach(element => {
          if (element.productId == proId0 || element.productId == proId1 || element.productId == proId2 || element.productId == proId3 || element.productId == proId4 || element.productId == proId5 || element.productId == proId6 || element.productId == proId7) {
            product1 = 1;
            this.processproduct.RestoreTeam(element.productId);
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: element.productId,
              fixture_id: 0,
              transaction_id: element.transactionId
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == PremiumPlus) {
            product2 = 1;
            this.processproduct.RestoreTeam(element.productId);
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: element.productId,
              fixture_id: 0,
              transaction_id: element.transactionId
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == proId8 || element.productId == proId9 || element.productId == proId10 || element.productId == proId11 || element.productId == proId12 || element.productId == proId13 || element.productId == proId14 || element.productId == proId15|| element.productId == proId16 || element.productId == proId17 || element.productId == proId18 || element.productId == proId19 || element.productId == proId20 || element.productId == proId21 || element.productId == proId22 || element.productId == proId23 || element.productId == proId24 || element.productId == proId25){
            product3 = 1;
            this.processproduct.RestoreTeam(element.productId);
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: element.productId,
              fixture_id: 0,
              transaction_id: element.transactionId
            }
            this.ProData.push(PurchaseD);
          } else if(element.productId == WilliamBuckPremier2019 || element.productId == PremiumPlus2019) {
            product4 = 1;
            this.processproduct.RestoreTeam(element.productId);
            let PurchaseD = {
              device_id: this.User.device_id,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              fixture_id: 0,
              product_id: element.productId,
              transaction_id: element.transactionId
            }
            this.ProData.push(PurchaseD);
          } else if (element.productId == VafaPass){
            product5 = 1;
            this.processproduct.RestoreTeam(element.productId);
            let PurchaseD = {
              device_id: this.User.device_id,
              fixture_id: 0,
              competition_id: this.processproduct.GetCompetitionid(),
              team_id:this.processproduct.GetTeamid(),
              product_id: element.productId,
              transaction_id: element.transactionId
            }
            this.ProData.push(PurchaseD);
          }
        });
        if (product1 == 0 && product2 == 0 && product3 == 0 && product4 == 0 && product5 == 0) {
          this.cmnfun.HideLoading();
          this.cmnfun.showToast('Premium pass not purchased,cannot be restored');
        } else {
          this.AlreadyPurchased();
        }
      } else {
        this.cmnfun.HideLoading();
        this.cmnfun.showToast('Premium pass cannot be restored');
      }

    })
      .catch((err) => {
        this.cmnfun.HideLoading();
        this.cmnfun.showToast(err.errorMessage);
      });
  }

  AlreadyPurchased() {
    this.User.competition_id = this.processproduct.GetCompetitionid();
    this.User.team_id = this.processproduct.GetTeamid();
    console.log(this.ProData);
    console.log(this.User)
    this.ajax.PaymentpostApi(this.ProData).subscribe((res) => {
      this.cmnfun.HideLoading();
      console.log(res);
      this.resData = res;
      this.localData.StoreUserDeviceData(this.resData);
      this.storage.set("UserDeviceData", this.resData);
      this.localData.StoreUserFav(this.resData);
      this.processproduct.InsertPurchase(this.resData);
      this.events.publish('changebanner:changed', true);
      this.events.publish('menuchange2:changed', 'HomePage');
      this.ga.trackEvent("Payment", "Done", "Payment", 1);
      if (this.isLogin == true) {
        if(this.localData.getBckpage() != ''){
          let det = this.localData.getBckdata().details;
          let yr = this.localData.getBckdata().year;
          let pr = this.localData.getBckdata().parent;
          this.localData.SetBack('','','','');
          this.navCtrl.push('InnermatchcenterPage', { details: det, year :yr,stats : true});
        }else{
          this.navCtrl.setRoot(HomePage);
        }
      } else {
        this.localData.LoginState('', '');
        this.navCtrl.push('LoginPage', { iap: 'true1' });
      }
    }, error => {
      this.cmnfun.HideLoading();
      this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }

  Buy() {
    this.User.competition_id = this.processproduct.GetCompetitionid();
    this.User.team_id = this.processproduct.GetTeamid();
    console.log(this.User);
    this.iap
      .buy(this.User.product_id)
      .then((data) => {
        if (data) {
          let PurchaseD = {
            device_id: this.User.device_id,
            competition_id: this.User.competition_id,
            team_id: this.User.team_id,
            fixture_id: 0,
            product_id: this.User.product_id,
            transaction_id:  data.transactionId
          }
          this.ProData.push(PurchaseD);
          this.ajax.PaymentpostApi(this.ProData).subscribe((res) => {
            this.cmnfun.HideLoading();
            console.log(res);
            this.resData = res;
            this.localData.StoreUserDeviceData(this.resData);
            this.storage.set("UserDeviceData", this.resData);
            this.localData.StoreUserFav(this.resData);
            this.processproduct.InsertPurchase(this.resData);
            this.events.publish('changebanner:changed', true);
            this.events.publish('menuchange2:changed', 'HomePage');
            this.ga.trackEvent("Payment", "Done", "Payment", 1);
            if (this.isLogin == true) {
              if(this.localData.getBckpage() != ''){
                let det = this.localData.getBckdata().details;
                let yr = this.localData.getBckdata().year;
                let pr = this.localData.getBckdata().parent;
                this.localData.SetBack('','','','');
                this.navCtrl.push('InnermatchcenterPage', { details: det, year :yr ,stats : true});
              }else{
                this.navCtrl.setRoot(HomePage);
              }
            } else {
              this.localData.LoginState('', '');
              this.navCtrl.push('LoginPage', { iap: 'true1' });
            }
          }, error => {
            this.cmnfun.HideLoading();
            this.cmnfun.showToast('Some thing Unexpected happen please try again');
          })
        }
      })
      .catch((err) => {
        this.cmnfun.HideLoading();
        console.log(err);
        this.cmnfun.showToast(err.errorMessage);
      });
  }




}



