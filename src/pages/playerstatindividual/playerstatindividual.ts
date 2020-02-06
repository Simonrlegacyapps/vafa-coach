import { Component,ViewChild,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Content } from 'ionic-angular';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';

/**
 * Generated class for the PlayerstatindividualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playerstatindividual',
  templateUrl: 'playerstatindividual.html',
})
export class PlayerstatindividualPage {
  @ViewChild(Content) content: Content;

  // path: any = 'http://vafalive.com.au';
  path1: any = environment.baseURL;
  // path1: any = 'http://52.89.30.220';
  path: any = environment.amazonaws;
  Coach: boolean = true;
  player_id:any='';
  fixture_id: any = '';
  resData:any='';
  updateInterval : any ;
  showhide: any;
  lastName1:any='';
  playerStatDetailsData:any=[];
  playerDetail:any=[];
  firstName:any='';
  lastName:any='';
  playerstats:any=[];
  playerstatsData=[];
  advertisementHeader:any=[];
  advertisementFooter:any=[];
  hideHeader:boolean=false;

  Parent:any;

  selectedOption: any =['all'];

  constructor(public navCtrl: NavController,
    public ajax: AjaxProvider,
    public events: Events,
    public zone:NgZone,
    private inapp: InAppBrowser,
    public plt:Platform,
    public ga:FirebaseAnalyticsProvider,
    public cmfn: CommomfunctionProvider,
     public navParams: NavParams) {
    this.player_id= navParams.get('player_id');
    this.fixture_id = navParams.get('fixture_id')
    this.Coach= navParams.get('CoachValue');
    this.Parent = navParams.get('Parent');

    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
    //  this.ga.trackEvent('Advertisement', 'Viewed', 'PlayerStatDetails Page', 1);
     this.ga.trackTiming('Player Stats Individual', 1000, 'Duration', 'Time');
        this.ga.trackView('Player Stats Individual');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidLoad() {
    this.cmfn.HideLoading();
    this.showhide=0;
  console.log('ionViewDidLoad PlayerstatdetailsPage');
//getStatDetailsByPlayerId
     this.cmfn.showLoading('Please Wait..');
     this.ajax.datalist('get-fixture-player-stats-detail', {
       accessKey: "QzEnDyPAHT12asHb4On6HH2016",
       quaters: this.selectedOption,
       fixture_id: this.fixture_id,
       player_id: this.player_id
     }).subscribe((res) => {
       this.cmfn.HideLoading();
       console.log(res);
       this.resData = res;
       if (this.resData.code == 2 || this.resData.code == 3) {
         return false;
       } else {
         this.GetStatDetailsByPlayerId(this.resData);
         this.getUpdates();
       }

     }, error => {
       this.cmfn.HideLoading();
      //  this.cmnfun.showToast('Some thing Unexpected happen please try again');
     })
  }

  ionViewDidLeave(){
    clearInterval(this.updateInterval);
  }


   // path reset function
   cutPath(url){
    if(url)
    return url.substring(12);
  }


  onScroll()
  {
    var moveData =this.content.scrollTop;
    if(moveData >= 80)
    {
      this.zone.run(() => {
        this.hideHeader=true;
      });
    }
    else
      {
        this.zone.run(() => {
          this.hideHeader=false;
        });
      }
    }

    //interval function
    getUpdates(){
      this.updateInterval = setInterval(() => {
      this.ajax.datalist('get-fixture-player-stats-detail', {
        accessKey: "QzEnDyPAHT12asHb4On6HH2016",
        quaters: this.selectedOption,
        fixture_id: this.fixture_id,
        player_id: this.player_id
      }).subscribe((res) => {
        this.cmfn.HideLoading();
        console.log(res);
        this.resData = res;
        if (this.resData.code == 2 || this.resData.code == 3) {
          return false;
        } else {
          this.GetStatDetailsByPlayerId(this.resData);
        }

      }, error => {
      })
    },10000);
    }


  GetStatDetailsByPlayerId(data){
    this.playerStatDetailsData = [];
    this.playerDetail = [];
    this.playerstats = [];
    this.playerstatsData = [];
    // console.log(data.player.player);
		this.playerDetail=data.player.player;
		// console.log(this.playerDetail.player_name);
    var playerFullName = this.playerDetail.player_name.split('  ');
		this.firstName = playerFullName[0];
    this.lastName = playerFullName[1];
    // console.log(this.firstName);
    // console.log(this.lastName);
    this.playerstats=data.player.playerstat;
    this.playerstatsData=data.player.playerstat;
    // console.log(this.playerstatsData);
    // .forEach(item => {
    //   this.playerStatDetailsData.push(item);
    // });
   this.playerstatsData.forEach((item,key) => {
      this.playerStatDetailsData.push(item);
      // console.log(key);
    });
    console.log(this.playerStatDetailsData)
		//Advertisement::
		this.advertisementHeader=data.headerAdv;
    // console.log(this.advertisementHeader[0].ad_image);
    this.advertisementFooter=data.footerAdv;

  }

  ionViewWillLeave() {
    this.showhide = 1;
    this.Parent.UpdateScores();
  }

  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Player Stats Individual - Season', 1);
    const browser = this.inapp.create(ad_url);
  }

   // sort player stat by quater function
   SelectedSort(val){
    if(val == 'all' && this.selectedOption.indexOf('all') > -1){
      this.selectedOption = [];
      this.selectedOption.push('all');
    }else if(val == 'all' && this.selectedOption.indexOf('all') == -1){
     this.selectedOption = [];
     this.selectedOption.push('all');
    }else if(val != 'all' && this.selectedOption.indexOf('all') > -1){
     this.selectedOption = [];
     this.selectedOption.push(val);
    }else{
     if(this.selectedOption.indexOf(val) == -1){
       this.selectedOption.push(val);
     }else{
       var index = this.selectedOption.indexOf(val);
       this.selectedOption.splice(index, 1);
       if(this.selectedOption.length == 0){
        this.selectedOption.push('all');
       }
     }
   }
  if(this.selectedOption.length > 3){
    this.selectedOption = [];
    this.selectedOption.push('all');
  }
  console.log(this.selectedOption.length);
  this.cmfn.showLoading('Please Wait..');
  this.ajax.datalist('get-fixture-player-stats-detail', {
    accessKey: "QzEnDyPAHT12asHb4On6HH2016",
    quaters: this.selectedOption,
    fixture_id: this.fixture_id,
    player_id: this.player_id
  }).subscribe((res) => {
    this.cmfn.HideLoading();
    console.log(res);
    this.resData = res;
    if (this.resData.code == 2 || this.resData.code == 3) {
      return false;
    } else {
      this.GetStatDetailsByPlayerId(this.resData);
    }

  }, error => {
    this.cmfn.HideLoading();
    this.cmfn.showToast('Some thing Unexpected happen please try again');
  })
}

}
