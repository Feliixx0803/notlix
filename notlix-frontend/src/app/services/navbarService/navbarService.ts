import { Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  //To hide the navbar when the register o longin pages are opened:
  showNavbar: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() { }

  hide(){
    this.showNavbar.next(false);
  }

  show(){
    this.showNavbar.next(true);
  }
}
