import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITopicDTO } from 'src/app/interfaces/topic-interface';
import { OneCourseService } from 'src/app/services/courses/one-course/one-course.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {

  id: string;
  topic: ITopicDTO;

  constructor(
    private courseService: OneCourseService,
    private router: Router,
    private route: ActivatedRoute,
    public loc: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['idSubject'];
      }
    )

    this.topic = {
      description: '',
      name: '',
      id: undefined
    }
  }
    /*
      When the form is submitted, it sends an alert when the request has been made correctly,
      and gives the options to return to the list of courses or to return to the topic list.
    */
  onSubmitForm(topic: ITopicDTO) {
    this.courseService.addTopic(topic, this.id).subscribe(
      res => {
        Swal.fire({
          title: "Success",
          text: "Topic Added",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Go To Course List",
          showCancelButton: true,
          cancelButtonText: "Go To Topic"
        }).then(
          result => {
            if (result.isConfirmed) {
              this.router.navigate(['/course']);
            } else {
              this.router.navigate(['/topic/'+res.id])
            }
          }
        )
      }, error => {
        // In case of error I show the predefined message from the backend
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        })
      }
    )
  }
}
