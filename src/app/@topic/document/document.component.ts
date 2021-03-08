import { Component, Input, OnInit } from '@angular/core';
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
        this.documents = res
      }
    )

  }

}
