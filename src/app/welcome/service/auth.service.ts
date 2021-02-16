import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var gapi: any;

@Injectable()
export class AuthService {

  constructor() {
  }

  public isAuthenticated(): boolean {
    console.log('AuthService.isAuthenticated access_token', sessionStorage.getItem('access_token'));
    return sessionStorage.getItem('access_token') ? true : false;
  }

  /*
    isAuthenticated() {
        return this.http.get('/auth/isAuthenticated');
    }
   */


  public login(): void {
    console.log('AuthService.login');
    this.fetchGoogleUser().then((i) => {
      console.log('AuthService.login finally', i);
    });
  }


  private initGoogleOAuth(): Promise<any> {
    console.log('AuthService.initGoogleOAuth');
    return new Promise((resolve, reject) => {
      console.log('AuthService.initGoogleOAuth promise');
      gapi.load('auth2', async () => {
        console.log('AuthService.initGoogleOAuth load');
        const gAuth = await gapi.auth2.init({
          client_id: environment.GAPI_CLIENT_ID,
          fetch_basic_profile: true,
          scope: 'profile email',
          immediate: true
        });
        resolve(gAuth);
      }, reject);
    });
  }

  private fetchGoogleUser(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const gAuth = await this.initGoogleOAuth();

        const oAuthUser = await gAuth.signIn();
        const authResponse = gAuth.currentUser.get().getAuthResponse();
        //const firebaseUser = await this.af.signInWithCredential(
        //          firebase.auth.GoogleAuthProvider.credential(authResponse.id_token, authResponse.access_token)
        //        );

        sessionStorage.setItem('accessToken', authResponse.access_token);

        console.log('AuthService.fetchGoogleUser result', oAuthUser);
        resolve(oAuthUser);
      } catch (e) {
        reject(e);
      }
    });
  }


}
