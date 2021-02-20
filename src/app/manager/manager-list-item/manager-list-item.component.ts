import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DiagramItem} from '../../data-access/model/diagram-item.model';
import {DiagramService} from '../../data-access/service/diagram.service';


@Component({
  selector: 'app-manager-list-item',
  templateUrl: './manager-list-item.component.html',
  styleUrls: ['./manager-list-item.component.scss']
})
export class ManagerListItemComponent implements OnInit {

  @Input() item: DiagramItem;
  @Output() loadingEvent = new EventEmitter<boolean>();
  @Output() reloadRequired = new EventEmitter<void>();

  constructor(
    protected diagramService: DiagramService
  ) {
  }

  ngOnInit(): void {
  }

  public async doDelete(id: string): Promise<void> {
    console.log('ManagerListItemComponent.doDelete', id);
    this.loadingEvent.emit(true);
    await this.diagramService.delete(id);
    this.loadingEvent.emit(false);

    // Request to refresh list of diagrams
    this.reloadRequired.emit();
  }

}
