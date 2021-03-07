import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INoteDTO } from 'src/app/interfaces/notes-interfaces';
import { TopicsService } from 'src/app/services/topics/topics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  addNoteForm: FormGroup;
  note: INoteDTO;
  id: string;

  constructor(private topicServ: TopicsService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.addNoteForm = this.formBuilder.group({
      description: new FormControl('', [Validators.required/* Validators.minLength(4)]*/]),
      name: new FormControl('', [Validators.required/* Validators.minLength(4)]*/]),
      text: new FormControl('', [Validators.required])
    });
  }



  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['idTopic'];
      }
    )
  }

  addNote(): void {
    this.note = {
      name: this.addNoteForm.controls['name'].value,
      description: this.addNoteForm.controls['description'].value,
      open: true,
      document: undefined,
      text: this.addNoteForm.controls['text'].value
    }
    this.topicServ.addNote(this.id, this.note).subscribe(
      res => {
        Swal.fire({
          title: "Success",
          text: "Note Added",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Go To Topic List",
          showCancelButton: true,
          cancelButtonText: "Go To Course List"
        }).then(
          result => {
            if (result.isConfirmed) {
              this.router.navigate(['/topic'+this.id]);
            } else {
              this.router.navigate(['/course'])
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
