import { Component, Input, OnInit } from '@angular/core';
import { ITopicDTO } from 'src/app/interfaces/topic-interface';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  constructor() { }

  @Input()
  public topics: ITopicDTO[];

  ngOnInit(): void {
  }

}
