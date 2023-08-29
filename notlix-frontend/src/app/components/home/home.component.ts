import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/authService/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  subscription :Subscription = new Subscription();
  userLogged = false;

  constructor(private userService :AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.userLogged.subscribe((isLogged :boolean) =>{
      this.userLogged = isLogged;
    })

    if(localStorage.getItem('user')){
      this.userLogged = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
