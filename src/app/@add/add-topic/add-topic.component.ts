import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITopicDTO } from 'src/app/interfaces/topic-interface';
import { OneCourseService } from 'src/app/services/courses/one-course/one-course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {

  id: string;
  topic: ITopicDTO;

  constructor(private courseService: OneCourseService, private router: Router, private route: ActivatedRoute) { }

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
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        })
      }
    )
  }
}
