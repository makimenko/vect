import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EditorLayoutComponent} from './editor/editor-layout/editor-layout.component';
import {ManagerListComponent} from './manager/manager-list/manager-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'}, // redirect to `first-component`
  {path: 'list', component: ManagerListComponent},
  {path: 'editor/:uuid', component: EditorLayoutComponent},
  {path: '**', redirectTo: 'noDetails'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
