import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/userService/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  subscription :Subscription = new Subscription();
  userLogged = false;

  constructor(private userService :UserService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.userLogged.subscribe((isLogged :boolean) =>{
      this.userLogged = isLogged;
      console.log("log",isLogged);
    })

    if(localStorage.getItem('user')){
      this.userLogged = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
