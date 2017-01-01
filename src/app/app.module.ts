import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { DocumentComponent } from './document/document.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FooterComponent } from './footer/footer.component';

// import '@swimlane/ngx-datatable/release/datatable.css';
// import '@swimlane/ngx-datatable/release/material.css';
// import '@swimlane/ngx-datatable/release/assets/icons.css';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MenuComponent,
    DocumentComponent,
    InvoiceComponent,
    FooterComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
