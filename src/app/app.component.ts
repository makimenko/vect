import { Component } from '@angular/core';

const yaml = `nodes:
  - name: db1
    label: PostgreSQL
  - name: db2
    label: MongoDB
edges:
  - from: db1
    to: db2
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sampleDiagramSource = yaml;

}
