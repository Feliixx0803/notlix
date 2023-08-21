import {Component, Inject} from '@angular/core';
import {NoteDTO} from "../../../../models/DTO/note-dto";
import {NoteService} from "../../../../services/noteService/note.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent {
  title :string = "";
  content :string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public searchField: any,
              private notesService :NoteService) {
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
        this.notesService.updateFilteredOptions(this.searchField);
      },
      (error) => {
        alert("No pueden existir notas con el mismo nombre")
        console.error(`Hubo un error al crear la nota: ${error}`)
      },
      ()=> console.log("Nota creada con exito"))
  }
}
