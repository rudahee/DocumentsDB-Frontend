import { Injectable } from '@angular/core';
import { ITopicWithNotes } from 'src/app/interfaces/topic-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INoteDTO } from 'src/app/interfaces/notes-interfaces';
import { IDocument } from 'src/app/interfaces/document-interface';
import Swal from 'sweetalert2';
import { title } from 'process';
import { first, map } from 'rxjs/operators';
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  documents: IDocument[];

  constructor(private httpC: HttpClient, private router: Router) { }

  getTopic(id: string): Observable<ITopicWithNotes> {

    return this.httpC.get<ITopicWithNotes>('/topic?id='+id);
  }

  addNote(id: string, note:INoteDTO): Observable<INoteDTO> {
    return this.httpC.post<INoteDTO>('/note/add?topic='+id, note);
  }


  addDocument(values: any, idNote:string) {

    let error: boolean = false;
    let errorMsg: string;

    values.forEach(element => {
      let doc = {
        size: element.file.size,
        name: element.file.name,
        data: this.createBlobFromUriB64(element.url, element.file.type),
        contentType: element.file.type
      }

      let formData: FormData = this.generateFormData(doc, idNote);

      Swal.fire({
        title: 'Uploading',
        icon: 'info',
        showConfirmButton: false
      })

      const req = this.httpC.post<IDocument>('/document/'+idNote, formData).subscribe(

        _res => {
          Swal.close()
          Swal.fire({
            title: "Success",
            text: "Document Added",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Go To Courses",
            showCancelButton: true,
            cancelButtonText: "Stay here"
          }).then(
            result => {
              if (result.isConfirmed) {
                this.router.navigate(['/course']);
              }}
          )}, err => {
            Swal.close()
            Swal.fire({
              title: "Error",
              text: "Upload error, try it later",
              icon: "error",
              showConfirmButton: true,
              confirmButtonText: "Go To Courses",
            }).then(
              result => {
                if (result.isConfirmed) {
                  this.router.navigate(['/course'])
                }
              }
            )
        }

      )
    }
  )

}

  private generateFormData(doc: IDocument, idNote:string): FormData {
    const formData = new FormData();
    const file = new File([doc.data], doc.name)
    formData.append('mpf', file, doc.name)
    formData.append('extension', doc.name.substr(doc.name.lastIndexOf('.')+1))
    formData.append('type', doc.contentType)

    return formData;
  }

  private createBlobFromUriB64(b64data: string, contentType: any): Blob {

    const b64uri = b64data.split(',')[1]

    const byteCharacters = atob(b64uri)

    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: contentType});

    return blob;
  }

}
