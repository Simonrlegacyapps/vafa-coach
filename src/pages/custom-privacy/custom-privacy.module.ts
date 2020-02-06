import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomPrivacyPage } from './custom-privacy';

@NgModule({
  declarations: [
    CustomPrivacyPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomPrivacyPage),
  ],
})
export class CustomPrivacyPageModule {}
