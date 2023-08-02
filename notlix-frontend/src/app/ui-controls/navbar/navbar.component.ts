import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbarService/navbarService";
import {Subscription} from "rxjs";
import {UserService} from "../../services/userService/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy{
  showNavbar :boolean = true;
  subscriptions :Subscription = new Subscription();
  userLogged: boolean = false;

  constructor(private navbarService :NavbarService, private userService :UserService) {
  }

  ngOnInit(): void {
    //Show navbar
    this.subscriptions = this.navbarService.showNavbar.subscribe((value) =>{
      this.showNavbar = value;
    })

    //Control if user is logged
    this.userService.userLogged.subscribe((isLogged :boolean) =>{
      this.userLogged = isLogged;
      console.log(isLogged);
    })

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(){
    localStorage.removeItem("user");
    this.userService.userLogged.next(false);
  }

}
