import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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

  public documentProduct: Models.DocumentProduct;

  public products: Array<Models.Product>;

  constructor(private dataService: DataService) {
    this.documentProduct = this.createNewDocumentProduct(); 

    this.dataService.getSeller().then(response => this.seller = response);
    this.dataService.getDocument(1).then(response => this.document = response);
    //TODO: refactor
    this.dataService.getProducts().then(response => this.products = response);
  }

  ngOnInit() {
  }

  private createNewDocumentProduct = (): Models.DocumentProduct => {
    this.productName = '';
    return { 
      id: 0, //this.document.products.length, 
      product: { id:0, name: ''},
      unit: null,
      quantity: null,
      unitPriceWithTax: null,
      tax: 23
    };
  }

  private productName: any;

  searchProduct = (text$: Observable<string>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        this.productName = term;
        if (term === '') {
          return []; //Observable.of([]);
        } 
        return this.products.filter(v => new RegExp(term, 'gi').test(v.name)).slice(0, 10);
        //return this.dataService.getProducts();
      });
  }

  formatter = (x: {name: string}) => x.name;

  addProduct = () => {
    console.log('is', this.documentProduct.product); 
      if(!this.documentProduct.product)
    {
      
      this.dataService.createProduct(this.productName).then(response => {
        console.log('created');
        console.log(response);
        this.documentProduct.product = response;
        this.products.push(response)
      });
      console.log('add');
    }

    //TODO: use dataservice
    this.document.products.push(this.documentProduct);
    this.documentProduct = this.createNewDocumentProduct();
  }

  onProductNameChanged = (value: string | Models.Product) => {
    console.log('was', this.documentProduct.product); 
    console.log('type', typeof value); 
    if (typeof value === 'string')
    {
      this.documentProduct.product = this.products.find(v => v.name === value)
    }
    else {
      this.documentProduct.product = value;
    }
    console.log('is changed', this.documentProduct.product); 
  }

}
