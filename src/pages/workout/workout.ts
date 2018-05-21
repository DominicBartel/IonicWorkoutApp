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
  
  constructor(public navCtrl: NavController, navParams: NavParams, storage: Storage, alertCtrl: AlertController) {
    this.classStorage = storage;
    this.params = navParams.data;
    this.alertCtrl = alertCtrl;
    
    console.log(this.params);
  }
  ionViewWillEnter(){
    if(this.params.name == null)
    {
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

    }
  }
  
}
