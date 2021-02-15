import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor-side',
  templateUrl: './editor-side.component.html',
  styleUrls: ['./editor-side.component.scss']
})
export class EditorSideComponent implements OnInit {

  @Input() initialDiagramSource: string;

  @Output()
  diagramSourceUpdated = new EventEmitter<string>();

  diagramForm = new FormGroup({
    source: new FormControl('')
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.diagramForm = this.fb.group({
      source: this.initialDiagramSource
    });
    setTimeout(i => {
      this.onSubmit();
    }, 100);
  }

  public onSubmit(): void {
    console.log('EditorSideComponent.onSubmit');
    const diagramSource = this.diagramForm.get('source').value;
    this.diagramSourceUpdated.emit(diagramSource);
  }

  @HostListener('window:keydown.control.enter', ['$event'])
  public shortCut(event: KeyboardEvent): void {
    event.preventDefault();
    if (this.diagramForm.valid) {
      this.onSubmit();
    }
  }

}
