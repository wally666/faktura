import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceComponent } from './invoice/invoice.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ToolsComponent } from './tools/tools.component';
// import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: InvoiceComponent },
    // { path: 'dashboard', component: DashboardComponent },
    { path: 'invoice/:id', component: InvoiceComponent },
    // { path: 'tools', component: ToolsComponent },
    //{ path: 'configuration', component: ConfigurationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }