import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddTodoPage } from '../pages/add-todo/add-todo';
import { TodoDetailPage} from '../pages/todo-detail/todo-detail';
import { EditTodoPage } from '../pages/edit-todo/edit-todo'; 
import { AddEditTodoPage } from '../pages/add-edit-todo/add-edit-todo'; 
import { AddEditPage_2Page } from '../pages/add-edit-page-2/add-edit-page-2';
import { AddEditLocalPage } from '../pages/add-edit-local/add-edit-local';

import { DataApiProvider } from '../providers/data-api/data-api';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,          
    HomePage,
    AddTodoPage,
    TodoDetailPage,
    EditTodoPage,
    AddEditTodoPage,
    AddEditPage_2Page,
    AddEditLocalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddTodoPage,
    TodoDetailPage,
    EditTodoPage,
    AddEditTodoPage,
    AddEditPage_2Page,
    AddEditLocalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataApiProvider
  ]
})
export class AppModule {}
