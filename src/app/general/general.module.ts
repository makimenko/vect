import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {EditorHelpDialogComponent} from '../editor/editor-help-dialog/editor-help-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  bootstrap: [
    ConfirmDialogComponent,
    EditorHelpDialogComponent
  ]
})
export class GeneralModule {
}
