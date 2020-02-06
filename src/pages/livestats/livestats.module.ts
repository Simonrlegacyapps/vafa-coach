import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivestatsPage } from './livestats';

@NgModule({
  declarations: [
    LivestatsPage,
  ],
  imports: [
    IonicPageModule.forChild(LivestatsPage),
  ],
})
export class LivestatsPageModule {}
