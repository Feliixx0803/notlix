import {Component, OnDestroy} from '@angular/core';
import {EventEmitterService} from "../../services/eventEmitter/event-emitter.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{
  constructor(private eventEmitter : EventEmitterService) {
    this.eventEmitter.logEvent.emit({hideNavbar: true});
  }

  ngOnDestroy(): void {
    this.eventEmitter.logEvent.emit({hideNavbar :false});
  }
}
