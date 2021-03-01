import { Injectable } from '@angular/core';
import { ICourse } from 'src/app/interfaces/course-interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllCourseService {

  courses: ICourse[];

  constructor(private httpC: HttpClient) { }

  getAllCourses(): Observable<ICourse[]> {

    return this.httpC.get<ICourse[]>('/course');
  }

}
