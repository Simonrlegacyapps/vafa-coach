import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ModalController, Content } from 'ionic-angular'
import { AjaxProvider } from '../../providers/ajax/ajax';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Searchbar } from 'ionic-angular';
import { environment } from '../../environments/environment';


@IonicPage()
@Component({
  selector: 'page-playerselectionmodel',
  templateUrl: 'playerselectionmodel.html',
})
export class PlayerselectionmodelPage {
  @ViewChild('searchbar') searchbar: Searchbar;
  toggled: boolean;
  searchTerm: String = '';
  items:any=[];
  team_id:any='';
  selectablesTeam:any='';
  resData:any=[];
  selectables:any='';
  compitition_id:any='';
  getAllCompititions:any=[];
  getAllTeams:any=[];
  // path = 'http://vafalive.com.au';
  path: any = environment.baseURL;
  path1: any = environment.amazonaws;
  getAllPlayers:any=[];
  playertype:any;
  constructor(public navCtrl: NavController,
    public viewCtrl:ViewController,
    public ajax: AjaxProvider,
		public events: Events,
		private modalCtrl: ModalController,
    public cmfn: CommomfunctionProvider,
     public navParams: NavParams) {
    this.getAllPlayers = navParams.get('allplayers');
    this.playertype = navParams.get('type');

    console.log(this.getAllPlayers);
    this.items=this.getAllPlayers;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerselectionmodelPage');
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
      }
      }, error => {
        // this.cmfn.HideLoading();
       console.log(error);
     })
//  all competitions
this.ajax.datalist('get-all-competitions',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe((res) => {
  // this.cmfn.HideLoading();
  console.log(res);
  this.resData=res;
  if (this.resData.code == 2 || this.resData.code == 3) {
  return false;
  } else{
    // console.log("getAllCompititions :::: "+JSON.stringify(this.resData));
    this.getAllCompititions = this.resData.competition;
    this.selectables=this.getAllCompititions[0].competitions_name;
    this.compitition_id=this.getAllCompititions[0].competition_id;
    this.getTeamByCompetitionId(this.compitition_id);
  }
  }, error => {
  // this.cmfn.HideLoading();
  console.log(error);
  })
  }

  // search
  toggleSearch() {
    this.searchTerm='';
    this.toggled = this.toggled ? false : true;
    this.items = this.getAllPlayers;
    if (this.toggled == true) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 150);
    }
  }
  toggleSearchcancel()
  {
    this.toggled = this.toggled ? false : true;
    if (this.toggled == true) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 150);
    }
  }

  triggerInput(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = [];
      this.getAllPlayers.forEach((item, keys) => {
        if (item.player_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          this.items.push(item);
        }
      })
    }
    else {
      this.items = this.getAllPlayers;
    }

  }


playerSelection(player_id,player_name,player_image){
if(this.playertype=='player1'){
  let playerone={
    type:'player1',
    player_id:player_id,
    player_name:player_name,
    player_image:player_image
  }
  this.viewCtrl.dismiss(playerone);
}else{
  let playertwo={
    type:'player2',
    player_id:player_id,
    player_name:player_name,
    player_image:player_image
  }
  this.viewCtrl.dismiss(playertwo);
}
}

//getTeamByCompetitionId
getTeamByCompetitionId(selectedItem) {
  this.compitition_id = selectedItem;
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
        this.selectablesTeam=this.getAllTeams[0].team_name;
      }
    }, error => {
      this.cmfn.HideLoading();
     console.log(error);
   })
  }
}



selectedType(type) {
  if (type == 'competion') {
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.getAllCompititions });
    let me = this;
    modal.onDidDismiss(data => {
      console.log(data)
      this.selectables = data.competitions_name
      this.compitition_id=data.competition_id
      this.ajax.datalist('get-all-teams-by-competitions',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016",
    competition_id: data.competition_id
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
    });
    modal.present();
  }
  else {
    let modal = this.modalCtrl.create('TeamlistPage', { items: this.getAllTeams });
    let me = this;
    modal.onDidDismiss(data => {
      console.log(data);
      this.selectablesTeam = data.team_name;
      this.team_id = data.team_id;
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
             this.items=this.getAllPlayers;
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
              // console.log("getTeamWisePlayers :::: "+JSON.stringify(this.resData));
              this.getAllPlayers = this.resData.players;
              this.items=this.getAllPlayers;
            }
        }, error => {
          this.cmfn.HideLoading();
         console.log(error);
       })
      }
    });
    modal.present();
  }
}


      // path reset function
      cutPath(url){
        if(url)
        return url.substring(12);
      }

}
