import {Injectable} from '@angular/core';


@Injectable()
export class UserPreferenceService {

  constructor() {
  }

  public getBoolean(key: string, defaultValue: boolean): boolean {
    // @ts-ignore
    const value: boolean = (/true/i).test(sessionStorage.getItem(key));
    return value ? value : defaultValue;
  }

  public setBoolean(key: string, value: boolean): void {
    sessionStorage.setItem(key, String(value));
  }

  public invertBoolean(key: string, value: boolean): boolean {
    const invertedValue = !value;
    this.setBoolean(key, invertedValue);
    return invertedValue;
  }


}
