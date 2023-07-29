import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from "../../services/navbarService/navbarService";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,OnDestroy{

  constructor(private navbarService : NavbarService) {
  }

  ngOnInit(): void {
    this.navbarService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
  }



}
