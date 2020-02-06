import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content,Nav,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';


@IonicPage()
@Component({
  selector: 'page-onetooneresult',
  templateUrl: 'onetooneresult.html',
})
export class OnetooneresultPage {

  // path = 'http://vafalive.com.au';
  path: any = environment.baseURL;

  teamSelection:boolean;

  ftrad:any='';
  team1_id:any='';
  team2_id:any='';
  player1_id:any='';
  player2_id:any='';
  resData:any=[];
  get1on1TeamStats:any=[];
  get1on1TeamStatsTeamOne:any=[];
  get1on1TeamStatsTeamTwo:any=[];
  footerAdv:any=[];
  lastmatch:any='';
  ladder:any='';
  teamstat:any='';
  eff_inside50:any=[];
  eff_inside500:any=[];
  lastmatch2:any='';
  teamstat2:any='';
  ladder2:any='';
  eff_inside50_2:any=[];
  eff_inside50_22:any=[];
  team1Data:any=[];
  team2Data:any=[];
  determinateValue:any='';
  team1DataM:any=[];
  activated:boolean;
  team2DataM:any=[];
  modifiedState:any=[];
  team1RushBehind_Behind:any='';
  team2RushBehind_Behind:any='';
  get1on1PlayerStats:any=[];
  get1on1PlayerStatsTeamOne:any=[];
  get1on1PlayerStatsTeamTwo:any=[];
  playerstat:any=[];
  playerstat2:any;
  player1Data:any=[];
  player2Data:any=[];
  player1DataM:any= [];
  player2DataM:any= [];
  player1RushBehind_Behind:any;
  player2RushBehind_Behind:any;
  modifiedState1:any=[];
  constructor(public navCtrl: NavController,
    public ajax: AjaxProvider,
    public events: Events,
    public nav:Nav,
    public plt:Platform,public ga:FirebaseAnalyticsProvider,
		private modalCtrl: ModalController,
    public cmfn: CommomfunctionProvider,
    public localdata:LocalDataProvider,
    private inapp: InAppBrowser,
		public storage: Storage,
     public navParams: NavParams) {
      this.team1_id = navParams.get('team1_id');
      this.team2_id = navParams.get('team2_id');
      this.player1_id = navParams.get('player1_id');
      this.player2_id = navParams.get('player2_id');
    console.log(this.team1_id);
    console.log(this.team2_id);
    console.log(this.player1_id);
    console.log(this.player2_id);
    this.activated = true;
    this.determinateValue = 30;

    // Get one on one team stat
  if(this.team1_id !='' && this.team1_id !=undefined || this.team2_id !=undefined && this.team2_id!=''){
    this.ajax.datalist('get-one-on-one-team-stats',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016",
    team1_id: this.team1_id,
    team2_id: this.team2_id
   }).subscribe((res) => {
      this.cmfn.HideLoading();
     console.log(res);
      this.resData=res;
      if (this.resData.code == 2) {
        return false;
        } else{
          // this.teamSelection=true;
         this.GetOneOnOneTeamStat(res);
      }
      }, error => {
        this.cmfn.HideLoading();
       console.log(error);
     })
  }

  if(this.player1_id !='' && this.player1_id!=undefined || this.player2_id !='' && this.player2_id !=undefined){
    this.ajax.datalist('get-one-on-one-player-stats',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016",
    player1_id: this.player1_id,
    player2_id: this.player2_id
   }).subscribe((res) => {
      this.cmfn.HideLoading();
     console.log(res);
      this.resData=res;
      if (this.resData.code == 2) {
        return false;
        } else{
          this.teamSelection=false;
         this.GetOneOnOnePlayerStat(res);
      }
      }, error => {
        this.cmfn.HideLoading();
       console.log(error);
     })
  }

    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        // this.ga.trackView('1 on 1 Result Page');
        this.ga.trackEvent('Advertisement', 'Viewed', '1 on 1 – Player Comparison', 1);
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

ionViewDidLoad() {
console.log('ionViewDidLoad OnetooneresultPage');

  }

//for selecting tab
	selectTab(tabNo){
		if(tabNo==1){
      this.localdata.StorePlayerOne('');
      this.localdata.StorePlayerTwo('');
      this.ga.trackView('1 on 1 – Team Selection');
    this.nav.setRoot('OnetoonePage',{tab:0});
			// this.teamSelection=true;
		}
		else{
      this.localdata.StorePlayerOne('');
      this.localdata.StorePlayerTwo('');
      this.ga.trackView('1 on 1 – Player Selection');
      this.nav.setRoot('OnetoonePage',{tab:1});
      // this.teamSelection=1 ;
      // $state.go('app.1on1');
			// this.teamSelection=false;
		}
  }

  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', '1 on 1 – Team Comparison', 1);
    const browser = this.inapp.create(ad_url);
  }


