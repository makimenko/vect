import {Injectable} from '@angular/core';
import {AuthService} from '../../general/service/auth.service';
import {HttpClient} from '@angular/common/http';
import {DiagramMetadata} from '../model/diagram-item.model';

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
      this.initialized = true;
    }
  }

  public async list(query: Array<string>): Promise<any> {
    console.log('GoogleDriveService.list');
    await this.init();

    return gapi.client.drive.files.list({
      q: query.join(AND),
      fields: '*'
    });
  }

  public async uploadFile(id: string, name: string, mimeType: string,
                          parent?: string, fileContent?: string,
                          properties?: DiagramMetadata
  ): Promise<string> {
    console.log('GoogleDriveService.uploadFile');

    const file = new Blob([fileContent], {type: mimeType});
    const metadata = {
      name,
      mimeType,
      parents: (id ? undefined : [parent]),
      properties
    };


    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);

    console.log('GoogleDriveService.uploadFile post');
    const response: any = await this.saveOfUpdate(id, form);
    console.log('GoogleDriveService.uploadFile response', response);
    return response.id;
  }

  private async saveOfUpdate(id: string, form: FormData): Promise<any> {
    if (id) {
      // Update existing file:
      const endpoint = 'https://www.googleapis.com/upload/drive/v3/files/' + id + '?uploadType=multipart&fields=id';
      return this.http.patch(endpoint, form, {
        headers: {
          Authorization: this.auth.getAuthorizationHeader()
        }
      }).toPromise();
    } else {
      // Create new file
      const endpoint = 'https://www.googleapis.com/upload/drive/v3/filesuploadType=multipart&fields=id';
      return this.http.post(endpoint, form, {
        headers: {
          Authorization: this.auth.getAuthorizationHeader()
        }
      }).toPromise();
    }

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

  public async readFileMeta(id: string): Promise<any> {
    console.log('GoogleDriveService.readFileMeta', id);
    await this.init();

    try {
      const response = await gapi.client.drive.files.get({
        fileId: id,
        fields: '*'
      });
      console.log('GoogleDriveService.readFileMeta result', response.result);
      return response;
    } catch (e) {
      console.warn('Can not download google file', id);
      return Promise.reject('File not found');
    }
  }

  public async downloadFile(id: string): Promise<string> {
    console.log('GoogleDriveService.downloadFile', id);
    try {
      const response = await gapi.client.drive.files.get({
        fileId: id,
        alt: 'media',
        mimeType: MIME_DIAGRAM_FILE
      });
      return response.body;
    } catch (e) {
      console.warn('Can not download google file', id);
      return Promise.reject('File not found');
    }
  }

  public async test(): Promise<void> {
    console.log('GoogleDriveService.test');
    // await this.readFileMeta('1u-pb9bho85UTTcz9wzOgi1v6v2dasvXQ');
  }


}
