import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FormPageComponent } from './form-page/form-page.component';
import { FormComponent } from './form/form.component';
import { ProductActionsComponent } from './product-actions/product-actions.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'form', component: FormPageComponent },
  { path: 'form/:id', component: FormPageComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'actions/:action', component: ProductActionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
