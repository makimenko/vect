import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {EditorCanvasComponent} from './editor-canvas/editor-canvas.component';
import {EditorContentComponent} from './editor-content/editor-content.component';
import {EditorLayoutComponent} from './editor-layout/editor-layout.component';
import {EditorSideComponent} from './editor-side/editor-side.component';
import {EditorToolbarComponent} from './editor-toolbar/editor-toolbar.component';
import {AnimationService, AtftDataCenterActorModule, AtftModule, RendererService, StatsService} from 'atft';
import {RouterModule} from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {EditorHelpDialogComponent} from './editor-help-dialog/editor-help-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    AtftModule,
    AtftDataCenterActorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatTabsModule
  ],
  declarations: [
    EditorLayoutComponent,
    EditorContentComponent,
    EditorToolbarComponent,
    EditorSideComponent,
    EditorCanvasComponent,
    EditorHelpDialogComponent
  ],
  exports: [
    EditorLayoutComponent,
    EditorContentComponent,
    EditorToolbarComponent
  ],
  providers: [
    AnimationService,
    RendererService,
    StatsService
  ]
})
export class EditorModule {
}
