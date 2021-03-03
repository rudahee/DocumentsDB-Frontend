import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourseWithSubjects } from 'src/app/interfaces/course-interfaces';
import { ISubjectDTO } from 'src/app/interfaces/subject-interface';

@Injectable({
  providedIn: 'root'
})
export class OneCourseService {


  @Output()
  subjectsEmitter = new EventEmitter<ISubjectDTO[]>();

  subjects: ISubjectDTO[] = [];

  constructor(private httpC: HttpClient) { }

  getCourse(id: string): Observable<ICourseWithSubjects> {

    return this.httpC.get<ICourseWithSubjects>('/course/'+id);
  }


  public emitSubjectList(subjectsList: ISubjectDTO[]) {
    this.subjects = subjectsList;
    this.subjectsEmitter.emit(this.subjects);
  }


}
