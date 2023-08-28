import {Component, Inject} from '@angular/core';
import {NoteDTO} from "../../../../../models/DTO/note-dto";
import {NoteService} from "../../../../../services/noteService/note.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PopUpService} from "../../../../../services/PopUp/pop-up.service";

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.scss']
})
export class newNoteDialog {
  title :string = "";
  content :string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public searchField: any,
              private notesService :NoteService,
              private popUpService :PopUpService) {
  }
  createNote() {
    //let actualUser = localStorage.getItem('user');
    let newNote :NoteDTO = {
      title: this.title,
      content: this.content
    }

    this.notesService.newNoteData$.emit(newNote);
  }
}
