import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService, Profile} from '../../general/service/auth.service';
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

  @Input() name = '';

  @Output() loadingEvent = new EventEmitter<boolean>();

  constructor(
    public auth: AuthService,
    protected dialog: MatDialog,
    protected diagramService: DiagramService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.auth.profile) {
      this.updateProfileInfo(this.auth.profile);
    }
  }

  updateProfileInfo(profile: Profile) {
    console.log('ManagerPanelComponent.handleProfileUpdate');
    this.name = profile.name;
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
          this.router.navigate(['/editor', newDiagram.id]);
          this.loadingEvent.emit(false);
        });

      }
    });
  }

}
