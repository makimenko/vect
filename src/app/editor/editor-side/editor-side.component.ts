import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DiagramService} from '../../data-access/service/diagram.service';
import {DiagramItem} from '../../data-access/model/diagram-item.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditorHelpDialogComponent} from '../editor-help-dialog/editor-help-dialog.component';
import {btnClick} from '../../general/utils/btnClick';

export type DiagramLoadingEvent = {
  busy: boolean,
  loadedDiagramName?: string
};

@Component({
  selector: 'app-editor-side',
  templateUrl: './editor-side.component.html',
  styleUrls: ['./editor-side.component.scss'],
  animations: [
    trigger('diagramStatus', [
      state('true', style({})),
      state('false', style({
        background: '#aa2b1d',
        opacity: 0.7
      })),
      transition('true -> false', [
        animate('200ms', style({
          background: '#aa2b1d',
          opacity: 0.7
        }))
      ]),
      transition('true -> false', [
        animate('600ms', style({background: 'blue'}))
      ])
    ])
  ]
})
export class EditorSideComponent implements OnInit {

  @Input() id!: string;
  private item!: DiagramItem;

  @Output()
  diagramSourceUpdated = new EventEmitter<DiagramItem>();

  @Output() diagramLoadingEvent = new EventEmitter<DiagramLoadingEvent>();
  @Output() dirtyEvent = new EventEmitter<boolean>();

  @ViewChild('submitButton') submitButton!: MatButton;
  @ViewChild('helpButton') helpButton!: MatButton;

  private helpDialogRef?: MatDialogRef<EditorHelpDialogComponent>;

  // tslint:disable-next-line:variable-name
  private _dirty = false;
  set dirty(value: boolean) {
    if (value !== this._dirty) {
      this._dirty = value;
      this.dirtyEvent.emit(value);
    }
  }

  initialized = false;
  saveInProgress = false;
  diagramStatus = true;

  form!: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected diagramService: DiagramService,
    protected dialog: MatDialog,
    private ref: ChangeDetectorRef
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

  public async refresh(): Promise<void> {
    console.log('EditorSideComponent.refresh');
    this.diagramLoadingEvent.emit({busy: true});
    this.item = await this.diagramService.get(this.id);
    console.log('EditorSideComponent.refresh item', this.item);

    this.form = this.fb.group(this.item);
    this.form.get('diagramSource')?.valueChanges.subscribe((val: any) => {
      this.dirty = true;
    });

    console.log('EditorSideComponent.refresh before setTimeout');
    setTimeout((i: any) => {
      console.log('EditorSideComponent.refresh insideTimeout');
      this.initialized = true;
      this.diagramSourceUpdated.emit(this.item);
      this.diagramLoadingEvent.emit({busy: false, loadedDiagramName: this.item.name});
      console.log('EditorSideComponent.refresh endOfTimeout');
    }, 100);

  }


  public async onSubmit(): Promise<void> {
    // console.log('EditorSideComponent.onSubmit');
    this.diagramLoadingEvent.emit({busy: true});

    const diagram: DiagramItem = {
      id: this.item.id,
      name: this.item.name,
      description: this.item.description,
      image: this.item.image,
      diagramSource: this.form.get('diagramSource')?.value
    };
    // console.log('EditorSideComponent.onSubmit value', diagram);


    this.saveInProgress = true;
    this.diagramService.save(diagram).then(() => {
      this.saveInProgress = false;
      this.dirty = false;
      this.form.markAsPristine();
    });
    await this.diagramSourceUpdated.emit(diagram);
    this.diagramLoadingEvent.emit({busy: false, loadedDiagramName: this.item.name});
  }

  @HostListener('window:keydown.control.enter', ['$event'])
  public shortCutSave(event: KeyboardEvent): void {
    btnClick(event, this.submitButton);
  }

  @HostListener('window:keydown.f1', ['$event'])
  public shortCutHelp(event: KeyboardEvent): void {
    btnClick(event, this.helpButton);
  }

  public processDiagramStatus(status: boolean): void {
    this.diagramStatus = status;
  }

  public showHelp(): void {
    // Allows to open Help dialog only once
    if (!this.helpDialogRef) {
      this.helpDialogRef = this.dialog.open(EditorHelpDialogComponent, {});
      this.helpDialogRef.afterClosed().subscribe(() => {
        this.helpDialogRef = undefined;
      });
    }
  }


  refreshTextarea(): void {
    console.log('EditorSideComponent.refreshTextarea');
    // TODO: There is a glitch with sidenav + textarea (height calculated incorrectly). Touching value to trigger recalculation.
    const field = this.form.get('diagramSource');
    if (field) {
      const oldValue = field.value;
      field.setValue('');
      this.ref.detectChanges();
      field.setValue(oldValue);
    }
  }

}
