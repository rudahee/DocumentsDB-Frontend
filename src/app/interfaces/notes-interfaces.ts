import { IDocument } from "./document-interface";

export interface INoteDTO {
  "name": string;
  "description": string;
  "text": string;
  "open": boolean;
  "document": IDocument;
}
