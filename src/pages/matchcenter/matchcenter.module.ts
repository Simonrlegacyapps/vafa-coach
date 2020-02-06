import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchcenterPage } from './matchcenter';

@NgModule({
  declarations: [
    MatchcenterPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchcenterPage),
  ],
})
export class MatchcenterPageModule {}
