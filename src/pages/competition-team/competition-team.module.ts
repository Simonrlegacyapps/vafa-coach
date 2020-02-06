import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompetitionTeamPage } from './competition-team';

@NgModule({
  declarations: [
    CompetitionTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(CompetitionTeamPage),
  ],
})
export class CompetitionTeamPageModule {}
