import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(
    private authService: AuthService
  ) {
  }

  public async canActivate(): Promise<boolean> {
    return this.authService.checkIfUserAuthenticated();
  }

}
