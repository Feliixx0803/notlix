import {Component} from '@angular/core';
import {TaskService} from "../../../../../services/task/task.service";
import {NewTask} from "../../../../../models/DTO/new-task";

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class newTaskDialog{

  name :string = "";

  constructor(private taskService :TaskService) {
  }

  newTask() {
    let task :NewTask = {
      name :this.name,
      done : false
    }
    this.taskService.newTaskData$.emit(task);
  }
}
