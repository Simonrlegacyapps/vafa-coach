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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the CompetitionTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompetitionTeamPage = /** @class */ (function () {
    function CompetitionTeamPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.list = {};
        this.list = navParams.get('list');
        this.type = navParams.get('type');
        console.log(this.type);
        console.log(this.list);
    }
    CompetitionTeamPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompetitionTeamPage');
    };
    CompetitionTeamPage.prototype.close = function () {
        var data = {
            type: '',
            value: ''
        };
        this.viewCtrl.dismiss(data);
    };
    CompetitionTeamPage.prototype.itemSelected = function (item) {
        var data = {
            type: this.type,
            value: item
        };
        this.viewCtrl.dismiss(data);
    };
    CompetitionTeamPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-competition-team',
            templateUrl: 'competition-team.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController])
    ], CompetitionTeamPage);
    return CompetitionTeamPage;
}());
export { CompetitionTeamPage };
//# sourceMappingURL=competition-team.js.map