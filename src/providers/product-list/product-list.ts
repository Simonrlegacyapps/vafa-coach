import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable()
export class ProductListProvider {

  product: any = '';
  plusproduct: any = '';
  yr : any;
  competition: any = '';
  team: any = '';
  matchcenterCompId : any;

  rteam: any = '';
  rcompetition: any = '';

  PurchaseDetails: any = [];

  team_name: any = "";
  comp_name: any = "";


  ProductList = {
    512: '2018_premium_william_buck_premier_womens_caulfield_grammarians',
    513: '2018_premium_william_buck_womens_fitzroy_acu',
    514: '2018_premium_william_buck_premier_womens_kew_fc',
    515: '2018_premium_william_buck_premier_womens_marcellin',
    516: '2018_premium_william_buck_premier_womens_melbourne_uni',
    517: '2018_premium_william_buck_premier_womens_old_trinity',
    518: '2018_premium_william_buck_premier_womens_old_xaverians',
    519: '2018_premium_william_buck_premier_womens_skob_saints',
    PremiumPlus: '2018_premium_william_buck_premier_womens_all_teams',
    520: '2019_team_pass_fitzroy_acu_william_buck_premier_womens',
    521: '2019_team_pass_kew_fc_william_buck_premier_womens',
    522: '2019_team_pass_marcellin_william_buck_premier_womens',
    523: '2019_team_pass_melbourne_uni_william_buck_premier_womens',
    524: '2019_team_pass_old_trinity_william_buck_premier_womens',
    525: '2019_team_pass_skob_saints_william_buck_premier_womens',
    526: '2019_team_pass_west_brunswick_william_buck_premier_womens',
    527: '2019_team_pass_st_marys_salesian_william_buck_premier_womens',
    PremiumPlus2019: '2019_competition_pass_william_buck_premier_womens',
    528:'2019_team_pass_old_brighton_william_buck_premier',
    529:'2019_team_pass_university_blues_william_buck_premier',
    530:'2019_team_pass_old_melburnians_william_buck_premier',
    531:'2019_team_pass_old_xaverians_william_buck_premier',
    532:'2019_team_pass_st_bernards_william_buck_premier',
    533:'2019_team_pass_old_trinity_grammarians_william_buck_premier',
    534:'2019_team_pass_st_kevins_william_buck_premier',
    535:'2019_team_pass_collegians_william_buck_premier',
    536:'2019_team_pass_old_carey_william_buck_premier',
    537:'2019_team_pass_de_la_salle_william_buck_premier',
    WilliamBuckPremier2019: '2019_competition_pass_william_buck_premier',
    GamePass : 'game_pass',
    VafaPass  : 'vafa_pass',

  }

  constructor(public http: HttpClient,
    private sqlite: SQLite,
    public storage: Storage) {
    // open local database to store purchase data
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  ionViewWillEnter() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }


