import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../general/service/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {NewDiagramDialogComponent} from '../new-diagram-dialog/new-diagram-dialog.component';
import {DiagramService} from '../../data-access/service/diagram.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.scss']
})
export class ManagerPanelComponent implements OnInit {

  constructor(
    public auth: AuthService,
    protected dialog: MatDialog,
    protected diagramService: DiagramService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }


  public createNewDiagram(): void {
    console.log('ManagerPanelComponent.createNewDiagram');
    const dialogRef = this.dialog.open(NewDiagramDialogComponent, {
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diagramService.create(result).then((newDiagram) => {
          console.log('ManagerPanelComponent.createNewDiagram created', newDiagram);
          this.router.navigate(['/editor', newDiagram.id]);
        });

      }
    });
  }


}