// One on one team stat
 GetOneOnOneTeamStat(get1on1TeamStats){
   this.teamSelection=true;
  console.log(get1on1TeamStats);

  this.get1on1TeamStats = get1on1TeamStats;

 this.get1on1TeamStatsTeamOne = get1on1TeamStats.team1.team;

  console.log("1"+ this.get1on1TeamStatsTeamOne);

  this.get1on1TeamStatsTeamTwo = get1on1TeamStats.team2.team;
  console.log( "2"+this.get1on1TeamStatsTeamTwo);

  this.footerAdv = get1on1TeamStats.footerAdv;
  this.lastmatch = get1on1TeamStats.team1.lastmatch;
  this.ladder = get1on1TeamStats.team1.ladder;
  this.teamstat = get1on1TeamStats.team1.teamstat;

  this.eff_inside50 = get1on1TeamStats.team1.eff_inside50;
  var eff_inside50_1 = this.eff_inside50.knob;
  eff_inside50_1 = eff_inside50_1.split("%");
  this.eff_inside500 = eff_inside50_1[0];

  this.lastmatch2 = get1on1TeamStats.team2.lastmatch;
  this.ladder2 = get1on1TeamStats.team2.ladder;
  this.teamstat2 = get1on1TeamStats.team2.teamstat;

  this.eff_inside50_2 = get1on1TeamStats.team2.eff_inside50;
  var eff_inside50_2 = this.eff_inside50_2.knob;
  eff_inside50_2 = eff_inside50_2.split("%");
  this.eff_inside50_22 = eff_inside50_2[0];
  this.team1Data = get1on1TeamStats.team1.teamstat;
  this.team2Data = get1on1TeamStats.team2.teamstat;
console.log(this.team1Data);

this.modifiedState = ["Goals",
"Behinds",
"Rush Behinds",
"Kicks",
"Handballs",
"Disposals",
"Inside 50s",
"Marks",
"Tackles",
"Frees For",
"Hit Outs" ];
this.team1RushBehind_Behind =  0 ;
this.team2RushBehind_Behind =  0 ;

    this.modifiedState.forEach(item => {
      console.log(item)
      this.getObject1(item);
      this.getObject2(item);
    });

this.team1Data = this.team1DataM;
this.team2Data = this.team2DataM;
console.log(this.team2Data)
this.team1Data.forEach((item,index) => {
     this.team2Data.forEach((item1,index1) => {
      this.getColorWidth(index,item[item.stat_name],item1[item.stat_name]);
    });
});
// console.log(this.team1Data)
 }

 getObject1(stateName)
 {
this.team1Data.forEach(item => {

if(stateName==item.stat_name){
  if(stateName == "Behinds" || stateName == "Rush Behinds")
  {
    this.team1RushBehind_Behind= parseInt(this.team1RushBehind_Behind+(item[item.stat_name]));
    item[item.stat_name] = this.team1RushBehind_Behind ;
    console.log(this.team1RushBehind_Behind)
  }
  console.log(item);
  this.team1DataM.push(item);
  return item ;
  }
});
}


 getObject2(stateName)
 {
  this.team2Data.forEach((item,index) => {
    if(stateName==item.stat_name){
      if(stateName == "Behinds" || stateName == "Rush Behinds")
    {
     this.team2RushBehind_Behind= parseInt(this.team2RushBehind_Behind+(item[item.stat_name]));
     item[item.stat_name] = this.team2RushBehind_Behind;
    }
    this.team2DataM.push(item);
    return item ;
    }
  });
 }


 getColorWidth(key,homeTeamValue,awayTeamValue){
  // alert(homeTeamValue+"-----"+awayTeamValue)
       var barValueH = homeTeamValue;
       var barValueA = awayTeamValue;
       var homeBarsSpanVal = homeTeamValue;
       var awayBarsSpanVal = awayTeamValue;

      if(homeTeamValue != undefined && awayTeamValue != undefined){

         //alert(homeTeamValue+"-----"+awayTeamValue);
          barValueH = homeTeamValue;
          barValueA = awayTeamValue;
          homeBarsSpanVal = homeTeamValue;
          awayBarsSpanVal = awayTeamValue;
      var maxAway = 4;

     if(parseInt(homeBarsSpanVal) > parseInt(awayBarsSpanVal) ){

         this.team1Data[key].homeTeamColor ='#60BA72';
         this.team1Data[key].awayTeamColor ='#596682';
         this.team1Data[key].homeTeamOnlyColor ='green';
         this.team1Data[key].awayTeamOnlyColor ='gray';
     if(homeBarsSpanVal>20)
     var modifedMaxValue = parseInt(barValueA)+parseInt(barValueH);
     else
     var modifedMaxValue = parseInt(barValueH)+maxAway;

       var percentageUnit = (100/modifedMaxValue);




           this.team1Data[key].homeTeamWidth  = (percentageUnit*barValueH)+"%";


       if(parseInt(barValueA)==0)
       {
       this.team1Data[key].awayTeamWidth  =  "22%";
       }
       else if(barValueA.length>2 && (percentageUnit*barValueA)<33)
       {
        this.team1Data[key].awayTeamWidth  =  "35%";

       }
       else
       {
         if(percentageUnit*barValueA<27)
         this.team1Data[key].awayTeamWidth  =  "35%";
         else
         this.team1Data[key].awayTeamWidth  = (percentageUnit*barValueA)+"%";

       }


      }
       //alert(barValueH.toString().length+"---"+barValueA.toString().length);
   else if(parseInt(homeBarsSpanVal) < parseInt(awayBarsSpanVal) ){
         //alert(barValueH.toString().length+"---"+barValueA.toString().length);
         this.team1Data[key].awayTeamColor ='#60BA72';
         this.team1Data[key].homeTeamColor ='#596682';
         this.team1Data[key].awayTeamOnlyColor ='green';
         this.team1Data[key].homeTeamOnlyColor ='gray';
     if(awayBarsSpanVal>100)
     var modifedMaxValue = parseInt(barValueA)+parseInt(barValueH);
     else
     var modifedMaxValue = parseInt(barValueA)+(maxAway);

       percentageUnit = (100/modifedMaxValue);

           this.team1Data[key].awayTeamWidth  = (percentageUnit*barValueA)+"%";


       if(parseInt(barValueH)==0)
       {
       this.team1Data[key].homeTeamWidth  =  "22%";
       }
       else if(barValueH.length>2 && (percentageUnit*barValueH)<33)
       {
        this.team1Data[key].HomeTeamWidth  =  "35%";

       }
       else{
         if(percentageUnit*barValueH<27)
         this.team1Data[key].homeTeamWidth  =  "33%";
         else
          this.team1Data[key].homeTeamWidth  = (percentageUnit*barValueH)+"%";

       }



      }
    else {

       this.team1Data[key].awayTeamColor ='Orange';
      this.team1Data[key].homeTeamColor ='Orange';
      this.team1Data[key].homeTeamWidth  = "30%";
      this.team1Data[key].awayTeamWidth  =  "30%";


    }


  }
 }

