import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = environment.apiUrl;

  constructor(private http :HttpClient) { }

  createRoles() :Observable<any>{
    return this.http.post<any>(this.apiUrl+'/role/add', {name : 'user'});
  }

  getAllRoles() :Observable<any> {
    return this.http.get<any>(this.apiUrl+'/role/all');
  }
}
