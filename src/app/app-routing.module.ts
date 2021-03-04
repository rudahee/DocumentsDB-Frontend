import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: 'sign-up', component: RegisterComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'home', component: MainPageComponent },
  { path: 'course', loadChildren: () => import('./@course/course.module').then(m => m.CourseModule) },
  { path: 'topic', loadChildren: () => import('./@topic/topic.module').then(m => m.TopicModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
