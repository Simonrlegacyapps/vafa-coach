var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
var TeamstatPage = /** @class */ (function () {
    function TeamstatPage(navCtrl, ajax, events, cmfn, storage, navParams) {
        this.navCtrl = navCtrl;
        this.ajax = ajax;
        this.events = events;
        this.cmfn = cmfn;
        this.storage = storage;
        this.navParams = navParams;
        this.selectables = [];
        this.selectablesRound = [];
        this.selectablesDisposals = [];
        this.allCompetionData = [];
        this.numberOfItemsToDisplay = 10;
        this.hideSearchBar = true;
    }
    TeamstatPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad TeamstatPage');
        this.cmfn.showLoading('Please wait...');
        this.ajax.datalist('get-all-competitions', { accessKey: "QzEnDyPAHT12asHb4On6HH2016" }).subscribe(function (res) {
            console.log(res);
            _this.resData = res;
            if (_this.resData.code == 2 || _this.resData.code == 3) {
                _this.GetAllcompitionFailed(_this.resData.message);
                return false;
            }
            else {
                _this.GetAllcompitionSuccess(res);
            }
        }, function (error) {
            _this.GetAllcompitionFailed(status);
        });
        this.ajax.datalist('get-all-game-stats', { accessKey: 'QzEnDyPAHT12asHb4On6HH2016' }).subscribe(function (res) {
            console.log(res);
            _this.getallgamestatssuccess(res);
        }, function (error) {
            console.log(error);
        });
    };
    TeamstatPage.prototype.GetAllcompitionSuccess = function (getAllCompititions) {
        var _this = this;
        this.cmfn.HideLoading();
        console.log("getAllCompititions :::: " + JSON.stringify(getAllCompititions));
        this.getAllCompititions = getAllCompititions.competition;
        this.allCompetionData = getAllCompititions.competition;
        //console.log(data.competition);
        this.allCompetionData.forEach(function (item) {
            _this.selectables.push({
                "competitions_name": item.competitions_name
            });
        });
        this.selectedOption = this.allCompetionData[0];
        this.someModel = this.allCompetionData[0];
        this.selectedCompetitionName(this.someModel.competition_id);
        //console.log("$scope.selectedOption11"+$scope.selectedOption.competition_id);
        this.storage.set("teamPlayersCompitionId", this.selectedOption.competition_id);
        this.compitionId = this.storage.get("teamPlayersCompitionId");
        console.log(this.compitionId);
    };
    TeamstatPage.prototype.GetAllcompitionFailed = function (msg) {
        this.cmfn.HideLoading();
        this.getAllCompititions = "";
    };
    TeamstatPage.prototype.getAllRoundsByCompetitionsIdfailed = function (data) {
        this.cmfn.HideLoading();
    };
    TeamstatPage.prototype.getAllRoundsByCompetitionsIdsuccess = function (data) {
        var _this = this;
        this.getAllTeams = data.totalRounds;
        console.log(this.getAllTeams);
        this.allTeamData = data.totalRounds;
        //console.log(data.competition);
        this.allTeamData.forEach(function (item) {
            _this.selectablesRound.push({
                "name": item.name
            });
        });
        this.selectedOption = this.allTeamData[0];
        this.someModelTeam = this.allTeamData[0];
        this.selectedRoundName(this.someModelTeam.round);
        //console.log("$scope.selectedOption11"+$scope.selectedOption.competition_id);
        this.storage.set("teamPlayersRoundId", this.selectedOption.round);
        this.round_id = this.storage.get("teamPlayersRoundId");
    };
    TeamstatPage.prototype.selectedCompetitionName = function (selectedItem) {
        var _this = this;
        alert(selectedItem);
        this.compitition_id = selectedItem;
        this.storage.set("teamPlayersCompitionId", this.compitition_id);
        this.compitition_id = this.storage.get("teamPlayersCompitionId");
        this.ajax.datalist('get-game-rounds-by-compitition', { accessKey: "QzEnDyPAHT12asHb4On6HH2016",
            competition_id: this.compitition_id
        }).subscribe(function (res) {
            _this.resData = res;
            console.log(res);
            if (_this.resData.code == 2 || _this.resData.code == 3) {
                _this.getAllRoundsByCompetitionsIdfailed(_this.resData.message);
                return false;
            }
            else {
                _this.getAllRoundsByCompetitionsIdsuccess(res);
            }
        }, function (error) {
            _this.GetAllcompitionFailed(status);
        });
        this.cmfn.showLoading('Please wait...');
    };
    TeamstatPage.prototype.getallgamestatssuccess = function (data) {
        var _this = this;
        this.cmfn.HideLoading();
        console.log(data.score_feed);
        this.disposalDropData = data.score_feed;
        this.disposalDropData.forEach(function (item) {
            _this.selectablesDisposals.push({
                "stat_name": item.stat_name
            });
        });
        this.selectedOption = this.disposalDropData[0];
        this.someModelDisposal = this.disposalDropData[0];
        //console.log("$scope.selectedOption11"+$scope.selectedOption.competition_id);
        this.storage.set("disposalId", this.selectedOption.stat_name);
        this.disposalId = this.storage.get("disposalId");
        // this.selectedDisposalName(this.someModelDisposal.id);
    };
    //Select Compition Name			
    TeamstatPage.prototype.selectedRoundName = function (selectedItem) {
        var _this = this;
        //alert(selectedItem)
        if (selectedItem == '0_0' || selectedItem == '' || selectedItem == null) {
            //window.localStorage.setItem("teamPlayersCompitionId", '0_0' ); 
            //$scope.compitition_id=window.localStorage.getItem("teamPlayersCompitionId"); 
            this.compitition_id = this.storage.get("teamPlayersCompitionId");
            this.storage.set("teamPlayersRoundId", '0_0');
            this.round_id = this.storage.get("teamPlayersRoundId");
            this.disposalId = this.storage.get("disposalId");
            this.cmfn.showLoading('Please wait...');
            this.ajax.datalist('get-team-total-disposals-filter', {
                accessKey: "QzEnDyPAHT12asHb4On6HH2016",
                stat_id: this.disposalId,
                competitions_id: this.compitition_id,
                round: this.round_id
            }).subscribe(function (res) {
                _this.resData = res;
                if (_this.resData.code == 2 || _this.resData.code == 3) {
                    _this.cmfn.HideLoading();
                    _this.getTotalDisposals = '';
                    return false;
                }
                else {
                    _this.getteamtotaldisposalsfiltersuccess(res);
                }
            }, function (error) {
                _this.cmfn.HideLoading();
                _this.getTotalDisposals = '';
            });
        }
        else {
            this.round_id = selectedItem;
            this.storage.set("teamPlayersRoundId", this.round_id);
            this.round_id = this.storage.get("teamPlayersRoundId");
            this.compitition_id = this.storage.get("teamPlayersCompitionId");
            this.disposalId = this.storage.get("disposalId");
            this.cmfn.showLoading('Please wait...');
            this.ajax.datalist('get-team-total-disposals-filter', {
                accessKey: "QzEnDyPAHT12asHb4On6HH2016",
                stat_id: this.disposalId,
                competitions_id: this.compitition_id,
                round: this.round_id
            }).subscribe(function (res) {
                console.log(res);
                _this.resData = res;
                if (_this.resData.code == 2 || _this.resData.code == 3) {
                    _this.cmfn.HideLoading();
                    _this.getTotalDisposals = '';
                    return false;
                }
                else {
                    _this.getteamtotaldisposalsfiltersuccess(res);
                }
            }, function (error) {
                _this.cmfn.HideLoading();
                _this.getTotalDisposals = '';
            });
        }
    };
    TeamstatPage.prototype.selectedDisposalName = function (selectedItem) {
        var _this = this;
        // alert(selectedItem)
        if (selectedItem == '0_0' || selectedItem == '' || selectedItem == null) {
            this.compitition_id = this.storage.get("teamPlayersCompitionId");
            this.round_id = this.storage.get("teamPlayersRoundId");
            this.storage.set("disposalId", '0_0');
            this.disposalId = this.storage.get("disposalId");
            this.cmfn.showLoading('Please wait..');
            // UserManagement.teamStatFilter($scope.disposalId,$scope.compitition_id,$scope.round_id);
            this.ajax.datalist('get-team-total-disposals-filter', {
                accessKey: "QzEnDyPAHT12asHb4On6HH2016",
                stat_id: this.disposalId,
                competitions_id: this.compitition_id,
                round: this.round_id
            }).subscribe(function (res) {
                console.log(res);
                _this.resData = res;
                if (_this.resData.code == 2 || _this.resData.code == 3) {
                    _this.cmfn.HideLoading();
                    _this.getTotalDisposals = '';
                    return false;
                }
                else {
                    _this.getteamtotaldisposalsfiltersuccess(res);
                }
            }, function (error) {
                _this.cmfn.HideLoading();
                _this.getTotalDisposals = '';
            });
        }
        else {
            this.disposalId = selectedItem;
            //alert($scope.team_id+"====="+$scope.compitition_id);
            this.storage.set("disposalId", this.disposalId);
            this.disposalId = this.storage.get("disposalId");
            this.compitition_id = this.storage.get("teamPlayersCompitionId");
            this.round_id = this.storage.get("teamPlayersRoundId");
            this.cmfn.showLoading('Please wait..');
            // UserManagement.teamStatFilter($scope.disposalId,$scope.compitition_id,$scope.round_id);
            this.ajax.datalist('get-team-total-disposals-filter', {
                accessKey: "QzEnDyPAHT12asHb4On6HH2016",
                stat_id: this.disposalId,
                competitions_id: this.compitition_id,
                round: this.round_id
            }).subscribe(function (res) {
                console.log(res);
                _this.resData = res;
                if (_this.resData.code == 2 || _this.resData.code == 3) {
                    _this.cmfn.HideLoading();
                    _this.getTotalDisposals = '';
                    return false;
                }
                else {
                    _this.getteamtotaldisposalsfiltersuccess(res);
                }
            }, function (error) {
                _this.cmfn.HideLoading();
                _this.getTotalDisposals = '';
            });
        }
    };
    TeamstatPage.prototype.getteamtotaldisposalsfiltersuccess = function (data) {
        this.getTotalDisposals = data.teamStat;
        //alert($scope.getTotalDisposals);
        this.headerAdv = data.headerAdv;
        console.log(this.headerAdv[0].ad_image);
        this.footerAdv = data.footerAdv;
    };
    //go To goToTeamStatsDetailPage 
    TeamstatPage.prototype.goToTeamStatsDetailPage = function (team_id) {
        console.log("team_id" + team_id);
        // $state.go('app.teamStatsDetail',{team_id: team_id });
    };
    //go To goToGoalKickerpage     
    TeamstatPage.prototype.goToGoalKickerpagefunction = function () {
        // $state.go('app.goalKickers');
    };
    //load More data::
    TeamstatPage.prototype.loadMore = function () {
        this.getTotalDisposals = [];
        //alert('load more');
        // $scope.$broadcast('scroll.infiniteScrollComplete');
        if (this.getTotalDisposals.length > this.numberOfItemsToDisplay) {
            this.numberOfItemsToDisplay += 10; // load number of more items
        }
    };
    //search bar code :	
    TeamstatPage.prototype.showFilterBar = function () {
        this.hideSearchBar = false;
        var filterBarInstance;
        /* filterBarInstance = $ionicFilterBar.show({
        items: $scope.goalKickers,
        update: function (filteredItems, filterText) {
          $scope.goalKickers = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
        });*/
    };
    TeamstatPage.prototype.cancelSearchBar = function () {
        this.hideSearchBar = true;
    };
    /*For select Modal*/
    TeamstatPage.prototype.getSubString = function (str) {
        if (window.screen.width <= 360) {
            if (str.length > 10) {
                var subString = str.substring(0, 6);
                return subString + "...";
            }
            else
                return str;
        }
        else if (window.screen.width <= 480) {
            if (str.length > 10) {
                var subString = str.substring(0, 6);
                return subString + "...";
            }
            else
                return str;
        }
        else
            return str;
    };
    TeamstatPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-teamstat',
            templateUrl: 'teamstat.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AjaxProvider,
            Events,
            CommomfunctionProvider,
            Storage,
            NavParams])
    ], TeamstatPage);
    return TeamstatPage;
}());
export { TeamstatPage };
//# sourceMappingURL=teamstat.js.map