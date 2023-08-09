import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {NoteDTO} from "../../models/DTO/note-dto";
import {Observable} from "rxjs";
import {NoteModel} from "../../models/note/note-model";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  apiUrl = environment.apiUrl;

  //It stores all notes from the logged user
  notes :NoteDTO[] = [];

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

}
