import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseContainerComponent } from './components/course/course-container/course-container.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'sign-up', component: RegisterComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseContainerComponent},
  { path: '', redirectTo: '/sign-up', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
