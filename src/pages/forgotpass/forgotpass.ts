import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {
  data: any = { userEmail: '' };
  result: any = [];
  constructor(public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider,
    public storage: Storage,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpassPage');
    this.storage.get('userEmail').then((val) => {
      console.log(val)
      this.data.userEmail = val;

    });
  }
  changePassword() {
    if (this.data.userEmail == '') {
      alert('Enter valid email!');
    } else {
      this.cmnfun.showLoading('Please wait...');
      this.ajax.post('new/forget-password', {
        email: this.data.userEmail
      }).subscribe((res) => {
        this.cmnfun.HideLoading();
        console.log(res);
        this.result = res
        if (this.result.code == 1) {
          this.cmnfun.showToast2('We’ve just sent you an email. You might need to check your spam folder.');
          this.navCtrl.push('RegisteredpassPage');
        }
        else if (this.result.code == 4) {
          this.cmnfun.showToast2('Please enter registered email!');
        }
      }, error => {
        this.cmnfun.HideLoading();
        this.cmnfun.showToast2('Some thing Unexpected happen please try again');
      });

    }
  }
}
