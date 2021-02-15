import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss']
})
export class EditorLayoutComponent implements OnInit {
  @Input() initialDiagramSource: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
