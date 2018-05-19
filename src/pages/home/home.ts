import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, storage: Storage) {
    
    storage.get('workouts').then((val) => {
      let workouts = JSON.parse(val);
      console.log(workouts)
      workouts.push({name: "test", reps: [{workout: "tacos", time: 10}]})
      storage.set("workouts", JSON.stringify(workouts));
      console.log(workouts);

    });

  }

}
