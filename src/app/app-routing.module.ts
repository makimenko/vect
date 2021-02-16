import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorLayoutComponent } from './editor/editor-layout/editor-layout.component';
import { ManagerListComponent } from './manager/manager-list/manager-list.component';
import { LoginComponent } from './welcome/login/login.component';
import { LoggedInGuardService } from './welcome/service/logged-in-guard.service';

const routes: Routes = [
  // Mapping:
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'list', component: ManagerListComponent, canActivate: [LoggedInGuardService] },
  { path: 'editor/:uuid', component: EditorLayoutComponent, canActivate: [LoggedInGuardService] },
  // Redirection:
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '*', redirectTo: '/list' },
  { path: '**', redirectTo: '/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
