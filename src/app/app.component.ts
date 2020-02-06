import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { AjaxProvider } from '../providers/ajax/ajax';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
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
import { ProductListProvider } from '../providers/product-list/product-list';
import { CommomfunctionProvider } from '../providers/commomfunction/commomfunction';
import { FirebaseAnalyticsProvider } from '../providers/firebase-analytics/firebase-analytics';
// import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  deviceData: any = {
    deviceid: 'AD91526F-760C-470F-AAAA-41CE65848BEF' //EF //
    // paid-ac-19,18: 'AD91526F-760C-470F-AAAA-41CE65848BEF'
    //unpaid-ac: '437C1EC7-31AB-4676-850B-957E45C92AD56'
    //paid-ac-19:'AD91526F-760C-470F-AAAv-957E45C92AD56'
    //unpaid-ac: 'AD91526F-760C-470F-AAAA-41CE65848BEF1MBP'
    // 13178423-71F9-4784-82AE-AF9F82561DD3
    //EC46AEC1-1CE8-4BF8-B539-F0A85B556CCB
  }

  ApiResponse: any;
  isLoginUser: boolean = false;
  disableBanner: any = 0;
  resData: any;
  Dataresponse: any = [];
  localuser: any;
  rootPage: any;
  disableLogin: any = 0;
  isLogin: any = 0;
  pages: Array<{ title: string, component: any, icon: any, itemseleted: any }>;
  seletedTitle: any = 'News';
  accountselect: any = 'notseleted';
  statselect: any = 'notseleted';
  constructor(public Storage: Storage,
    public events: Events,
    public ajax: AjaxProvider,
    private alertCtrl: AlertController,
    public platform: Platform,
    private uniqueDeviceID: UniqueDeviceID,
    public statusBar: StatusBar,
    private ga: FirebaseAnalyticsProvider,
    public cmnfn: CommomfunctionProvider,
    public prolist: ProductListProvider,
    public localData: LocalDataProvider,
    public splashScreen: SplashScreen) {

    // Device_id checking ajax sample
    // this.ajax.CheckDeviceData(this.deviceData).subscribe((res) => {
    //   console.log(res);
    //   this.resData = res;
    // this.localData.StoreDevice(this.deviceData.deviceid);
    // this.localData.StoreUserDeviceData(this.resData);
    // this.Storage.set("UserDeviceData", this.resData);
    // this.localData.StoreUserFav(this.resData);
    // if (this.resData.devicedata.payment_status == 0 || this.resData.devicedata.payment_status == null) {
    //   this.disableBanner = 0;
    // } else {
    //   this.events.publish('changebanner:changed', true);
    //   this.disableBanner = 1;
    //   this.prolist.RestorePurchase(this.resData.payment);
    //   this.events.publish('menuchange2:changed', 'HomePage');
    // }
    // }, error => { })


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'News', component: HomePage, icon: 'assets/imgs/menuIcon/newsIcon.png', itemseleted: 'seleted' },
      { title: 'Match Centre', component: MatchcenterPage, icon: 'assets/imgs/menuIcon/machCEnterIconNew.png', itemseleted: 'notseleted' },
      { title: 'Fixtures', component: FixturePage, icon: 'assets/imgs/menuIcon/FixturesIcon.png', itemseleted: 'notseleted' },
      { title: 'Post Match', component: PostmatchPage, icon: 'assets/imgs/menuIcon/PostMatchIcon.png', itemseleted: 'notseleted' },
      { title: 'Ladder', component: LadderPage, icon: 'assets/imgs/menuIcon/LadderIcon.png', itemseleted: 'notseleted' },
      { title: 'Match Report', component: MatchreportPage, icon: 'assets/imgs/menuIcon/MatchReportIcon.png', itemseleted: 'notseleted' },
      { title: 'Goal Kickers', component: GoalkickersPage, icon: 'assets/imgs/menuIcon/GoalKickersIcon.png', itemseleted: 'notseleted' },
      { title: 'Player Stats', component: 'PlayerStatPage', icon: 'assets/imgs/menuIcon/PlayerStatsIconWhiteBg.png', itemseleted: 'notseleted' },
      { title: 'Team Stats', component: TeamstatPage, icon: 'assets/imgs/menuIcon/TeamStatsIcon.png', itemseleted: 'notseleted' },
      { title: '1 on 1', component: 'OnetoonePage', icon: 'assets/imgs/menuIcon/1on1Icon.png', itemseleted: 'notseleted' }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.Storage.get('firsttime').then((val) => {
      if (val) {
        this.rootPage = HomePage;
        this.splashScreen.hide();
        this.Storage.get('MydeviceID').then((val) => {
          if (val) {
            console.log(val);
            this.localData.StoreDevice(val);
          } else {
            this.uniqueDeviceID.get()
              .then((uuid: any) => {
                this.localData.StoreDevice(uuid);
                this.Storage.set('MydeviceID', uuid);
              })
          }
        })
        this.Storage.get('userData').then((val) => {
          if (val) {
            this.isLoginUser = true;
            let user_check = JSON.parse(val);
            console.log(user_check)
            this.localData.StoreData(user_check);
          } else {
            this.Storage.get('localdb').then((data) => {
              if (data) {
                this.localData.localDb(data);
              }
            })
          }
        });
        // get deviceData //
        this.Storage.get('UserDeviceData').then((data) => {
          if (data) {
            console.log(data);
            this.localData.StoreUserDeviceData(data);
            this.localData.StoreUserFav(data);
            if (data.devicedata.payment_status == 0 || data.devicedata.payment_status == null) {
              this.disableBanner = 0;
            } else {
              this.events.publish('changebanner:changed', true);
              this.disableBanner = 1;
            }
          } else {
            this.uniqueDeviceID.get()
              .then((uuid: any) => {
                let deviceData: any = {
                  deviceid: uuid
                }
                this.localData.StoreDevice(uuid);
                this.Storage.set('MydeviceID', uuid);
                this.ajax.CheckDeviceData(deviceData).subscribe((res) => {
                  this.resData = res;
                  this.localData.StoreUserDeviceData(this.resData);
                  this.Storage.set("UserDeviceData", this.resData);
                  this.localData.StoreUserFav(this.resData);
                  if (this.resData.devicedata.payment_status == 0 || this.resData.devicedata.payment_status == null) {
                    this.disableBanner = 0;
                  } else {
                    this.events.publish('changebanner:changed', true);
                    this.disableBanner = 1;
                    this.prolist.RestorePurchase(this.resData.payment);
                  }
                }, error => { })
              })
              .catch((error: any) => console.log(error));
          }
        })
      }
      else {
        this.Storage.set('firsttime', '1');
        this.rootPage = 'LandingpagePage';
        // this.cmnfn.Load();
        this.uniqueDeviceID.get()
          .then((uuid: any) => {
            let deviceData: any = {
              deviceid: uuid
            }
            this.localData.StoreDevice(uuid);
            this.Storage.set('MydeviceID', uuid);
            this.ajax.CheckDeviceData(deviceData).subscribe((res) => {
              console.log(res);
              this.resData = res;
              this.localData.StoreUserDeviceData(this.resData);
              this.Storage.set("UserDeviceData", this.resData);
              this.localData.StoreUserFav(this.resData);
              if (this.resData.devicedata.payment_status == 0 || this.resData.devicedata.payment_status == null) {
                this.disableBanner = 0;
                this.nav.setRoot('LandingpagePage');
                this.splashScreen.hide();
              } else {
                this.prolist.RestorePurchase(this.resData.payment);
                this.events.publish('changebanner:changed', true);
                this.disableBanner = 1;
                this.events.publish('menuchange2:changed', 'HomePage');
                this.nav.setRoot(HomePage);
                this.splashScreen.hide();
              }
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
          })
          .catch((error: any) => console.log(error));
      }
    })


    this.events.subscribe('userlogin:changed', res => {
      console.log(res);
      this.disableLogin = res.disableLogin;
      this.isLogin = res.isLogin;

    })
    this.events.subscribe('changebanner:changed', res => {
      console.log(res);
      this.disableBanner = 1;
    })
    this.events.subscribe('menuchange:changed', res => {
      this.openPage(res);
    })
    this.events.subscribe('menuchange2:changed', res => {
      this.HomeSelect();
    })
    this.events.subscribe('userlogin', res => {
      console.log(res)
      if (res == true) {
        this.isLoginUser = true;
        // let localuser = this.localData.getlocalprofile();
        // console.log(localuser)
        // this.ajax.post('custom/update-profile', {
        //   first_name: localuser.first_name,
        //   last_name: localuser.last_name,
        //   age: localuser.user_age,
        //   mobile_number: localuser.mobile_number,
        //   email: localuser.user_email
        // }).subscribe((res) => {
        //   this.cmnfn.UploadImgServer(localuser.user_image);
        //   this.Dataresponse = res;
        //   console.log(res);
        //   if (this.Dataresponse.code == 1 && this.Dataresponse.message == "Details Updates Sucessfully") {
        //     this.localData.StoreData(this.Dataresponse.webuser);
        //     this.localData.setlocaldata(this.Dataresponse.webuser);
        //     // this.localData.StoreUserFav(this.Dataresponse);
        //     this.Storage.set("userData", JSON.stringify(this.Dataresponse.webuser));
        //     this.Storage.set('FullData', this.Dataresponse);
        //   } else {
        //     this.Storage.get('FullData').then((val) => {
        //       if (val) {
        //         this.localData.setlocaldata(val.webuser);
        //       }
        //     })
        //   }
        // });
      } else if (res == 'true1') {
        this.isLoginUser = true;
        // let localuser = this.localData.getlocalprofile();
        // this.cmnfn.UploadImgServer(localuser.user_image);
      } else {
        this.isLoginUser = false;
        // this.disableBanner = 0;
      }

    })
    this.events.subscribe('gotostats:changed', res => {
      this.accessDenied();
    })
    this.platform.ready().then(() => {
      // google analytics track view for splash screen
      this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
          this.ga.trackView('Splash');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#04235C');
      // this.splashScreen.hide();
    });
  }


  LandingPage() {
    this.nav.setRoot('LandingpagePage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(this.seletedTitle);
    if (page.title != this.seletedTitle) {
      this.pages.forEach(eachObj => {
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
  }

  landing() {
    this.pages.forEach(eachObj => {

      eachObj.itemseleted = 'notseleted';
    });
    this.accountselect = 'notseleted';
    this.statselect = 'seleted';
    this.seletedTitle = 'STAT';
    if (this.isLoginUser == false) {
      this.nav.push('LoginPage', { iap: 'true' });
    } else {
      this.nav.setRoot('LandingpagePage');
      // this.nav.setRoot('NewaccountPage');
    }
  }

  accessDenied() {
    this.pages.forEach(eachObj => {

      eachObj.itemseleted = 'notseleted';
    });
    this.statselect = 'notseleted';
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


  }

  HomeSelect() {
    this.pages.forEach(eachObj => {
      if ('News' == eachObj.title) {
        eachObj.itemseleted = 'seleted';
        this.seletedTitle = 'News';
      }
      else {
        eachObj.itemseleted = 'notseleted';
      }
    });
    this.accountselect = 'notseleted';
    this.statselect = 'notseleted';
  }
}
