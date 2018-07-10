import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from 'ionic-angular';

import { TodoDetailPage } from '../todo-detail/todo-detail';
//import { AddEditTodoPage } from '../add-edit-todo/add-edit-todo';
import { AddEditPage_2Page } from '../add-edit-page-2/add-edit-page-2';
import { DataApiProvider } from '../../providers/data-api/data-api';
import{Observable} from 'rxjs/observable'
import {mergeMap, map, flatMap} from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: Array<{ id: number, title: string, description: string }>;
  httpResult: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public dataApi: DataApiProvider,
    public store: Storage) {
  }

  ionViewWillLoad() {
    this.store.get("todos").then(todos=>{
      if(!todos) {
        this.todos = [
          { id: 1, title: "Todo1", description: "First Todo" },
          { id: 2, title: "Todo2", description: "Second Todo" },
          { id: 3, title: "Todo3", description: "Third Todo" }
        ];
        this.sortTodos();
        this.store.set("todos", this.todos)
      }
      else{
        this.todos = todos;
      }
    })
  }

  sortTodos() {
    this.todos.sort((todo1, todo2) => todo1.title.localeCompare(todo2.title))
  }

  addItem() {
    const values = { action: 'Add', todos: this.todos };
    const addModal = this.modalCtrl.create(AddEditPage_2Page, values);

    addModal.onDidDismiss(todo => {
      if (!todo) return;

      todo.id = this.getNewid();
      this.todos.push(todo);
      this.sortTodos();
      this.store.set('todos', this.todos);
    });

    addModal.present();
  }

  getNewid() {
    let lastid = 0;
    this.todos.forEach(todo => {
      if (todo.id > lastid) lastid = todo.id;
    })

    return lastid + 1;
  }

  viewItem(todo) {
    this.navCtrl.push(TodoDetailPage, { item: todo });
  }

  editItem(todo) {
    const values = { action: 'Edit', item: todo, todos: this.todos };
    const editModal = this.modalCtrl.create(AddEditPage_2Page, values);

    editModal.onDidDismiss(updatedTodo => {
      if (!updatedTodo) return;

      this.deleteItem(updatedTodo);
      this.todos.push(updatedTodo);
      this.sortTodos();
      this.store.set('todos', this.todos);
    });

    editModal.present();
  }

  deleteItem(todo) {
    const idIndex = this.todos.findIndex(td => td.id === todo.id);
    this.todos.splice(idIndex, 1);
    this.store.set('todos', this.todos);
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "My Action Sheet",
      buttons: [
        { text: "Destructive", role: "destructive", handler: () => alert("destroyed") },
        { text: "Archive", handler: () => { alert("Archived"); console.log('Archived'); } },
        { text: "Cancel", role: "cancel", handler: () => alert("cancelled") }
      ]
    })
    actionSheet.present();
  }

  httpCall() {
    const obs : Observable<any>= this.dataApi.getInfo();
    obs.pipe(
      map(b => b),
      //flatMap(b => new Promise(resp=>resp(b)),
      //mergeMap((b, i) => new Promise(resp=>resp(b))
    ).subscribe(result => {
      this.httpResult = JSON.stringify(result);
    },
    err => {
      console.log(err);
    });
  }

  addItem2() {
    const values = { action: 'add', todos: this.todos };
    const addModal = this.modalCtrl.create(AddEditPage_2Page, values);

    addModal.onDidDismiss(todo => {
      if (!todo) return;

      todo.id = this.getNewid();
      this.todos.push(todo);
      this.sortTodos();
      this.store.set('todos', this.todos);
    });

    addModal.present();
  }

}
