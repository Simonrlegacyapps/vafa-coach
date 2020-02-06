import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnetoonePage } from './onetoone';

@NgModule({
  declarations: [
    OnetoonePage,
  ],
  imports: [
    IonicPageModule.forChild(OnetoonePage),
  ],
})
export class OnetoonePageModule {}
