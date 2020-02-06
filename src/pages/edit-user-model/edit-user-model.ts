import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { LocalDataProvider } from '../../providers/local-data/local-data';

@IonicPage()
@Component({
  selector: 'page-edit-user-model',
  templateUrl: 'edit-user-model.html',
})
export class EditUserModelPage {
  @ViewChild('myinput') myinput;

  editData: any = {
    id: '',
    field: '',
    data: ''
  }

  userdata: any = [];
  resData: any;
  emailValid: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  mobileValid: any = /^[(]{0,1}[0]{1}[)\.\]{0,1}[4]{1}[\.\]{0,1}[0-9]{8}$/;
  valid: any = /^\({0,1}((61)(2|4|3|6|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2,6}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/;

  constructor(public navCtrl: NavController,
    public localData: LocalDataProvider,
    public cmnfun: CommomfunctionProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public storage: Storage) {
    this.editData.field = this.navParams.get('type');
    this.editData.data = this.navParams.get('value');
    console.log(this.editData.field);
    console.log(this.editData.data);
    // this.editData.device_id=this.localData.GetDevice();
    this.storage.get('userData').then((val) => {
      if (val) {
        this.userdata = JSON.parse(val);
        console.log(this.userdata);
        this.editData.id = this.userdata.id;
      }
    });
  }

  Dismiss() {
    this.navCtrl.pop();
  }

  ngAfterViewChecked() {
    this.myinput.setFocus();
  }


  ViewNumber(val) {
    if (val.length == 5 && this.editData.field == 'mobile_number') {
      this.editData.data = val.replace(/(.{4})/, '$1 ').trim();
    }
    if (val.length == 9 && this.editData.field == 'mobile_number') {

      this.editData.data = val.replace(/(.{8})/, '$1 ').trim();
    }
  }

  SaveChanges() {
    console.log(this.editData)
    if (this.editData.field == 'user_email' && (this.editData.data == '' || !this.emailValid.test(this.editData.data))) {
      this.cmnfun.showToast('Enter valid email');
    } else if (this.editData.field == 'first_name' && this.editData.data == '') {
      this.cmnfun.showToast('Enter name');
    } else if (this.editData.field == 'mobile_number' && (this.editData.data == '' || !this.valid.test(this.editData.data))) {
      this.cmnfun.showToast('Invalid number');
    } else {
      console.log(this.editData)
      this.viewCtrl.dismiss(this.editData);
    }
  }
}
