import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { DocumentComponent } from './document/document.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FooterComponent } from './footer/footer.component';

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
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
