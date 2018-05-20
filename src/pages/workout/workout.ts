import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html'
})
export class WorkoutPage {
  params;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.params = navParams.data;
    console.log(this.params);
  }

  
}
