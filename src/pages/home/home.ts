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
     
    });
  }

  changeWorkout(selectedWorkout) {
    this.navCtrl.push(WorkoutPage, selectedWorkout);
  }
  
}
