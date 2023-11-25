import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TemplateService} from '../../data-access/service/template.service';
import {DiagramFile} from '../../data-access/model/diagram-item.model';

export interface NewDiagramDialogData {
  name: string;
  description: string;
  template: DiagramFile;
}

@Component({
  selector: 'app-new-diagram-dialog',
  templateUrl: './new-diagram-dialog.component.html',
  styleUrls: ['./new-diagram-dialog.component.scss']
})
export class NewDiagramDialogComponent implements OnInit {

  public form!: FormGroup;
  public templates!: Array<DiagramFile>;

  constructor(
    public dialogRef: MatDialogRef<NewDiagramDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewDiagramDialogData,
    protected templateService: TemplateService
  ) {

  }

  ngOnInit(): void {
    this.templates = this.templateService.getTemplateList();
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.max(50)
      ]),
      description: new FormControl('', [
        Validators.maxLength(100)
      ]),
      template: new FormControl()
    });
  }

  public onSubmit(): void {
    this.dialogRef.close(this.form.getRawValue());
  }

  get name(): AbstractControl {
     return this.getFormControl('name');
  }

  get description(): AbstractControl {
    return this.getFormControl('description');
  }

  get template(): AbstractControl {
    return this.getFormControl('template')
  }

  protected getFormControl(name:string): AbstractControl {
    const control = this.form.get(name);
    if (!control)
      throw new Error("Unable to find control by name: "+name);
    return control;
  }

}
