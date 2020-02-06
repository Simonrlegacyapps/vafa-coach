import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Content,Keyboard,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Searchbar } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
/**
 * Generated class for the PlayerStatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-stat',
  templateUrl: 'player-stat.html',
})
export class PlayerStatPage {

  @ViewChild('searchbar') searchbar: Searchbar;

  toggled: boolean;
  searchTerm: String = '';
  items:any=[];

  numberOfItemsToDisplay = 10;
  offset=0;
  ResData:any='';
  path: any = environment.baseURL;
  path1: any = environment.amazonaws;
  //  path: any = 'http://vafalive.com.au';
  getAllCompititions:any;selectables:any=[];getAllTeams:any;allTeamData:any;selectablesTeam:any=[];details:any;
allCompetionData:any;selectedOption:any;someModel:any;compitionId:any;compitition_id:any;team_id:any;
disposalDropData:any=[];someModelDisposal:any;selectablesDisposals:any=[];disposalId:any;disposalData:any=[];
teamselect:any;headerAdv:any=[];footerAdv:any;sleectablescompetionname:any;sleectablesteamname:any;sleectablesstatname:any;
  constructor(private zone: NgZone,
    public plt:Platform,
    public ga:FirebaseAnalyticsProvider,
    public ajax: AjaxProvider,
    private inapp: InAppBrowser,
    private modalCtrl: ModalController,
    public cmnfun: CommomfunctionProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.ga.trackView('Player Stats - Season');
        // this.ga.trackEvent('Advertisement', 'Viewed', 'PlayerStat Page', 1);
        this.ga.trackTiming('Player Stats - Season', 1000, 'Duration', 'Time');
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidLoad() {
    this.cmnfun.showLoading('Please wait...');
    console.log('ionViewDidLoad PlayerStatsPage');
     this.ajax.datalist('get-all-competitions', {
      accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
    }).subscribe((res) => {
      console.log(res);
      this.getAllCompititions = res;


			           this.allCompetionData = this.getAllCompititions.competition;
						this.sleectablescompetionname = this.allCompetionData[0].competitions_name;
            // this.allCompetionData.forEach(item => {
            //   this.selectables.push({
						// 		"competitions_name":item.competitions_name
						// 	});
            // });
            console.log(this.selectables);
						// this.selectedOption=this.allCompetionData[0];
						this.someModel = this.allCompetionData[0];
						console.log(this.someModel);
						// window.localSto("rage.setItem("playerStatsCompitionId", this.selectedOption.competition_id );
						this.compitionId=this.someModel.competition_id;
							this.selectedCompetitionName(this.compitionId)
    }, error => {
      // this.cmnfun.showToast('Some thing Unexpected happen please try again');
    })
  }

  toggleSearch() {
    this.searchTerm='';
    this.toggled = this.toggled ? false : true;
    this.items = this.disposalData;
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
      this.disposalData.forEach((item, keys) => {
        if (item.player_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          this.items.push(item);
        }
      })
    }
    else {
      this.items = this.disposalData;
    }

  }
	selectedCompetitionName(selectedItem){
			  // console.log(this.compitionId);
				  this.compitition_id = selectedItem;
					// window.localStorage.setItem("playerStatsCompitionId", this.compitition_id );
					// this.compitition_id=this.compitition_id;
					this.ajax.datalist('get-all-teams-by-competitions', {
          accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          competition_id: this.compitition_id
            }).subscribe((res) => {
                this.getAllTeams  = res;
               console.log( this.getAllTeams );
          this.allTeamData = this.getAllTeams.teams;
          this.sleectablesteamname = this.allTeamData[0].team_name;
            //console.log(data.competition);
          //  this.allTeamData.forEach(element => {
          //    	this.selectablesTeam.push({
					// 			"team_name":element.team_name
          //     });
          //     console.log(this.selectablesTeam);
          //  });

						this.selectedOption=this.allTeamData[0];
            this.team_id=this.selectedOption.team_id;
          this.disposalDropDown()
            }, error => {
              // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            })
      }
      disposalDropDown() {
        this.ajax.datalist('get-all-game-stats', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
          }).subscribe((data) => {
      console.log(data);

            this.details=data
      this.disposalDropData=this.details.score_feed;
      this.sleectablesstatname = this.disposalDropData[0].stat_name;
      this.disposalDropData.forEach(item => {
          this.selectablesDisposals.push({
          "stat_name":item.stat_name
        });
      });
      // this.selectedOption=this.disposalDropData[0];
      this.someModelDisposal = this.disposalDropData[0];
      console.log(this.someModelDisposal);
      this.disposalId=this.someModelDisposal.id;
      this.selectedTeamName(this.team_id);

      });
      }
			    //Select Compition Name
	selectedTeamName(selectedItem){
			     //alert(selectedItem)
			     if(selectedItem == '0_0' || selectedItem == '' || selectedItem == null){
			        // UserManagement.dropDownFilter(this.disposalId,this.team_id,this.compitition_id);
				        this.ajax.datalist('get-teams-player-disposals-filter', {
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  team_id:this.team_id,
                  competitions_id:this.compitition_id,
                  stat_id:this.disposalId
                    }).subscribe((data) => {
                      this.cmnfun.HideLoading();
                        console.log(data);
                      this.teamselect=data
                     this.disposalData=this.teamselect.teamStat;
                      this.items=this.disposalData;
                      //ADVERTISEMENT:
                     this.headerAdv=this.teamselect.headerAdv;


                     this.footerAdv=this.teamselect.footerAdv;

                    });
				}else{

				    this.team_id = selectedItem;
              //  UserManagement.dropDownFilter(this.disposalId,this.team_id,this.compitition_id);
                this.ajax.datalist('get-teams-player-disposals-filter', {
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  team_id:this.team_id,
                  competitions_id:this.compitition_id,
                  stat_id:this.disposalId
                    }).subscribe((data) => {
                      console.log(data);
                      this.teamselect=data
                     this.disposalData=this.teamselect.teamStat;
                     this.items=this.disposalData;

                      //ADVERTISEMENT:
                     this.headerAdv=this.teamselect.headerAdv;


                     this.footerAdv=this.teamselect.footerAdv;

                    });

		}
  }
		selectedDisposalName(selectedItem){
			     //alert(selectedItem)
			     if(selectedItem == '0_0' || selectedItem == '' || selectedItem == null){
	   this.ajax.datalist('get-teams-player-disposals-filter', {
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  team_id:this.team_id,
                  competitions_id:this.compitition_id,
                  stat_id:this.disposalId
                    }).subscribe((data) => {
                      this.teamselect=data
                     this.disposalData=this.teamselect.teamStat;
                      this.items=this.disposalData;
                      //ADVERTISEMENT:
                     this.headerAdv=this.teamselect.headerAdv;


                     this.footerAdv=this.teamselect.footerAdv;

                    });

				}else{

				    this.disposalId = selectedItem;
					   this.ajax.datalist('get-teams-player-disposals-filter', {
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  team_id:this.team_id,
                  competitions_id:this.compitition_id,
                  stat_id:this.disposalId
                    }).subscribe((data) => {
                      this.teamselect=data
                     this.disposalData=this.teamselect.teamStat;
                      this.items=this.disposalData;
                      //ADVERTISEMENT:
                     this.headerAdv=this.teamselect.headerAdv;


                     this.footerAdv=this.teamselect.footerAdv;

                    });

    }
    }
  selectedType(type) {
    if (type == 'competion') {
      let modal = this.modalCtrl.create('CommommodelPage', { items: this.allCompetionData });
      let me = this;
      modal.onDidDismiss(data => {
        this.sleectablescompetionname = data.competitions_name
        	this.compitition_id = data.competition_id;
        // this.cmnfun.showLoading('Please wait...');
            this.cmnfun.showLoading('Please wait...');
        this.ajax.datalist('get-teams-player-disposals-filter', {
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  team_id:this.team_id,
                  competitions_id:this.compitition_id,
                  stat_id:this.disposalId
                    }).subscribe((data) => {
                        console.log(data);
                         this.cmnfun.HideLoading();
                      this.teamselect=data
                     this.disposalData=this.teamselect.teamStat;
                      this.items=this.disposalData;
                      //ADVERTISEMENT:
                     this.headerAdv=this.teamselect.headerAdv;


                     this.footerAdv=this.teamselect.footerAdv;

                    });
      });
      modal.present();
    }
    else if(type == 'teams') {
      let modal = this.modalCtrl.create('TeamlistPage', { items: this.allTeamData });
      let me = this;
      modal.onDidDismiss(data => {
        console.log(data);
        this.sleectablesteamname = data.team_name;
        this.team_id = data.team_id;
            this.cmnfun.showLoading('Please wait...');
          this.ajax.datalist('get-teams-player-disposals-filter', {
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  team_id:this.team_id,
                  competitions_id:this.compitition_id,
                  stat_id:this.disposalId
                    }).subscribe((data) => {
                       this.cmnfun.HideLoading();
                        console.log(data);
                      this.teamselect=data
                     this.disposalData=this.teamselect.teamStat;
                      this.items=this.disposalData;
                      //ADVERTISEMENT:
                     this.headerAdv=this.teamselect.headerAdv;


                     this.footerAdv=this.teamselect.footerAdv;

                    });

      });
      modal.present();
    }
     else{
      let modal = this.modalCtrl.create('GoallistPage', { items: this.disposalDropData});
      let me = this;
      modal.onDidDismiss(data => {
        console.log(data);
            this.cmnfun.showLoading('Please wait...');
      this.sleectablesstatname = data.stat_name;
        this.disposalId = data.id;
          this.ajax.datalist('get-teams-player-disposals-filter', {
                  accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                  team_id:this.team_id,
                  competitions_id:this.compitition_id,
                  stat_id:this.disposalId
                    }).subscribe((data) => {
                       this.cmnfun.HideLoading();
                        console.log(data);
                      this.teamselect=data
                     this.disposalData=this.teamselect.teamStat;
                      this.items=this.disposalData;
                      //ADVERTISEMENT:
                     this.headerAdv=this.teamselect.headerAdv;


                     this.footerAdv=this.teamselect.footerAdv;

                    });

      });
      modal.present();
    }
  }

  playerStatDetail(playerId){
    console.log(playerId);
    this.navCtrl.push('PlayerstatdetailsPage',{player_id:playerId});

    }

    goToAddSite(ad_url) {
      this.ga.trackEvent('Advertisement', 'Viewed', 'Player Stats - Season', 1);
      const browser = this.inapp.create(ad_url);
    }


    doInfinite(infiniteScroll){
      this.offset=this.offset+1;
      console.log(this.offset);
      this.ajax.datalist('get-teams-player-disposals-filter-load-more', {
        accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
        team_id:this.team_id,
        competitions_id:this.compitition_id,
        stat_id:this.disposalId,
        offset: this.offset,
      }).subscribe((res) => {
        console.log(res);
        this.ResData=res;
       if(this.ResData.code==1){
        this.disposalData =this.ResData.teamStat;
        setTimeout(() => {
          this.ResData.teamStat.forEach((item,index) => {
           this.items.push({player_id:item.player_id,
          player_image:item.player_image,
          player_name:item.player_name,
          player_number:item.player_number,
          team_id:item.team_id,
          team_name:item.team_name,
          statCount:item.statCount,
          stats_avg:item.stats_avg})
         });
          infiniteScroll.complete();
        }, 1500);
       }else{
        infiniteScroll.complete();
       }
      }, error => {
        infiniteScroll.complete();
      })
    }


      // path reset function
  cutPath(url){
    if(url)
    return url.substring(12);
  }

}
