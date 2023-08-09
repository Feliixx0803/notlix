import { Component } from '@angular/core';
import {NoteDTO} from "../../../../models/DTO/note-dto";
import {NoteService} from "../../../../services/noteService/note.service";

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent {
  title :string = "";
  content :string = "";

  constructor(private notesService :NoteService) {
  }
  newNote() {
    let actualUser = localStorage.getItem('user');
    let newNote :NoteDTO = {
      title: this.title,
      content: this.content
    }

    this.notesService.addNewNote(newNote, actualUser).subscribe(
      ()=>{
        this.notesService.notes.push(newNote);
      },
      (error) => {
        alert("No pueden existir notas con el mismo nombre")
        console.error(`Hubo un error al crear la nota: ${error}`)
      },
      ()=> console.log("Nota creada con exito"))
  }
}
