import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DiagramService} from '../../data-access/service/diagram.service';
import {DiagramItem} from '../../data-access/model/diagram-item.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {EditorHelpDialogComponent} from '../editor-help-dialog/editor-help-dialog.component';
import {btnClick} from '../../general/utils/btnClick';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';

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

  @Input() id: string;
  private item: DiagramItem;

  @Output()
  diagramSourceUpdated = new EventEmitter<DiagramItem>();

  @Output() loadingEvent = new EventEmitter<boolean>();
  @Output() dirtyEvent = new EventEmitter<boolean>();

  @ViewChild('submitButton') submitButton: MatButton;
  @ViewChild('helpButton') helpButton: MatButton;

  private helpDialogRef: MatDialogRef<EditorHelpDialogComponent>;

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

  form = new FormGroup({
    source: new FormControl('')
  });

  constructor(
    protected fb: FormBuilder,
    protected diagramService: DiagramService,
    protected dialog: MatDialog,
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
    this.form.get('diagramSource').valueChanges.subscribe((val) => {
      this.dirty = true;
    });

    setTimeout(i => {
      this.initialized = true;
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


    this.saveInProgress = true;
    this.diagramService.save(diagram).then(() => {
      this.saveInProgress = false;
      this.dirty = false;
      this.form.markAsPristine();
    });
    await this.diagramSourceUpdated.emit(diagram);
    this.loadingEvent.emit(false);
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
      this.helpDialogRef.afterClosed().subscribe((result) => {
        this.helpDialogRef = undefined;
      });
    }
  }

}
