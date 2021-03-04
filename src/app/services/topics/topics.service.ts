import { Injectable } from '@angular/core';
import { ITopicWithNotes } from 'src/app/interfaces/topic-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private httpC: HttpClient) { }

  getTopic(id: string): Observable<ITopicWithNotes> {

    return this.httpC.get<ITopicWithNotes>('/topic?id='+id);
  }
}
