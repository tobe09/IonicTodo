import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditTodoPage } from './add-edit-todo';

@NgModule({
  declarations: [
    AddEditTodoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditTodoPage),
  ],
})
export class AddEditTodoPageModule {}
