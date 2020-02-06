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
import { Storage } from '@ionic/storage';
/*
  Generated class for the LocalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LocalDataProvider = /** @class */ (function () {
    function LocalDataProvider(http, Storage) {
        var _this = this;
        this.http = http;
        this.Storage = Storage;
        this.UserFavouriteData = {
            FavTeam: '',
            FavComp: ''
        };
        console.log('Hello LocalDataProvider Provider');
        this.Storage.get('FullData').then(function (val) {
            // console.log(val.webuserteam.team_name);
            // alert(JSON.stringify(val));
            if (val) {
                // alert(val.webuserteam.team_name);
                // alert(val.webusercompetition.competitions_name);
                if (val.webuserteam !== null && val.webusercompetition != null) {
                    _this.UserFavouriteData = {
                        FavTeam: val.webuserteam.team_name,
                        FavComp: val.webusercompetition.competitions_name
                    };
                }
            }
        });
    }
    LocalDataProvider.prototype.StoreData = function (data) {
        this.LocalData = data;
    };
    LocalDataProvider.prototype.StoreDevice = function (data) {
        this.DeviceData = data;
    };
    LocalDataProvider.prototype.StoreUserFav = function (data) {
        console.log(data);
        this.fulldata = data;
        if (data.webuserteam != null && data.webusercompetition != null) {
            this.UserFavouriteData = {
                FavTeam: data.webuserteam.team_name,
                FavComp: data.webusercompetition.competitions_name
            };
        }
        if (data.webuserteam != null) {
            this.UserFavouriteData.FavTeam = data.webuserteam.team_name;
        }
        if (data.webusercompetition != null) {
            this.UserFavouriteData.FavComp = data.webusercompetition.competitions_name;
        }
    };
    LocalDataProvider.prototype.GetData = function () {
        return this.LocalData;
    };
    LocalDataProvider.prototype.GetDevice = function () {
        return this.DeviceData;
    };
    LocalDataProvider.prototype.GetUserFav = function () {
        return this.UserFavouriteData;
    };
    LocalDataProvider.prototype.getallfulldata = function () {
        return this.fulldata;
    };
    LocalDataProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Storage])
    ], LocalDataProvider);
    return LocalDataProvider;
}());
export { LocalDataProvider };
//# sourceMappingURL=local-data.js.map