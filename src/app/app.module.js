var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MatchreportPage } from '../pages/matchreport/matchreport';
import { MatchcenterPage } from '../pages/matchcenter/matchcenter';
import { FixturePage } from '../pages/fixture/fixture';
import { PostmatchPage } from '../pages/postmatch/postmatch';
import { LadderPage } from '../pages/ladder/ladder';
import { GoalkickersPage } from '../pages/goalkickers/goalkickers';
import { TeamstatPage } from '../pages/teamstat/teamstat';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AjaxProvider } from '../providers/ajax/ajax';
import { HttpClientModule } from '@angular/common/http';
import { CommomfunctionProvider } from '../providers/commomfunction/commomfunction';
import { SafePipe } from '../pipes/safe/safe';
import { KeysPipe } from '../pipes/keys/keys';
import { ReversePipe } from '../pipes/reverse/reverse';
import { RoundPipe } from '../pipes/round/round';
import { Search } from '../pipes/search/search';
import { SocialSharing } from '@ionic-native/social-sharing';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { LocalDataProvider } from '../providers/local-data/local-data';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                MatchreportPage,
                MatchcenterPage,
                FixturePage,
                PostmatchPage,
                LadderPage,
                GoalkickersPage,
                TeamstatPage,
                SafePipe,
                KeysPipe,
                ReversePipe,
                Search,
                RoundPipe
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp, {
                    backButtonText: '',
                    backButtonIcon: 'ios-arrow-back',
                    iconMode: 'md'
                }),
                IonicStorageModule.forRoot(),
                HttpClientModule,
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage,
                MatchreportPage,
                MatchcenterPage,
                FixturePage,
                PostmatchPage,
                LadderPage,
                GoalkickersPage,
                TeamstatPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                AjaxProvider,
                CommomfunctionProvider,
                SocialSharing,
                YoutubeVideoPlayer,
                InAppPurchase,
                InAppBrowser,
                UniqueDeviceID,
                Facebook,
                File,
                Camera,
                FileTransfer,
                LocalDataProvider,
                GoogleAnalytics
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map