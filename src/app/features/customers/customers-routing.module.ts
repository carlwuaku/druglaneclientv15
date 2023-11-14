import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomersComponent } from './customers.component';

const routes: Routes = [{ path: '', component: CustomersComponent },
  { path: 'form', component: CustomerFormComponent },
  { path: 'form/:id', component: CustomerFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
