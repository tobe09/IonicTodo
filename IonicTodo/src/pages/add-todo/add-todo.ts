import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

//@IonicPage()    //lazy loading not needed
@Component({
  selector: 'page-add-todo',
  templateUrl: 'add-todo.html',
})
export class AddTodoPage {
  title: string;
  description: string;
  message: string;

  constructor(public navCtrl: NavController, public navParam: NavParams, public viewCtrl: ViewController) {
    //const action = navParam.get('action'); //use later to change ionic styling from code
  }

  saveTodo(){
    if(!this.title || !this.description || this.title.length === 0 || this.description.length === 0) {
      this.message = "Please enter values";
      return;
    }
    const newTodo = {title: this.title, description: this.description};
    this.viewCtrl.dismiss(newTodo);
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
