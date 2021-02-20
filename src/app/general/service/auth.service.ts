import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import BasicProfile = gapi.auth2.BasicProfile;

declare var gapi: any;

@Injectable()
export class AuthService {

  private gapiSetup = false;
  private authInstance: gapi.auth2.GoogleAuth;

  private profile: BasicProfile;
  public name: string;
  public email: string;


  constructor() {
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init(environment.gapi)
        .then((auth) => {
          this.gapiSetup = true;
          this.authInstance = auth;
          console.log('GAPI ', gapi.auth.getToken());
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn();
    });

  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    const signed = this.authInstance.isSignedIn.get();
    if (!signed) {
      console.log('AuthService.checkIfUserAuthenticated --> redirect and wait for authentication');
      await this.authenticate();
    }
    // console.log('this.authInstance', this.authInstance);
    if (!this.profile) {
      this.retrieveProfile();
    }
    return this.authInstance.isSignedIn.get();
  }

  private retrieveProfile(): void {
    this.profile = this.authInstance.currentUser.get().getBasicProfile();
    console.log('AuthService.retrieveProfile', this.profile);
    this.name = this.profile.getName();
    this.email = this.profile.getEmail();
  }

  public getAuthorizationHeader(): string {
    const token = gapi.auth.getToken();
    return token.token_type + ' ' + token.access_token;
  }

}
