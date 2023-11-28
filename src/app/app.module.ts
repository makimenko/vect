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
import { LoginHomeComponent } from './login-home/login-home.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {DynamicScriptLoaderService} from './general/service/dynamic-script-loader.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    EditorModule,
    ManagerModule,
    GeneralModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  declarations: [
    AppComponent,
    LoginHomeComponent
  ],
  providers: [
    DiagramService,
    AuthService,
    DynamicScriptLoaderService,
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
