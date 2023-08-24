import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {TaskDto} from "../../models/DTO/task-dto";
import {TaskModel} from "../../models/task/task-model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = environment.apiUrl;

  constructor(private http :HttpClient) { }

  updateTask(task :TaskDto) :Observable<TaskModel>{
    return this.http.put<TaskModel>(`${this.apiUrl}/task/updateState`,task.id);
  }
}
