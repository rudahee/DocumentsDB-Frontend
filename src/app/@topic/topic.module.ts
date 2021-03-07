import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoutingModule } from './topic-routing.module';
import { TopicComponent } from './topic.component';
import { NoteComponent } from './note/note.component';


@NgModule({
  declarations: [TopicComponent, NoteComponent],
  imports: [
    CommonModule,
    TopicRoutingModule,
  ]
})
export class TopicModule { }
