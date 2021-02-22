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
}];

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
