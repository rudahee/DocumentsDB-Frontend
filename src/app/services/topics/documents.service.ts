import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDocument } from 'src/app/interfaces/document-interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private httpC: HttpClient, private router: Router) { }

  docs: IDocument[];

  getDocumentsFromNote(idNote: string): Observable<IDocument[]> {
    return this.httpC.get<IDocument[]>('/document/get/' + idNote);
  }

  getDocument(id: string) {
    return this.httpC.get('/document/get/data/'+id , {responseType: 'blob'}) // Force to responseType to blob
  }

  getInfoForDocument(id: string) {
    return this.httpC.get<IDocument>('/document/get/json/'+id)
  }
}
