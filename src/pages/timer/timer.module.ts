import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerPage } from './timer';

@NgModule({
  declarations: [
    TimerPage,
  ],
  imports: [
    IonicPageModule.forChild(TimerPage),
  ],
})
export class TimerPageModule {}
