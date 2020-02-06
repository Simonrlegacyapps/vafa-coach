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
@IonicPage()
@Component({
  selector: 'page-teamstatdetails',
  templateUrl: 'teamstatdetails.html',
})
export class TeamstatdetailsPage {
  @ViewChild(Content) content: Content;

  // path = 'http://vafalive.com.au';
  path: any = environment.baseURL;
  advHide: boolean = false;
  advDisplay: boolean = true;
  team_id: any = '';
  resData: any = '';
  teamName: any = '';
  teamAbbrName: any = '';
  teamImage: any = '';
  ladderPosition: any = '';
  ladderLoss: any = '';
  ladderDraws: any = '';
  ladderWon: any = '';
  avgPtsFor: any = '';
  avgPtsAgainst: any = '';
  getStatDetailsavgMargin: any = [];
  getStatDetailslastmatch: any = [];
  getStatDetailsStats: any = [];
  knob: any = '';
  knobAvg: any = '';
  advertisementHeader: any = [];
  advertisementFooter: any = [];
  Hdrimg:any='';
  Ftrimg:any='';
  modifiedState: any = [];
  sortedStated: any = [];


  constructor(public navCtrl: NavController,
    public ajax: AjaxProvider,
    public events: Events,
    public zone:NgZone,
    public plt:Platform,
    private inapp: InAppBrowser,
    public ga:FirebaseAnalyticsProvider,
    public cmfn: CommomfunctionProvider,
    public navParams: NavParams) {
    this.team_id = navParams.get('team_id');

    this.plt.ready().then(() => {
      this.ga.startTrackerWithId('UA-118996199-1')
     .then(() => {
       console.log('Google analytics is ready now');
        this.ga.trackView('Team Stats Individual - Season');
        this.ga.trackTiming('Team Stats Individual - Season', 1000, 'Duration', 'Time');
        // this.ga.trackEvent('Advertisement', 'Viewed', 'TeamStatDetails Page', 1);
     })
     .catch(e => console.log('Error starting GoogleAnalytics', e));
       })
  }

  ionViewDidLoad() {
    //getStatDetailsByTeamId
    this.cmfn.showLoading('Please Wait..');
    this.ajax.datalist('get-team-stats-details', {
      accessKey: "QzEnDyPAHT12asHb4On6HH2016",
      team_id: this.team_id
    }).subscribe((res) => {
      this.cmfn.HideLoading();
      console.log(res);
      this.resData = res;
      if (this.resData.code == 2 || this.resData.code == 3) {
        return false;
      } else {
        this.GetStatDetailsByTeamid(this.resData);
      }

    }, error => {
      this.cmfn.HideLoading();
    })
  }


  onScroll()
		{
      var moveData =this.content.scrollTop;
				if(moveData >= 375)
				{
          this.zone.run(() => {
            this.advHide= true;
						this.advDisplay= false;
        });
				}
				else
					{
            this.zone.run(() => {
              this.advHide= false;
              this.advDisplay= true;
          });
					}
			}


