import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { TimerPage } from '../pages/timer/timer';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  nativeAudio;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, nativeAudio: NativeAudio) {
    this.nativeAudio = nativeAudio;
    let startWorkouts = JSON.stringify([
      {name:"Full Body", reps:[{workout: "Burpees", time: 45,}, {workout: "Mountain Climbers", time: 45,}, {workout: "Crunches", time: 45,}, {workout: "Rest", time: 20,}],  sets: 4}, 
      {name:"Leg Day", reps:[{workout: "Jumping Jacks", time: 45,}, {workout: "Burpees", time: 20,}, {workout: "High Knees", time: 60,}], sets: 3}
    ])
    

    this.storage.get('launchCount').then(applaunchCount => { 
        if(applaunchCount) {
        } else {
          console.log(applaunchCount)
            storage.set('launchCount','1');
            storage.set('workouts', startWorkouts)
            this.nativeAudio.preloadSimple('smolBeep', 'assets/mp3/short.mp3');
            this.nativeAudio.preloadSimple('bigBeep', 'assets/mp3/long.mp3');
        }
        platform.ready().then(() => {
          
          statusBar.styleDefault();
          splashScreen.hide();
        });
    });
  }
}
