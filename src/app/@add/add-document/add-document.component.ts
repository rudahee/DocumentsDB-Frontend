import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicsService } from 'src/app/services/topics/topics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  id:string;
  addDocForm: FormGroup;

  constructor(private topicServ: TopicsService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.addDocForm = this.formBuilder.group({
      files: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['idNote'];
      }
    )
  }

  createItem(data): FormGroup {
    return this.formBuilder.group(data);
  }

  get files(): FormArray {
    return this.addDocForm.get('files') as FormArray;
  };

  detectFiles(event) {
    let files = event.target.files;
    if (files) {
        for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
                this.files.push(this.createItem({
                    file,
                    url: e.target.result  //Base64 string for preview image
                }));
            }
            reader.readAsDataURL(file);
        }
    }
  }

  addDocuments() {
    const modal = Swal.fire({
      title: 'Uploading',
      icon: 'info',
      showConfirmButton: false
    })

    if (!this.topicServ.addDocument(this.addDocForm.controls['files'].value, '48')) {
      modal.then(
        res => {
          Swal.close();

          Swal.fire('Upload Complete')
        }
      )
    } else {
      modal.then(
        res => {
          Swal.close();

          Swal.fire('Error!')
        }
      )
    }
  }

}
