import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/userService/user.service";
import {lastValueFrom, Subscription} from "rxjs";
import {NoteDTO} from "../../models/DTO/note-dto";
import {NoteService} from "../../services/noteService/note.service";

@Component({
  selector: 'app-noteService',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy{
  subscription :Subscription = new Subscription();
  notes :NoteDTO[] = [];
  selectedNoteContent? :string;
  isSelected :boolean = false;

  constructor(private http :HttpClient,
              private userService :UserService,
              private notesService :NoteService) {}

  ngOnInit(): void {
    const email :any= localStorage.getItem('user');
    this.getUserNotes(email).then(()=>{
      console.log(this.notes);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async getUserNotes (email :string){
    let notesBack = await lastValueFrom(this.userService.getUserNotes(email));

    notesBack.forEach( note => {
      this.notes.push(note);
    })
  }

  async openSelectedNote(title: string) {
     let note = await lastValueFrom(this.notesService.findNoteByTitle(title));
     this.selectedNoteContent = this.getFormattedContent(note.content);
     this.isSelected = true;

  }

  //To give note`s content a format suitable for rendering in HTML
  getFormattedContent(content :string) : string{
    const formattedContent = content.replace(/\r\n/g, '<br />');
    return formattedContent;
  }
}
