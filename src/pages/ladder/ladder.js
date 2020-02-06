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
import { IonicPage, NavController, ModalController, NavParams, Platform } from 'ionic-angular';
import { AjaxProvider } from '../../providers/ajax/ajax';
import { CommomfunctionProvider } from '../../providers/commomfunction/commomfunction';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import 'datatables.net-fixedheader';
/**
 * Generated class for the LadderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LadderPage = /** @class */ (function () {
    function LadderPage(inapp, plt, ga, ajax, cmnfun, modalCtrl, events, navCtrl, navParams) {
        var _this = this;
        this.inapp = inapp;
        this.plt = plt;
        this.ga = ga;
        this.ajax = ajax;
        this.cmnfun = cmnfun;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.comptitionlists = [];
        this.selectables = [];
        this.headerimage = '';
        this.ladderDataa = [];
        this.path = 'http://vafalive.com.au';
        // $.plot($("#placeholder"), [ [[0, 0], [1, 1]] ], { yaxis: { max: 1 } });
        this.plt.ready().then(function () {
            _this.ga.startTrackerWithId('UA-118996199-1')
                .then(function () {
                console.log('Google analytics is ready now');
                _this.ga.trackView('Ladder Page');
            })
                .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
        });
    }
    LadderPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.cmnfun.showLoading('Please wait...');
        console.log('ionViewDidLoad LadderPage');
        this.ajax.getcompetionlist('get-all-competitions', {
            accessKey: 'QzEnDyPAHT12asHb4On6HH2016'
        }, 'ladder');
        this.events.subscribe('competitionlistladder:changed', function (res) {
            console.log(res);
            if (res !== undefined && res !== "") {
                _this.comptitionlists = res.competition;
                _this.selectables = _this.comptitionlists[0].competitions_name;
                _this.competition_id = _this.comptitionlists[0].competition_id;
                _this.ajax.datalist('team-ladder-competitionwise', {
                    accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                    competition_id: _this.competition_id,
                }).subscribe(function (res) {
                    _this.teamladdercompetitionwise(res);
                }, function (error) {
                    // this.cmnfun.showToast('Some thing Unexpected happen please try again');
                });
            }
        });
    };
    LadderPage.prototype.teamladdercompetitionwise = function (res) {
        var _this = this;
        $('#LadderTable').dataTable().fnDestroy();
        this.ladderDataa = res.ladder;
        this.arraySize = this.ladderDataa.length;
        this.advertisementHeader = res.headerAdv;
        console.log(this.advertisementHeader[0].ad_image);
        this.advertisementFooter = res.footerAdv;
        console.log(res);
        setTimeout(function () {
            var windowWidth = (window.innerWidth);
            var windowHeight = (window.innerHeight) - 150;
            var table = $('#LadderTable').DataTable({
                scrollY: windowHeight,
                // scrollY: 150,
                scrollX: true,
                scrollCollapse: true,
                paging: false,
                info: false,
                "bPaginate": false,
                "bFilter": false,
                "bInfo": false,
                "bSortable": false,
                "ordering": true,
                "order": [[4, "desc"], [14, "desc"], [5, "desc"]],
                "aoColumnDefs": [
                    {
                        "targets": [3],
                        "orderable": false,
                        "bSortable": false,
                        "searchable": false,
                        "render": function (data, type, full, meta) {
                            return parseInt(full[6]) + parseInt(full[7]) + parseInt(full[8]) + parseInt(full[9]) + parseInt(full[12]) + parseInt(full[13]);
                        }
                    }
                ],
                fixedColumns: {
                    leftColumns: 2,
                    rightColumns: 0
                },
                fixedHeader: {
                    header: true,
                    footer: true
                }
            });
            table.on("order.dt search.dt", function () {
                table.column(0, { search: "applied", order: "applied" }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
            _this.cmnfun.HideLoading();
        }, 1500);
    };
    ;
    LadderPage.prototype.gotomodel = function () {
        var _this = this;
        this.ladderDataa = [];
        $('#LadderTable').dataTable().fnDestroy();
        var modal = this.modalCtrl.create('CommommodelPage', { items: this.comptitionlists });
        var me = this;
        modal.onDidDismiss(function (data) {
            _this.cmnfun.showLoading('Please wait...');
            _this.selectables = data.competitions_name;
            _this.competition_id = data.competition_id;
            _this.ajax.datalist('team-ladder-competitionwise', {
                accessKey: 'QzEnDyPAHT12asHb4On6HH2016',
                competition_id: _this.competition_id,
            }).subscribe(function (res) {
                _this.teamladdercompetitionwise(res);
            }, function (error) {
                // this.cmnfun.showToast('Some thing Unexpected happen please try again');
            });
        });
        modal.present();
    };
    LadderPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-ladder',
            templateUrl: 'ladder.html',
        }),
        __metadata("design:paramtypes", [InAppBrowser, Platform, GoogleAnalytics, AjaxProvider, CommomfunctionProvider, ModalController, Events, NavController, NavParams])
    ], LadderPage);
    return LadderPage;
}());
export { LadderPage };
//# sourceMappingURL=ladder.js.map