import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbarService/navbarService";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy{
  showNavbar :boolean = true;
  subscriptions :Subscription = new Subscription();
  userLogged: boolean = false;

  constructor(private navbarService :NavbarService, private userService :AuthService) {
  }

  ngOnInit(): void {
    //Show navbar
    this.subscriptions = this.navbarService.showNavbar.subscribe((value) =>{
      this.showNavbar = value;
      console.log(value);
    })

    //Control if user is logged
    this.userService.userLogged.subscribe((isLogged :boolean) =>{
      this.userLogged = isLogged;
      console.log("log",isLogged);
    })

    //If we reload the page, angular will restart the state of components and services.
    //So we check if there's still a user logged with localStore and reassign userLogged's value
    if(localStorage.getItem('user')){
      this.userLogged = true;
    }



  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(){
    localStorage.removeItem("user");
    this.userService.userLogged.next(false);
  }

}
