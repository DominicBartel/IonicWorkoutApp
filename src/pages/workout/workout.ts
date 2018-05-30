import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, Alert } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { TimerPage } from '../timer/timer';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html'
})

export class WorkoutPage {
  params;
  classStorage;
  alertCtrl;
  isNew = false;
  arrayLocation;
  workouts;
  currentClickedNumber;

  
  constructor(public navCtrl: NavController, navParams: NavParams, storage: Storage, alertCtrl: AlertController) {
    this.classStorage = storage;
    this.params = navParams.data;
    this.alertCtrl = alertCtrl;
    
  }

  ionViewWillEnter(){
  

  this.classStorage.get('workouts')
  .then((val) => {
    this.workouts = JSON.parse(val);

    if(this.params.name == null)
    {
      this.isNew = true;
      this.params.sets = 3;
      this.params.reps = [];
      this.alertCtrl.create({
        title: 'Workout Name',
        inputs: [{ id: 'select', name: 'name', placeholder: 'Enter A Name'}], 
        buttons: [{
          text: 'Save',
          handler:  data =>{
            this.params.name = data.name;
          }
        }]
      })
      .present()
      .then(() => {
        
        document.getElementById('select').focus();
      })

    }else{
      for(let i = 0; i < this.workouts.length; i++){
        if(JSON.stringify(this.workouts[i]) == JSON.stringify(this.params))
        {
          this.arrayLocation = i;
        }
      }
    }  
  });
 }

 playWorkout(){
   console.log(this.params.reps.length)
   if(this.params.reps.length < 1){
    this.alertCtrl.create({
      title: 'No Exersises',
      message: 'You need exercises in your routine to play it',
      buttons: [{
        text: 'Ok',
      }]
    })
    .present()
   }else{
    this.navCtrl.push(TimerPage, this.params)
   }
  
 }
 changeSets(direction){
  if(direction == 'increase'){
    this.params.sets++;
  } else if(this.params.sets > 1){
    this.params.sets --;
  }
}
reorder(indexes){
  console.log(indexes);
  let element = this.params.reps[indexes.from];
  this.params.reps.splice(indexes.from, 1);
  this.params.reps.splice(indexes.to, 0, element);

}
  addRep(){
    this.params.reps.push(
      {
        workout: 'Exercise ' + (this.params.reps.length + 1), 
        time: 30
      }
      
    )
  }

  ionViewCanLeave(){
    this.checkWorkout();
  }
  
  clickedNumber(time){
    this.currentClickedNumber = time;
    
  }

  deleteRep(setLocation){
    this.params.reps.splice(setLocation, 1);
  }

  checkNumber(time, repLocation){
    if(isNaN(time) || time < 1){
      this.params.reps[repLocation].time = this.currentClickedNumber;
    }
  }
  checkWorkout(){
  
  if(this.isNew){
    this.workouts.push(this.params);
    this.isNew = false;
  }else{
    this.workouts[this.arrayLocation] = this.params;
  }  
  this.classStorage.set('workouts', JSON.stringify(this.workouts));
  }

  
}
