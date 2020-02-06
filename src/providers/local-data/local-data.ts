import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
/*
  Generated class for the LocalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalDataProvider {

  UserDeviceData:any;
  uCid:any;

  Selectedmatch:any;

  TeamList: any;

  yr: any;

  LocalProfile: any = {
    first_name: '',
    user_email: '',
    user_image: '',
    user_age: '',
    mobile_number: '',
    last_name: '',
    user_product:''
  }

  localuser: any = {
    create_date:'',
    device_id:'',
    favourite_competition_id:'',
    favourite_team_id:'',
    first_name:'',
    id:'',
    last_name:'',
    mobile_number:'',
    payment_status:'',
    update_date:'',
    user_age:'',
    user_competition_id:'',
    user_email:'',
    user_image:'',
    user_name:'',
    user_password:'',
    user_product:'',
    user_status:'',
    user_team_id:''
  }

  LoginToState: any = '';
  LoginStateParams:any;

  LocalData: any;
  DeviceData: any;

  setbackpage:any;
  backpagedata:any;

  OneToOneTeam1: any = '';
  OneToOneTeam2: any = '';

  OneToOnePlayer1: any = '';
  OneToOnePlayer2: any = '';

  UserFavouriteData: any = {
    FavTeam: '',
    FavComp: ''
  }

  popval:number=0;
  islogin: boolean = false;
  fulldata: any;
  constructor(public http: HttpClient,
    public events: Events,
    public Storage: Storage) {
    console.log('Hello LocalDataProvider Provider');
    this.Storage.get('FullData').then((val) => {
      this.islogin = true;
      // console.log(val.webuserteam.team_name);
      //  alert('a');
      if (val) {
        // alert(val.webuserteam.team_name);
        // alert(val.webusercompetition.competitions_name);
        if (val.webuserteam !== null && val.webusercompetition != null) {
          this.UserFavouriteData = {
            FavTeam: val.webuserteam.team_name,
            FavComp: val.webusercompetition.competitions_name
          }
        }
      }

    });

    this.events.subscribe('userlogin', res => {
      console.log(res)
      if (res == false) {
        // this.UserFavouriteData = {
        //   FavTeam: '',
        //   FavComp: ''
        // }
      }

    })

    // load teams dropdown
    this.Storage.get('TeamListData').then((teams)=>{
      this.TeamList = teams;
    })

  }


  //save selected match
  savematch(data){
    this.Selectedmatch=data;
  }

  getmatch(){
    return this.Selectedmatch;
  }

  // User Device Data
  StoreUserDeviceData(data){
    this.UserDeviceData=data;
  }

  GetUserDeviceData(){
    return this.UserDeviceData;
  }
  //


  StoreData(data) {
    // alert(JSON.stringify(data))
    this.LocalData = data;
  }

  StoreDevice(data) {
    this.DeviceData = data;
  }

  StoreUserFav(data) {
    console.log(data);
    this.fulldata = data;

    if (data.webuserteam != null && data.webusercompetition != null) {
      this.UserFavouriteData = {
        FavTeam: data.webuserteam.team_name,
        FavComp: data.webusercompetition.competitions_name
      }
    } if (data.webuserteam != null) {
      this.UserFavouriteData.FavTeam = data.webuserteam.team_name;

    } if (data.webusercompetition != null) {
      this.UserFavouriteData.FavComp = data.webusercompetition.competitions_name;
    }
  }



  GetData() {
    return this.LocalData;
  }

  GetDevice() {
    return this.DeviceData;
  }

  GetUserFav() {
    return this.UserFavouriteData;
  }
  getallfulldata() {
    return this.fulldata;
  }

  StoreTeamOne(data) {
    this.OneToOneTeam1 = data;
  }

  StoreTeamTwo(data) {
    this.OneToOneTeam2 = data;
  }

  GetTeamOne() {
    return this.OneToOneTeam1;
  }

  GetTeamTwo() {
    return this.OneToOneTeam2;
  }

  StorePlayerOne(data) {
    this.OneToOnePlayer1 = data;
  }
  StorePlayerTwo(data) {
    this.OneToOnePlayer2 = data;
  }

  GetPlayerOne() {
    return this.OneToOnePlayer1;
  }

  GetPlayerTwo() {
    return this.OneToOnePlayer2;
  }


  SetBack(page,details,parent,year){
   this.setbackpage = page;
   this.backpagedata = {
     details : details,
     parent:parent,
     year:year
   };
  }

  getBckpage(){
    return  this.setbackpage;
  }

  getBckdata(){
    return this.backpagedata;
  }



  LoginState(state,params) {
    console.log(state);
    console.log(params);
    this.LoginStateParams=params;
    this.LoginToState = state;
  }

  LoginTo() {
    return this.LoginToState;
  }

  popup(val){
   this.popval=val;
   console.log(this.popval);
  }

  getpopup(){
    console.log(this.popval);
    return this.popval;
  }

  getLoginparam(){
    return this.LoginStateParams;
  }


  LocalUserData(field, value) {
    if (field == 'first_name') {
      this.LocalProfile.first_name = value;
    } else if (field == 'last_name') {
      this.LocalProfile.last_name = value;
    } else if (field == 'user_age') {
      this.LocalProfile.user_age = value;
    } else if (field == 'mobile_number') {
      this.LocalProfile.mobile_number = value;
    } else if (field == 'user_email') {
      this.LocalProfile.user_email = value;
    } else if (field == 'user_image') {
      this.LocalProfile.user_image = value;
    } else {
      return false
    }
    console.log(this.LocalProfile);
    this.Storage.set('localdb', this.LocalProfile);
  }

  getlocalprofile() {
    return this.LocalProfile;
  }

  localDb(val) {
    this.LocalProfile = val;
    this.Storage.set('localdb', this.LocalProfile);
  }


  setlocaldata(val){
    this.LocalProfile={
      first_name: val.first_name,
      user_email: val.user_email,
      user_image:val.user_image,
      user_age: val.user_age,
      mobile_number: val.mobile_number,
      last_name: val.last_name
    }
    this.Storage.set('localdb',this.LocalProfile);
  }


   // store selected year
   StoreYear (year){
    this.yr = year;
  }

  getYear (){
    return this.yr;
  }



  // storeteam and type
  StoreTeamlist(list){
    console.log('list'+  list)
    this.TeamList = list;
    this.Storage.set('TeamListData',this.TeamList);
  }

  GetTeamlist(){
   return this.TeamList;
  }



  Upgrade(compid){
    this.uCid = compid;
  }

  Getupgrade(){
    return this.uCid;
  }

}
