import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoPageFoundComponent} from "./errorPage/no-page-found/no-page-found.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  { path: "error", component:NoPageFoundComponent},
  { path: "**", redirectTo: "error", pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
