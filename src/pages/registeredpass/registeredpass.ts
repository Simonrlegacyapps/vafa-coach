import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { NewaccountPage } from '../newaccount/newaccount';


@IonicPage()
@Component({
	selector: 'page-registeredpass',
	templateUrl: 'registeredpass.html',
})
export class RegisteredpassPage {
	getPassword1: any = { user_password: '' }
	showPassword: boolean = false;
	subscriptionCheck: any; userSubscription: any; isLogin: any; disableLogin: any;
	email: any;
	fulluserdetails: any = [];
	constructor(public events: Events, public localData: LocalDataProvider, public alertCtrl: AlertController,
		public ajax: AjaxProvider, public cmnfun: CommomfunctionProvider, public Storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
		Storage.get('userEmail').then((val) => {
			if (val) {
				this.email = val;
				console.log(this.email);
			}
		})
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RegisteredpassPage');
	}
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
	goToAccountTab() {
		if (this.getPassword1.user_password == "") {
			this.cmnfun.showToast2('Please enter password');
		} else {
			this.cmnfun.showLoading('Please wait...');
			this.ajax.post('custom/login-webuser', {
				email: this.email,
				password: this.getPassword1.user_password
			}).subscribe((res) => {
				this.cmnfun.HideLoading();
				console.log(res);
				this.fulluserdetails = res;
				if (this.fulluserdetails.code == 3) {
					this.events.publish('userlogin',true);
					this.localData.StoreData(this.fulluserdetails.webuser);
					this.Storage.set("userData", JSON.stringify(this.fulluserdetails.webuser));
					this.Storage.set('checkLogin', this.fulluserdetails.webuser);
					this.Storage.set('FullData',this.fulluserdetails);

					if(this.localData.LoginTo()=='LandingpagePage'){
						this.navCtrl.push(this.localData.LoginTo());
            }else{
              if(this.localData.getBckpage() != '' && this.localData.getBckpage() != undefined){
                let det = this.localData.getBckdata().details;
                let yr = this.localData.getBckdata().year;
                let pr = this.localData.getBckdata().parent;
                this.localData.SetBack('','','','');
                this.navCtrl.push('InnermatchcenterPage', { details: det, year :yr ,stats : true});
              }else{
                this.events.publish('menuchange2:changed', 'HomePage');
                this.navCtrl.setRoot(HomePage);
              }

					  }

				} else if (this.fulluserdetails.code == 4) {
					let alert = this.alertCtrl.create({
						subTitle: 'Incorrect Password',
						cssClass: 'CusttoastCtrl',
						buttons: ['OK']
					});
					alert.present();
				}
				else if (this.fulluserdetails.code == 7) {
					this.cmnfun.showToast2('Somthing went wrong. Try Again !');
				}
				else if (this.fulluserdetails.code == 1) {
					this.subscriptionCheck = 1;  // change made on 21 June 17  instead of  if(this.subscription==1){
					if (this.subscriptionCheck == 1) {
						this.userSubscription = 1;
						var item2 = {
							isLogin: 1,
							disableLogin: 1
						}
						this.Storage.set('subscription', 1);
						this.events.publish('userlogin:changed', item2);

					} else {
						this.userSubscription = 1;
						var item3 = {
							isLogin: 0,
							disableLogin: 0
						}
						this.events.publish('userlogin:changed', item3);
					}
				}

			}, error => {
				this.cmnfun.HideLoading();
				this.cmnfun.showToast2('Some thing Unexpected happen please try again');
			});

		}

	}
	forgotpass() {
		this.navCtrl.push('ForgotpassPage');
	}
}
