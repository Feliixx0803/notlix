import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {NoteDTO} from "../../models/DTO/note-dto";
import {Observable} from "rxjs";
import {NoteModel} from "../../models/note/note-model";
import {NewTask} from "../../models/DTO/new-task";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  apiUrl = environment.apiUrl;
  newNoteData$ :EventEmitter<NoteDTO> = new EventEmitter<NoteDTO>();

  constructor(private http :HttpClient) { }

  findNoteByTitle(title :string) :Observable<NoteDTO>{
    return this.http.get<NoteDTO>(`${this.apiUrl}/note/findNoteByTitle/${title}`, {responseType: 'json'});
  }

  addNewNote(note :NoteDTO, email :any) :Observable<NoteDTO>{
    return this.http.post<NoteDTO>(`${this.apiUrl}/note/add/${email}`,note);
  }

  updateNote(note :NoteDTO) :Observable<NoteModel>{
    return this.http.put<NoteModel>(`${this.apiUrl}/note/update`,note);
  }

  deleteNote(title :string, notes:NoteDTO[]) {
    let index = notes.findIndex(note => note.title === title);
    if (index !== -1) {
      notes.splice(index, 1);
    }

    return this.http.delete(`${this.apiUrl}/note/delete/${title}`);
  }

}
