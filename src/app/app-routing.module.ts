import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorLayoutComponent} from './editor/editor-layout/editor-layout.component';
import {ManagerHomeComponent} from './manager/manager-home/manager-home.component';
import {LoggedInGuard} from './general/service/logged-in.guard';
import {PendingChangesGuard} from './general/service/pending-changes.guard';

const routes: Routes = [
  // Mapping:
  {path: 'manager', component: ManagerHomeComponent, canActivate: [LoggedInGuard]},
  {path: 'doEditorShowHide/:id', component: EditorLayoutComponent, canActivate: [LoggedInGuard], canDeactivate: [PendingChangesGuard]},
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
