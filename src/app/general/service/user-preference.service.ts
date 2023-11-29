import {Injectable} from '@angular/core';


@Injectable()
export class UserPreferenceService {

  constructor() {
  }

  public getBoolean(key: string, defaultValue: boolean): boolean {
    const txt  = sessionStorage.getItem(key);
    let res = false;
    if (txt === undefined) {
      res = false;
    } else {
      res = txt === "true";
    }
    console.log("UserPreferenceService.getBoolean", key, res);
    return res;
  }

  public setBoolean(key: string, value: boolean): void {
    console.log("UserPreferenceService.setBoolean", key, value);
    sessionStorage.setItem(key, String(value));
  }

  public invertBoolean(key: string, value: boolean): boolean {
    const invertedValue = !value;
    this.setBoolean(key, invertedValue);
    return invertedValue;
  }


}
