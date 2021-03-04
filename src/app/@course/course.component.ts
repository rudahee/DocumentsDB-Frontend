import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourse } from '../interfaces/course-interfaces';
import { AllCourseService } from '../services/courses/all-courses/all-course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courses: ICourse[];

  constructor(private allCourses: AllCourseService, private route: Router) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.allCourses.getAllCourses().subscribe(
      resp => {
        if (resp != undefined && resp != null) {
          this.courses = resp;
        }
      }
    )
  }

  goToCourse(id: string) {
    this.route.navigate(['/course/'+id])
  }
}
