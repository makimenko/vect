import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AnimationService, MapControlsComponent} from 'atft';

@Component({
  selector: 'app-editor-canvas',
  templateUrl: './editor-canvas.component.html',
  styleUrls: ['./editor-canvas.component.scss']
})
export class EditorCanvasComponent implements OnInit {

  @Input() yaml = ``;

  @ViewChild('controls') controls: MapControlsComponent;

  @Output() editorToggle = new EventEmitter<void>();
  positionX = 15;

  constructor(private animation: AnimationService) {
    this.animation.start();
  }

  ngOnInit(): void {
  }

  public mouseEnter(): void {
    console.log('mouseEnter');
  }

  public click(): void {
    console.log('click');
  }

  public mouseExit(): void {
    console.log('mouseExit');
  }

  public center(): void {
    this.controls.reset();
  }
}
