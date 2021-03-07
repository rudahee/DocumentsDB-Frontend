import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddTopicComponent } from './add-topic/add-topic.component';

import { AddComponent } from './add.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { IsLoggedGuard } from '../services/guard/is-logged.guard';

const routes: Routes = [
  { path: '', component: AddComponent, canActivate: [IsLoggedGuard] },
  { path: 'course', component: AddCourseComponent, canActivate: [IsLoggedGuard] },
  { path: 'subject/:idCourse', component: AddSubjectComponent, canActivate: [IsLoggedGuard] },
  { path: 'topic/:idSubject', component: AddTopicComponent, canActivate: [IsLoggedGuard] },
  { path: 'note/:idTopic', component: AddNoteComponent, canActivate: [IsLoggedGuard] },
  { path: 'document/:idNote', component: AddDocumentComponent, canActivate: [IsLoggedGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule { }
