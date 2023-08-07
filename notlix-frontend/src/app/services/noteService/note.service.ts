import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {NoteDTO} from "../../models/DTO/note-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  apiUrl = environment.apiUrl;

  constructor(private http :HttpClient) { }

  findNoteByTitle(title:string) :Observable<NoteDTO>{
    return this.http.get<NoteDTO>(`${this.apiUrl}/note/findNoteByTitle/${title}`, {responseType: 'json'});
  }

}