//  Get one on one player stat
GetOneOnOnePlayerStat(get1on1PlayerStats){
  // console.log("get1on1PlayerStats"+JSON.stringify(get1on1PlayerStats));
  this.get1on1PlayerStats = get1on1PlayerStats;
  this.get1on1PlayerStatsTeamOne = get1on1PlayerStats.player1.player;
  // console.log("$scope.get1on1PlayerStatsTeamOne"+ this.get1on1PlayerStatsTeamOne.player_image);

  this.get1on1PlayerStatsTeamTwo = get1on1PlayerStats.player2.player;
//  console.log("$scope.get1on1PlayerStatsTeamTwo"+ this.get1on1PlayerStatsTeamTwo);

  this.footerAdv = get1on1PlayerStats.footerAdv;
  console.log(this.footerAdv[0].ad_image)
  this.ftrad=this.footerAdv[0].ad_image;
  this.lastmatch = get1on1PlayerStats.player1.lastmatch;
  this.ladder = get1on1PlayerStats.player1.ladder;
  this.playerstat = get1on1PlayerStats.player1.playerstat;
  this.eff_inside50 = get1on1PlayerStats.player1.eff_inside50;

  this.lastmatch2 = get1on1PlayerStats.player2.lastmatch;
  this.ladder2 = get1on1PlayerStats.player2.ladder;
  this.playerstat2 = get1on1PlayerStats.player2.playerstat;
  this.eff_inside50_2 = get1on1PlayerStats.player2.eff_inside50;

  this.player1Data = get1on1PlayerStats.player1.playerstat;
  this.player2Data = get1on1PlayerStats.player2.playerstat;



this.modifiedState1 = [
"Goals",
"Behinds",
"Rush Behinds",
"Kicks",
"Handballs",
"Disposals",
"Inside 50s",
"Marks",
"Tackles",
"Frees For",
"Hit Outs" ];
this.player1RushBehind_Behind =  0 ;
this.player2RushBehind_Behind =  0 ;

this.modifiedState1.forEach((item,index) => {
  this.getPlayerObject1(item);
    this.getPlayerObject2(item);
});


this.player1Data =  this.player1DataM;
this.player2Data =  this.player2DataM;

this.player1Data.forEach((item,index) => {
  this.player2Data.forEach((item1,index1) => {
    this.getColorWidth_player(index,item[item.stat_name],item1[item.stat_name]);
  });
});

}


