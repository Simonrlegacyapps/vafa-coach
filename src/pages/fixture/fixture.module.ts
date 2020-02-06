import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixturePage } from './fixture';

@NgModule({
  declarations: [
    FixturePage,
  ],
  imports: [
    IonicPageModule.forChild(FixturePage),
  ],
})
export class FixturePageModule {}
