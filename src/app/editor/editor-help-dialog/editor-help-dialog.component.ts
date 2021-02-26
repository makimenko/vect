import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-editor-help-dialog',
  templateUrl: './editor-help-dialog.component.html',
  styleUrls: ['./editor-help-dialog.component.scss']
})
export class EditorHelpDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditorHelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
  }

}
