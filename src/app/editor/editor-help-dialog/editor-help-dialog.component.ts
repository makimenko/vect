import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TemplateService} from '../../data-access/service/template.service';
import {DiagramFile} from '../../data-access/model/diagram-item.model';

@Component({
  selector: 'app-editor-help-dialog',
  templateUrl: './editor-help-dialog.component.html',
  styleUrls: ['./editor-help-dialog.component.scss']
})
export class EditorHelpDialogComponent implements OnInit {

  templates: Array<DiagramFile>;

  constructor(
    public dialogRef: MatDialogRef<EditorHelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public templateService: TemplateService
  ) {
  }

  ngOnInit(): void {
    this.templates = this.templateService.getTemplateList();
  }


}
