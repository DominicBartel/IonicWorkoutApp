import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    let startWorkouts = JSON.stringify([
      {name:"Workout", reps:[{workout: "Burpees", time: 45,}, {workout: "Mountain Climbers", time: 45,}, {workout: "Crunches", time: 45,}], sets: 4}, 
      {name:"Workout Two", reps:[{workout: "Jumping Jacks", time: 45,}, {workout: "Burpees", time: 20,}, {workout: "High Knees", time: 60,}], sets: 3}
    ])
    

    this.storage.get('firstLaunch').then(applaunchCount => { // <- Wait for the data to be ready

        // Now the data from the storage is ready!

        console.log(applaunchCount);

        if(applaunchCount) {
            // This is a second time launch, and count = applaunchCount
            
        } else {
           
            storage.set('launchCount','1');
            storage.set('workouts', startWorkouts)
        }

        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
        });
    });
  }
}
