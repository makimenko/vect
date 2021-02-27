import {Injectable} from '@angular/core';
import {DiagramFile, DiagramItem} from '../model/diagram-item.model';


const templates: Array<DiagramItem> = [{
  id: 'template-1',
  name: 'Sample Diagram',
  description: 'Demonstrates basic functionality of vect application',
  diagramSource: `compositions:
  - name: backend
    label: Backend
    border: frame
  - name: data
    label: Data Layer
    composition: backend

nodes:
  - name: spa
    type: compact
    icon: connected_tv
  - name: api
    icon: video_settings
    composition: backend
  - name: db1
    label: PostgreSQL
    type: barrel
    composition: data
  - name: db2
    label: MongoDB
    type: barrel
    composition: data

edges:
  - from: spa
    to: api
  - from: api
    to: db1
  - from: api
    to: db2`
}, {
  id: 'template-2',
  name: 'Azure Sample',
  description: 'Demonstrates sample of Azure resources',
  diagramSource: `compositions:
  - name: cnt
    label: Docker Containers
  - name: data
    label: Data Layer

nodes:
  - name: web
    type: icon
    icon: language
    label: Web User
  - name: spa
    type: icon
    icon: az:App-Services
    composition: cnt
  - name: aks
    type: icon
    icon: az:Kubernetes-Services
    composition: cnt
  - name: db
    type: icon
    icon: az:SQL-Server
    label: SQL Server
    composition: data
  - name: db2
    type: icon
    icon: az:Azure-Cosmos-DB
    label: CosmosDB
    composition: data
  - name: kv
    icon: az:Key-Vaults
    type: icon
    label: KeyVault
  - name: aad
    label: Azure Active Directory
    icon: az:Azure-Active-Directory
    type: icon

edges:
  - from: web
    to: spa
  - from: spa
    to: aks
  - from: spa
    to: kv
  - from: aks
    to: kv
  - from: spa
    to: aad
  - from: aks
    to: db
  - from: aks
    to: db2`
}

];

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor() {
  }

  public getTemplateList(): Array<DiagramFile> {
    return templates.map((i) => {
      const item: DiagramFile = {
        id: i.id,
        name: i.name
      };
      return item;
    });
  }

  public getTemplate(templateId: string): DiagramItem {
    return templates.find(i => i.id === templateId);
  }

}
