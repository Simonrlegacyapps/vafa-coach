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
import { DomSanitizer } from '@angular/platform-browser';
// import { SafePipe } from '../../pipes/safe/safe';
/**
 * Generated class for the CommommodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CommommodelPage = /** @class */ (function () {
    function CommommodelPage(navCtrl, viewCtrl, navParams, sanitizer) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.items = [];
        this.items = navParams.get('items');
        // this.url=this.sanitizer.bypassSecurityTrustResourceUrl(url_test);
        // console.log(this.url.changingThisBreaksApplicationSecurity);
    }
    CommommodelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommommodelPage');
    };
    CommommodelPage.prototype.itemSelected = function (item) {
        this.viewCtrl.dismiss(item);
    };
    CommommodelPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-commommodel',
            templateUrl: 'commommodel.html',
        }),
        __metadata("design:paramtypes", [NavController, ViewController, NavParams, DomSanitizer])
    ], CommommodelPage);
    return CommommodelPage;
}());
export { CommommodelPage };
//# sourceMappingURL=commommodel.js.map