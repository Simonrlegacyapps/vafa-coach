import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content,Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Searchbar } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { environment } from '../../environments/environment';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';
@IonicPage()
@Component({
	selector: 'page-teamstat',
	templateUrl: 'teamstat.html',
})
export class TeamstatPage {
	@ViewChild('searchbar') searchbar: Searchbar;
	@ViewChild(Content) content: Content;
	scrollTop: any;
	advDisplay: any = 'show';
	toggled: boolean;
	searchTerm: String = '';
	items: any = [];

	selectables = [];
	selectablesRound = [];
	selectablesDisposals = [];
	// path = 'http://vafalive.com.au';
  path: any = environment.baseURL;
  path1: any = environment.amazonaws;

	getAllCompititions: any;
	allCompetionData = [];
	selectedOption: any = [];
	someModel: any = [];
	compitionId: any;
	compitition_id: any;

	getAllTeams: any;
	allTeamData: any = [];
	someModelTeam: any = [];
	round_id: any;
	disposalDropData: any;
	someModelDisposal: any;
	disposalId: any;
	getTotalDisposals = [];
	headerAdv: any = [];
	footerAdv: any = [];
	numberOfItemsToDisplay: any = 10;

	hideSearchBar: boolean = true;
	resData: any;

	sleectablescompetionname: any;
	sleectablesteamname: any;
	sleectablesstatname: any;

	mobHeight: any;
    mobWidth: any;

	constructor(public navCtrl: NavController,
		public ajax: AjaxProvider,
		public events: Events,
		public plt:Platform,
		private inapp: InAppBrowser,
		public ga:FirebaseAnalyticsProvider,
		private modalCtrl: ModalController,
		public cmfn: CommomfunctionProvider,
		public storage: Storage,
		public navParams: NavParams) {
			this.plt.ready().then(() => {
				this.ga.startTrackerWithId('UA-118996199-1')
			 .then(() => {
			   console.log('Google analytics is ready now');
				  this.ga.trackView('Team Stats - Season');
				  this.ga.trackTiming('Team Stats - Season', 1000, 'Duration', 'Time');
				//   this.ga.trackEvent('Advertisement', 'Viewed', 'TeamStat Page', 1);
			 })
			 .catch(e => console.log('Error starting GoogleAnalytics', e));
				 })
	}

