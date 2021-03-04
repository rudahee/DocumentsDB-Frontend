export interface IDocument {
  id: number;
  size: number;
  name: string;
  contentType: string;
  data: Blob;
}
