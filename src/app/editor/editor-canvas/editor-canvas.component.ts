import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AnimationService, MapControlsComponent} from 'atft';
import {MatButton} from '@angular/material/button';
import {btnClick} from '../../general/utils/btnClick';

@Component({
  selector: 'app-editor-canvas',
  templateUrl: './editor-canvas.component.html',
  styleUrls: ['./editor-canvas.component.scss']
})
export class EditorCanvasComponent implements OnInit {

  @Input() yaml = ``;
  @Output() editorToggle = new EventEmitter<void>();
  @Output() diagramStatus = new EventEmitter<boolean>();

  @ViewChild('controls') controls: MapControlsComponent;
  @ViewChild('buttonEditor') buttonEditor: MatButton;
  @ViewChild('buttonReset') buttonReset: MatButton;

  positionX = 15;

  constructor(private animation: AnimationService) {
    this.animation.start();
  }

  ngOnInit(): void {
  }

  public mouseEnter(): void {
    // console.log('mouseEnter');
  }

  public click(): void {
    // console.log('click');
  }

  public mouseExit(): void {
    // console.log('mouseExit');
  }

  public center(): void {
    this.controls.reset();
  }

  @HostListener('window:keydown.control.e', ['$event'])
  public shortCutEditor(event: KeyboardEvent): void {
    btnClick(event, this.buttonEditor);
  }

  @HostListener('window:keydown.control.c', ['$event'])
  public shortCutReset(event: KeyboardEvent): void {
    btnClick(event, this.buttonReset);
  }

}
