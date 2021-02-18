import {Component, Input} from '@angular/core';
import {UserPreferenceService} from '../../general/service/user-preference.service';

const KEY_SIDEBAR_OPENED = 'EditorContentComponent.sidePanelOpened';

@Component({
  selector: 'app-editor-content',
  templateUrl: './editor-content.component.html',
  styleUrls: ['./editor-content.component.scss']
})
export class EditorContentComponent {
  @Input() uuid: string;

  public sidePanelOpened = this.pref.getBoolean(KEY_SIDEBAR_OPENED, false);

  constructor(
    private pref: UserPreferenceService
  ) {
  }

  public toggleSidePanel(): void {
    this.sidePanelOpened = this.pref.invertBoolean(KEY_SIDEBAR_OPENED, this.sidePanelOpened);
  }

}
