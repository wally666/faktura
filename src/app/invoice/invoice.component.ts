import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
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

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    console.log('dId: ', route.params);
    this.documentProduct = this.createNewDocumentProduct();
//    Promise.all([
    //this.dataService.getSeller().then(response => this.seller = response).then(response => console.log('r', response)),
    //this.dataService.getDocument(1).then(response => this.document = response);
    this.dataService.getUnits().then(response => this.units = response).then(response => console.log('u', response)),
    //TODO: refactor and use filtered list
    this.dataService.getProducts().then(response => this.products = response).then(response => console.log('p', response))
  //  ]).then(() => this.documentProduct = this.createNewDocumentProduct());
  }

  ngOnInit() {    
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => {
      if (params['id']) {
        console.log('invoice id: ', params['id']);
        return this.dataService.getDocument(+params['id'])
        .then(response => {
          console.log('invoice:', response);
          response.creationDate = new Date(response.creationDate); 
          response.number = response.creationDate.getFullYear() + '/' + response.id;

          console.log('invoice:', response);
          return response; 
          });
      } else {
        //return Promise.resolve(this.createNewDocument());
        return this.dataService.getSeller().then(response => this.seller = response).then(this.createNewDocument);
    }
  })
      .subscribe((document: Models.Document) => {
        console.log('current doc: ', document);
        this.document = document
      });
  }

  private createNewDocument = (): Models.Document => {
    console.log('seller: ', this.seller);
    return {
      id: undefined,
      type: null,
      number: null,
      creationDate: null,
      seller: this.seller,
      contractor: this.seller,
      products: []
    };
  }

  private createNewDocumentProduct = (): Models.DocumentProduct => {
    console.log('current document: ', this.document);

//    this.productName = '';
    return { 
      id: this.document ? this.document.products.length + 1 : 1, 
      product: null, //{ id:0, name: '' },
      unit: null, //{id: null, name: '???'},
      quantity: null,
      unitPriceWithTax: null,
      tax: 23
    };
  }

//  private productName: any;

  searchProduct = (text$: Observable<string>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
//        this.productName = term;
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
  if (this.document.id){
  this.dataService.updateDocument(this.document).then(response => {
    console.log('updated', response);
    this.document = response;
//    this.router.navigate(['/invoice', this.document.id]);
  });
  } else {
  this.document.creationDate = new Date();
  this.document.number = this.document.creationDate.getFullYear() + '/' + (this.document.id || '?');
  this.dataService.createDocument(this.document).then(response => {
    console.log('created', response);
    //this.document = response;
    this.router.navigate(['/invoice', response.id]);
  });
  }
}

  addProduct = () => {
    console.log('is', this.documentProduct);
    console.log('prod type', typeof this.documentProduct.product);
if (this.documentProduct.product == null){
  return;
}

     if (typeof this.documentProduct.product === 'string')
    {
      var product = { id: undefined, //this.products.length + 1,
    name: this.documentProduct.product,
//    category?: Category,
    //shortcat
//    type?: ProductType,
    //provider
    //manufacturerCode
    tax: this.documentProduct.tax,
    unit: this.documentProduct.unit,
//    warehouse?: Warehouse,
unitPriceWithTax: this.documentProduct.unitPriceWithTax
      };

      console.log('prod is a string', this.documentProduct);
      this.dataService.createProduct(product).then(response => {
        console.log('created product: ', response);
        this.documentProduct.product = response;
        this.products.push(response)

    //TODO: use dataservice
    this.document.products.push(this.documentProduct);
    this.documentProduct = this.createNewDocumentProduct();

      });
      console.log('add');
    } else {
      console.log('prod is not a string', this.documentProduct);

this.documentProduct.product.tax = this.documentProduct.tax;
this.documentProduct.product.unit = this.documentProduct.unit;
this.documentProduct.product.unitPriceWithTax = this.documentProduct.unitPriceWithTax;

this.dataService.updateProduct(this.documentProduct.product).then(response => {
        console.log('updated', response);
});
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
      console.log('value1', this.documentProduct.product);
      // this.documentProduct.tax = this.documentProduct.product.tax;
      // this.documentProduct.unit = this.documentProduct.product.unit;
      // this.documentProduct.unitPriceWithTax = this.documentProduct.product.unitPriceWithTax;

    }
    else {
      console.log('value2', value);

      this.documentProduct.product = value;
      this.documentProduct.unit = value.unit;
      this.documentProduct.unitPriceWithTax = value.unitPriceWithTax;
      this.documentProduct.tax = value.tax;
    }
    
    console.log('is changed', this.documentProduct); 
  }

}
