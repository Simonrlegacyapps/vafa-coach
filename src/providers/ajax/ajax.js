var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Events } from 'ionic-angular';
/*
  Generated class for the AjaxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AjaxProvider = /** @class */ (function () {
    function AjaxProvider(http, events) {
        this.http = http;
        this.events = events;
        console.log('Hello AjaxProvider Provider');
    }
    AjaxProvider.prototype.postMethod = function (category, params) {
        console.log(category);
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        return this.http
            .post('http://vafalive.com.au/score/default/' + category, params, config)
            .map(function (res) { return res; })
            .catch(function (error) { return error; });
    };
    AjaxProvider.prototype.post = function (category, params) {
        console.log(category);
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        return this.http
            .post('http://vafalive.com.au/score/' + category, params, config)
            .map(function (res) { return res; })
            .catch(function (error) { return error; });
    };
    AjaxProvider.prototype.getcompetionlist = function (category, params, key) {
        var _this = this;
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        this.http
            .post('http://vafalive.com.au/score/default/' + category, params, config)
            .subscribe(function (res) {
            console.log(res);
            _this.events.publish('competitionlist' + key + ':changed', res);
            // console.log(this.newsData);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    AjaxProvider.prototype.data = function (category, params) {
        var _this = this;
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        this.http
            .post('http://vafalive.com.au/score/default/' + category, params, config)
            .subscribe(function (res) {
            console.log(res);
            _this.events.publish('datalist:changed', res);
            // console.log(this.newsData);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    AjaxProvider.prototype.datalist = function (category, params) {
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        return this.http
            .post('http://vafalive.com.au/score/default/' + category, params, config)
            .map(function (res) { return res; })
            .catch(function (error) { return error; });
    };
    AjaxProvider.prototype.datalistaction = function (category, params, Type) {
        var _this = this;
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        this.http
            .post('http://vafalive.com.au/score/default/' + category, params, config)
            .subscribe(function (res) {
            console.log(res);
            _this.events.publish('datalistaction_' + Type + ':changed', res);
            // console.log(this.newsData);
        }, function (error) {
            // this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
    };
    AjaxProvider.prototype.postaction = function (category, params) {
        console.log(category);
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        return this.http
            .post('http://vafalive.com.au/score/matchscore/' + category, params, config)
            .map(function (res) { return res; })
            .catch(function (error) { return error; });
    };
    AjaxProvider.prototype.postMethodct = function (category) {
        console.log(category);
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        return this.http
            .post('http://vafalive.com.au/score/default/' + category, { accessKey: 'QzEnDyPAHT12asHb4On6HH2016', }, config)
            .map(function (res) { return res; })
            .catch(function (error) { return error; });
    };
    AjaxProvider.prototype.PaymentpostApi = function (params) {
        console.log(params);
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        return this.http
            .post('http://vafalive.com.au/score/custom/save-payment', params, config)
            .map(function (res) { return res; })
            .catch(function (error) { return error; });
    };
    AjaxProvider.prototype.CheckDeviceData = function (params) {
        console.log(params);
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        return this.http
            .post('http://vafalive.com.au/score/custom/login-webuser-deviceid', params, config)
            .map(function (res) { return res; })
            .catch(function (error) { return error; });
    };
    AjaxProvider.prototype.EditUserData = function (params) {
        console.log(params);
        var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, };
        return this.http
            .post('http://vafalive.com.au/score/custom/save-data', params, config)
            .map(function (res) { return res; })
            .catch(function (error) { return error; });
    };
    AjaxProvider.prototype.UserManagement = function () {
    };
    AjaxProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Events])
    ], AjaxProvider);
    return AjaxProvider;
}());
export { AjaxProvider };
//# sourceMappingURL=ajax.js.map