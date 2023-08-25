import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {TaskDto} from "../../../models/DTO/task-dto";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/userService/user.service";
import {TaskService} from "../../../services/task/task.service";

@Component({
  selector: 'app-drag-drop',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy{
  subscriptions : Subscription = new Subscription();
  //tasks :TaskDto[] = [];
  todo :TaskDto[] = [];
  done :TaskDto[] = [];

  constructor(private userService :UserService,
              private taskService :TaskService) {
  }

  ngOnInit(): void {
    const email :any= localStorage.getItem('user');
    this.subscriptions = this.userService.getUserTasks(email).subscribe((tasks)=>{
      tasks.forEach(task =>{
        if(task.done){
          this.done.push(task);
        }else {
          this.todo.push(task);
        }

      })
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  drop(event: CdkDragDrop<TaskDto[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const draggedItem :TaskDto = event.item.data;
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

      this.taskService.updateTask(draggedItem).subscribe();
    }
  }
}
