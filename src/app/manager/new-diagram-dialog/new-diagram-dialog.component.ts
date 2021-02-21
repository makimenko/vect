import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

export interface NewDiagramDialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-new-diagram-dialog',
  templateUrl: './new-diagram-dialog.component.html',
  styleUrls: ['./new-diagram-dialog.component.scss']
})
export class NewDiagramDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewDiagramDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewDiagramDialogData
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.max(50)
      ]),
      description: new FormControl('', [
        Validators.maxLength(100)
      ])
    });

  }

  public onSubmit(): void {
    this.dialogRef.close(this.form.getRawValue());
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

}
