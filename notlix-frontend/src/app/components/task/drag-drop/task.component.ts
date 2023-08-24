import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {TaskDto} from "../../../models/DTO/task-dto";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/userService/user.service";

@Component({
  selector: 'app-drag-drop',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy{
  subscriptions : Subscription = new Subscription();
  //tasks :TaskDto[] = [];
  todo :string[] = [];
  done :string[] = [];

  constructor(private userService :UserService) {
  }

  ngOnInit(): void {
    const email :any= localStorage.getItem('user');
    this.subscriptions = this.userService.getUserTasks(email).subscribe((tasks)=>{
      tasks.forEach(task =>{
        if(task.done){
          this.done.push(task.name);
        }else {
          this.todo.push(task.name);
        }

      })

      console.log(this.todo);
      console.log(this.done);
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
