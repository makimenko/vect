import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AnimationService, MapControlsComponent, RendererCanvasComponent} from 'atft';
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
  @ViewChild('buttonImage') buttonImage: MatButton;
  @ViewChild(RendererCanvasComponent) atftRenderCanvas: RendererCanvasComponent;

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

  public resetCamera(): void {
    this.controls.reset();
  }

  @HostListener('window:keydown.control.e', ['$event'])
  public shortCutEditor(event: KeyboardEvent): void {
    btnClick(event, this.buttonEditor);
  }

  @HostListener('window:keydown.control.r', ['$event'])
  public shortCutReset(event: KeyboardEvent): void {
    btnClick(event, this.buttonReset);
  }

  @HostListener('window:keydown.control.i', ['$event'])
  public shortCutImage(event: KeyboardEvent): void {
    btnClick(event, this.buttonImage);
  }

  public doImage(): void {
    // console.log('EditorCanvasComponent.doImage', this.atftRenderCanvas);
    const canvas = this.atftRenderCanvas?.renderPane?.nativeElement;
    if (canvas) {
      const img = canvas.toDataURL('doImage/png');
      const a = document.createElement('a');
      a.target = '_blank';
      a.href = img;
      a.download = 'vect.png';
      a.click();
    }
  }

  public doEditorShowHide(): void {
    this.editorToggle.emit();
  }

}
