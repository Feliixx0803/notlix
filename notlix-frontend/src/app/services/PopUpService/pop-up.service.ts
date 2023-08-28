import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  private durationInSeconds = 5;

  constructor(private _snackBar : MatSnackBar) { }

  showPopup(message :string) {
    this._snackBar.open(message, "",{
      duration: this.durationInSeconds * 1000
    });
  }
}
