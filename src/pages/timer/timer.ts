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
  workout = "Get Ready!";
  timeLeft = 3;
  paused = false;
  currentWorkout = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params = navParams.data;
  }

  ionViewDidLoad() {
    this.timer();

  }
  
  timer() {
    setInterval(x => {

      if (!this.paused) {

        if (this.timeLeft > 1) {
          this.timeLeft--;
        }
        else if (this.currentWorkout < this.params.reps.length - 1) {
          this.currentWorkout++;
          console.log(this.currentWorkout)
          this.workout = this.params.reps[this.currentWorkout].workout;
          this.timeLeft = this.params.reps[this.currentWorkout].time;
        }else{
          this.workout = "Done!"
          this.timeLeft = 0;
        }


      }
    }, 1000);


  }


}
