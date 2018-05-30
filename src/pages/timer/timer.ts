import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { NativeAudio } from '@ionic-native/native-audio';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';



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
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    insomnia: Insomnia, 
    nativeAudio: NativeAudio, 
    public admob: AdMobFree) {

    this.params = navParams.data;
    this.insomnia = insomnia;
    this.nativeAudio = nativeAudio;

  }
  showBanner(){
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false, 
      autoShow: true,
      id: 'ca-app-pub-8884366005214744/7623386145'
    }
    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() =>{

    
     }).catch(e =>console.log(e));
  }

  showInterstitial(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: false, 
      autoShow: true,
      id: 'ca-app-pub-8884366005214744/5084852713'
    }
    this.admob.interstitial.config(interstitialConfig);
 
    this.admob.interstitial.prepare().then(() => {
        
    });
  }

  ionViewDidLoad() {
    this.insomnia.keepAwake();
    this.nativeAudio.play('smolBeep')
    this.timer();
    this.showBanner();


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
            this.showInterstitial();
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


