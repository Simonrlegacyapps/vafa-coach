import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomBrowserPage } from './custom-browser';

@NgModule({
  declarations: [
    CustomBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomBrowserPage),
  ],
})
export class CustomBrowserPageModule {}
