import { ComponentFixture, TestBed } from '@angular/core/testing';

import { newNoteDialog } from './new-note-dialog.component';

describe('MatDialogComponent', () => {
  let component: newNoteDialog;
  let fixture: ComponentFixture<newNoteDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [newNoteDialog]
    });
    fixture = TestBed.createComponent(newNoteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
