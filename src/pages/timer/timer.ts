import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { NativeAudio } from '@ionic-native/native-audio';





@IonicPage()
@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {
  timerIcon = 'pause';
  params;
  workout = "Get Ready!";
  timeLeft = 3;
  paused = false;
  currentWorkout = -1;
  insomnia;
  nativeAudio;
  timerVar;
  doingSet = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, insomnia: Insomnia, nativeAudio: NativeAudio) {
    this.params = navParams.data;
    this.insomnia = insomnia;
    this.nativeAudio = nativeAudio;

  }

  ionViewDidLoad() {
    this.insomnia.keepAwake();
    this.nativeAudio.play('smolBeep')
    this.timer();


  }
  playPause() {
    if (this.paused) {
      this.paused = false;
      this.timerIcon = 'pause';
    } else {
      this.timerIcon = 'play';
      this.paused = true;
    }
  }
  ionViewWillLeave() {
    clearInterval(this.timerVar);
  }
  timer() {
    this.timerVar = setInterval(x => {

      if (!this.paused) {

        if (this.timeLeft > 1) {
          if (this.timeLeft <= 4) {
            this.nativeAudio.play('smolBeep');
          }
          this.timeLeft--;
        }
        else if (this.currentWorkout < this.params.reps.length - 1) {
          this.nativeAudio.play('bigBeep');
          this.currentWorkout++;
          this.workout = this.params.reps[this.currentWorkout].workout;
          this.timeLeft = this.params.reps[this.currentWorkout].time;
        } else {
          if(this.doingSet == this.params.sets){
            
            this.nativeAudio.play('bigBeep');
            this.workout = "Done!";
            this.timeLeft = 0;
            this.insomnia.allowSleepAgain();
            clearInterval(this.timerVar);
          }else{
            this.doingSet++;
            this.currentWorkout = 0;
            this.workout = this.params.reps[this.currentWorkout].workout;
            this.timeLeft = this.params.reps[this.currentWorkout].time;
            this.nativeAudio.play('bigBeep');
          }
          
        }


      }
    }, 1000);


  }
}


