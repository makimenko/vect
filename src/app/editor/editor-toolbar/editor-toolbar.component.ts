import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit {

  @Input() loading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
