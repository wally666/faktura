import { Component, OnInit } from '@angular/core';

import { DataService } from './../data.service'
import * as Models from './../models'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Array<Models.Product>;

  constructor(private dataService: DataService) { 
    this.dataService.getProducts().then(response => this.products = response);
  }

  ngOnInit() {
  }
}