import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse, ICourseWithSubjects } from 'src/app/interfaces/course-interfaces';
import { ISubjectDTO } from 'src/app/interfaces/subject-interface';
import { ITopicDTO } from 'src/app/interfaces/topic-interface';

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

  public addCourse(course: ICourse) {
    return this.httpC.post<ICourse>('/course/add', course)
  }

  public addSubject(subject: ISubjectDTO, idCourse: string) {
    return this.httpC.post<ISubjectDTO>('/subject/add?course='+idCourse, subject);
  }

  public addTopic(topic: ITopicDTO, idSubject: string) {
    return this.httpC.post<ISubjectDTO>('/topic/add?subject='+idSubject, topic);
  }
}