	scrollToTop() {
		this.content.scrollToTop();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TeamstatPage');
		this.cmfn.showLoading('Please wait...');
		this.ajax.datalist('get-all-competitions', { accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe((res) => {
			console.log(res);
			this.resData = res;
			if (this.resData.code == 2 || this.resData.code == 3) {
				this.GetAllcompitionFailed(this.resData.message);
				return false;
			} else {
				this.GetAllcompitionSuccess(res);
			}

		}, error => {
			this.GetAllcompitionFailed(status);
		})


		this.ajax.datalist('get-all-game-stats', { accessKey: 'QzEnDyPAHT12asHb4On6HH2016' }).subscribe((res) => {
			console.log(res);
			this.getallgamestatssuccess(res);
		}, error => {
			console.log(error);
		})
  }


        // path reset function
        cutPath(url){
          if(url)
          return url.substring(12);
        }


	toggleSearch() {
		this.searchTerm='';
		this.toggled = this.toggled ? false : true;
		this.items = this.getTotalDisposals;
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
		  this.getTotalDisposals.forEach((item, keys) => {
			if (item.team_name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
			  this.items.push(item);
			}
		  })
		}
		else {
		  this.items = this.getTotalDisposals;
		}
	  }



	GetAllcompitionSuccess(getAllCompititions) {
		this.cmfn.HideLoading();
		console.log("getAllCompititions :::: " + JSON.stringify(getAllCompititions));
		this.getAllCompititions = getAllCompititions.competition;

		this.allCompetionData = getAllCompititions.competition;

		//console.log(data.competition);

		this.allCompetionData.forEach(item => {
			this.selectables.push({
				"competitions_name": item.competitions_name
			});
		});

		this.selectedOption = this.allCompetionData[0];
		this.someModel = this.allCompetionData[0];
		this.sleectablescompetionname = this.allCompetionData[0].competitions_name;
		console.log(this.someModel);
		// this.selectedCompetitionName(this.someModel.competition_id);
		console.log("$scope.selectedOption11" + this.selectedOption.competition_id);
		this.selectedCompetitionName(this.someModel.competition_id);
		this.storage.set("teamPlayersCompitionId", this.selectedOption.competition_id);
		// this.compitionId=this.storage.get("teamPlayersCompitionId");
		console.log(this.compitionId);
	}



	GetAllcompitionFailed(msg) {
		this.cmfn.HideLoading();
		this.getAllCompititions = [];
	}

	getAllRoundsByCompetitionsIdfailed(data) {
		this.cmfn.HideLoading();
	}

	getAllRoundsByCompetitionsIdsuccess(data) {
		this.getAllTeams = data.totalRounds;
		console.log(this.getAllTeams);
		this.allTeamData = data.totalRounds;
		//console.log(data.competition);

		this.allTeamData.forEach(item => {
			this.selectablesRound.push({
				"name": item.name
			});
		});

		this.selectedOption = this.allTeamData[0];
		this.someModelTeam = this.allTeamData[0];
		console.log(this.allTeamData[0])
		this.sleectablesteamname = this.allTeamData[0].name;
		this.selectedRoundName('0_0');
		//console.log("$scope.selectedOption11"+$scope.selectedOption.competition_id);
		this.storage.set("teamPlayersRoundId", this.selectedOption.round);
		// this.round_id=this.storage.get("teamPlayersRoundId");
	}


	selectedCompetitionName(selectedItem) {
		// alert(selectedItem);
		this.compitition_id = selectedItem;

		this.storage.set("teamPlayersCompitionId", this.compitition_id);
		// this.compitition_id=this.storage.get("teamPlayersCompitionId");
		// alert(this.compitition_id);
		this.ajax.datalist('get-game-rounds-by-compitition', {
			accessKey: "QzEnDyPAHT12asHb4On6HH2016",
			competition_id: this.compitition_id
		}).subscribe((res) => {
			this.resData = res;
			console.log(res);
			if (this.resData.code == 2 || this.resData.code == 3) {
				this.getAllRoundsByCompetitionsIdfailed(this.resData.message);
				return false;
			} else {
				this.getAllRoundsByCompetitionsIdsuccess(res);
			}
		}, error => {
			this.GetAllcompitionFailed(status);
		})
	}



	getallgamestatssuccess(data) {

		this.cmfn.HideLoading();
		console.log(data.score_feed);
		this.disposalDropData = data.score_feed;
		this.disposalDropData.forEach(item => {
			this.selectablesDisposals.push({
				"stat_name": item.stat_name
			});
		});
		this.selectedOption = this.disposalDropData[0];
		this.someModelDisposal = this.disposalDropData[0];
		this.sleectablesstatname = this.disposalDropData[0].stat_name;
		console.log(this.disposalDropData[0])
		// alert(this.selectedOption.stat_name);
		//console.log("$scope.selectedOption11"+$scope.selectedOption.competition_id);
		this.storage.set("disposalId", this.selectedOption.stat_name);
		this.disposalId = this.selectedOption.id;
		// this.selectedDisposalName(this.someModelDisposal.id);

	}


	//Select Compition Name
	selectedRoundName(selectedItem) {
		// alert(selectedItem)
		if (selectedItem == '0_0' || selectedItem == '' || selectedItem == null) {
			//window.localStorage.setItem("teamPlayersCompitionId", '0_0' );
			// alert('a')
			//$scope.compitition_id=window.localStorage.getItem("teamPlayersCompitionId");
			// this.compitition_id=this.storage.get("teamPlayersCompitionId");
			this.storage.set("teamPlayersRoundId", '0_0');
			this.sleectablesteamname='All';
			this.round_id='0_0';
			// this.round_id=this.storage.get("teamPlayersRoundId");

			// this.disposalId=this.storage.get("disposalId");

			this.cmfn.showLoading('Please wait...');

			this.ajax.datalist('get-team-total-disposals-filter', {
				accessKey: "QzEnDyPAHT12asHb4On6HH2016",
				stat_id: this.disposalId,
				competitions_id: this.compitition_id,
				round: selectedItem
			}).subscribe((res) => {
				this.cmfn.HideLoading();
				console.log(res);
				this.resData = res;
				if (this.resData.code == 2 || this.resData.code == 3) {
					this.cmfn.HideLoading();
					this.getTotalDisposals = [];
					return false;
				} else {
					this.getteamtotaldisposalsfiltersuccess(res);
				}
			}, error => {
				this.cmfn.HideLoading();
				this.getTotalDisposals = [];
			})

		} else {

			this.round_id = selectedItem;
			this.storage.set("teamPlayersRoundId", this.round_id);
			//  this.storage.get('teamPlayersRoundId').then((val) => {
			//         this.round_id=val;
			//  });
			// this.storage.get("teamPlayersCompitionId").then((val)=>{
			// 	this.compitition_id=val;
			// });
			// this.storage.get("disposalId").then((val)=>{
			// 	this.disposalId=val;
			// });
			// alert(this.disposalId)
			//       alert(this.compitition_id)
			this.cmfn.showLoading('Please wait...');
			this.ajax.datalist('get-team-total-disposals-filter', {
				accessKey: "QzEnDyPAHT12asHb4On6HH2016",
				stat_id: this.disposalId,
				competitions_id: this.compitition_id,
				round: this.round_id
			}).subscribe((res) => {
				console.log(res);
				this.resData = res;
				this.cmfn.HideLoading();
				if (this.resData.code == 2 || this.resData.code == 3) {
					this.cmfn.HideLoading();
					this.getTotalDisposals = [];
					return false;
				} else {
					this.getteamtotaldisposalsfiltersuccess(res);
				}
			}, error => {
				this.cmfn.HideLoading();
				this.getTotalDisposals = [];
			})

		}

	}


	selectedDisposalName(selectedItem) {
		// alert(selectedItem)
		if (selectedItem == '0_0' || selectedItem == '' || selectedItem == null) {

			// this.compitition_id=this.storage.get("teamPlayersCompitionId");
			// this.round_id=this.storage.get("teamPlayersRoundId");

			this.storage.set("disposalId", '0_0');
			// this.disposalId=this.storage.get("disposalId");
			this.cmfn.showLoading('Please wait..');
			// alert(this.disposalId)
			// alert(this.round_id)
			// alert(this.compitition_id)
			// UserManagement.teamStatFilter($scope.disposalId,$scope.compitition_id,$scope.round_id);
			this.ajax.datalist('get-team-total-disposals-filter', {
				accessKey: "QzEnDyPAHT12asHb4On6HH2016",
				stat_id: this.disposalId,
				competitions_id: this.compitition_id,
				round: this.round_id
			}).subscribe((res) => {
				console.log(res)
				this.resData = res;
				if (this.resData.code == 2 || this.resData.code == 3) {
					this.cmfn.HideLoading();
					this.getTotalDisposals = [];
					return false;
				} else {
					this.getteamtotaldisposalsfiltersuccess(res);
				}
			}, error => {
				this.cmfn.HideLoading();
				this.getTotalDisposals = [];
			})

		} else {
			this.disposalId = selectedItem;
			//alert($scope.team_id+"====="+$scope.compitition_id);
			this.storage.set("disposalId", this.disposalId);
			// this.disposalId=this.storage.get("disposalId");

			// this.compitition_id=this.storage.get("teamPlayersCompitionId");
			// this.round_id=this.storage.get("teamPlayersRoundId");
			// alert(this.round_id);
			// this.cmfn.showLoading('Please wait..');
			// UserManagement.teamStatFilter($scope.disposalId,$scope.compitition_id,$scope.round_id);
			this.ajax.datalist('get-team-total-disposals-filter', {
				accessKey: "QzEnDyPAHT12asHb4On6HH2016",
				stat_id: this.disposalId,
				competitions_id: this.compitition_id,
				round: this.round_id
			}).subscribe((res) => {
				this.cmfn.HideLoading();
				console.log(res);
				this.resData = res;
				if (this.resData.code == 2 || this.resData.code == 3) {
					this.cmfn.HideLoading();
					this.getTotalDisposals = [];
					return false;
				} else {
					this.getteamtotaldisposalsfiltersuccess(res);
				}
			}, error => {
				this.cmfn.HideLoading();
				this.getTotalDisposals = [];
			})

		}

	}


	getteamtotaldisposalsfiltersuccess(data) {
		this.getTotalDisposals = data.teamStat;
		this.items=this.getTotalDisposals;
		console.log(this.getTotalDisposals);
		this.headerAdv = data.headerAdv;
		console.log(this.headerAdv[0].ad_image);
		this.footerAdv = data.footerAdv;
	}


	//go To goToTeamStatsDetailPage
	goToTeamStatsDetailPage(team_id) {
		console.log("team_id" + team_id);
		console.log(this.round_id)
		this.navCtrl.push('TeamstatdetailsPage',{team_id: team_id,round_id:this.round_id });
	}

	//go To goToGoalKickerpage
	goToGoalKickerpagefunction() {
		// $state.go('app.goalKickers');
	}


	//load More data::

	loadMore() {
		this.getTotalDisposals = [];
		//alert('load more');
		// $scope.$broadcast('scroll.infiniteScrollComplete');
		if (this.getTotalDisposals.length > this.numberOfItemsToDisplay) {
			this.numberOfItemsToDisplay += 10; // load number of more items

		}

	}




	/*For select Modal*/
	getSubString(str) {

		if (window.screen.width <= 360) {
			if (str.length > 10) {

				var subString = str.substring(0, 6);
				return subString + "...";

			} else
				return str;
		} else if (window.screen.width <= 480) {

			if (str.length > 10) {

				var subString = str.substring(0, 6);
				return subString + "...";

			} else
				return str;

		} else
			return str;

	}


	selectedType(type) {
		if (type == 'competion') {
			let modal = this.modalCtrl.create('CommommodelPage', { items: this.getAllCompititions });
			let me = this;
			modal.onDidDismiss(data => {
				console.log(data);
				this.sleectablescompetionname = data.competitions_name
				this.compitition_id = data.competition_id;
				this.cmfn.showLoading('Please wait...');
				this.ajax.datalist('get-team-total-disposals-filter', {
					accessKey: "QzEnDyPAHT12asHb4On6HH2016",
					stat_id: this.disposalId,
					competitions_id: this.compitition_id,
					round: this.round_id
				}).subscribe((res) => {
					this.cmfn.HideLoading();
					console.log(res);
					this.resData = res;
					if (this.resData.code == 2 || this.resData.code == 3) {
						this.cmfn.HideLoading();
						this.getTotalDisposals = [];
						return false;
					} else {
						this.getteamtotaldisposalsfiltersuccess(res);
					}
				}, error => {
					this.cmfn.HideLoading();
					this.getTotalDisposals = [];
				})
			});
			modal.present();
		}
		else if (type == 'round') {
			let modal = this.modalCtrl.create('RoundsmodelPage', { items: this.getAllTeams });
			let me = this;
			modal.onDidDismiss(data => {
				console.log(data);
				this.round_id = data.round;
				this.sleectablesteamname = data.name;
				this.cmfn.showLoading('Please wait..');
				this.ajax.datalist('get-team-total-disposals-filter', {
					accessKey: "QzEnDyPAHT12asHb4On6HH2016",
					stat_id: this.disposalId,
					competitions_id: this.compitition_id,
					round: data.round
				}).subscribe((res) => {
					this.cmfn.HideLoading();
					console.log(res);
					this.resData = res;
					if (this.resData.code == 2 || this.resData.code == 3) {
						this.cmfn.HideLoading();
						this.getTotalDisposals = [];
						return false;
					} else {
						this.getteamtotaldisposalsfiltersuccess(res);
					}
				}, error => {
					this.cmfn.HideLoading();
					this.getTotalDisposals = [];
				})
			});
			modal.present();
		} else {
			let modal = this.modalCtrl.create('GoallistPage', { items: this.disposalDropData });
			let me = this;
			modal.onDidDismiss(data => {
				console.log(data);
				this.disposalId = data.id;
				this.sleectablesstatname = data.stat_name;
				this.cmfn.showLoading('Please wait..');
				this.ajax.datalist('get-team-total-disposals-filter', {
					accessKey: "QzEnDyPAHT12asHb4On6HH2016",
					stat_id: data.id,
					competitions_id: this.compitition_id,
					round: this.round_id
				}).subscribe((res) => {
					this.cmfn.HideLoading();
					console.log(res);
					this.resData = res;
					if (this.resData.code == 2 || this.resData.code == 3) {
						this.cmfn.HideLoading();
						this.getTotalDisposals = [];
						return false;
					} else {
						this.getteamtotaldisposalsfiltersuccess(res);
					}
				}, error => {
					this.cmfn.HideLoading();
					this.getTotalDisposals = [];
				})
			});
			modal.present();
		}
	}


	goToAddSite(ad_url) {
		this.ga.trackEvent('Advertisement', 'Viewed', 'Team Stats - Season', 1);
		const browser = this.inapp.create(ad_url);
	  }
}
