import {Component, Input, OnInit} from '@angular/core';
import {DiagramLoadingEvent} from '../editor-side/editor-side.component';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit {

  @Input() diagramLoading?: DiagramLoadingEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
