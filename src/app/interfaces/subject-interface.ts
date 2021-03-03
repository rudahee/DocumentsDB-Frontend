import { ITopicDTO } from "./topic-interface";

export interface ISubjectDTO {
  id: number;
  name: string;
  description: string;
  topics: ITopicDTO[];
  open:boolean;

}
