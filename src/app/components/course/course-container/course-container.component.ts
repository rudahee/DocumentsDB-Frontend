import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourseWithSubjects } from 'src/app/interfaces/course-interfaces';
import { ISubjectDTO } from 'src/app/interfaces/subject-interface';
import { OneCourseService } from 'src/app/services/courses/one-course/one-course.service'

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.scss']
})
export class CourseContainerComponent implements OnInit {

  private id: string;
  public course: ICourseWithSubjects;
  public name: string = '';

  public subjects: ISubjectDTO[];



  constructor(private courseServ:OneCourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];

        this.getCourse(this.id);
      })
  }

  getCourse(id: string) {
    this.courseServ.getCourse(id).subscribe(
      resp => {
        if (resp != undefined && resp != null) {
          this.course = resp;
          this.subjects = resp.subjectsDTO;

          this.subjects.forEach(
            subject => {
              subject.open = false;
           })
           console.log(this.subjects)
          this.name = this.course.name;
        }
      }
    )
  }
}
