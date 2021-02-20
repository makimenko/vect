import {Injectable} from '@angular/core';
import {AuthService} from '../../general/service/auth.service';

declare let gapi: any;

export const MIME_FILE = 'application/octet-stream';
export const MIME_FOLDER = 'application/vnd.google-apps.folder';
export const QUERY_NOT_DELETED = 'trashed=false';
export const AND = ' and ';

export function keyCondition(key: string, value: string): string {
  return ':1=\':2\''
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
    protected auth: AuthService
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

  public async create(name: string, mimeType: string, parent?: string): Promise<string> {
    console.log('GoogleDriveService.create');
    await this.init();

    let id: string;
    await gapi.client.drive.files.create({
      resource: {
        name,
        mimeType,
        parents: [parent]
      },
      fields: 'id'
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
      keyCondition('mimeType', mimeType),
      keyCondition('name', name)
    ]);

    if (search.result.files && search.result.files.length > 0) {
      console.log('GoogleDriveService.createIfAbsent already exists', search.result.files[0].id);
      return await search.result.files[0].id;
    } else {
      return await this.create(name, mimeType);
    }

  }

  public async test(): Promise<void> {
    console.log('GoogleDriveService.test');

    // const folderList = await this.list([QUERY_NOT_DELETED, QUERY_FOLDERS]);
    // console.log(folderList.result.files);

    // const id = await this.createIfAbsent('Vect', MIME_FOLDER);
    // console.log('This is the file id', id);

    await this.init();

  }


}
