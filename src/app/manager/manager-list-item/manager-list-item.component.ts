import {Component, Input, OnInit} from '@angular/core';
import {DiagramItem} from '../../data-access/model/diagram-item.model';


@Component({
  selector: 'app-manager-list-item',
  templateUrl: './manager-list-item.component.html',
  styleUrls: ['./manager-list-item.component.scss']
})
export class ManagerListItemComponent implements OnInit {

  @Input() item: DiagramItem;

  constructor() {
  }

  ngOnInit(): void {
  }

  doDelete(id: string): void {
    console.log('DELETE', id);
  }
}
