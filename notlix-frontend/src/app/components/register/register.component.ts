import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventEmitterService} from "../../services/eventEmitter/event-emitter.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy{

  constructor(private eventEmitter : EventEmitterService) {
    this.eventEmitter.logEvent.emit({hideNavbar: true});
  }

  ngOnDestroy(): void {
    this.eventEmitter.logEvent.emit({hideNavbar :false});
  }

}
