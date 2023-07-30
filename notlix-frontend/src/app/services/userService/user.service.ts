import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLogged :BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
}
