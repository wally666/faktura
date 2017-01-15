import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgGridModule } from "ag-grid-ng2/main";

import { AppRoutingModule }     from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { DataService }          from './data.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { DocumentsComponent } from './documents/documents.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MenuComponent,
    DocumentsComponent,
    InvoiceComponent,
    FooterComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 }),
    AgGridModule.withComponents(
            [
                DocumentsComponent
            ]),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
