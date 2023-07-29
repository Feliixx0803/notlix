import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbarService/navbarService";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy{
  showNavbar :boolean = true;
  subscriptions :Subscription = new Subscription();

  constructor(private navbarService :NavbarService) {
  }

  ngOnInit(): void {
    this.subscriptions = this.navbarService.showNavbar.subscribe((value) =>{
      this.showNavbar = value;
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
