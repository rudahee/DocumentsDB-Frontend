import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IDocument } from 'src/app/interfaces/document-interface';
import { DocumentsService } from 'src/app/services/topics/documents.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {


  @Input()
  public noteId: string;

  documents: IDocument[]

  constructor(private docService: DocumentsService) { }

  ngOnInit(): void {
    this.docService.getDocumentsFromNote(this.noteId).subscribe(
      res => {
        this.documents = res;
      }
    )
  }

  getDocumentForExternalView(id: string) {
    // I need to do two requests because I can't get a json and a blob from the same request in spring.
    this.docService.getDocument(id).subscribe(
      res => {
        // The second request is only made if the first request is correct.
        this.docService.getInfoForDocument(id).subscribe(
            info => {
              let blob = new Blob([res], {type: info.contentType}); // Blob creation

              // Create a URL object and open it from the BOM
              let url = window.URL.createObjectURL(blob);
              window.open(url);

            }
          )
      }
    )
  }

  getDocumentForDownload(id: string) {
    // I need to do two requests because I can't get a json and a blob from the same request in spring.
    this.docService.getDocument(id).subscribe(
      res => {
        // The second request is only made if the first request is correct.
        this.docService.getInfoForDocument(id).subscribe(
            info => {
              let blob = new Blob([res], {type: info.contentType}); // Blob creation

              // Create a URL object and open it from the BOM
              let url = window.URL.createObjectURL(blob);

              // Create an element, set name, and pass the blob, and without showing it on the DOM, and click it
              var anchor = document.createElement("a");
              anchor.download = info.name;
              anchor.href = url;
              anchor.click();
            }
        )}
    )
  }
}
