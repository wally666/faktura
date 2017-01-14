import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
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
  public units: Array<Models.Unit>;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    console.log('dId: ', route.params);

    this.documentProduct = this.createNewDocumentProduct(); 
    this.dataService.getSeller().then(response => this.seller = response);
    //this.dataService.getDocument(1).then(response => this.document = response);
    this.dataService.getUnits().then(response => this.units = response);
    //TODO: refactor and use filtered list
    this.dataService.getProducts().then(response => this.products = response);
  }

  ngOnInit() {
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.dataService.getDocument(+params['id']))
    .subscribe((document: Models.Document) => this.document = document);
  }

  private createNewDocumentProduct = (): Models.DocumentProduct => {
    this.productName = '';
    return { 
      id: 0, //this.document.products.length, 
      product: null, //{ id:0, name: '' },
      unit: null, //{id: null, name: '???'},
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
        //TODO: refactr and use filtered list
        //return this.dataService.getProducts();
      });
  }

  formatter = (x: {name: string}) => x.name;

saveInvoice = () => {
  this.dataService.createDocument(this.document).then(response => {
    console.log('created', response);
  });

let doc = { id: 3, type: { id: 1, name: 'Faktura' }, number: "666/16", creationDate: new Date(), 
        seller: null, contractor: null, products: [], /*paymentType: PaymentType, paymentDeadline: Date, notes?: string,*/
      };

  this.dataService.createDocument(doc).then(response => {
    console.log('created', response);
  });
}

  addProduct = () => {
    console.log('is', this.documentProduct);

     if (typeof this.documentProduct.product === 'string')
    {
      console.log('prod is string', this.documentProduct);
      this.dataService.createProduct(this.productName).then(response => {
        console.log('created');
        console.log(response);
        this.documentProduct.product = response;
        this.products.push(response)

    //TODO: use dataservice
    this.document.products.push(this.documentProduct);
    this.documentProduct = this.createNewDocumentProduct();

      });
      console.log('add');
    } else {
      console.log('prod is not string', this.documentProduct);

    //TODO: use dataservice
    this.document.products.push(this.documentProduct);
    this.documentProduct = this.createNewDocumentProduct();
    }
  }

  onProductNameChanged = (value: string | Models.Product) => {
    console.log('was', this.documentProduct); 
    console.log('type', typeof value); 
    if (typeof value === 'string')
    {
      console.log('value1', value);
      this.documentProduct.product = this.products.find(v => v.name === value)
    }
    else {
      console.log('value2', value);
      this.documentProduct.product = value;
      this.documentProduct.unit = value.unit;
      this.documentProduct.tax = value.tax;
    }
    
    console.log('is changed', this.documentProduct); 
  }

}
