import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-edit-page-2',
  templateUrl: 'add-edit-page-2.html',
})
export class AddEditPage_2Page {
  id: number;
  title: string;
  description: string;
  message: string;
  modalTitle: string;
  action: string;
  todos: Array<{id: number, title: string, description: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.todos = this.navParams.get('todos');
    this.action = this.navParams.get('action');
    if(this.action.toUpperCase() === "ADD") this.initialiseAdd();
    else if(this.action.toUpperCase() === "EDIT") this.initialiseEdit();
  }

  
  initialiseAdd(){
    this.modalTitle = "Add Todo";
  }
  
  initialiseEdit(){  
    this.modalTitle = "Edit Todo";
    const oldTodo = this.navParams.get('item');
    this.id = oldTodo.id;
    this.title = oldTodo.title;
    this.description = oldTodo.description;
  }  
  
  saveTodo(){
    if(this.action.toUpperCase() === "ADD") this.addTodo();
    else if(this.action.toUpperCase() === "EDIT") this.updateTodo();
  }

  addTodo(){
    const filterFunction = todo => todo.title.toUpperCase() === this.title.toUpperCase();
    const validity = this.validateEntries(filterFunction);
    if(!validity.status){
      this.message = validity.message;
      return;
    }
    const newTodo = {id: this.id, title: this.title, description: this.description };
    this.viewCtrl.dismiss(newTodo);
  }

  updateTodo(){
    const filterFunction = (todo) => {
      return todo.title.toUpperCase() === this.title.toUpperCase() && 
             this.title.toUpperCase() !== this.todos.find(td => td.id === this.id).title.toUpperCase();
    } 
    const validity = this.validateEntries(filterFunction);
    if(!validity.status){
      this.message = validity.message;
      return;
    }
    const updatedTodo = {id: this.id, title: this.title, description: this.description };
    this.viewCtrl.dismiss(updatedTodo);
  }

  validateEntries(filterFunction){
    if(this.title == null || this.title.length === 0){
      return {status: false, message: "Please enter a valid title"};
    }
    else if(this.description == null || this.description.length < 3){
      return {status: false, message: "Please enter a valid description"};
    }
    const existIndex = this.todos.findIndex(filterFunction);
    if(existIndex != -1){
      return {status: false, message: "The selected title already exists"};
    }
    
    return {status: true, message: ""};
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
