import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service'
import * as Models from './../models'

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  public documents: Array<Models.Document>;

  constructor(private dataService: DataService) { 
    this.dataService.getDocuments().then(response => this.documents = response);
  }

  ngOnInit() {
  }
}
