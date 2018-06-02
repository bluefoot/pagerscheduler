import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public snackBar: MatSnackBar) { }

  displayMessage(msg:string) {
    this.snackBar.open(msg, 'Close', {
      duration: 10000,
    });
  }
}
