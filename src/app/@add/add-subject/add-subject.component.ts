import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubjectDTO } from 'src/app/interfaces/subject-interface';
import { OneCourseService } from 'src/app/services/courses/one-course/one-course.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  id: string;
  subject: ISubjectDTO;

  constructor(
    private courseService: OneCourseService,
    private router: Router,
    private route: ActivatedRoute,
    public loc: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['idCourse'];
      }
    )

    this.subject = {
      acronym: '',
      name: '',
      open: false,
      id: undefined,
      topics: undefined
    }
  }

    /*
      When the form is submitted, it sends an alert when the request has been made correctly,
      and gives the options to return to the list of courses or to return to the course.
    */
  onSubmitForm(subject: ISubjectDTO) {
    this.courseService.addSubject(subject, this.id).subscribe(
      res => {
        Swal.fire({
          title: "Success",
          text: "Subject Added",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Go To Course List",
          showCancelButton: true,
          cancelButtonText: "Go To Course"
        }).then(
          result => {
            if (result.isConfirmed) {
              this.router.navigate(['/course']);
            } else {
              this.router.navigate(['/course/'+this.id])
            }
          }
        )
      }, error => {
        // In case of error I show the predefined message from the backend
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        })
      }
    )
  }
}
