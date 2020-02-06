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
  selector: 'page-team-one-selection-model',
  templateUrl: 'team-one-selection-model.html',
})
export class TeamOneSelectionModelPage {
  @ViewChild('searchbar') searchbar: Searchbar;
  toggled: boolean;
  searchTerm: String = '';
  items:any=[];

  allteams:any=[];
  resData:any=[];
  getAllTeams:any=[];
  selectablesTeam:any;
  selectables:any;
  getAllCompititions:any=[];
  teamtype:any;
  // path = 'http://vafalive.com.au';
  path: any = environment.amazonaws;
  constructor(public navCtrl: NavController,
    public viewCtrl:ViewController,
    public ajax: AjaxProvider,
		public events: Events,
		private modalCtrl: ModalController,
    public cmfn: CommomfunctionProvider,
     public navParams: NavParams) {
    this.allteams = navParams.get('allteams');
    this.teamtype = navParams.get('type');
    console.log(this.allteams);
    this.items=this.allteams;

      // get all compitions
  this.ajax.datalist('get-all-competitions',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe((res) => {
    this.cmfn.HideLoading();
    console.log(res);
    this.resData=res;
    if (this.resData.code == 2 || this.resData.code == 3) {
    return false;
    } else{
      // console.log("getAllCompititions :::: "+JSON.stringify(this.resData));
      this.getAllCompititions = this.resData.competition;
      this.selectables=this.resData.competition[0].competitions_name;
    }
    }, error => {
    this.cmfn.HideLoading();
    console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamOneSelectionModelPage');

  }

  // search
  toggleSearch() {
		this.searchTerm='';
		this.toggled = this.toggled ? false : true;
		this.items = this.allteams;
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
		  this.allteams.forEach((item, keys) => {
			if (item.team_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
			  this.items.push(item);
			}
		  })
		}
		else {
		  this.items = this.allteams;
		}
	  }




 //Selected team
 teamSelection(team_id,team_name,team_img){
   if(this.teamtype=='team1'){
     console.log('a');
    let TeamOne={
         type:'team1',
         team_id:team_id,
         team_name:team_name,
         team_img:team_img
       }
       this.viewCtrl.dismiss(TeamOne);
   }else if(this.teamtype=='team2'){
    let TeamTwo={
         type:'team2',
         team_id:team_id,
         team_name:team_name,
         team_img:team_img
       }
       this.viewCtrl.dismiss(TeamTwo);
   }
 }

 selectedType(type) {
  if (type == 'competion') {
    let modal = this.modalCtrl.create('CommommodelPage', { items: this.getAllCompititions });
    let me = this;
    modal.onDidDismiss(data => {
      console.log(data)
      this.selectables = data.competitions_name
      this.ajax.datalist('get-all-teams-by-competitions',{ accessKey: "QzEnDyPAHT12asHb4On6HH2016",
      competition_id: data.competition_id
       }).subscribe((res) => {
        this.cmfn.HideLoading();
       console.log(res);
        this.resData=res;
        if (this.resData.code == 2 || this.resData.code == 3) {
          this.allteams = [];
          return false;
          } else{
            // console.log("getAllTeamsByCompetitionsId :::: "+JSON.stringify(this.resData));
            this.allteams = this.resData.teams;
            this.items=this.resData.teams;
          }
        }, error => {
          this.cmfn.HideLoading();
         console.log(error);
       })
    });
    modal.present();
  }
  else {
    // let modal = this.modalCtrl.create('TeamlistPage', { items: this.getAllTeams });
    // let me = this;
    // modal.onDidDismiss(data => {
    //   console.log(data);
    //   this.selectablesTeam = data.team_name;
    //   this.team_id = data.team_id;
    //   this.cmnfun.showLoading('Please wait...');
    //   this.ajax.datalist('get-team-players-goal-kickers-filter', {
    //     accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
    //     team_id: this.team_id,
    //     compition_id: this.competition_id
    //   }).subscribe((res) => {
    //     this.scrollToTop()
    //     this.getteamplayersgoalkickersfilter(res);
    //   }, error => {
    //     // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    //   })
    // });
    // modal.present();
  }
}

}
