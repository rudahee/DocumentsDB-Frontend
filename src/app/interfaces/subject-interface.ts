import { ITopicDTO } from "./topic-interface";

export interface ISubjectDTO {
  id: number;
  name: string;
  acronym: string;
  topics: ITopicDTO[];
  open:boolean;

}
