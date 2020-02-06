import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerStatPage } from './player-stat';

@NgModule({
  declarations: [
    PlayerStatPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerStatPage),
  ],
})
export class PlayerStatPageModule {}
