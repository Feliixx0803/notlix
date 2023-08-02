import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/userService/user.service";
import {lastValueFrom, Subscription} from "rxjs";
import {NoteDTO} from "../../models/DTO/note-dto";

@Component({
  selector: 'app-noteService',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy{
  subscription :Subscription = new Subscription();
  notes :NoteDTO[] = [];
  constructor(private http :HttpClient,
              private userService :UserService) {}

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
}
