import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {NoPageFoundComponent} from "./errorPage/no-page-found/no-page-found.component";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

import {AngularMatModule} from "./modules/angular-mat/angular-mat.module";
import { NavbarComponent } from './ui-controls/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { NoteComponent } from './components/note/note.component';
import { TaskComponent } from './components/task/drag-drop/task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoPageFoundComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    NoteComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMatModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
