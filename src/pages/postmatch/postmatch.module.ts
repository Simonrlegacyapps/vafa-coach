import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostmatchPage } from './postmatch';

@NgModule({
  declarations: [
    PostmatchPage,
  ],
  imports: [
    IonicPageModule.forChild(PostmatchPage),
  ],
})
export class PostmatchPageModule {}
