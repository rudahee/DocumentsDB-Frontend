import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from 'src/app/interfaces/course-interfaces';

@Injectable({
  providedIn: 'root'
})
export class OneCourseService {

  course: ICourse;

  constructor(private httpC: HttpClient) { }

  getAllCourses(id: string): Observable<ICourse> {

    return this.httpC.get<ICourse>('/course/'+id);
  }

}
