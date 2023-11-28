import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import TokenClient = google.accounts.oauth2.TokenClient;
import {DynamicScriptLoaderService} from './dynamic-script-loader.service';


@Injectable()
export class AuthService {

  tokenClient!: TokenClient;

  authInited = false;
  gapiInited = false;
  userSignedIn = false;


  private profile: any;
  public name!: string;
  public email!: string;
  private authenticated!: EventEmitter<any>;

  constructor(
    protected dynamicScriptLoader: DynamicScriptLoaderService
  ) {
    this.handleAuthResponse = this.handleAuthResponse.bind(this);
    this.handleProfileResponse = this.handleProfileResponse.bind(this);
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  googleOAuthInit(): void {

    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: environment.gapi.client_id,
      scope: environment.gapi.scope,
      callback: this.handleAuthResponse
    });
    this.authInited = true;
    console.log('GoogleUtils.gisLoaded inited');
  }


  async handleAuthResponse(res: any) {
    console.log('GoogleUtils.handleAuthClick resp', res);
    if (res.error !== undefined) {
      this.userSignedIn = false;
      throw (res);
    }
    // localStorage.setItem("google.access_token", res.access_token);
    this.requestProfile(res.access_token);

    if (res && res.access_token) {
      gapi.client.setApiKey(environment.gapi.api_key);
      gapi.client.load('drive', 'v3');
      // await gapi.client.init({
      //   apiKey: environment.gapi.api_key,
      //   discoveryDocs: environment.gapi.discoveryDocs,
      // });
      this.gapiInited = true;
    }

  }


  requestProfile(accessToken: any): void {
    console.log('getUserProfileData', accessToken);
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://www.googleapis.com/oauth2/v3/userinfo`;
      request.addEventListener('loadend', function() {

        const response = JSON.parse(this.responseText);
        console.log('getUserProfileData loadend response', response);

        if (this.status === 200) {
          resolve(response);
        } else {
          // @ts-ignore
          reject(this, response);
        }
      });
      request.open('GET', url, true);
      request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      request.send();
    });

    console.log('getUserProfileData then');

    promise.then(
      this.handleProfileResponse, function(errorMessage) {
        console.error(errorMessage);
      });

  }

  handleProfileResponse(profileResponse: any): void {
    this.profile = profileResponse;
    this.email = profileResponse.email;
    this.name = profileResponse.name;
    this.userSignedIn = true;
    this.authenticated.emit(this.profile);
    console.log('getUserProfileData response', profileResponse);
  }


  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(): void {
    const token = gapi.client.getToken();
    if (token) {
      console.log('AuthService.handleAuthClick Skip');
      // Skip display of account chooser and consent dialog for an existing session.
      this.tokenClient.requestAccessToken({prompt: '', login_hint: 'Super Hint!'});
    } else {
      console.log('AuthService.handleAuthClick Prompt the user to select');
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      this.tokenClient.requestAccessToken({prompt: 'consent'});
    }
  }


  initialize(authenticated: EventEmitter<any>): void {
    this.authenticated = authenticated;
    this.loadGoolgeScripts().then(data => {
      console.log('AuthService.initialize google scripts loaded');
      this.googleOAuthInit();
    });
  }

  loadGoolgeScripts(): Promise<any> {
    console.log('AuthService.loadGoolgeScripts');
    const p1 = this.dynamicScriptLoader.loadScript('https://accounts.google.com/gsi/client');
    const p2 = this.dynamicScriptLoader.loadScript('https://apis.google.com/js/api.js');
    const p3 = this.dynamicScriptLoader.loadScript('https://apis.google.com/js/client:plusone.js');
    return Promise.all([p1, p2, p3]);
  }

  checkIfUserAuthenticated(): boolean {
    console.log('AuthService.checkIfUserAuthenticated', this.userSignedIn);
    return this.userSignedIn;
  }

  public getAuthorizationHeader(): string {
    const token = gapi.auth.getToken();
    // @ts-ignore
    return token.token_type + ' ' + token.access_token;
  }

  public get allowToSignIn(): boolean {
    return this.authInited;
  }

}



