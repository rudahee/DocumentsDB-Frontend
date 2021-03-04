import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ISubjectDTO } from 'src/app/interfaces/subject-interface';
import { ITopicDTO } from 'src/app/interfaces/topic-interface';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  constructor() { }

  @Input()
  public subjects: ISubjectDTO[];

  ngOnInit(): void {

  }

  openTopic(subject: ISubjectDTO) {
    subject.open = !subject.open;
  }

}
