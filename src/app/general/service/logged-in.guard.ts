import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {
    console.log("LoggedInGuard.constructor")
  }

  public async canActivate(): Promise<boolean> {
    const canActivate = this.authService.checkIfUserAuthenticated()
    console.log("LoggedInGuard.canActivate", canActivate);
    return canActivate;
  }

}
