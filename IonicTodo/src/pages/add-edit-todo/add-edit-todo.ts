import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-edit-todo',
  templateUrl: 'add-edit-todo.html',
})
export class AddEditTodoPage {
  title: string;
  description: string;
  message: string;
  modalTitle: string;
  action: string;
  newId: number;
  updateId: number;
  todos: Array<{id: number, title: string, description: string}>

  constructor(public navCtrl: NavController, public navParam: NavParams, public viewCtrl: ViewController) {
    this.todos = this.navParam.get('todos');
    this.action = this.navParam.get('action');
    if(this.action.toUpperCase() === "ADD") this.initialiseAdd();
    else if(this.action.toUpperCase() === "EDIT") this.initialiseEdit();
  }

  initialiseAdd(){
    this.modalTitle = "Add Todo";
    this.newId = this.navParam.get('newId');
  }
  
  initialiseEdit(){  
    this.modalTitle = "Edit Todo";
    this.updateId = this.navParam.get('updateId');
    const oldTodo = this.todos.filter(todo => todo.id === this.updateId)[0];
    console.log(this.todos);
    console.log(oldTodo);
    this.title = oldTodo.title;
    this.description = oldTodo.description;
  }

  saveTodo(){
    if(this.action.toUpperCase() === "ADD") this.addTodo();
    else if(this.action.toUpperCase() === "EDIT") this.updateTodo();
  }

  addTodo(){
    const validity = this.validateEntries();
    if(!validity.status){
      this.message = validity.message;
      return;
    }

    const newTodo = {id: this.newId, title: this.title, description: this.description };
    this.todos.push(newTodo);
    this.viewCtrl.dismiss();
  }

  updateTodo(){
    debugger
    const validity = this.validateEntries();
    if(!validity.status){
      this.message = validity.message;
      return;
    }

    const updatedTodo = {id: this.updateId, title: this.title, description: this.description };
    const index = this.todos.findIndex(todo => todo.id === this.updateId);
    this.todos.splice(index, 1, updatedTodo);
    this.viewCtrl.dismiss();
  }

  validateEntries(){
    if(this.title == null || this.title.length === 0){
      return {status: false, message: "Please enter a valid title"};
    }
    else if(this.description == null || this.description.length < 3){
      return {status: false, message: "Please enter a valid description"};
    }
    const todoWithSameTitle = this.todos.filter(td => td.title.toUpperCase() === this.title.toUpperCase());
    if(todoWithSameTitle.length > 0){
      return {status: false, message: "The selected title already exists"};
    }
    
    return {status: true, message: ""};
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
