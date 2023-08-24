import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoPageFoundComponent} from "./errorPage/no-page-found/no-page-found.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {NoteComponent} from "./components/note/note.component";
import {TaskComponent} from "./components/task/drag-drop/task.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"notes", component:NoteComponent},
  {path:"tasks", component:TaskComponent},
  { path: "error", component:NoPageFoundComponent},
  { path: "**", redirectTo: "error", pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
