export interface DiagramFile {
  id: string;
  name: string;
}

export interface DiagramFileContent {
  image?: string;
  description?: string;
  diagramSource?: string;
}

export interface DiagramItem extends DiagramFile, DiagramFileContent {

}
