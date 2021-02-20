import {Component, OnInit} from '@angular/core';
import {DiagramService} from '../../data-access/service/diagram.service';
import {DiagramItem} from '../../data-access/model/diagram-item.model';


@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {

  gridColumns = 4;

  items: Array<DiagramItem> = [];

  constructor(protected diagramService: DiagramService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  toggleGridColumns(): void {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  refresh(): void {
    this.diagramService.list().then(result => {
      this.items = result;
    });
  }

}
