import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourse } from 'src/app/interfaces/course-interfaces';
import { OneCourseService } from 'src/app/services/courses/one-course/one-course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  course: ICourse;

  constructor(private courseService: OneCourseService, private router: Router) {
  }

  ngOnInit(): void {
    this.course = {
      id: undefined,
      name: '',
      acronym: '',
      description: ''
    }
  }

  onSubmitForm(value: ICourse) {
    this.courseService.addCourse(value).subscribe(
      res => {
        Swal.fire({
          title: "Success",
          text: "Course Added",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Go To List",
          showCancelButton: true,
          cancelButtonText: "Go To Course"
        }).then(
          result => {
            if (result.isConfirmed) {
              this.router.navigate(['/course']);
            } else {
              this.router.navigate(['/course/'+res.id])
            }
          }
        )
      }, error => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        })
      }
    )
  }

}
