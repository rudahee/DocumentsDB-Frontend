import { IDocument } from "./document-interface";

export interface INoteDTO {
  id?: string;
  "name": string;
  "description": string;
  "text": string;
  "open": boolean;
  "document": IDocument[];
}
