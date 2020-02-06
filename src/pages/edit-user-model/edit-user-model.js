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
import { Storage } from '@ionic/storage';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { LocalDataProvider } from '../../providers/local-data/local-data';
var EditUserModelPage = /** @class */ (function () {
    function EditUserModelPage(navCtrl, localData, cmnfun, viewCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.localData = localData;
        this.cmnfun = cmnfun;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.editData = {
            device_id: '',
            field: '',
            data: ''
        };
        this.emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        this.mobileValid = /^[(]{0,1}[0]{1}[)\.\]{0,1}[4]{1}[\.\]{0,1}[0-9]{8}$/;
        this.valid = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/;
        this.editData.field = this.navParams.get('type');
        this.editData.data = this.navParams.get('value');
        console.log(this.editData.field);
        console.log(this.editData.data);
        this.editData.device_id = this.localData.GetDevice();
        console.log(this.editData.device_id);
    }
    EditUserModelPage.prototype.Dismiss = function () {
        this.navCtrl.pop();
    };
    EditUserModelPage.prototype.ViewNumber = function (val) {
        if (val.length == 5 && this.editData.field == 'mobile_number') {
            this.editData.data = val.replace(/(.{4})/, '$1 ').trim();
        }
        if (val.length == 9 && this.editData.field == 'mobile_number') {
            this.editData.data = val.replace(/(.{8})/, '$1 ').trim();
        }
    };
    EditUserModelPage.prototype.SaveChanges = function () {
        console.log(this.editData);
        if (this.editData.field == 'user_email' && (this.editData.data == '' || !this.emailValid.test(this.editData.data))) {
            this.cmnfun.showToast('Enter valid email');
        }
        else if (this.editData.field == 'first_name' && this.editData.data == '') {
            this.cmnfun.showToast('Enter name');
        }
        else if (this.editData.field == 'mobile_number' && (this.editData.data == '' || !this.valid.test(this.editData.data))) {
            this.cmnfun.showToast('Enter valid mobile number');
        }
        else {
            this.viewCtrl.dismiss(this.editData);
        }
    };
    EditUserModelPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-user-model',
            templateUrl: 'edit-user-model.html',
        }),
        __metadata("design:paramtypes", [NavController,
            LocalDataProvider,
            CommomfunctionProvider,
            ViewController,
            NavParams,
            Storage])
    ], EditUserModelPage);
    return EditUserModelPage;
}());
export { EditUserModelPage };
//# sourceMappingURL=edit-user-model.js.map