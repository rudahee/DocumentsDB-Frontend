export interface IDocument {
  id?: number;
  size: number;
  name: string;
  data?: any;
  isBlob?: boolean;
  contentType: string;
}
