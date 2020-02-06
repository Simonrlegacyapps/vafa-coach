import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamstatPage } from './teamstat';

@NgModule({
  declarations: [
    TeamstatPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamstatPage),
  ],
})
export class TeamstatPageModule {}
