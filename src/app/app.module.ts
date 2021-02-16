import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {EditorModule} from './editor/editor.module';
import {AppRoutingModule} from './app-routing.module';
import {ManagerModule} from './manager/manager.module';
import {DiagramService} from './data-access/service/diagram.service';
import { AuthService } from './welcome/service/auth.service';
import { LoggedInGuardService } from './welcome/service/logged-in-guard.service';
import { WelcomeModule } from './welcome/welcome.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    EditorModule,
    ManagerModule,
    WelcomeModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DiagramService,
    AuthService,
    LoggedInGuardService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
