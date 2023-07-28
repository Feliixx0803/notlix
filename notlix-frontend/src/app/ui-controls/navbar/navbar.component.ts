import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {EventEmitterService} from "../../services/eventEmitter/event-emitter.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy{
  hideNavbar :boolean = false;
  subscriptions :Subscription = new Subscription();

  constructor(private eventEmitter :EventEmitterService) {
  }

  ngOnInit(): void {
    this.subscriptions = this.eventEmitter.logEvent.subscribe((hideNavbar) =>{
      this.hideNavbar = hideNavbar;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
