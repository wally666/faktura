import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import * as Models from './models'

@Injectable()
export class DataService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private dataUrl = 'api';  // URL to web api

  constructor(private http: Http) { }

  getSeller(): Promise<Models.Contractor> {
    return this.getContractor(1);
  }

  getContractor(id: number): Promise<Models.Contractor> {
    const url = `${this.dataUrl}/contractors/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Models.Contractor)
      .catch(this.handleError);
  }

  getDocument(id: number): Promise<Models.Document> {
    console.log('get doc: ', id);
    const url = `${this.dataUrl}/documents/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Models.Document)
      .catch(this.handleError);
  }

getDocuments(): Promise<Models.Document[]> {
    console.log("[getDocuments]");
    const url = `${this.dataUrl}/documents`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Models.Document[])
      .catch(this.handleError);
  }

  getProducts(): Promise<Models.Product[]> {
    console.log("[getProducts]");
    const url = `${this.dataUrl}/products`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Models.Product[])
      .catch(this.handleError);
  }

getUnits(): Promise<Models.Unit[]> {
    console.log("[getUnits]");
    const url = `${this.dataUrl}/units`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Models.Unit[])
      .catch(this.handleError);
  }
  // getCatalog(id: number): Promise<Catalog> {
  //   const url = `${this.dataUrl}/catalogs/${id}`;
  //   console.log("[DataService]: getCatalog");
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().data as Catalog)
  //     .catch(this.handleError);
  // }

  // deleteProduct(id: number): Promise<void> {
  //   const url = `${this.dataUrl}/products/${id}`;
  //   return this.http.delete(url, { headers: this.headers })
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }

  createProduct(product: Models.Product): Promise<Models.Product> {
    const url = `${this.dataUrl}/products`;
    return this.http
      .post(url, JSON.stringify(product), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as Models.Product)
      .catch(this.handleError);
  }

  createDocument(document: Models.Document): Promise<Models.Document> {
    const url = `${this.dataUrl}/documents`;
    return this.http
      .post(url, JSON.stringify(document), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as Models.Document)
      //.then(res => res.json().data)
      //.then(()=>document)
      .catch(this.handleError);
  }

  updateDocument(document: Models.Document): Promise<Models.Document> {
    const url = `${this.dataUrl}/documents/${document.id}`;
    return this.http
      .put(url, JSON.stringify(document), { headers: this.headers })
      .toPromise()
      //.then(res => res.json().data as Models.Document)
      .then(()=>document)
      .catch(this.handleError);
  }

  updateProduct(product: Models.Product): Promise<Models.Product> {
    const url = `${this.dataUrl}/products/${product.id}`;
    return this.http
      .put(url, JSON.stringify(product), { headers: this.headers })
      .toPromise()
      .then(() => product)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("[DataService]: error");
    console.error('An error occurred', error); //TODO: for demo purposes only
    return Promise.reject(error.message || error);
  }
}