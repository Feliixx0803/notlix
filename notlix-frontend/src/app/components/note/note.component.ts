import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/userService/user.service";
import {lastValueFrom, Subscription} from "rxjs";
import {NoteDTO} from "../../models/DTO/note-dto";
import {NoteService} from "../../services/noteService/note.service";
import {MatDialog} from "@angular/material/dialog";
import {MatDialogComponent} from "../../modules/angular-mat/components/mat-dialog/mat-dialog.component";

@Component({
  selector: 'app-noteService',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy{
  subscription :Subscription = new Subscription();
  selectedNote! :NoteDTO;
  isSelected :boolean = false;

  constructor(private http :HttpClient,
              private userService :UserService,
              public notesService :NoteService,
              private dialog :MatDialog) {}

  ngOnInit(): void {
    const email :any= localStorage.getItem('user');
    this.getUserNotes(email);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.notesService.notes = [];
  }

  async getUserNotes (email :string){
    let notesBack = await lastValueFrom(this.userService.getUserNotes(email));

    notesBack.forEach( note => {
      this.notesService.notes.push(note);
    })
  }

  async openSelectedNote(title: string) {
     let note = await lastValueFrom(this.notesService.findNoteByTitle(title));
     this.selectedNote = note;
     this.isSelected = true;
  }



  openDialog(){
    this.dialog.open(MatDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

  changingSelectedNote() {
   setTimeout(()=>{
      this.notesService.updateNote(this.selectedNote).subscribe(
        ()=>{

        },
        (error :any)=> console.error(`Ocurrio un error al actualizar la nota seleccionada ${error}`),
        ()=> console.log("Nota actualizada con exito")
      )
    },1000)
  }
}
