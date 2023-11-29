import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import TokenClient = google.accounts.oauth2.TokenClient;
import {DynamicScriptLoaderService} from './dynamic-script-loader.service';
import {GoogleDriveService} from '../../data-access/service/google-drive.service';

export type Profile = {
  name: string,
  email: string,
};

const AUTH_KEY = 'vect.AuthService.auth';

declare let gapi: any;

@Injectable()
export class AuthService {

  public authenticatedEvent = new EventEmitter<Profile>();

  tokenClient!: TokenClient;
  accessToken?: string;

  inited = false;
  userAuthenticated = false;

  public profile?: Profile;

  constructor(
    protected dynamicScriptLoader: DynamicScriptLoaderService
  ) {
    this.handleTokenResponse = this.handleTokenResponse.bind(this);
    this.handleProfileResponse = this.handleProfileResponse.bind(this);
  }


   public async checkIfUserAuthenticated(): Promise<boolean> {
     console.log('AuthService.checkIfUserAuthenticated before', this.userAuthenticated);
     if (!this.userAuthenticated) {
       await this.init();
       const storedAccessToken = localStorage.getItem(AUTH_KEY);
       if (storedAccessToken) {
         this.requestProfile(storedAccessToken);
         this.accessToken = storedAccessToken;
       }
     }
     console.log('AuthService.checkIfUserAuthenticated after', this.userAuthenticated);
     return this.userAuthenticated;
  }


  protected async init(): Promise<void> {
    if (!this.inited) {
      await this.initGoogleScripts();
      console.log('AuthService.initialize google scripts loaded');
      this.initTokenClient();
    }
  }

  protected initGoogleScripts(): Promise<any> {
    console.log('AuthService.initGoogleScripts');
    const p1 = this.dynamicScriptLoader.loadScript('https://accounts.google.com/gsi/client');
    const p2 = this.dynamicScriptLoader.loadScript('https://apis.google.com/js/api.js');
    const p3 = this.dynamicScriptLoader.loadScript('https://apis.google.com/js/client:plusone.js');
    return Promise.all([p1, p2, p3]);
  }


  protected initTokenClient(): void {
    console.log('AuthService.initTokenClient');
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: environment.gapi.client_id,
      scope: environment.gapi.scope,
      callback: this.handleTokenResponse
    });
    this.inited = true;
  }

  private async handleTokenResponse(res: any): Promise<void> {
    console.log('AuthService.handleTokenResponse', res);
    if (res.error !== undefined) {
      this.userAuthenticated = false;
      throw (res);
    }
    if (res && res.access_token) {
      this.requestProfile(res.access_token);

      // wrong location?
      // gapi.client.setApiKey(environment.gapi.api_key);
      // gapi.client.load('drive', 'v3');

      this.accessToken = res.access_token;
      localStorage.setItem(AUTH_KEY, res.access_token);
    }
  }


  requestProfile(accessToken: string): void {
    console.log('AuthService.requestProfile', accessToken);
    const p1 = new Promise(function(resolve, reject) {
      const req = new XMLHttpRequest();
      const url = `https://www.googleapis.com/oauth2/v3/userinfo`;
      req.addEventListener('loadend', function() {
        const response = JSON.parse(this.responseText);
        console.log('AuthService.requestProfile loadend response', response);
        if (this.status === 200) {
          resolve(response);
        } else {
          // @ts-ignore
          reject(this, response);
        }
      });
      req.open('GET', url, true);
      req.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      req.send();
    });

    console.log('AuthService.requestProfile then');
    p1.then(
      this.handleProfileResponse,
      function(errorMessage) {
        console.error(errorMessage);
      });

  }

  handleProfileResponse(profileResponse: any): void {
    console.log('AuthService.handleProfileResponse response', profileResponse);
    this.profile = {
      name: profileResponse.name,
      email: profileResponse.email
    };
    this.userAuthenticated = true;
    console.log('AuthService.handleProfileResponse authenticatedEvent.emit', this.profile);
    this.authenticatedEvent.emit(this.profile);
  }


  handleAuthClick(): void {
    const token = gapi.client.getToken();
    if (token) {
      console.log('AuthService.handleAuthClick Skip');
      // Skip display of account chooser and consent dialog for an existing session.
      this.tokenClient.requestAccessToken({prompt: '', state: AUTH_KEY});
    } else {
      console.log('AuthService.handleAuthClick Prompt the user to select');
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      this.tokenClient.requestAccessToken({prompt: 'consent', state: AUTH_KEY});
    }
  }


  public async getAuthorizationHeader(): Promise<string> {
    if (await this.checkIfUserAuthenticated()) {
      return 'Bearer ' + this.accessToken;
    } else {
      throw new Error('User is not authenticated');
    }
  }

  public get allowToSignIn(): boolean {
    return this.inited;
  }

}



