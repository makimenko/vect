import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  public loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = (): any => {
        resolve();
      };
      script.onerror = () => {
        reject(new Error(`Script load error for ${url}`));
      };
      document.head.appendChild(script);
    });
  }

}
