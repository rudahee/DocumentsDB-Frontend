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
    this.docService.getDocument(id).subscribe(
      res => {
        this.docService.getInfoForDocument(id).subscribe(
            info => {
              let blob = new Blob([res], {type: info.contentType});
              let url = window.URL.createObjectURL(blob);

              window.open(url);

            }
          )
      }
    )
  }

  getDocumentForDownload(id: string) {
    this.docService.getDocument(id).subscribe(
      res => {
        this.docService.getInfoForDocument(id).subscribe(
            info => {
              let blob = new Blob([res], {type: info.contentType});
              let url = window.URL.createObjectURL(blob);
              var anchor = document.createElement("a");
              anchor.download = info.name;
              anchor.href = url;
              anchor.click();
            }
        )}
    )
  }
}
