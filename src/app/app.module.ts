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
import {LoggedInGuardService} from './general/service/logged-in-guard.service';
import {GeneralModule} from './general/general.module';
import {UserPreferenceService} from './general/service/user-preference.service';
import {GoogleDriveService} from './data-access/service/google-drive.service';
import {HttpClientModule} from '@angular/common/http';
import {TemplateService} from './data-access/service/template.service';

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
    LoggedInGuardService,
    UserPreferenceService,
    GoogleDriveService,
    TemplateService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
