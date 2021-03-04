import { INoteDTO } from "./notes-interfaces";

export interface ITopicDTO {
  "id": number;
  "name": string;
  "description": string;
}

export interface ITopicWithNotes {
  "id"?: number;
  "name": string;
  "description": string;
  "notesDTO"?: INoteDTO[];
}
