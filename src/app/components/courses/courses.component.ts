import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/interfaces/course-interfaces';
import { AllCourseService } from 'src/app/services/courses/all-courses/all-course.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: ICourse[];

  constructor(private allCourses: AllCourseService) { }

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

  goToCourse(id: number) {
    console.log(id)
  }

}
