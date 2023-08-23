import {Component, OnDestroy, OnInit} from '@angular/core';
import {lastValueFrom, Subscription} from "rxjs";
import {TaskDTO} from "../../models/DTO/task-d-t-o";
import {UserService} from "../../services/userService/user.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy{
  subscriptions : Subscription = new Subscription();
  tasks :TaskDTO[] = [];
  constructor(private userService :UserService) {
  }

  ngOnInit(): void {
    const email :any= localStorage.getItem('user');
    this.subscriptions = this.userService.getUserTasks(email).subscribe((tasks)=>{
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
