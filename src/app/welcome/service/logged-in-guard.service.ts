import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(
    private authService: AuthService
  ) {
  }

  public canActivate(): boolean {
    const authenticated = this.authService.isAuthenticated();
    console.log('LoggedInGuardService.canActivate start', authenticated);
    if (!authenticated) {
      this.authService.login();
    }
    console.log('LoggedInGuardService.canActivate end', authenticated);
    return authenticated;
  }

}
