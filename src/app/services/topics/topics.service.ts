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

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  documents: IDocument[];

  constructor(private httpC: HttpClient) { }

  getTopic(id: string): Observable<ITopicWithNotes> {

    return this.httpC.get<ITopicWithNotes>('/topic?id='+id);
  }

  addNote(id: string, note:INoteDTO): Observable<INoteDTO> {
    return this.httpC.post<INoteDTO>('/note/add?topic='+id, note);
  }


  addDocument(values: any, idNote:string): boolean {

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

      this.httpC.post<IDocument>('/document/'+idNote, formData).pipe(first()).subscribe(
        _ok => {
        },
        fail => {
          error = true;
          errorMsg = fail;
          console.log(fail);
        }
      )
    }
  )

  return error;
}

  private generateFormData(doc: IDocument, idNote:string): FormData {
    const formData = new FormData();
    const file = new File([doc.data], doc.name)
    formData.append('mpf', file, doc.name)
    formData.append('extension', doc.name.substr(doc.name.lastIndexOf('.')+1))

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
