import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceComponent } from './invoice/invoice.component';
import { DocumentsComponent } from './documents/documents.component';
import { ProductsComponent } from './products/products.component';
import { UnitsComponent } from './units/units.component';
// import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: InvoiceComponent },
    // { path: 'dashboard', component: DashboardComponent },
    { path: 'invoice/:id', component: InvoiceComponent },
    { path: 'documents', component: DocumentsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'units', component: UnitsComponent },
    // { path: 'tools', component: ToolsComponent },
    //{ path: 'configuration', component: ConfigurationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }