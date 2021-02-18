import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../general/service/auth.service';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.scss']
})
export class ManagerPanelComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
  }

}
