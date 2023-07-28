import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  //To hide the navbar when the register o longin pages are opened:
  logEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
