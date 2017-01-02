import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Unit } from './unit';
import { Product } from './product';

@Injectable()
export class DataService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private dataUrl = 'api';  // URL to web api

  constructor(private http: Http) { }

  getProducts(): Promise<Product[]> {
    const url = `${this.dataUrl}/products`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Product[])
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

  createProduct(name: string): Promise<Product> {
    const url = `${this.dataUrl}/products`;
    return this.http
      .post(url, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  updateProduct(product: Product): Promise<Product> {
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