  RestoreTeam(product) {
    if (product == this.ProductList["512"]) {

      this.team = { team_id: "512", competition_id: "65", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["513"]) {

      this.team = { team_id: "513", competition_id: "65", team_name: "Fitzroy-ACU", team_abbrevation: "Fitzroy", image_value: "/web/uploads/teams/513/1523276289_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["514"]) {

      this.team = { team_id: "514", competition_id: "65", team_name: "Kew FC", team_abbrevation: "Kew", image_value: "/web/uploads/teams/514/1521540327_logo.png" }
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["515"]) {

      this.team = { team_id: "515", competition_id: "65", team_name: "Marcellin", team_abbrevation: "Marcellin", image_value: "/web/uploads/teams/515/1521540397_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["516"]) {

      this.team = { team_id: "516", competition_id: "65", team_name: "Melbourne Uni", team_abbrevation: "Melb", image_value: "/web/uploads/teams/516/1521540447_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["517"]) {

      this.team = { team_id: "517", competition_id: "65", team_name: "Old Trinity", team_abbrevation: "Trinity", image_value: "/web/uploads/teams/517/1523279049_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["518"]) {

      this.team = { team_id: "518", competition_id: "65", team_name: "Old Xaverians", team_abbrevation: "Xavs", image_value: "/web/uploads/teams/518/1521540523_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["519"]) {

      this.team = { team_id: "519", competition_id: "65", team_name: "SKOB Saints", team_abbrevation: "SKOB", image_value: "/web/uploads/teams/519/1521540559_logo.png" };
      this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["520"]) {

      this.team = { team_id: "520", competition_id: "66", image_value: "/web/uploads/teams/513/1523276289_logo.png" ,team_abbrevation: "Fitzroy" ,team_name: "Fitzroy-ACU" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Woman's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["521"]) {

      this.team = { team_id: "521", competition_id: "66", image_value: "/web/uploads/teams/514/1521540327_logo.png", team_abbrevation: "Kew", team_name: "Kew FC" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["522"]) {

      this.team = { competition_id: "66", image_value: "/web/uploads/teams/515/1521540397_logo.png",team_abbrevation: "Marcellin",team_id: "522",team_name: "Marcellin" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["523"]) {

      this.team = { competition_id: "66", image_value: "/web/uploads/teams/516/1521540447_logo.png", team_abbrevation: "Melb",team_id: "523", team_name: "Melbourne Uni" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["524"]) {

      this.team = { competition_id: "66", image_value: "/web/uploads/teams/517/1523279049_logo.png", team_abbrevation: "Trinity", team_id: "524", team_name: "Old Trinity" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["525"]) {

      this.team = { competition_id: "66", image_value: "/web/uploads/teams/519/1521540559_logo.png", team_abbrevation: "SKOB", team_id: "525", team_name: "SKOB Saints" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["526"]) {

      this.team = { competition_id: "66",image_value: "/web/uploads/teams/9/1553225442_logo.png", team_abbrevation: "West Brun", team_id: "526", team_name: "West Brunswick" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["527"]) {

      this.team = { competition_id: "66", image_value: "/web/uploads/teams/10/1553225493_logo.png", team_abbrevation: "St Marys", team_id: "527", team_name: "St Marys Salesian" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList["528"]) {

      this.team = { competition_id: "67", image_value: "/web/uploads/teams/11/1553225895_logo.png", team_abbrevation: "Brighton", team_id: "528", team_name: "Old Brighton"};
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["529"]) {

      this.team = { competition_id: "67",image_value: "/web/uploads/teams/12/1553225935_logo.png", team_abbrevation: "Uni Blues", team_id: "529", team_name: "University Blues"};
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["530"]) {

      this.team = { competition_id: "67", image_value: "/web/uploads/teams/13/1553225983_logo.png", team_abbrevation: "Old Melb" , team_id: "530" ,team_name: "Old Melburnians"};
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["531"]) {

      this.team = { competition_id: "67", image_value: "/web/uploads/teams/14/1553226090_logo.png", team_abbrevation: "Old Xavs", team_id: "531", team_name: "Old Xaverians" };
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["532"]) {

      this.team = { competition_id: "67", image_value: "/web/uploads/teams/15/1553226248_logo.png", team_abbrevation: "St Bern" ,team_id: "532" , team_name: "St Bernards"};
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["533"]) {

      this.team = { competition_id: "67",image_value: "/web/uploads/teams/16/1553226513_logo.png",team_abbrevation: "Old Trinity",team_id: "533",team_name: "Old Trinity Grammarians"};
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["534"]) {

      this.team = { competition_id: "67", image_value: "/web/uploads/teams/17/1553226563_logo.png", team_abbrevation: "SKOBs", team_id: "534", team_name: "St Kevins"};
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["535"]) {

      this.team = { competition_id: "67", image_value: "/web/uploads/teams/18/1553226660_logo.png", team_abbrevation: "Collegians", team_id: "535", team_name: "Collegians" };
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["536"]) {

      this.team = { competition_id: "67", image_value: "/web/uploads/teams/19/1553226698_logo.png", team_abbrevation: "Carey" , team_id: "536" , team_name: "Old Carey" };
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList["537"]) {

      this.team = { competition_id: "67",image_value: "/web/uploads/teams/20/1553226737_logo.png", team_abbrevation: "De La", team_id: "537", team_name: "De La Salle" };
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList['PremiumPlus2019']){

      this.team = { team_id: "520", competition_id: "66", image_value: "/web/uploads/teams/513/1523276289_logo.png" ,team_abbrevation: "Fitzroy" ,team_name: "Fitzroy-ACU" };
      this.competition = { competition_id: "66", competitions_name: "William Buck Premier Woman's", competitions_abbrivation: "Women's Premier" };

    } else if (product == this.ProductList['WilliamBuckPremier2019']){

      this.team = { competition_id: "67", image_value: "/web/uploads/teams/11/1553225895_logo.png", team_abbrevation: "Brighton", team_id: "528", team_name: "Old Brighton"};
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    } else if (product == this.ProductList['VafaPass']) {

      this.team = { competition_id: "67",image_value: "/web/uploads/teams/20/1553226737_logo.png", team_abbrevation: "De La", team_id: "537", team_name: "De La Salle" };
      this.competition = { competition_id: "67", competitions_name: "William Buck Premier", competitions_abbrivation: "Premier" };

    }
     else if(product == this.ProductList['PremiumPlus']) {
      this.storage.get('UserTeamData').then((val) => {
        if (val) {
          console.log(val)
          this.team = val.selectedteam;
          this.competition = val.selectedcompetition;
        } else {
          this.team = { team_id: "512", competition_id: "65", team_name: "Caulfield Grammarians", team_abbrevation: "Caulfield", image_value: "/web/uploads/teams/512/1521540242_logo.png" };
          this.competition = { competition_id: "65", competitions_name: "William Buck Premier Women's", competitions_abbrivation: "Women's Premier" };
        }
      });
    }
  }

  // setpremiumpluspass

  setplusproduct(comp) {
    if(comp == 65){
      this.plusproduct = this.ProductList['PremiumPlus'];
    }else if(comp == 66){
      this.plusproduct = this.ProductList['PremiumPlus2019'];
    }else if(comp == 67){
    this.plusproduct = this.ProductList['WilliamBuckPremier2019'];
    }
  }

  getplusproduct(){
    if(this.plusproduct != ''){
      return this.plusproduct;
    }
  }


  SetUserProduct(team, competition, year) {
   console.log(team)
   console.log(year)
   console.log(competition)
    this.team = team;
    this.competition = competition;
    if (team.team_id == 512 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["512"];
    } else if (team.team_id == 513 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["513"];
    } else if (team.team_id == 514 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["514"];
    } else if (team.team_id == 515 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["515"];
    } else if (team.team_id == 516 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["516"];
    } else if (team.team_id == 517 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["517"];
    } else if (team.team_id == 518 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["518"];
    } else if (team.team_id == 519 && competition.competition_id == 65 && year == 2018) {
      this.product = this.ProductList["519"];
    } else if (team.team_id == 520 && competition.competition_id == 66 && year == 2019){
      this.product = this.ProductList["520"];
    } else if (team.team_id == 521 && competition.competition_id == 66 && year == 2019) {
      this.product = this.ProductList["521"];
    } else if (team.team_id == 522 && competition.competition_id == 66 && year == 2019) {
      this.product = this.ProductList["522"];
    } else if (team.team_id == 523 && competition.competition_id == 66 && year == 2019) {
      this.product = this.ProductList["523"];
    } else if (team.team_id == 524 && competition.competition_id == 66 && year == 2019) {
      this.product = this.ProductList["524"];
    } else if (team.team_id == 525 && competition.competition_id == 66 && year == 2019) {
      this.product = this.ProductList["525"];
    } else if (team.team_id == 526 && competition.competition_id == 66 && year == 2019) {
      this.product = this.ProductList["526"];
    } else if (team.team_id == 527 && competition.competition_id == 66 && year == 2019) {
      this.product = this.ProductList["527"];
    } else if (team.team_id == 528 && competition.competition_id == 67 && year == 2019) {
      this.product = this.ProductList["528"];
    }else if (team.team_id == 529 && competition.competition_id == 67 && year == 2019) {
      this.product = this.ProductList["529"];
    }else if (team.team_id == 530 && competition.competition_id == 67 && year == 2019) {
      this.product = this.ProductList["530"];
    }else if (team.team_id == 531 && competition.competition_id == 67 && year == 2019) {
      this.product = this.ProductList["531"];
    }else if (team.team_id == 532 && competition.competition_id == 67 && year == 2018) {
      this.product = this.ProductList["532"];
    }else if (team.team_id == 533 && competition.competition_id == 67 && year == 2018) {
      this.product = this.ProductList["533"];
    }else if (team.team_id == 534 && competition.competition_id == 67 && year == 2018) {
      this.product = this.ProductList["534"];
    }else if (team.team_id == 535 && competition.competition_id == 67 && year == 2018) {
      this.product = this.ProductList["535"];
    }else if (team.team_id == 536 && competition.competition_id == 67 && year == 2018) {
      this.product = this.ProductList["536"];
    }else if (team.team_id == 537 && competition.competition_id == 67 && year == 2018) {
      this.product = this.ProductList["537"];
    }
  }


  GetUserProduct() {
    if (this.product != '') {
      return this.product;
    }
  }

  GetTeamid() {
    return this.team.team_id;
  }

  GetCompetitionid() {
    return this.competition.competition_id;
  }

  GetProductType(product) {
    if (product) {
      if (product == this.ProductList["512"] || product == this.ProductList["513"] || product == this.ProductList["514"] || product == this.ProductList["515"] || product == this.ProductList["516"] || product == this.ProductList["517"] || product == this.ProductList["518"] || product == this.ProductList["519"] || product == "vafa_premium" || product == "vafa_premium0001") {
        let ProductType = 'Premium';
        return ProductType;
      } else if (product == this.ProductList.PremiumPlus || product == "vafa_premium_plus" || product == "vafa_premium_plus0002") {
        let ProductType = 'Premium Plus';
        return ProductType;
      } else if (product == this.ProductList["520"] ||product == this.ProductList["521"] ||product == this.ProductList["522"] ||product == this.ProductList["523"] || product == this.ProductList["524"] || product == this.ProductList["525"] || product == this.ProductList["526"] || product == this.ProductList["527"] || product == this.ProductList["528"] || product == this.ProductList["529"] || product == this.ProductList["530"] || product == this.ProductList["531"] || product == this.ProductList["532"] || product == this.ProductList["533"] || product == this.ProductList["534"] || product == this.ProductList["535"] || product == this.ProductList["536"] || product == this.ProductList["537"]) {
        let ProductType = '2019 Team Pass';
        return ProductType;
      } else if (product == this.ProductList["PremiumPlus2019"] || product == this.ProductList["WilliamBuckPremier2019"]) {
        let ProductType = '2019 Competition Pass';
        return ProductType;
      } else if (product == this.ProductList.GamePass) {
        let ProductType = '2019 Game Pass';
        return ProductType;
      } else if (product == this.ProductList.VafaPass ) {
        let ProductType = '2019 VAFA Pass';
        return ProductType;
      }
    } else {
      return false;
    }
  }

  // Local database functions

  // insert purchase details on buy iap.
  InsertPurchase(data) {
    let purchasedPack = data.payment;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
          // add foreach here
          purchasedPack.forEach(element => {
            this.Analyse(element.team_id, element.competition_id);
            let team = this.gettname();
            let comp = this.getcompname();
            db.executeSql('INSERT INTO PurchaseHistory VALUES (NULL,?,?,?,?,?,?)', [
              element.device_id,
              comp,
              team,
              // element.fixture_id,
              element.product_id,
              element.created_at,
              element.transaction_id
            ])
              .then(res => {
                // alert('sucess')
              }).catch(e => {
                // alert(JSON.stringify(e))
              })
          });
      })
      .catch(e => console.log(e));
  }



  // restore purchase details from server to local storage; ie only one time executed function.
  RestorePurchase(data) {
    let PurchaseList = data;
    console.log(PurchaseList)
    // alert(JSON.stringify(data))
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("create table if not exists PurchaseHistory (rowid INTEGER PRIMARY KEY,deviceid VARCHAR(50),competition VARCHAR(50),team VARCHAR(50),product VARCHAR(50),purchase_date TEXT,transactionid VARCHAR(100))", [])
          .then(() => console.log('Success'))
          .catch(e => console.log(e));
        PurchaseList.forEach(element => {
          this.Analyse(element.team_id, element.competition_id);
          let team = this.gettname();
          let comp = this.getcompname();
          db.executeSql('INSERT INTO PurchaseHistory VALUES (NULL,?,?,?,?,?,?)', [
            element.device_id,
            comp,
            team,
            // element.fixture_id,
            element.product_id,
            element.created_at,
            element.transaction_id
          ])
            .then(res => {
              // alert('sucess')
            }).catch(e => {
              // alert(JSON.stringify(e))
            })
        });
      })
      .catch(e => console.log(e));
  }
  // get purchase details.

  GetPurchase() {
    this.PurchaseDetails = [];
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM PurchaseHistory', []).then((data) => {
          // alert(JSON.stringify(data))
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              this.PurchaseDetails.push(data.rows.item(i));
              // alert(JSON.stringify(this.PurchaseDetails))
            }
          }
        }).catch(e => {
          console.log(e)
        })
      });
    return this.PurchaseDetails;
  }

  // Analyse team_name and competition_name
  Analyse(tid, compid) {
    if (tid == 512 && compid == 65) {
      this.team_name = "Caulfield Grammarians";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 513 && compid == 65) {
      this.team_name = "Fitzroy-ACU";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 514 && compid == 65) {
      this.team_name = "Kew FC";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 515 && compid == 65) {
      this.team_name = "Marcellin";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 516 && compid == 65) {
      this.team_name = "Melbourne Uni";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 517 && compid == 65) {
      this.team_name = "Old Trinity";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 518 && compid == 65) {
      this.team_name = "Old Xaverians";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 519 && compid == 65) {
      this.team_name = "SKOB Saints";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 520 && compid == 66) {
      this.team_name = "Fitzroy-ACU";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 521 && compid == 66) {
      this.team_name = "Kew FC";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 522 && compid == 66) {
      this.team_name = "Marcellin";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 523 && compid == 66) {
      this.team_name = "Melbourne Uni";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 524 && compid == 66) {
      this.team_name = "Old Trinity";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 525 && compid == 66) {
      this.team_name = "SKOB Saints";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 526 && compid == 66) {
      this.team_name = "West Brunswick";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 527 && compid == 66) {
      this.team_name = "St Marys Salesian";
      this.comp_name = "William Buck Premier Women's";
    } else if (tid == 528 && compid == 67) {
      this.team_name = "Old Brighton";
      this.comp_name = "William Buck Premier";
    } else if (tid == 529 && compid == 67) {
      this.team_name = "University Blues";
      this.comp_name = "William Buck Premier";
    } else if (tid == 530 && compid == 67) {
      this.team_name = "Old Melburnians";
      this.comp_name = "William Buck Premier";
    } else if (tid == 531 && compid == 67) {
      this.team_name = "Old Xaverians";
      this.comp_name = "William Buck Premier";
    } else if (tid == 532 && compid == 67) {
      this.team_name = "St Bernards";
      this.comp_name = "William Buck Premier";
    } else if (tid == 533 && compid == 67) {
      this.team_name = "Old Trinity Grammarians";
      this.comp_name = "William Buck Premier";
    } else if (tid == 534 && compid == 67) {
      this.team_name = "St Kevins";
      this.comp_name = "William Buck Premier";
    } else if (tid == 535 && compid == 67) {
      this.team_name = "Collegians";
      this.comp_name = "William Buck Premier";
    } else if (tid == 536 && compid == 67) {
      this.team_name = "Old Carey";
      this.comp_name = "William Buck Premier";
    } else if (tid == 537 && compid == 67) {
      this.team_name = "De La Salle";
      this.comp_name = "William Buck Premier";
    }
  }

  gettname() {
    return this.team_name;
  }
  getcompname() {
    return this.comp_name;
  }


  SetMatchcenterCompId(compid){
    console.log(compid)
    this.matchcenterCompId = compid;
  }

  getMatchcenterCompId (){
    return this.matchcenterCompId;
  }

}
