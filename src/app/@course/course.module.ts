import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseItemComponent } from './course-item/courses.component';
import { SubjectComponent } from './subject/subject.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { AddNoteComponent } from '../@add/add-note/add-note.component';


@NgModule({
  declarations: [
    CourseComponent,
    CourseItemComponent,
    SubjectComponent,
    TopicListComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
