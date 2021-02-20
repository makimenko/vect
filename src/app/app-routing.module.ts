import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorLayoutComponent} from './editor/editor-layout/editor-layout.component';
import {ManagerListComponent} from './manager/manager-list/manager-list.component';
import {LoggedInGuardService} from './general/service/logged-in-guard.service';
import {ManagerHomeComponent} from './manager/manager-home/manager-home.component';

const routes: Routes = [
  // Mapping:
  {path: 'manager', component: ManagerHomeComponent, canActivate: [LoggedInGuardService]},
  {path: 'editor/:id', component: EditorLayoutComponent, canActivate: [LoggedInGuardService]},
  // Redirection:
  {path: '', redirectTo: '/manager', pathMatch: 'full'},
  {path: '*', redirectTo: '/manager'},
  {path: '**', redirectTo: '/manager'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
