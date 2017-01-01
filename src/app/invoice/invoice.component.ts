import { Component, OnInit } from '@angular/core';

// import '@swimlane/ngx-datatable/release/datatable.css';
// import '@swimlane/ngx-datatable/release/material.css';
// import '@swimlane/ngx-datatable/release/assets/icons.css';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: [ './invoice.component.css' ]
})
export class InvoiceComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }
}
