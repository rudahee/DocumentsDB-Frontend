import { Component, OnInit } from '@angular/core';
import { ICourseWithSubjects } from 'src/app/interfaces/course-interfaces';
import { ActivatedRoute } from '@angular/router';
import { ISubjectDTO } from 'src/app/interfaces/subject-interface';
import { OneCourseService } from 'src/app/services/courses/one-course/one-course.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CourseItemComponent implements OnInit {

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
          this.name = this.course.name;
        }
      }
    )
  }

}
