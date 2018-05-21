import { Component, Input } from '@angular/core';
import { NavController, NavParams, Alert } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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

  addRep(){
    this.params.reps.push(
      {
        workout: 'workout ' + this.params.reps.length, 
        time: 30
      }
      
    )
    console.log(this.params);
  }

  ionViewCanLeave(){
    this.checkWorkout();
  }
  
  checkWorkout(){
  
  if(this.isNew){
    this.workouts.push(this.params);
  }else{
    console.log(this.arrayLocation)
    this.workouts[this.arrayLocation] = this.params;
  }  
  
  this.classStorage.set('workouts', JSON.stringify(this.workouts));
  }

  
}
