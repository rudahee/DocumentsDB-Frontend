import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { AddNoteComponent } from '../@add/add-note/add-note.component';
import { AddDocumentComponent } from './add-document/add-document.component';


@NgModule({
  declarations: [
    AddComponent,
    AddCourseComponent,
    AddTopicComponent,
    AddSubjectComponent,
    AddNoteComponent,
    AddDocumentComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AddModule { }
