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
// import { YeardropdownPage } from '../pages/yeardropdown/yeardropdown';
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
import { StreamingMedia } from '@ionic-native/streaming-media';

import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';

import * as $ from 'jquery';
import { LocalDataProvider } from '../providers/local-data/local-data';
import { ProductListProvider } from '../providers/product-list/product-list';
import { SQLite } from '@ionic-native/sqlite';
import { gamepasspage } from '../pages/innermatchcenter/innermatchcenter';

import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { FirebaseAnalyticsProvider } from '../providers/firebase-analytics/firebase-analytics';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { CameraPreview } from '@ionic-native/camera-preview';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MatchreportPage,
    MatchcenterPage,
    gamepasspage,
    // YeardropdownPage,
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
    gamepasspage,
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
    // File,
    Camera,
    FilePath,
    FileTransfer,
    LocalDataProvider,
    ProductListProvider,
    SQLite,
    StreamingMedia,
    ThemeableBrowser,
    FirebaseAnalyticsProvider,
    FirebaseAnalytics,
    CameraPreview
  ]
})
export class AppModule { }
