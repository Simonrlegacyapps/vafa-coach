import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailloginPage } from './emaillogin';

@NgModule({
  declarations: [
    EmailloginPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailloginPage),
  ],
})
export class EmailloginPageModule {}
