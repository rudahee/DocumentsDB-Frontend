import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INoteDTO } from '../interfaces/notes-interfaces';
import { ITopicWithNotes } from '../interfaces/topic-interface';
import { TopicsService } from '../services/topics/topics.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  topic: ITopicWithNotes = {
    name: "",
    description: "",
  };

  notes: INoteDTO[];
  id: string;

  constructor(
    private topicService: TopicsService,
    private route: ActivatedRoute,
    private router: Router,
    public loc: Location) {

    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllTopics(this.id);
  }

  goToAddNote(){
    this.router.navigate(['/add/note/'+this.id])
  }
  goToAddDocument(id: string) {
    this.router.navigate(['/add/document/'+id])
  }

  /*
   Get all Topics
  */
  getAllTopics(id: string) {
    this.topicService.getTopic(id).subscribe(
      resp => {
        if (resp != undefined && resp != null) {
          this.topic = {
            "name": resp.name,
            "description": resp.description
          }
          this.notes = resp.notesDTO;
          for (let note in this.notes) {
            this.notes[note].open = false;
          }
        }
      }
    )
  }
}
