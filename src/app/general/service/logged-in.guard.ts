import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log("LoggedInGuard.constructor");
  }

  public async canActivate(): Promise<boolean> {
    const userAuthenticated = await this.authService.checkIfUserAuthenticated();
    console.log("LoggedInGuard.canActivate", userAuthenticated);
    if (!userAuthenticated) {
      this.router.navigate(["/login"]);
    }
    return userAuthenticated;
  }

}
