import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoallistPage } from './goallist';

@NgModule({
  declarations: [
    GoallistPage,
  ],
  imports: [
    IonicPageModule.forChild(GoallistPage),
  ],
})
export class GoallistPageModule {}
