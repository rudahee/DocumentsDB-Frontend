import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseItemComponent } from './course-item/courses.component';
import { CourseComponent } from './course.component';

const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: ':id', component: CourseItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
