import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {GridOptions} from "ag-grid/main";

import { DataService } from './../data.service'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: [ './invoice.component.css' ]
})
export class InvoiceComponent implements OnInit {
  public gridOptions: GridOptions;
  public model: any;

rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  // columns = [
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];
  messages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Brak danych do wyświetlenia',

    // Footer total message
    totalMessage: 'Razem'
  };
  count = this.rows.length;
  editing = {};

  constructor(private dataService: DataService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowData = [];
    this.createRowData().then(response => { 
      this.gridOptions.api.setRowData(response); 
    });
    this.gridOptions.columnDefs = this.createColumnDefs();
  }

  ngOnInit() {
  }

private createColumnDefs() {
        return [
            {headerName: "Name", field: "name", width: 300},
            {
                headerName: "Mood",
                field: "mood",
                //cellRendererFramework: MoodRendererComponent,
                //cellEditorFramework: MoodEditorComponent,
                editable: true,
                width: 250
            },
            {
                headerName: "Numeric",
                field: "number",
                //cellEditorFramework: NumericEditorComponent,
                editable: true,
                width: 250
            }
        ];
    }

    private createRowData() {
      return this.dataService.getProducts();        
    }

updateValue(event, cell, cellValue, row) {
    console.log('update');
    console.log(event.target.value);
    console.log(this.model);

    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }
  
  onCellClicked(event) {
    console.log('onCellClicked');
    console.log(event);
  }

  onChange(event) {
    console.log('changed');
    console.log(event);
  }

  searchProduct = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : 
        /*
        this.dataService.getProducts().then(products => 
        //products.filter(v => new RegExp(term, 'gi').test(v.name)).slice(0, 10)
        { console.log('123');
        console.log(term);
        return ['xxx', 'yyy']; }
      )*/
       ['xxx', 'yyy']
      );

  formatter = (x: {name: string}) => x.name;
}
