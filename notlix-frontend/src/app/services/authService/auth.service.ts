import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserDTO} from "../../models/DTO/user-dto";
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  login(body: any) {
    return this.http.post<UserDTO>(`${environment.apiUrl}/login`, body, {responseType: 'json'})
  }

  register(body :any){
    return  this.http.post(`${environment.apiUrl}/register`, body, { responseType: 'text' })
  }
}
