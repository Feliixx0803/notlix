import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbarService/navbarService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  constructor(private navbarService : NavbarService) {
  }

  ngOnInit(): void {
    this.navbarService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
  }

}
