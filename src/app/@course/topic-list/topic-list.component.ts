import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITopicDTO } from 'src/app/interfaces/topic-interface';


@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  public topics: ITopicDTO[];

  ngOnInit(): void {
  }

  goToTopic(id: string) {
    this.router.navigate(['/topic/'+id])
  }

}
