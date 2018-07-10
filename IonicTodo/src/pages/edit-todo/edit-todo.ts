import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-edit-todo',
  templateUrl: 'edit-todo.html',
})
export class EditTodoPage {
  title: string;
  description: string;
  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    const oldTodo = this.navParams.get('item');
    this.title = oldTodo.title;
    this.description = oldTodo.description;
  }

  ionViewDidLod(){
  }

  updateTodo(){
    if(!this.title || !this.description || this.title.length === 0 || this.description.length === 0) {
      this.message = "Please enter values";
      return;
    }
    const updatedTodo = {title: this.title, description: this.description};
    this.viewCtrl.dismiss(updatedTodo);
  }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
