import {Injectable} from '@angular/core';
import {DiagramItem} from '../model/diagram-item.model';


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

@Injectable()
export class DiagramService {

  constructor() {
  }

  list(): Array<DiagramItem> {
    // TODO: Implement
    return mockList;
  }

  get(uuid: string): DiagramItem {
    // TODO: Implement

    return mockList.find(i => {
      return i.uuid === uuid;
    });
  }


}