  GetStatDetailsByTeamid(getStatDetailsByTeamId) {
    // console.log("getStatDetailsByTeamId" + JSON.stringify(getStatDetailsByTeamId));
    this.teamName = getStatDetailsByTeamId.team.team_team;
    this.teamAbbrName = getStatDetailsByTeamId.team.team_abbrevation

    this.teamImage = getStatDetailsByTeamId.team.team_image;

    this.ladderPosition = getStatDetailsByTeamId.ladder.position;
    this.ladderLoss = getStatDetailsByTeamId.ladder.loss;
    this.ladderDraws = getStatDetailsByTeamId.ladder.draws;
    this.ladderWon = getStatDetailsByTeamId.ladder.won;
    this.avgPtsFor = getStatDetailsByTeamId.ladder.avg_ponts_for;
    this.avgPtsAgainst = getStatDetailsByTeamId.ladder.avg_points_againgst;

    this.getStatDetailsavgMargin = getStatDetailsByTeamId.avgMargin;
    this.getStatDetailslastmatch = getStatDetailsByTeamId.lastmatch;
    console.log("getStatDetailslastmatch :::: " + this.getStatDetailslastmatch);
    this.getStatDetailsStats = getStatDetailsByTeamId.stats;

    var getStatDetailseff_cal_knob = getStatDetailsByTeamId.eff_cal.knob;
    getStatDetailseff_cal_knob = getStatDetailseff_cal_knob.split('%');
    this.knob = getStatDetailseff_cal_knob[0];

    var getStatDetailseff_cal_knobAvg = getStatDetailsByTeamId.eff_cal.knobAvg;
    getStatDetailseff_cal_knobAvg = getStatDetailseff_cal_knobAvg.split('%');
    this.knobAvg = getStatDetailseff_cal_knobAvg[0];
    //$state.go('app.goalKickersDetails');

    this.advertisementHeader = getStatDetailsByTeamId.headerAdv;
    this.Hdrimg=this.advertisementHeader[0].ad_image;
    console.log(this.Hdrimg);
    this.advertisementFooter = getStatDetailsByTeamId.footerAdv;
    this.Ftrimg=this.advertisementFooter[0].ad_image;

    this.modifiedState = ["Goals",
      "Rush Behinds",
      "Kicks",
      "Handballs",
      "Disposals",
      "Inside 50s",
      "Marks",
      "Tackles",
      "Frees For",
      "Hit Outs"];

    this.getStatDetailsStats.forEach((item, index) => {
      if (item.stat_name == "Rush Behinds") {
        item["Rush Behinds"] = parseInt((this.getStatDetailsStats[2]["Rush Behinds"]) + (this.getStatDetailsStats[1]["Behinds"]));
        item.stat_avg = parseInt((item.stat_avg) + (this.getStatDetailsStats[1].stat_avg));
      }
      this.getColorWidth(index, item[item.stat_name], item.stat_avg);
    });

    this.getStatDetailsStats[1] = this.getStatDetailsStats[2];

    this.getStatDetailsStats.splice(2, 1);

    this.sortedStated = [];

    this.modifiedState.forEach(item => {
      this.getObject(item);
    });

    console.log(this.sortedStated);
  }

  getObject(stateName) {
    this.getStatDetailsStats.forEach((item, index) => {
      if (stateName == item.stat_name) {
        this.sortedStated.push(item);
        return item;
      }
    });
  }

