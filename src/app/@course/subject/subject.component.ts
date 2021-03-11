import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ISubjectDTO } from 'src/app/interfaces/subject-interface';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  constructor(
    private router: Router) {

    }

  @Input()
  public subjects: ISubjectDTO[];

  ngOnInit(): void {

  }

  openTopic(subject: ISubjectDTO) {
    subject.open = !subject.open;
  }

  goToAddTopic(id: string) {
    this.router.navigate(['/add/topic/'+id])
  }

}
