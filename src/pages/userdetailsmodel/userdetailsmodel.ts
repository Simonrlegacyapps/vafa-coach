import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, ViewController,Nav,Platform} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { HomePage } from '../../pages/home/home';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { FirebaseAnalyticsProvider } from '../../providers/firebase-analytics/firebase-analytics';

const proId1 = 'vafa_premium0001';
const proId2 = 'vafa_premium_plus0002';

@IonicPage()
@Component({
  selector: 'page-userdetailsmodel',
  templateUrl: 'userdetailsmodel.html',
})
export class UserdetailsmodelPage {

   masks: any;
   path: any = 'http://vafalive.com.au/web/';

   numberarray:any=[];
   higherproductid:any='';

	 User:any={
    first_name:'',
    last_name:'',
    mobile_number:'',
    email:'',
    device_id:''
          }

  lowerproduct:any='';
  lowerproductid:any='';
  higherproduct:any='';
  userData:any;
  c_productid:any='';
  c_product:any='';

  userimage:any='';

  deviceId:any='';
  resData:any;
  resumesubscribe:any;

  product_one:any="vafa_premium0001";
  product_two:any="vafa_premium_plus0002";

  imageURI:any='';
  imageFileName:any;
  base64Image:any;
  paymentdetails:any=[];
  emailValid: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  mobileValid: any=/^[(]{0,1}[0]{1}[)\.\]{0,1}[4]{1}[\.\]{0,1}[0-9]{8}$/;
  valid:any=/^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/;

