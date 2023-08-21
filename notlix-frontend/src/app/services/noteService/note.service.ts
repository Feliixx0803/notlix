import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {NoteDTO} from "../../models/DTO/note-dto";
import {map, Observable, startWith} from "rxjs";
import {NoteModel} from "../../models/note/note-model";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  apiUrl = environment.apiUrl;

  //It stores all notes from the logged user
  notes :NoteDTO[] = [];
  filteredOptions$!: Observable<NoteDTO[]>;

  constructor(private http :HttpClient) { }

  updateFilteredOptions(searchField :any) :void {
    this.filteredOptions$ = searchField.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: any): NoteDTO[] {
    const filterNote = value.toLowerCase();

    return this.notes.filter(note => note.title.toLowerCase().includes(filterNote));
  }

  findNoteByTitle(title :string) :Observable<NoteDTO>{
    return this.http.get<NoteDTO>(`${this.apiUrl}/note/findNoteByTitle/${title}`, {responseType: 'json'});
  }

  addNewNote(note :NoteDTO, email :any) :Observable<NoteDTO>{
    return this.http.post<NoteDTO>(`${this.apiUrl}/note/add/${email}`,note);
  }

  updateNote(note :NoteDTO) :Observable<NoteModel>{
    return this.http.put<NoteModel>(`${this.apiUrl}/note/update`,note);
  }

  deleteNote(title :string) {
    let index = this.notes.findIndex(note => note.title === title);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }

    return this.http.delete(`${this.apiUrl}/note/delete/${title}`);
  }

}
