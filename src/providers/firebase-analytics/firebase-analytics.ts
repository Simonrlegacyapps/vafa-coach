import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
/*
  Generated class for the FirebaseAnalyticsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAnalyticsProvider {

  constructor(private firebaseAnalytics: FirebaseAnalytics) {
  }

  /**
   * Tracks an 'screen_view' event in Firebase Analytics
   * @param screeName Screen View
   */
  trackView(screeName: any) {
    this.firebaseAnalytics.setCurrentScreen(screeName);
  }

  /**
   * Tracks a custom event in Firebase Analytics
   * @param category {string}
   * @param action {string}
   * @param label {string}
   * @param value {number}
   */
  trackEvent(category: string, action: string, label: string, value: number) {
    this.firebaseAnalytics.logEvent(category, { 'action': action, 'label': label });
  }

  startTrackerWithId(val: any) {
    return new Promise(function (resolve, reject) {
      resolve('');
    });
  }

  /**
   * Track User Timing (App Speed)
   * @param category {string}
   * @param intervalInMilliseconds {number}
   * @param variable {string}
   * @param label {string}
   */
  trackTiming(category: string, intervalInMilliseconds: number, variable: string, label: string) {

  }
}
