import {Injectable} from '@angular/core';
import {DiagramItem} from '../model/diagram-item.model';
import {GoogleDriveService, inCondition, keyCondition, MIME_FILE, MIME_FOLDER, QUERY_NOT_DELETED} from './google-drive.service';
import {NewDiagramDialogData} from '../../manager/new-diagram-dialog/new-diagram-dialog.component';

const mockYaml1 = `nodes:
  - name: spa
  - name: api
  - name: db
edges:
  - from: spa
    to: api
  - from: api
    to: db
`;

const mockYaml2 = `nodes:
  - name: spa
  - name: api
  - name: db1
    label: PostgreSQL
  - name: db2
    label: Redis Cache
  - name: db3
    label: MongoDB
edges:
  - from: spa
    to: api
  - from: api
    to: db1
  - from: api
    to: db2
  - from: api
    to: db3
`;

const standardDiagram = {
  uuid: '3',
  name: 'Multi DB',
  image: 'assets/svg/sitemap-solid.svg',
  description: 'Super long description of diagram bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
  diagramSource: mockYaml2
};

const mockList: Array<DiagramItem> = [
  {
    uuid: '1',
    name: 'Simple',
    image: 'assets/img/sample-chart.png',
    description: 'Example of SPA-API-DB architecture',
    diagramSource: mockYaml1
  },
  {
    uuid: '2',
    name: 'Multi DB',
    image: 'assets/svg/upload.svg',
    description: 'Multiple Databases',
    diagramSource: mockYaml2
  },
  standardDiagram,
  {
    uuid: '4',
    name: '',
    image: '',
    description: '',
    diagramSource: mockYaml2
  },
  {
    uuid: '5',
    image: 'assets/svg/worldwide.svg',
    name: 'Super long description of diagram bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
    description: 'Test Test Test',
    diagramSource: mockYaml2
  },
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram,
  standardDiagram
];

const VECT_FOLDER_NAME = 'Vect';


@Injectable()
export class DiagramService {

  private initialized = false;
  private vectFolderId: string;

  constructor(
    protected drive: GoogleDriveService
  ) {
  }

  public async init(): Promise<void> {
    if (!this.initialized) {
      console.log('DiagramService.init');
      this.vectFolderId = await this.drive.createIfAbsent(VECT_FOLDER_NAME, MIME_FOLDER);
      this.initialized = true;
    }
  }

  public async list(): Promise<Array<DiagramItem>> {
    console.log('DiagramService.list');
    await this.init();

    const list = await this.drive.list([
      QUERY_NOT_DELETED,
      keyCondition('mimeType', MIME_FILE),
      inCondition('parents', this.vectFolderId)
    ]);
    if (list.result?.files?.length > 0) {
      console.log('DiagramService.list result', list.result.files);
      return list.result.files.map(file => {
        const item: DiagramItem = {
          uuid: file.id,
          name: file.name,
          description: 'TODO',
          diagramSource: ''
        };
        return item;
      });
    } else {
      return [];
    }
  }

  get(uuid: string): DiagramItem {
    // TODO: Implement

    return mockList.find(i => {
      return i.uuid === uuid;
    });
  }

  public async create(diagram: NewDiagramDialogData): Promise<DiagramItem> {
    console.log('DiagramService.create', diagram);
    await this.init();

    const uuid = await this.drive.create(diagram.name, MIME_FILE, this.vectFolderId);
    return {
      uuid,
      name: diagram.name,
      description: diagram.description,
      diagramSource: ''
    };

  }

}
