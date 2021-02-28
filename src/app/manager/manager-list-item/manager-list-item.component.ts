import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DiagramItem} from '../../data-access/model/diagram-item.model';
import {DiagramService} from '../../data-access/service/diagram.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../general/confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

enum State {
  active = 'active',
  warn = 'warn',
  deleted = 'deleted',
  clicked = 'clicked'
}

@Component({
  selector: 'app-manager-list-item',
  templateUrl: './manager-list-item.component.html',
  styleUrls: ['./manager-list-item.component.scss'],
  animations: [
    trigger('enterLeaveTrigger', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1})),
      ]) /*,
      transition(':leave', [
        animate('200ms', style({opacity: 0}))
      ] ) */
    ]),
    trigger('itemState', [
      state(State.warn, style({
        background: 'red',
        opacity: 0.2
      })),
      state(State.deleted, style({
        background: 'red',
        opacity: 0
      })),
      transition('* -> ' + State.deleted, [
        animate('0ms', style({opacity: 1, background: 'red'})),
        animate('600ms', style({opacity: 0}))
      ]),
      transition('* -> ' + State.clicked, [
        animate('70ms', style({transform: 'scale(0.9)'}))
      ])
    ])
  ]
})
export class ManagerListItemComponent implements OnInit {

  @Input() item: DiagramItem;
  @Output() loadingEvent = new EventEmitter<boolean>();
  @Output() reloadRequired = new EventEmitter<void>();
  itemState = State.active;

  constructor(
    protected diagramService: DiagramService,
    protected dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public async doDelete(event: any, id: string): Promise<void> {
    // console.log('ManagerListItemComponent.doDelete', id);
    this.itemState = State.warn;

    // console.log('ManagerListItemComponent.doDelete event', event);
    event.stopPropagation();

    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Delete diagram?'
      }
    });
    confirmDialogRef.afterClosed().subscribe(async result => {
        if (result) {
          this.itemState = State.deleted;
          this.loadingEvent.emit(true);
          await this.diagramService.delete(id);
          this.loadingEvent.emit(false);

          // Request to refresh list of diagrams
          this.reloadRequired.emit();
        } else {
          this.itemState = State.active;
        }
      }
    );


  }

  public open(event: any, id: string): void {
    // console.log('ManagerListItemComponent.open event', event);
    event.stopPropagation();
    this.itemState = State.clicked;
    setTimeout(() => {
      this.router.navigate(['/editor', id]);
    }, 80);

  }

}
