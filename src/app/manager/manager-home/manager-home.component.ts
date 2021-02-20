import {Component, OnInit} from '@angular/core';
import {DiagramService} from '../../data-access/service/diagram.service';
import {GoogleDriveService} from '../../data-access/service/google-drive.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.scss']
})
export class ManagerHomeComponent implements OnInit {

  loading = true;

  constructor(
    protected drive: GoogleDriveService
  ) {
  }

  ngOnInit(): void {
    this.drive.test();
  }

}
