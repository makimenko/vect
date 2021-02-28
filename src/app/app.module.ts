import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {EditorModule} from './editor/editor.module';
import {AppRoutingModule} from './app-routing.module';
import {ManagerModule} from './manager/manager.module';
import {DiagramService} from './data-access/service/diagram.service';
import {AuthService} from './general/service/auth.service';
import {GeneralModule} from './general/general.module';
import {UserPreferenceService} from './general/service/user-preference.service';
import {GoogleDriveService} from './data-access/service/google-drive.service';
import {HttpClientModule} from '@angular/common/http';
import {TemplateService} from './data-access/service/template.service';
import {LoggedInGuard} from './general/service/logged-in.guard';
import {PendingChangesGuard} from './general/service/pending-changes.guard';
import {DiagramLayoutService} from './data-access/service/diagram-layout.service';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    EditorModule,
    ManagerModule,
    GeneralModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DiagramService,
    AuthService,
    LoggedInGuard,
    UserPreferenceService,
    GoogleDriveService,
    TemplateService,
    PendingChangesGuard,
    DiagramLayoutService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
