import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ToasterService {

  constructor(public snackBar: MatSnackBar ) { }

  showError(error: {
    message
  }) {
        this.snackBar.open(error.message, 'Dismiss', {
          duration: 3000
        });
  }

}
