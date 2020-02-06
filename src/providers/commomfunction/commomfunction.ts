import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataProvider } from '../local-data/local-data';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';

import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
// import { Geolocation } from '@ionic-native/geolocation';
// import { Storage } from '@ionic/storage';
// import { AjaxProvider } from '../ajax/ajax';

@Injectable()
export class CommomfunctionProvider {
  loading: any;
  custmLoading: any;
  userdetails: any;
  ImgRes: any;

  constructor(public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public localData: LocalDataProvider,
    public alertCtrl: AlertController,
    public events: Events,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
    console.log('Hello CommomfunctionProvider Provider');

  }

  showToast(msg: string) {
    // let toast = this.toastCtrl.create({
    //   message: msg,
    //   cssClass: 'toastCtrl',
    //   duration: 1000,
    //   position: 'middle'
    // });
    // toast.present();
    let msg1 = 'Oops! Something went wrong. Try closing and re-opening the App.'
    let alert = this.alertCtrl.create({
      subTitle: msg1,
      cssClass: 'CusttoastCtrl',
      buttons: ['OK']
    });
    alert.present();
  }

  showToast2(msg: string) {
    let alert = this.alertCtrl.create({
      subTitle: msg,
      cssClass: 'CusttoastCtrl',
      buttons: ['OK']
    });
    alert.present();
  }

  CustshowToast(msg: string) {
    // let toast = this.toastCtrl.create({
    //   message: msg,
    //   cssClass: 'toastCtrl',
    //   position: 'middle',
    //   duration: 1000,
    //   // showCloseButton: true,
    //   // closeButtonText:'OK'
    // });
    // toast.present();
    let alert = this.alertCtrl.create({
      subTitle: msg,
      cssClass: 'CusttoastCtrl',
      buttons: ['OK']
    });
    alert.present();
  }



  loadjd(msg) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: msg,
      cssClass: 'loading-class-my'
    });
    this.loading.present();
  }


  showLoading(msg) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      cssClass: 'my-loading-class',
      // content: msg
    });
    this.loading.present();
  }

  Loading(msg) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: msg,
      cssClass: 'loading-class-my'
    });
    this.loading.present();

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  }

  Load() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'WELCOME\nVAFA Live Official App.',
      cssClass: 'CustLoadCtrl',
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  }

  HideLoading() {
    this.loading.dismiss();
  }

  HideLoad() {
    this.loading.dismiss();
  }

  showLoader(msg) {
    this.custmLoading = this.loadingCtrl.create({
      spinner: 'hide',
      cssClass: 'my-loading-class',
      // content: msg
    });
    this.custmLoading.present();
  }

  hideLoader() {
    this.custmLoading.dismiss();
  }

  UploadImgServer(url) {
    if (!url) {
      return;
    }
    let data = this.localData.GetData();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let imgpath = url.toString();
    let imageName = imgpath.substring(imgpath.lastIndexOf('/') + 1);

    let options: FileUploadOptions = {
      fileKey: 'user_image',
      fileName: imageName,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { 'id': data.id },
      headers: {}
    }
    fileTransfer.upload(imgpath, environment.baseURL + '/score/custom/save-image-email', options)
      .then((data) => {
        this.ImgRes = data.response;
        this.ImgRes = JSON.parse(this.ImgRes);
        this.localData.StoreData(this.ImgRes.webuser);
        this.storage.set("userData", JSON.stringify(this.ImgRes.webuser));
        this.localData.setlocaldata(this.ImgRes.webuser);
        this.storage.set('FullData', this.ImgRes);
        this.events.publish('LocalImageUpdated', this.ImgRes.webuser.user_image);
      }, (err) => {

      });
  }





}
