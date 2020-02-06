import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LadderPage } from './ladder';

@NgModule({
  declarations: [
    LadderPage,
  ],
  imports: [
    IonicPageModule.forChild(LadderPage),
  ],
})
export class LadderPageModule {}
