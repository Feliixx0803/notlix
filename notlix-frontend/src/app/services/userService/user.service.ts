import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserDTO} from "../../models/DTO/user-dto";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  login(body: any) {
    return this.http.post<UserDTO>('http://localhost:8080/login', body, {responseType: 'json'})
  }

  register(body :any){
    return  this.http.post('http://localhost:8080/register', body, { responseType: 'text' })
  }
}
