import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {NoteDTO} from "../../models/DTO/note-dto";
import {TaskDTO} from "../../models/DTO/task-d-t-o";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http :HttpClient) { }

  getUserNotes(email :string) :Observable<NoteDTO[]>{
    return this.http.get<NoteDTO[]>(`${this.apiUrl}/user/getUserNotes/${email}`, {responseType: 'json'});
  }

  getUserTasks(email :string) :Observable<TaskDTO[]>{
    return this.http.get<TaskDTO[]>(`${this.apiUrl}/user/getUserTasks/${email}`, {responseType: 'json'});
  }
}
