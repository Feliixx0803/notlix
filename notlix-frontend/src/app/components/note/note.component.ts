import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/userService/user.service";
import {lastValueFrom, map, Observable, startWith, Subscription} from "rxjs";
import {NoteDTO} from "../../models/DTO/note-dto";
import {NoteService} from "../../services/noteService/note.service";
import {MatDialog} from "@angular/material/dialog";
import {newNoteDialog} from "../../modules/angular-mat/components/mat-dialog/newNoteDialog/new-note-dialog.component";
import {FormControl} from "@angular/forms";
import {PopUpService} from "../../services/PopUp/pop-up.service";

@Component({
  selector: 'app-noteService',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy{
  subscription :Subscription = new Subscription();
  selectedNote! :NoteDTO;
  isSelected :boolean = false;

  searchField = new FormControl('');

  notes :NoteDTO[] = [];
  filteredOptions$!: Observable<NoteDTO[]>;
  constructor(private http :HttpClient,
              private userService :UserService,
              public notesService :NoteService,
              private dialog :MatDialog,
              private popUpService :PopUpService) {}

  ngOnInit(): void {
    const email :any= localStorage.getItem('user');
    this.getUserNotes(email);

    this.notesService.newNoteData$.subscribe(newNote =>{
      this.createNote(newNote, email);
    })

    this.updateFilteredOptions(this.searchField);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.notes = [];
  }



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
  async getUserNotes (email :string){
    let notesBack = await lastValueFrom(this.userService.getUserNotes(email));

    notesBack.forEach( note => {
      this.notes.push(note);
    })
    console.log(this.notes)
  }


  async openSelectedNote(title: string) {
     let note = await lastValueFrom(this.notesService.findNoteByTitle(title));
     this.selectedNote = note;
     this.isSelected = true;
  }



  openDialog(){
    this.dialog.open(newNoteDialog, {
      height: '400px',
      width: '600px',
      data:this.searchField
    });
  }

  changingSelectedNote() {
   setTimeout(()=>{
      this.notesService.updateNote(this.selectedNote).subscribe(
        ()=>{},
        (error :any)=> console.error(`Ocurrio un error al actualizar la nota seleccionada ${error}`),
        ()=> console.log("Nota actualizada con exito")
      )
    },1000)
  }

  deleteNote(n: NoteDTO) {
    this.notesService.deleteNote(n.title,this.notes).subscribe(()=>{
      this.isSelected = false;
      this.popUpService.showPopup('Nota eliminada con éxito');


      //As we are emitting the values of the array notes, when there is a change in the array notes
      // we must update and reflect this change in the observable as well.
      this.updateFilteredOptions(this.searchField);
    });
  }

  private createNote(newNote: NoteDTO, email: any) {
    this.notesService.addNewNote(newNote, email).subscribe(
      ()=>{
        this.notes.push(newNote);
        this.updateFilteredOptions(this.searchField);
      },
      (error) => {
        this.popUpService.showPopup("Rellene todos los campos. No pueden existir notas con el mismo nombre");
        console.error(`Hubo un error al crear la nota: ${error}`)
      },
      ()=> console.log("Nota creada con exito"))
  }
}
