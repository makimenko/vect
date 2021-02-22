import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DiagramService} from '../../data-access/service/diagram.service';
import {DiagramItem} from '../../data-access/model/diagram-item.model';

@Component({
  selector: 'app-editor-side',
  templateUrl: './editor-side.component.html',
  styleUrls: ['./editor-side.component.scss']
})
export class EditorSideComponent implements OnInit {

  @Input() id: string;
  private item: DiagramItem;

  @Output()
  diagramSourceUpdated = new EventEmitter<DiagramItem>();

  @Output() loadingEvent = new EventEmitter<boolean>();

  form = new FormGroup({
    source: new FormControl('')
  });

  constructor(
    protected fb: FormBuilder,
    protected diagramService: DiagramService
  ) {
  }

  public ngOnInit(): void {
    const emptyItem: DiagramItem = {
      id: '',
      name: '',
      description: '',
      diagramSource: '',
      image: ''
    };

    this.form = this.fb.group(emptyItem);
    setTimeout(() => {
      this.refresh();
    }, 100);

  }

  protected async refresh(): Promise<void> {
    this.loadingEvent.emit(true);
    this.item = await this.diagramService.get(this.id);
    // console.log('EditorSideComponent.refresh item', this.item);

    this.form = this.fb.group(this.item);


    setTimeout(i => {
      this.diagramSourceUpdated.emit(this.item);
      this.loadingEvent.emit(false);
    }, 100);

  }

  public async onSubmit(): Promise<void> {
    // console.log('EditorSideComponent.onSubmit');
    this.loadingEvent.emit(true);

    const diagram: DiagramItem = {
      id: this.item.id,
      name: this.item.name,
      description: this.item.description,
      image: this.item.image,
      diagramSource: this.form.get('diagramSource').value
    };
    // console.log('EditorSideComponent.onSubmit value', diagram);

    await this.diagramService.save(diagram);
    await this.diagramSourceUpdated.emit(diagram);
    this.loadingEvent.emit(false);
  }

  @HostListener('window:keydown.control.enter', ['$event'])
  public shortCut(event: KeyboardEvent): void {
    event.preventDefault();
    if (this.form.valid) {
      this.onSubmit();
    }
  }

}
