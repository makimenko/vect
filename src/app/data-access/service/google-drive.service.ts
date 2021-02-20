import {Injectable} from '@angular/core';
import {AuthService} from '../../general/service/auth.service';
import {HttpClient} from '@angular/common/http';

declare let gapi: any;

export const MIME_DIAGRAM_FILE = 'text/yaml';
export const MIME_FOLDER = 'application/vnd.google-apps.folder';
export const QUERY_NOT_DELETED = 'trashed=false';
export const AND = ' and ';

export function eqCondition(key: string, value: string): string {
  return ':1=\':2\''
    .replace(/:1/i, key)
    .replace(/:2/i, value);
}

export function neqCondition(key: string, value: string): string {
  return ':1!=\':2\''
    .replace(/:1/i, key)
    .replace(/:2/i, value);
}

export function inCondition(key: string, value: string): string {
  return '\':2\' in :1'
    .replace(/:1/i, key)
    .replace(/:2/i, value);
}


@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  private initialized = false;

  constructor(
    protected auth: AuthService,
    protected http: HttpClient
  ) {
  }


  public async init(): Promise<void> {
    if (!this.initialized) {
      console.log('GoogleDriveService.init');
      await gapi.client.load('drive', 'v3');
      // this.vectFolderId = await this.createIfAbsent(VECT_FOLDER_NAME, MIME_FOLDER);
      this.initialized = true;
    }
  }

  public async list(query: Array<string>): Promise<any> {
    console.log('GoogleDriveService.list');
    await this.init();

    return gapi.client.drive.files.list({
      q: query.join(AND)
    });
  }

  public async createWithContent(name: string, mimeType: string, parent?: string, fileContent?: string): Promise<string> {
    console.log('GoogleDriveService.createWithContent');
    const endpoint = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id';
    const file = new Blob([fileContent], {type: mimeType});
    const metadata = {
      name,
      mimeType,
      parents: [parent]
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);

    console.log('GoogleDriveService.createWithContent post');
    const response: any = await this.http.post(endpoint, form, {
      headers: {
        Authorization: this.auth.getAuthorizationHeader()
      }
    }).toPromise();
    console.log('GoogleDriveService.createWithContent response', response);
    return response.id;
  }

  public async create(name: string, mimeType: string, parent?: string): Promise<string> {
    console.log('GoogleDriveService.create');
    await this.init();

    let id: string;
    await gapi.client.drive.files.create({
      resource: {
        name,
        mimeType,
        parents: [parent]
      }
    }).then((response) => {
      id = response.result.id;
    });

    console.log('GoogleDriveService.create id', id);
    return id;
  }


  public async createIfAbsent(name: string, mimeType: string): Promise<string> {
    console.log('GoogleDriveService.createIfAbsent');
    await this.init();
    const search = await this.list([
      QUERY_NOT_DELETED,
      eqCondition('mimeType', mimeType),
      eqCondition('name', name)
    ]);

    if (search.result.files && search.result.files.length > 0) {
      console.log('GoogleDriveService.createIfAbsent already exists', search.result.files[0].id);
      return await search.result.files[0].id;
    } else {
      return await this.create(name, mimeType);
    }

  }

  public async readFile(id: string): Promise<string> {
    console.log('GoogleDriveService.readFile', id);
    try {
      const result = await gapi.client.drive.files.get({
        fileId: id,
        alt: 'media'
      });
      console.log('result.body', result.body);
      return result.body;
    } catch (e) {
      console.warn('Can not read google file', id);
      return Promise.reject('File not found');
    }

  }

  public async test(): Promise<void> {
    console.log('GoogleDriveService.test');

    // const folderList = await this.list([QUERY_NOT_DELETED, QUERY_FOLDERS]);
    // console.log(folderList.result.files);

    // const id = await this.createIfAbsent('Vect', MIME_FOLDER);
    // console.log('This is the file id', id);

    await this.init();

    await this.readFile('1ChtpIUlpoGb6il3i3l1-zw-5lHpa5-OQ');

  }


}
