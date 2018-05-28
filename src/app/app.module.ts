import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule  } from '@ionic/storage';

import { AddRoutine } from '../pages/about/about';
import { WorkoutPage } from '../pages/workout/workout';
import { HomePage } from '../pages/home/home';
import { TimerPage } from '../pages/timer/timer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Insomnia } from '@ionic-native/insomnia';
import { NativeAudio } from '@ionic-native/native-audio';



@NgModule({
  declarations: [
    MyApp,
    AddRoutine,
    WorkoutPage,
    HomePage, 
    TimerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddRoutine,
    WorkoutPage,
    HomePage,
    TimerPage
  ],
  providers: [
    NativeAudio,
    Insomnia,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
