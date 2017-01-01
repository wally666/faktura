import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Catalog } from './Catalog';
//import { Item } from './Item';

@Injectable()
export class DataService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private dataUrl = 'api';  // URL to web api

  constructor(private http: Http) { }

  getCatalogs(): Promise<Catalog[]> {
    const url = `${this.dataUrl}/catalogs`;
    console.log("[DataService]: getCatalogs" + url);
    console.log(url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Catalog[])
      .catch(this.handleError);
  }
  getCatalog(id: number): Promise<Catalog> {
    const url = `${this.dataUrl}/catalogs/${id}`;
    console.log("[DataService]: getCatalog");
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Catalog)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.dataUrl}/catalogs/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  create(name: string): Promise<Catalog> {
    const url = `${this.dataUrl}/catalogs`;
    return this.http
      .post(url, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  update(catalog: Catalog): Promise<Catalog> {
    const url = `${this.dataUrl}/catalogs/${catalog.id}`;
    return this.http
      .put(url, JSON.stringify(catalog), { headers: this.headers })
      .toPromise()
      .then(() => catalog)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log("[DataService]: error");
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}