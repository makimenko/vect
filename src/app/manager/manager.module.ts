import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerListComponent} from './manager-list/manager-list.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ManagerListItemComponent} from './manager-list-item/manager-list-item.component';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [
    ManagerListComponent,
    ManagerListItemComponent
  ]
})
export class ManagerModule {
}
