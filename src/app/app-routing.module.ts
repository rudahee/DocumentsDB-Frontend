import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { IsLoggedGuard } from './services/guard/is-logged.guard';

const routes: Routes = [
  { path: 'sign-up', component: RegisterComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'home', component: MainPageComponent },
  { path: '',  component: MainPageComponent},
  // Lazy loading modules
  { path: 'course', loadChildren: () => import('./@course/course.module').then(m => m.CourseModule), canActivate: [IsLoggedGuard] },
  { path: 'topic', loadChildren: () => import('./@topic/topic.module').then(m => m.TopicModule), canActivate: [IsLoggedGuard] },
  { path: 'add', loadChildren: () => import('./@add/add.module').then(m => m.AddModule), canActivate: [IsLoggedGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