  getColorWidth(key, homeTeamValue, awayTeamValue) {
    //alert(homeTeamValue+"-----"+awayTeamValue)
    var barValueH = homeTeamValue;
    var barValueA = awayTeamValue;
    var homeBarsSpanVal = homeTeamValue;
    var awayBarsSpanVal = awayTeamValue;
    //alert(barValueA.toString().length);
    var maxAway = 4;

    if (parseInt(homeBarsSpanVal) > parseInt(awayBarsSpanVal)) {
      this.getStatDetailsStats[key].homeTeamColor = '#60BA72';
      this.getStatDetailsStats[key].awayTeamColor = '#596682';
      this.getStatDetailsStats[key].homeTeamOnlyColor = 'green';
      this.getStatDetailsStats[key].awayTeamOnlyColor = 'gray';

      if (homeBarsSpanVal <= 50) {
        this.getStatDetailsStats[key].homeTeamWidth = "27%";
      } else if (homeBarsSpanVal > 50 && homeBarsSpanVal <= 100) {
        this.getStatDetailsStats[key].homeTeamWidth = "35%";
      } else if (homeBarsSpanVal > 100 && homeBarsSpanVal <= 500) {
        this.getStatDetailsStats[key].homeTeamWidth = "45%";
      } else if (homeBarsSpanVal > 500 && homeBarsSpanVal <= 999) {
        this.getStatDetailsStats[key].homeTeamWidth = "55%";
      } else if (homeBarsSpanVal > 999 && homeBarsSpanVal <= 1500) {
        this.getStatDetailsStats[key].homeTeamWidth = "65%";
      } else if (homeBarsSpanVal > 1500 && homeBarsSpanVal <= 2000) {
        this.getStatDetailsStats[key].homeTeamWidth = "75%";
      } else if (homeBarsSpanVal > 2000 && homeBarsSpanVal <= 3200) {
        this.getStatDetailsStats[key].homeTeamWidth = "85%";
      } else if (homeBarsSpanVal > 3200 && homeBarsSpanVal <= 4500) {
        this.getStatDetailsStats[key].homeTeamWidth = "95%";
      } else if (homeBarsSpanVal > 4500 && homeBarsSpanVal <= 6500) {
        this.getStatDetailsStats[key].homeTeamWidth = "100%";
      } else if (homeBarsSpanVal > 6500 && homeBarsSpanVal <= 10000) {
        this.getStatDetailsStats[key].homeTeamWidth = "100%";
      } else if (homeBarsSpanVal == 0) {
        this.getStatDetailsStats[key].homeTeamWidth = "22%";
      } if (awayBarsSpanVal <= 50) {
        this.getStatDetailsStats[key].awayTeamWidth = "25%";
      } else if (awayBarsSpanVal > 50 && awayBarsSpanVal <= 100) {
        this.getStatDetailsStats[key].awayTeamWidth = "35%";
      } else if (awayBarsSpanVal > 100 && awayBarsSpanVal <= 500) {
        this.getStatDetailsStats[key].awayTeamWidth = "45%";
      } else if (awayBarsSpanVal > 500 && awayBarsSpanVal <= 999) {
        this.getStatDetailsStats[key].awayTeamWidth = "55%";
      } else if (awayBarsSpanVal > 999 && awayBarsSpanVal <= 1500) {
        this.getStatDetailsStats[key].awayTeamWidth = "65%";
      } else if (awayBarsSpanVal > 1500 && awayBarsSpanVal <= 2000) {
        this.getStatDetailsStats[key].awayTeamWidth = "75%";
      } else if (awayBarsSpanVal > 2000 && awayBarsSpanVal <= 3200) {
        this.getStatDetailsStats[key].awayTeamWidth = "85%";
      } else if (awayBarsSpanVal > 3200 && awayBarsSpanVal <= 4500) {
        this.getStatDetailsStats[key].awayTeamWidth = "95%";
      } else if (awayBarsSpanVal > 4500 && awayBarsSpanVal <= 6500) {
        this.getStatDetailsStats[key].awayTeamWidth = "100%";
      } else if (awayBarsSpanVal > 6500 && awayBarsSpanVal <= 10000) {
        this.getStatDetailsStats[key].awayTeamWidth = "100%";
      } else if (awayBarsSpanVal == 0) {
        this.getStatDetailsStats[key].awayTeamWidth = "22%";
      }

    } else if (parseInt(homeBarsSpanVal) < parseInt(awayBarsSpanVal)) {
      //alert(barValueH.toString().length+"---"+barValueA.toString().length);
      this.getStatDetailsStats[key].awayTeamColor = '#60BA72';
      this.getStatDetailsStats[key].homeTeamColor = '#596682';
      this.getStatDetailsStats[key].awayTeamOnlyColor = 'green';
      this.getStatDetailsStats[key].homeTeamOnlyColor = 'gray';
      if (awayBarsSpanVal > 100)
        var modifedMaxValue = parseInt(barValueA) + parseInt(barValueH);
      else
        var modifedMaxValue = parseInt(barValueA) + maxAway;

       var percentageUnit = (100 / modifedMaxValue);

      this.getStatDetailsStats[key].awayTeamWidth = (percentageUnit * barValueA) + "%";


      if (parseInt(barValueH) == 0) {
        this.getStatDetailsStats[key].homeTeamWidth = "22%";
      }
      else if (barValueH.length > 2 && (percentageUnit * barValueH) < 33) {
        this.getStatDetailsStats[key].HomeTeamWidth = "35%";

      }
      else {
        if (percentageUnit * barValueH < 27)
          this.getStatDetailsStats[key].homeTeamWidth = "33%";
        else
          this.getStatDetailsStats[key].homeTeamWidth = (percentageUnit * barValueH) + "%";
      }
    }
    else {
      this.getStatDetailsStats[key].awayTeamColor = 'Orange';
      this.getStatDetailsStats[key].homeTeamColor = 'Orange';
      this.getStatDetailsStats[key].homeTeamWidth = "30%";
      this.getStatDetailsStats[key].awayTeamWidth = "30%";
    }

  }


	goToAddSite(ad_url) {
    this.ga.trackEvent('Advertisement', 'Viewed', 'Team Stats Individual - Season', 1);
		const browser = this.inapp.create(ad_url);
	  }

}
