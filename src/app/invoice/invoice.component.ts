import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {GridOptions} from "ag-grid/main";

import { DataService } from './../data.service'

import * as Models from './../models'


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: [ './invoice.component.css' ]
})
export class InvoiceComponent implements OnInit {
  public seller: Models.Contractor;
  public document: Models.Document;

  constructor(private dataService: DataService) { 
    this.dataService.getSeller().then(response => this.seller = response);
    this.dataService.getDocument(1).then(response => this.document = response);
  }

  ngOnInit() {
  }
}
