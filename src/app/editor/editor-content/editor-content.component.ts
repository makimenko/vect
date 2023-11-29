import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserPreferenceService} from '../../general/service/user-preference.service';
import {DiagramLoadingEvent} from '../editor-side/editor-side.component';

const KEY_SIDEBAR_OPENED = 'EditorContentComponent.sidePanelOpened';

@Component({
  selector: 'app-editor-content',
  templateUrl: './editor-content.component.html',
  styleUrls: ['./editor-content.component.scss']
})
export class EditorContentComponent {
  @Input() id!: string;
  @Output() diagramLoadingEvent = new EventEmitter<DiagramLoadingEvent>();
  @Output() dirtyEvent = new EventEmitter<boolean>();

  public sidePanelOpened = this.pref.getBoolean(KEY_SIDEBAR_OPENED, true);

  constructor(
    private pref: UserPreferenceService
  ) {
  }

  public toggleSidePanel(): void {
    this.sidePanelOpened = this.pref.invertBoolean(KEY_SIDEBAR_OPENED, this.sidePanelOpened);
  }
}
