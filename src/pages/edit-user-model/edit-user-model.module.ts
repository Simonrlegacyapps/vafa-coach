import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUserModelPage } from './edit-user-model';

@NgModule({
  declarations: [
    EditUserModelPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUserModelPage),
  ],
})
export class EditUserModelPageModule {}
