export interface DiagramFile {
  id: string;
  name: string;
}

export interface DiagramMetadata {
  image?: string;
  description?: string;
}

export interface DiagramFileContent {
  diagramSource?: string;
}

export interface DiagramItem extends DiagramFile, DiagramMetadata, DiagramFileContent {

}
