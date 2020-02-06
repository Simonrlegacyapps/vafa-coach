import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav, ModalController, Content,Platform } from 'ionic-angular';
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
  selector: 'page-onetoone',
  templateUrl: 'onetoone.html',
})
export class OnetoonePage {
  //  path = 'http://vafalive.com.au';
  path: any = environment.baseURL;
   teamMtach:any=[];
   teamSelection:any;
   resData:any=[];
   getAllPlayers:any=[];
   advertisementFooter:any=[];
   getAllTeams:any=[];
   allTeams:any=[];
   getAllCompititions:any=[];
   compitition_id:any;
   team_id:any;
   teamImg:any='';
   teamName:any='';
   teamImg2:any='';
   teamName2:any='';
   imagePlayer:any='';
   imagePlayer2:any='';
   playerName2:any='';
   playerImage2:any='';
   playerImage1:any='';
   ftrimage:any='';
   playerName1:any='';
   playeronedata:any=[];
   playertwodata:any=[];

  constructor(public navCtrl: NavController,
		public ajax: AjaxProvider,
    public events: Events,
    public nav:Nav,
    private inapp: InAppBrowser,
    private modalCtrl: ModalController,
    public plt:Platform,public ga:FirebaseAnalyticsProvider,
    public cmfn: CommomfunctionProvider,
    public localdata:LocalDataProvider,
		public storage: Storage,
		public navParams: NavParams) {
      this.teamSelection = navParams.get('tab');
      console.log(this.teamSelection);
      if(this.teamSelection==0 || this.teamSelection==undefined){
				this.teamMtach.teamSelection=true;
      }else{
			this.teamSelection=0 ;
			this.teamMtach.teamSelection=false;
      }

      this.plt.ready().then(() => {
        this.ga.startTrackerWithId('UA-118996199-1')
     .then(() => {
       console.log('Google analytics is ready now');
          // this.ga.trackView('1 on 1 Page');
          this.ga.trackView('1 on 1 – Team Selection');
          // this.ga.trackEvent('Advertisement', 'Viewed', '1 on 1 Page', 1);
          this.ga.trackTiming('1 on 1 – Team Selection', 1000, 'Duration', 'Time');
     })
     .catch(e => console.log('Error starting GoogleAnalytics', e));
         })

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnetoonePage');
    this.cmfn.showLoading('Please wait');
    setTimeout(() => {
      this.cmfn.HideLoading();
    }, 7000);

  // get all teams
    this.ajax.datalist('get-all-teams',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe((res) => {
      // this.cmfn.HideLoading();
     console.log(res);
      this.resData=res;
      if (this.resData.code == 2) {
        this.getAllTeams=[];
        return false;
        } else{
          // console.log("getAllTeams"+JSON.stringify(this.resData));
          this.getAllTeams = this.resData.teams;
          this.allTeams = this.resData.teams;
      }
      }, error => {
        // this.cmfn.HideLoading();
       console.log(error);
     })

  // get all compitions
  this.ajax.datalist('get-all-competitions',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe((res) => {
      // this.cmfn.HideLoading();
      console.log(res);
      this.resData=res;
      if (this.resData.code == 2 || this.resData.code == 3) {
      return false;
      } else{
        // console.log("getAllCompititions :::: "+JSON.stringify(this.resData));
        this.getAllCompititions = this.resData.competition;
      }
      }, error => {
      // this.cmfn.HideLoading();
      console.log(error);
      })

  // get all players
       this.ajax.datalist('get-all-players',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe((res) => {
         this.cmfn.HideLoading();
        console.log(res);
         this.resData=res;
        if (this.resData.code == 2) {
           return false;
          } else{
            // console.log("getAllPlayers"+JSON.stringify(this.resData));
            this.getAllPlayers = this.resData.players;
            this.advertisementFooter=this.resData.footerAdv;
            this.ftrimage=this.advertisementFooter[0].ad_image;
          }
       }, error => {
        //  this.cmfn.HideLoading();
        console.log(error);
      })
  }


  selectTab(tabNo){
    if(tabNo==1){
      this.ga.trackView('1 on 1 – Team Selection');
      this.teamMtach.teamSelection=true;
    }
    else{
      this.ga.trackTiming('1 on 1 – Player Selection', 2000, 'Duration', 'Time');
      this.ga.trackView('1 on 1 – Player Selection');
      this.teamMtach.teamSelection=false;
   }
  }

  goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', '1 on 1 – Team Selection', 1);
    this.ga.trackEvent('Advertisement', 'Viewed', '1 on 1 – Player Selection', 1);
    const browser = this.inapp.create(ad_url);
  }


//getTeamByCompetitionId
  getTeamByCompetitionId(selectedItem) {
    this.compitition_id = selectedItem;
    this.storage.set("compitition_id", this.compitition_id);
    if(this.compitition_id == null || this.compitition_id == ""){
      this.cmfn.showLoading('Please wait..');
      this.ajax.datalist('get-all-teams',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe((res) => {
        this.cmfn.HideLoading();
       console.log(res);
        this.resData=res;
        if (this.resData.code == 2) {
          this.getAllTeams=[];
          return false;
          } else{
            console.log("getAllTeams"+JSON.stringify(this.resData));
            this.getAllTeams = this.resData.teams;
            this.allTeams = this.resData.teams;
        }
        }, error => {
          this.cmfn.HideLoading();
         console.log(error);
       })
    }else{
    this.cmfn.showLoading('Please wait..');
    this.ajax.datalist('get-all-teams-by-competitions',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016",
    competition_id: this.compitition_id
     }).subscribe((res) => {
      this.cmfn.HideLoading();
     console.log(res);
      this.resData=res;
      if (this.resData.code == 2 || this.resData.code == 3) {
        this.getAllTeams = [];
        return false;
        } else{
          console.log("getAllTeamsByCompetitionsId :::: "+JSON.stringify(this.resData));
          this.getAllTeams = this.resData.teams;
        }
      }, error => {
        this.cmfn.HideLoading();
       console.log(error);
     })
    }
  }


//getPlayersByTeamId
  getTeamIdWisePlayers(selectedItem) {
      this.team_id = selectedItem;
      if(this.team_id == '0_0'){
        this.cmfn.showLoading('Please wait..');
        this.ajax.datalist('get-all-players',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe((res) => {
          this.cmfn.HideLoading();
         console.log(res);
          this.resData=res;
         if (this.resData.code == 2) {
            return false;
           } else{
             console.log("getAllPlayers"+JSON.stringify(this.resData));
             this.getAllPlayers = this.resData.players;
             this.advertisementFooter=this.resData.footerAdv;
           }
        }, error => {
          this.cmfn.HideLoading();
         console.log(error);
       })
      }else{
        this.cmfn.showLoading('Please wait..');
        this.ajax.datalist('get-team-compitition-wise-players',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016",
        team_id: this.team_id,
        competition_id: this.compitition_id
       }).subscribe((res) => {
          this.cmfn.HideLoading();
         console.log(res);
          this.resData=res;
          if (this.resData.code == 2 || this.resData.code == 3) {
            this.getAllPlayers = [];
            return false;
            } else{
              console.log("getTeamWisePlayers :::: "+JSON.stringify(this.resData));
              this.getAllPlayers = this.resData.players;
            }
        }, error => {
          this.cmfn.HideLoading();
         console.log(error);
       })
      }
  }

// Team one selection model
openTeamSelectionModal() {
  let modal = this.modalCtrl.create('TeamOneSelectionModelPage' ,{ allteams:this.getAllTeams,type:'team1'});
  modal.onDidDismiss(data => {
    console.log(data);
    if(data){
   this.localdata.StoreTeamOne(data);
   this.teamName=data.team_name;
	 this.teamImg=data.team_img;
    }
  });
  modal.present();
}

// Team two selection model
openTeamSelectionModalTwo() {
  let modal = this.modalCtrl.create('TeamOneSelectionModelPage' ,{ allteams:this.getAllTeams,type:'team2'});
  modal.onDidDismiss(data => {
    console.log(data);
  if(data){
    this.localdata.StoreTeamTwo(data);
    this.teamName2=data.team_name;
    this.teamImg2=data.team_img;
    let teamonedata=this.localdata.GetTeamOne();
    let teamtwodata=this.localdata.GetTeamTwo();
  console.log(teamonedata)
  console.log(teamtwodata)
  if(teamonedata.team_id == '' || teamonedata.team_id == null || teamtwodata.team_id == '' || teamtwodata.team_id == null){
    alert('please select');
  }else if(teamonedata.team_id == teamtwodata.team_id){
   alert('please select different teams');
  }else{
    this.ga.trackView('1 on 1 – Team Comparison');
    this.nav.setRoot('OnetooneresultPage',{team1_id:teamonedata.team_id,team2_id:teamtwodata.team_id});
  }
  }
  });
  modal.present();
}


// Player one selection model
openPlayerSelectionModal(){
  // this.cmfn.showLoading('Please wait..');
  let modal = this.modalCtrl.create('PlayerselectionmodelPage' ,{ allplayers:this.getAllPlayers,type:'player1'});
  modal.onDidDismiss(data => {
    console.log(data);
   if(data){
     this.localdata.StorePlayerOne(data);
    this.playerName1=data.player_name;
    if(data.player_name == null || data.player_name == 'null'){
      this.playerName1 =  'Player Not Found';
    }
    this.imagePlayer= data.player_image;
    this.playerImage1=data.player_image;
    this.playeronedata=this.localdata.GetPlayerOne();
    this.playertwodata=this.localdata.GetPlayerTwo();
    console.log(this.playeronedata);
    console.log(this.playertwodata);

    if(this.playeronedata.player_id == "" || this.playeronedata.player_id ==undefined || this.playeronedata.player_id == null || this.playertwodata.player_id == undefined|| this.playertwodata.player_id == "" || this.playertwodata.player_id == null){
      // alert('please select players');
    }else if(this.playeronedata.player_id == this.playertwodata.player_id){
     alert('please select different players');
    }else{
      this.ga.trackView('1 on 1 – Player Comparison');
      this.nav.setRoot('OnetooneresultPage',{player1_id:this.playeronedata.player_id,player2_id:this.playertwodata.player_id});
    }
   }
  });
  modal.present();
}


// Player two selection model
openPlayerSelectionModalTwo(){
  let modal = this.modalCtrl.create('PlayerselectionmodelPage' ,{ allplayers:this.getAllPlayers,type:'player2'});
  modal.onDidDismiss(data => {
    console.log(data);
   if(data){
    this.localdata.StorePlayerTwo(data);
   	this.playerName2=data.player_name;
    if(data.player_name == null || data.player_name == 'null'){
    this.playerName2 =  'Player Not Found';
    }
    this.imagePlayer2 = data.player_image;
    this.playerImage2=data.player_image;

    this.playeronedata=this.localdata.GetPlayerOne();
    this.playertwodata=this.localdata.GetPlayerTwo();
    console.log(this.playeronedata);
    console.log(this.playertwodata);

    if(this.playeronedata.player_id == "" || this.playeronedata.player_id ==undefined || this.playeronedata.player_id == null || this.playertwodata.player_id == undefined|| this.playertwodata.player_id == "" || this.playertwodata.player_id == null){
      // alert('please select players');
    }else if(this.playeronedata.player_id == this.playertwodata.player_id){
     alert('please select different players');
    }else{
      this.ga.trackView('1 on 1 – Player Comparison');
      this.nav.setRoot('OnetooneresultPage',{player1_id:this.playeronedata.player_id,player2_id:this.playertwodata.player_id});
    }
   }
  });
  modal.present();
}

}
