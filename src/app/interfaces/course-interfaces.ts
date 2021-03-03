import { ISubjectDTO } from "./subject-interface";

export interface ICourse {
  id: number;
  acronym: string;
  name: string;
  description: string;
}

export interface ICourseWithSubjects {
  subjectsDTO: ISubjectDTO[];
  id: number;
  name: string;
  description: string;
  subjects: ISubjectDTO[];
}
