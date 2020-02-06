import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Events } from 'ionic-angular';
import { CommomfunctionProvider } from "../commomfunction/commomfunction";
import { environment } from '../../environments/environment';
/*
  Generated class for the AjaxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// Main base url http://vafalive.com.au
// development test server url  http://54.244.98.247/
// staging url : http://v2.vafalive.com.au/

// const baseurl = 'http://v2.vafalive.com.au';
const baseurl = environment.baseURL;
// const baseurl = 'http://52.89.30.220';



@Injectable()
export class AjaxProvider {

  constructor(public http: HttpClient, public events: Events,public cmnfun:CommomfunctionProvider ) {
    console.log('Hello AjaxProvider Provider');

  }

  GetAllPurchases(params) {
    console.log(params);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post(baseurl+'/score/custom/get-user-payment-details',
      params, config)
      .map(res => res)
      .catch(error => error)
  }

  postMethod(category, params) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post(baseurl+'/score/default/' + category,
      params, config)
      .map(res => res)
      .catch(error => error)
  }

  post(category, params) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post(baseurl+'/score/' + category,
      params, config)
      .map(res => res)
      .catch(error => error)
  }
  getcompetionlist(category, params, key) {
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    this.http
      .post(baseurl+'/score/default/' + category,
      params, config)
      .subscribe((res) => {
        console.log(res);
        this.events.publish('competitionlist' + key + ':changed', res);
        // console.log(this.newsData);
      }, error => {
        this.cmnfun.hideLoader();
        this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
  }
  data(category, params) {
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    this.http
      .post(baseurl+'/score/default/' + category,
      params, config)
      .subscribe((res) => {
        console.log(res);
        this.events.publish('datalist:changed', res);
        // console.log(this.newsData);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
  }
  datalist(category, params) {
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post(baseurl+'/score/default/' + category,
      params, config)
      .map(res => res)
      .catch(error => error)
  }
  datalistaction(category, params, Type) {
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    this.http
      .post(baseurl+'/score/default/' + category,
      params, config)
      .subscribe((res) => {
        console.log(res);
        this.events.publish('datalistaction_' + Type + ':changed', res);
        // console.log(this.newsData);
      }, error => {
        // this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
  }

  postaction(category, params) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post(baseurl+'/score/matchscore/' + category,
      params, config)
      .map(res => res)
      .catch(error => error)
  }

  // get all teams by year
  GetMatchTeam(params) {
    console.log(params)
   var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
   return this.http
     .post(baseurl+'/score/custom/get-all-teams-by-year',
     params, config)
     .map(res => res)
     .catch(error => error)
 }
  //
  // get fixture data for single game pass
  FixtureDataApi(params) {
    console.log(params)
   var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
   return this.http
     .post(baseurl+'/score/custom/get-fixture-details',
     params, config)
     .map(res => res)
     .catch(error => error)
 }
  //

  // get all competition year wise api
  GetMatchComp(category, params) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post(baseurl+'/score/default/' + category,
      params, config)
      .map(res => res)
      .catch(error => error)
  }
  // postmethodct

   postMethodct(category) {
    console.log(category);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
    .post(baseurl+'/score/default/'+category,
        {accessKey: 'QzEnDyPAHT12asHb4On6HH2016',}, config)
        .map(res => res)
        .catch(error=>error)
  }

   PaymentpostApi(params) {
     console.log(params)
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      // .post('http://54.244.98.247/score/custom/save-payment-email',
      .post(baseurl+'/score/custom/save-payment-email-all',
      params, config)
      .map(res => res)
      .catch(error => error)
  }

  CheckDeviceData(params) {
     console.log(params)
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post(baseurl+'/score/custom/login-webuser-deviceid-payment',
      params, config)
      .map(res => res)
      .catch(error => error)
  }

   EditUserData(params) {
     console.log(params)
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
    return this.http
      .post(baseurl+'/score/custom/save-data-email',
      params, config)
      .map(res => res)
      .catch(error => error)
  }

  CheckTrialPeriod(params) {
    console.log(params)
   var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
   return this.http
     .post(baseurl+'/score/custom/check-trial-period',
     params, config)
     .map(res => res)
     .catch(error => error)
 }



}
