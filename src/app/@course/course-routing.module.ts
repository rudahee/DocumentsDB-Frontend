import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedGuard } from '../services/guard/is-logged.guard';
import { CourseItemComponent } from './course-item/courses.component';
import { CourseComponent } from './course.component';

const routes: Routes = [
  { path: '', component: CourseComponent, canActivateChild: [IsLoggedGuard] },
  { path: ':id', component: CourseItemComponent, canActivateChild: [IsLoggedGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
