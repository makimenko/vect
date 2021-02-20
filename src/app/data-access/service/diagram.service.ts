import {Injectable} from '@angular/core';
import {DiagramFileContent, DiagramItem, DiagramMetadata} from '../model/diagram-item.model';
import {eqCondition, GoogleDriveService, inCondition, MIME_DIAGRAM_FILE, MIME_FOLDER, QUERY_NOT_DELETED} from './google-drive.service';
import {NewDiagramDialogData} from '../../manager/new-diagram-dialog/new-diagram-dialog.component';
import * as yaml from 'yaml';

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

const standardDiagram: DiagramItem = {
  id: '3',
  name: 'Multi DB',
  image: 'assets/svg/sitemap-solid.svg',
  description: 'Super long description of diagram bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
  diagramSource: mockYaml2
};

const mockList: Array<DiagramItem> = [
  {
    id: '1',
    name: 'Simple',
    image: 'assets/img/sample-chart.png',
    description: 'Example of SPA-API-DB architecture',
    diagramSource: mockYaml1
  },
  {
    id: '2',
    name: 'Multi DB',
    image: 'assets/svg/upload.svg',
    description: 'Multiple Databases',
    diagramSource: mockYaml2
  },
  standardDiagram,
  {
    id: '4',
    name: '',
    image: '',
    description: '',
    diagramSource: mockYaml2
  },
  {
    id: '5',
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

    // Get list of files without details
    const list = await this.drive.list([
      QUERY_NOT_DELETED,
      eqCondition('mimeType', MIME_DIAGRAM_FILE),
      inCondition('parents', this.vectFolderId)
    ]);
    console.log('DiagramService.list response', list);

    return await list.result.files.map(file => {
      console.log('DiagramService.list map', file);
      const item: DiagramItem = {
        id: file.id,
        name: file.name,
        image: file.appProperties?.image,
        description: file.appProperties?.description
      };
      return item;
    });

  }

  public async get(id: string): Promise<DiagramItem> {
    console.log('DiagramService.readFile', id);
    // TODO: Implement
    const fileContent = await this.drive.readFile(id);
    const item: DiagramItem = yaml.parse(fileContent);
    return item;
  }

  public async create(diagram: NewDiagramDialogData): Promise<DiagramItem> {
    console.log('DiagramService.create', diagram);
    await this.init();

    const appProperties: DiagramMetadata = {
      description: diagram.description,
      image: 'assets/svg/sitemap-solid.svg',
    };
    const diagramFile: DiagramFileContent = {
      diagramSource: ''
    };
    const content = yaml.stringify(diagramFile);
    console.log('DiagramService.create stringify', content);

    const id = await this.drive.createWithContent(
      diagram.name,
      MIME_DIAGRAM_FILE,
      this.vectFolderId,
      content,
      appProperties
    );

    return {
      id,
      name: diagram.name,
      description: diagram.description,
      diagramSource: ''
    };

  }

}
