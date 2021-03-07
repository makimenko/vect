import {Injectable} from '@angular/core';
import {DiagramFile, DiagramItem} from '../model/diagram-item.model';


const templates: Array<DiagramItem> = [{
  id: 'template-1',
  name: 'Basic Sample',
  description: 'Demonstrates basic functionality of vect application',
  diagramSource: `compositions:
  - name: backend
    label: Backend
    border: frame
  - name: data
    label: Data Layer
    composition: backend

nodes:
  - name: user
    type: user
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
  - from: user
    to: spa
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
    label: Containers
  - name: data
    label: Data Layer

nodes:
  - name: web
    type: workstation
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
}, {
  id: 'template-3',
  name: 'AWS Sample',
  description: 'Demonstrates sample of AWS resources',
  diagramSource: `compositions:
  - name: data
    label: Data Layer

nodes:
  - name: api
    icon: aws:API-Gateway
    type: compact
  - name: eck
    icon: aws:Elastic-Kubernetes-Service
    label: Kuberentes
    type: compact
  - name: s
    icon: aws:Secrets-Manager
    label: Secrets
    type: icon
  - name: db
    icon: aws:DynamoDB
    type: barrel
    composition: data
  - name: fs
    icon: aws:Elastic-File-System
    type: icon
    composition: data

edges:
  - from: api
    to: eck
  - from: eck
    to: s
  - from: eck
    to: db
  - from: eck
    to: fs`
}, {
  id: 'template-4',
  name: 'Google Cloud Sample',
  description: 'Demonstrates sample of Google Cloud resources',
  diagramSource: `compositions:
  - name: compute
    label: Computing
    composition: cloud
  - name: cloud
    label: Google Cloud
    border: frame

nodes:
  - name: mob
    label: Mobile Devices
    type: icon
    icon: md:important_devices
  - name: api
    icon: g:App-Engine
    type: icon
    label: App Engine
    composition: cloud
  - name: fn
    icon: g:cloud-functions
    type: compact
    label: Cloud Functions
    composition: compute
  - name: cmp
    icon: g:compute-engine
    type: compact
    label: Compute Engine
    composition: compute
  - name: st
    icon: g:cloud-storage
    type: barrel
    label: Cloud Storage
    composition: cloud

edges:
  - from: mob
    to: api
  - from: api
    to: fn
  - from: api
    to: cmp
  - from: cmp
    to: st
  - from: fn
    to: st`
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
