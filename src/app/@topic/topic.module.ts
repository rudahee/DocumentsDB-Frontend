import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoutingModule } from './topic-routing.module';
import { TopicComponent } from './topic.component';
import { DocumentComponent } from './document/document.component';


@NgModule({
  declarations: [TopicComponent, DocumentComponent],
  imports: [
    CommonModule,
    TopicRoutingModule,
  ]
})
export class TopicModule { }
