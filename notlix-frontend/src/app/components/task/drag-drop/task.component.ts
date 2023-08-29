import {Component, OnDestroy, OnInit} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {TaskDto} from "../../../models/DTO/task-dto";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/userService/user.service";
import {TaskService} from "../../../services/task/task.service";
import {newTaskDialog} from "../../../modules/angular-mat/components/mat-dialog/newTaskDialog/new-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NewTask} from "../../../models/DTO/new-task";
import {PopUpService} from "../../../services/PopUpService/pop-up.service";

@Component({
  selector: 'app-drag-drop',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy{
  subscriptions : Subscription = new Subscription();
  todo :TaskDto[] = [];
  done :TaskDto[] = [];
  loading :boolean = true;

  constructor(private userService :UserService,
              private taskService :TaskService,
              private dialog :MatDialog,
              private popUpService :PopUpService) {
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

    this.taskService.newTaskData$.subscribe(newTask =>{
      this.createTask(newTask, email);
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

  openDialog(){
    this.dialog.open(newTaskDialog, {
      height: '280px',
      width: '500px',
    });
  }

  private createTask(newTask: NewTask, email: any) {
    this.taskService.addNewTask(newTask, email).subscribe(
      (id)=>{
       const task :TaskDto = {
         id: id,
         name :newTask.name,
         done :newTask.done
       }

        this.todo.push(task);
      },
      (error) => {
        this.popUpService.showPopup("Introduzca el nombre de la tarea, por favor. Debe ser único.");
        console.error(`Hubo un error al crear la tarea: ${error.error}`)
      },
      ()=> console.log("Tarea creada con exito"))
  }

  /**
   * Deletes a task and updates the array which had the deleted task
   * @param task
   */
  deleteTask(task: TaskDto) {
    this.taskService.deleteTask(task).subscribe(()=>{
      let index = this.todo.findIndex(t => t.id === task.id);

      if (index !== -1) {
        this.todo.splice(index, 1);
      } else {
        this.done.splice(index, 1);
      }
    });
  }
}
