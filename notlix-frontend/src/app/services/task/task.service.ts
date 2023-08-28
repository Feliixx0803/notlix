import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {TaskDto} from "../../models/DTO/task-dto";
import {TaskModel} from "../../models/task/task-model";
import {NewTask} from "../../models/DTO/new-task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = environment.apiUrl;
  newTaskData$ :EventEmitter<NewTask> = new EventEmitter<NewTask>();

  constructor(private http :HttpClient) { }

  updateTask(task :TaskDto) :Observable<TaskModel>{
    return this.http.put<TaskModel>(`${this.apiUrl}/task/updateState`,task.id);
  }

  addNewTask(task :NewTask, email :any) :Observable<number>{
    return this.http.post<number>(`${this.apiUrl}/task/add/${email}`,task);
  }
}
