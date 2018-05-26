import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {
  timerIcon = 'play';
  params;
  workout;
  timeLeft;
  paused = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params = navParams.data;
  }

  ionViewDidLoad() {
    
    
  }

}