getPlayerObject1(stateName)
{
   this.player1Data.forEach(item => {
    if(stateName==item.stat_name){
      if(stateName == "Behinds" || stateName == "Rush Behinds")
      {
      this.player1RushBehind_Behind= parseInt(this.player1RushBehind_Behind+(item[item.stat_name]));
       item[item.stat_name] = this.player1RushBehind_Behind ;

      }
     this.player1DataM.push(item);
      return item ;

      }
  });
}


getPlayerObject2(stateName)
{
  this.player2Data.forEach(item => {
    if(stateName==item.stat_name){
      if(stateName == "Behinds" || stateName == "Rush Behinds")
    {
     this.player2RushBehind_Behind= parseInt(this.player2RushBehind_Behind+(item[item.stat_name]));
     item[item.stat_name] = this.player2RushBehind_Behind ;

    }
    this.player2DataM.push(item);
    return item;
    }
  });

}

getColorWidth_player(key,homeTeamValue,awayTeamValue){
       var barValueH = homeTeamValue;
       var barValueA = awayTeamValue;
       var homeBarsSpanVal = homeTeamValue;
       var awayBarsSpanVal = awayTeamValue;

      if(homeTeamValue != undefined && awayTeamValue != undefined){

         //alert(homeTeamValue+"-----"+awayTeamValue);
          barValueH = homeTeamValue;
          barValueA = awayTeamValue;
          homeBarsSpanVal = homeTeamValue;
          awayBarsSpanVal = awayTeamValue;
           var maxAway = 4;
       //alert(barValueH.toString().length+"---"+barValueA.toString().length);
   if(parseInt(homeBarsSpanVal) > parseInt(awayBarsSpanVal))
   {
     this.player1Data[key].homeTeamColor ='#60BA72';
     this.player1Data[key].awayTeamColor ='#596682';
     this.player1Data[key].homeTeamOnlyColor ='green';
     this.player1Data[key].awayTeamOnlyColor ='gray';

     if(homeBarsSpanVal>20)
       var modifedMaxValue = parseInt(barValueA)+parseInt(barValueH);
       else
       var modifedMaxValue = parseInt(barValueH)+maxAway;

         var percentageUnit = (100/modifedMaxValue);
         this.player1Data[key].homeTeamWidth  =  (percentageUnit*barValueH)+"%";


         if(parseInt(barValueA)==0)
         {
         this.player1Data[key].awayTeamWidth  =  "22%";
         }
         else if(barValueA.length>2 && (percentageUnit*barValueA)<33)
         {
          this.player1Data[key].awayTeamWidth  =  "35%";

         }
         else
         {
           if(percentageUnit*barValueA<27)
           this.player1Data[key].awayTeamWidth  =  "35%";
           else
                this.player1Data[key].awayTeamWidth  = (percentageUnit*barValueA)+"%";

         }
  }else if(parseInt(homeBarsSpanVal) < parseInt(awayBarsSpanVal) ){
      //alert(barValueH.toString().length+"---"+barValueA.toString().length);
           this.player1Data[key].awayTeamColor ='#60BA72';
           this.player1Data[key].homeTeamColor ='#596682';
           this.player1Data[key].awayTeamOnlyColor ='green';
           this.player1Data[key].homeTeamOnlyColor ='gray';
       if(awayBarsSpanVal>100)
       var modifedMaxValue = parseInt(barValueA)+parseInt(barValueH);
       else
       var modifedMaxValue = parseInt(barValueA)+(maxAway);

         var percentageUnit = (100/modifedMaxValue);

        this.player1Data[key].awayTeamWidth  = (percentageUnit*barValueA)+"%";


         if(parseInt(barValueH)==0)
         {
         this.player1Data[key].homeTeamWidth  =  "22%";
         }
         else if(barValueH.length>2 && (percentageUnit*barValueH)<33)
         {
          this.player1Data[key].HomeTeamWidth  =  "35%";
         }
         else{
           if(percentageUnit*barValueH<27)
           this.player1Data[key].homeTeamWidth  ="33%";
           else
          this.player1Data[key].homeTeamWidth  = (percentageUnit*barValueH)+"%";

         }

  }else {
         this.player1Data[key].awayTeamColor ='Orange';
         this.player1Data[key].homeTeamColor ='Orange';
         this.player1Data[key].homeTeamWidth  = "30%";
         this.player1Data[key].awayTeamWidth  =  "30%";
    }


  }
 }


}
