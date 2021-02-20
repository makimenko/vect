import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface NewDiagramDialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-new-diagram-dialog',
  templateUrl: './new-diagram-dialog.component.html',
  styleUrls: ['./new-diagram-dialog.component.scss']
})
export class NewDiagramDialogComponent {

  name: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<NewDiagramDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewDiagramDialogData
  ) {

  }

  create(): void {

  }

}
