import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WorkoutPage } from '../workout/workout';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  workouts;
  classStorage;
  constructor(public navCtrl: NavController, storage: Storage) {
    this.classStorage = storage;
  }

  ionViewWillEnter(){
    this.classStorage.get('workouts').then((val) => {
      this.workouts = JSON.parse(val);
     console.log(this.workouts)
    });
  }

  changeWorkout(selectedWorkout) {
    this.navCtrl.push(WorkoutPage, selectedWorkout);
  }
  
  deleteWorkout(workout){
    for( let i = 0; i < this.workouts.length; i ++){
      if(this.workouts[i] == workout)
      this.workouts.splice(i, 1);
    }
    this.classStorage.set('workouts', JSON.stringify(this.workouts))
  }
}
