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


const mockList: Array<DiagramItem> = [
  {
    uuid: '1',
    name: 'Simple',
    description: 'Example of SPA-API-DB architecture',
    diagramSource: mockYaml1
  },
  {
    uuid: '2',
    name: 'Multi DB',
    description: 'Multiple Databases',
    diagramSource: mockYaml2
  }
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
