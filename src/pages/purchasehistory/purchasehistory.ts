import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductListProvider } from '../../providers/product-list/product-list';
import { Storage } from '@ionic/storage';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { LocalDataProvider } from './../../providers/local-data/local-data';


@IonicPage()
@Component({
  selector: 'page-purchasehistory',
  templateUrl: 'purchasehistory.html',
})
export class PurchasehistoryPage {

  PurchaseDetails:any=[];
  fixturedata:any;
  resData : any;

  constructor(public navCtrl: NavController,
    public prolist:ProductListProvider,
    public ajax: AjaxProvider,
    public localdata: LocalDataProvider,
    public Storage:Storage,
    public navParams: NavParams) {
    //  local purchases from Api
    // let dv_id = this.localdata.GetDevice();
    // this.ajax.GetAllPurchases({device_id : dv_id }).subscribe((res)=>{
    //   this.resData = res;
    // if(this.resData.code == 2){
    //   this.ListPurchase(this.resData.payment);
    // }else{
    //   console.log(this.resData);
    // }
    // })
    }

  ListPurchase(payment){
    payment.forEach(element => {
      this.prolist.Analyse(element.team_id, element.competition_id);
      let team = this.prolist.gettname();
      let comp = this.prolist.getcompname();
      if(element.fixture_id == 0){
        let data = {
          competition : comp,
          team : team,
          fixture_id : element.fixture_id,
          product : element.product_id,
          transactionid : element.transaction_id,
          purchase_date : element.created_at,
        }
        this.PurchaseDetails.push(data);
      }else if(element.fixture_id != 0){
        this.ajax.FixtureDataApi({fixtureId : element.fixture_id}).subscribe((res)=> {
          this.fixturedata = res;
           this.SetFixture(this.fixturedata.fixture, element);
         },
          error =>{

          });
      }
    });
  }

  SetFixture(fixture, element){
      let data = {
      competition : '',
      team : '',
      fixture_id : element.fixture_id,
      product : element.product_id,
      transactionid : element.transaction_id,
      purchase_date : element.created_at,
      gamepass : '2019 Game Pass - '+ fixture.home_team +' '+ 'V' +' '+ fixture.away_team +' '+ 'Rnd ' +fixture.round+' '+ fixture.Competition
    }
    this.PurchaseDetails.push(data);
  }

  // Get product type
  ProductType(product){
   if(product.product && product.fixture_id == 0){
     if(this.prolist.GetProductType(product.product) == '2019 Team Pass'){
       return '2019 Team Pass - ' + product.team+' '+product.competition;
     } else if(this.prolist.GetProductType(product.product) == 'Premium'){
       return '2018 Team Pass -' + product.team+' '+product.competition;
     } else if(this.prolist.GetProductType(product.product) == '2019 Competition Pass'){
       return '2019 Competition Pass - ' + product.competition;
     } else if(this.prolist.GetProductType(product.product) == 'Premium Plus'){
       return '2018 Competition Pass - ' + product.competition;
     }else {
       return this.prolist.GetProductType(product.product)
     }
   }
  }




}