  constructor(public navCtrl: NavController, public ajax:AjaxProvider, private iap: InAppPurchase,private plt: Platform,
  	public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public cmnfun: CommomfunctionProvider,
    public nav:Nav,
    public ga:FirebaseAnalyticsProvider,
    public localData:LocalDataProvider,
    public storage: Storage,
    private transfer: FileTransfer,
    private camera: Camera,
    public uniqueDeviceID:UniqueDeviceID,
    public navParams: NavParams) {


    this.userData=this.localData.GetData();
    this.deviceId=this.localData.GetDevice();
    console.log(this.userData);

  this.paymentdetails=navParams.get('paymentdetails');

  console.log(this.paymentdetails);


  if(this.userData){
    this.userimage=this.userData.user_image;
  }

  // this.storage.get('userData').then((val)=>{
  //   if(val){
  //     let userdetails=JSON.parse(val);
       if(this.userData){
          this.User={
            first_name:this.userData.first_name,
            last_name:this.userData.last_name,
            mobile_number:this.userData.mobile_number,
            email:this.userData.user_email,
            device_id:this.userData.device_id,
            competition_id:this.paymentdetails.competition_id,
            team_id:this.paymentdetails.team_id,
            product_id:this.paymentdetails.product_id,
            transaction_id:''
          }
        }else{
           this.User={
            first_name:'',
            last_name:'',
            mobile_number:'',
            email:'',
            device_id:this.userData.device_id,
            competition_id:this.paymentdetails.competition_id,
            team_id:this.paymentdetails.team_id,
            product_id:this.paymentdetails.product_id,
            transaction_id:''
          }
        }
     

     this.plt.ready().then(() => {
      this.iap.getProducts([proId1,proId2])
        .then((products) => {
         // this.ProductDetails=products;
        })
        .catch((err) => {
          console.log(err);
         });

        this.ga.startTrackerWithId('UA-118996199-1')
        .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Payment');
        this.ga.trackTiming('Payment', 1000, 'Duration', 'Time');
        // this.ga.trackEvent("Payment", "Done", "PaymentPage", 1);
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));

        // resume app from background
        // if (this.plt.is('ios')) {
        //   this.resumesubscribe=this.plt.resume.subscribe(()=>{
        //     this.UserSubmit();
        //  })
        // }
       })  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailsmodelPage');
  }

  // ionViewWillUnload() {
  //   if(this.plt.is('ios')){
  //     this.resumesubscribe.unsubscribe();
  //   }
  // }



  getImageGallary(){
     this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
     destinationType: this.camera.DestinationType.FILE_URI
    }).then((imageData) => {
      this.imageURI=imageData;
      this.uploadFile(this.imageURI);
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
      this.cmnfun.showToast(err);
    });
  }


  getImageCamera() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.CAMERA
  }

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
    this.uploadFile(this.imageURI);
  }, (err) => {
    console.log(err);
    this.cmnfun.showToast(err);
  });
}

 ActionSheet(){
     let actionSheet = this.actionSheetCtrl.create({
     title: 'Upload Image',
     buttons: [
       {
         text: 'Camera',
         handler: () => {
           console.log('Camera clicked');
           this.getImageCamera();
         }
       },
       {
         text: 'Gallary',
         handler: () => {
           console.log('Gallary clicked');
           this.getImageGallary();
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
  }

//  image upload function //
  uploadFile(url) {
 
    if(!url){
      return;
    }
  this.cmnfun.Loading('Uploading..');
  const fileTransfer: FileTransferObject = this.transfer.create();

   let imgpath = url.toString();
   let imageName =imgpath.substring(imgpath.lastIndexOf('/') + 1);

  let options: FileUploadOptions = {
    fileKey: 'user_image',
    fileName: imageName,
    chunkedMode: false,
    mimeType: "image/jpeg",
    params: { 'deviceid': this.deviceId },
    headers: {}
  }
      
    fileTransfer.upload(imgpath,'http://vafalive.com.au/score/custom/save-image', options)
    .then((data) => {
      this.cmnfun.HideLoading();
    console.log(data+"Uploaded Successfully");
   
    this.resData=data.response;
    this.resData=JSON.parse(this.resData);
    this.localData.StoreData(this.resData.webuser);
    this.userimage=this.resData.webuser.user_image;
    this.storage.set("userData", JSON.stringify(this.resData.webuser));
    this.cmnfun.showToast("Image uploaded successfully");
    }, (err) => {
    console.log(err);
   
    this.cmnfun.HideLoading();
    this.cmnfun.showToast(err);
  });
}




 ViewNumber(val){
    if(val.length==5)
    {
    this.User.mobile_number=val.replace(/(.{4})/, '$1 ').trim();
    }
     if(val.length==9  ){
    
      this.User.mobile_number=val.replace(/(.{8})/, '$1 ').trim();
    }
  }

  UserSubmit(){
    console.log(this.User)
   if (this.User.email == '' || !this.emailValid.test(this.User.email)) {
      this.cmnfun.CustshowToast('Please enter valid email!');
    } else{
     if(this.User.product_id=='restore'){
      let product1=0;
      let product2=0;
      this.cmnfun.Loading('Please wait processing payment.');
      this.iap.restorePurchases().then(purchases => {
        if(purchases!=[]){
        purchases.forEach(element => {
         if(element.productId == 'vafa_premium_plus0002' && this.User.product_id=='restore'){
            product2=1;
            // this.User.product_id=element.productId;           
            // this.User.transaction_id=element.transactionId;
            this.c_product=element.transactionId;
            this.c_productid=element.productId;
            this.higherproduct=element.transactionId;
            this.higherproductid=element.productId;
          } else if(element.productId == 'vafa_premium0001' && this.User.product_id=='restore'){
            product1=1;
            // this.User.product_id=element.productId;              
            // this.User.transaction_id=element.transactionId;
            this.c_product=element.transactionId;
            this.c_productid=element.productId;
          }
          
        });
        
        if(product1==1 && product2==0){
          this.User.transaction_id= this.c_product;
          this.User.product_id=this.c_productid;
          this.AlreadyPurchased();
        }else if(product2==1 && product1==0){
          this.User.transaction_id=this.c_product;
          this.User.product_id=this.c_productid;
          this.AlreadyPurchased();
        }else if(product1==1 && product2==1){
          this.User.transaction_id=this.higherproduct;
          this.User.product_id=this.higherproductid;
          this.AlreadyPurchased();
        }else{
          this.cmnfun.showToast('Premium pass not purchased,cannot be restored');
          this.nav.setRoot('LandingpagePage');
        }
        }else{
          this.cmnfun.showToast('Premium pass cannot be restored');
            this.nav.setRoot('LandingpagePage');
        }
        
      })
        .catch((err) => {
          this.cmnfun.HideLoading();
          this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
     }else{
      let paidstatus=1;
      this.cmnfun.Loading('Please wait processing payment.');
      this.iap.restorePurchases().then(purchases => {
        if(purchases!=[]){
        purchases.forEach(element => {
          if (element.productId == 'vafa_premium0001' && this.User.product_id=='vafa_premium0001') {
            paidstatus=0; 
            this.User.transaction_id=element.transactionId;
          }else if (element.productId == 'vafa_premium_plus0002' && this.User.product_id=='vafa_premium_plus0002') {
            paidstatus=0;
            this.User.transaction_id=element.transactionId;
          }
        });
        if(paidstatus==1){
          this.Buy();
        }else{
          this.AlreadyPurchased();
        }
        }else{
          this.Buy();
        }
      })
        .catch((err) => {
          this.cmnfun.HideLoading();
          this.cmnfun.showToast('Some thing Unexpected happen please try again');
        });
     }
    }
  }


  AlreadyPurchased(){
    this.ajax.PaymentpostApi(this.User).subscribe((res) => {
      this.cmnfun.HideLoading();
      console.log(res);
      this.resData=res;
      this.localData.StoreData(this.resData.webuser);
      this.localData.StoreUserFav(this.resData);
      this.storage.set('PaymentProcess',1);
      this.storage.set("userData", JSON.stringify(this.resData.webuser));
      this.storage.set('checkLogin', this.resData.webuser);
      this.storage.set('FullData',this.resData);

      this.events.publish('changebanner:changed',true);
      // this.events.publish('gotostats:changed','NewaccountPage' );
      this.events.publish('menuchange2:changed','HomePage' );

      this.plt.ready().then(() => {
      this.ga.trackEvent("Payment", "Done", "Payment", 1);
      });
      this.navCtrl.setRoot(HomePage);
      // this.navCtrl.setRoot('NewaccountPage');   
      }, error => {
      // alert(JSON.stringify(error));
      this.cmnfun.HideLoading();
      this.cmnfun.showToast('Some thing Unexpected happen please try again');
      })
  }

  Buy(){
    this.iap
    .buy(this.User.product_id)
    .then((data)=> {
        if(data){ 
        // alert(JSON.stringify(data));       
        this.User.transaction_id=data.transactionId;
        this.ajax.PaymentpostApi(this.User).subscribe((res) => {
        this.cmnfun.HideLoading();
        console.log(res);
        this.resData=res;
        this.localData.StoreData(this.resData.webuser);
        this.localData.StoreUserFav(this.resData);
        this.storage.set('PaymentProcess',1);
        this.storage.set("userData", JSON.stringify(this.resData.webuser));
        this.storage.set('checkLogin', this.resData.webuser);
        this.storage.set('FullData',this.resData);

        this.events.publish('changebanner:changed',true);
        // this.events.publish('gotostats:changed','NewaccountPage' );
        this.events.publish('menuchange2:changed','HomePage' );

        this.plt.ready().then(() => {
        this.ga.trackEvent("Payment", "Done", "Payment", 1);
        });
        this.navCtrl.setRoot(HomePage);
        // this.navCtrl.setRoot('NewaccountPage');   
        }, error => {
        // alert(JSON.stringify(error));
        this.cmnfun.HideLoading();
        this.cmnfun.showToast('Some thing Unexpected happen please try again');
        })
        }
    })
    .catch((err)=> {
      this.cmnfun.HideLoading(); 
      console.log(err);
      this.cmnfun.showToast(err.message);
    });
  }


  

 }

 


