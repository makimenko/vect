import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../general/service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {NewDiagramDialogComponent, NewDiagramDialogData} from '../new-diagram-dialog/new-diagram-dialog.component';
import {DiagramService} from '../../data-access/service/diagram.service';
import {Router} from '@angular/router';
import {TemplateService} from '../../data-access/service/template.service';
import {DiagramItem} from '../../data-access/model/diagram-item.model';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.scss']
})
export class ManagerPanelComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  constructor(
    public auth: AuthService,
    protected dialog: MatDialog,
    protected diagramService: DiagramService,
    private router: Router,
    protected templateService: TemplateService
  ) {
  }

  ngOnInit(): void {
  }


  public createNewDiagram(): void {
    // console.log('ManagerPanelComponent.createNewDiagram');
    const dialogRef = this.dialog.open(NewDiagramDialogComponent, {
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((dialogInput: NewDiagramDialogData) => {
      if (dialogInput) {
        this.loadingEvent.emit(true);
        this.diagramService.create(dialogInput).then((newDiagram) => {
          // console.log('ManagerPanelComponent.createNewDiagram created', newDiagram);
          this.router.navigate(['/doEditorShowHide', newDiagram.id]);
          this.loadingEvent.emit(false);
        });

      }
    });
  }


}
