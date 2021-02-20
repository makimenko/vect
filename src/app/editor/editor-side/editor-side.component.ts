import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DiagramService} from '../../data-access/service/diagram.service';

@Component({
  selector: 'app-editor-side',
  templateUrl: './editor-side.component.html',
  styleUrls: ['./editor-side.component.scss']
})
export class EditorSideComponent implements OnInit {

  @Input() id: string;

  @Output()
  diagramSourceUpdated = new EventEmitter<string>();

  diagramForm = new FormGroup({
    source: new FormControl('')
  });

  constructor(
    protected fb: FormBuilder,
    protected diagramService: DiagramService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const item = await this.diagramService.get(this.id);
    this.diagramForm = this.fb.group({
      source: item.diagramSource
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
