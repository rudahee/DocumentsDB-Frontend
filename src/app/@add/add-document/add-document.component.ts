import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicsService } from 'src/app/services/topics/topics.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  id:string;
  addDocForm: FormGroup;

  constructor(
    private topicServ: TopicsService,
    private route: ActivatedRoute,
    public loc: Location,
    private formBuilder: FormBuilder) {

      // Start the file submission form.
      this.addDocForm = this.formBuilder.group({
      files: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    // Get id of parent entity (Note)
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

  /*
  With this method, detect the different files that are in the form.
  */
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
    }}
  }

  addDocuments() {
    // Do a request in service
    this.topicServ.addDocument(this.addDocForm.controls['files'].value, this.id)
  }

}
