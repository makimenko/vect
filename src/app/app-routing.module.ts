import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorLayoutComponent} from './editor/editor-layout/editor-layout.component';
import {ManagerHomeComponent} from './manager/manager-home/manager-home.component';
import {LoggedInGuard} from './general/service/logged-in.guard';
import {PendingChangesGuard} from './general/service/pending-changes.guard';
import {LoginHomeComponent} from "./login-home/login-home.component";

const routes: Routes = [
  // Mapping:
  {path: 'login', component: LoginHomeComponent},
  {path: 'manager', component: ManagerHomeComponent, canActivate: [LoggedInGuard]},
  {path: 'editor/:id', component: EditorLayoutComponent, canActivate: [LoggedInGuard], canDeactivate: [PendingChangesGuard]},
  // Redirection:
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '*', redirectTo: '/login'},
  {path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
