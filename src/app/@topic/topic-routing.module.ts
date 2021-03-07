import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedGuard } from '../services/guard/is-logged.guard';

import { TopicComponent } from './topic.component';

const routes: Routes = [{ path: ':id', component: TopicComponent, canActivate: [IsLoggedGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
