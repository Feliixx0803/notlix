import {Component, Inject, OnInit} from '@angular/core';
import {NoteDTO} from "../../../../../models/DTO/note-dto";
import {NoteService} from "../../../../../services/noteService/note.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PopUpService} from "../../../../../services/PopUp/pop-up.service";
import {TaskService} from "../../../../../services/task/task.service";
import {TaskDto} from "../../../../../models/DTO/task-dto";
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
    let actualUser = localStorage.getItem('user');
    let task :NewTask = {
      name :this.name,
      done : false
    }
    this.taskService.newTaskData$.emit(task);
  }
}
