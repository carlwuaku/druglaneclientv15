import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormPageComponent } from './form-page/form-page.component';
import { FormComponent } from './form/form.component';
import { SelectProductComponent } from './select-product/select-product.component';
import { ProductActionsComponent } from './product-actions/product-actions.component';


@NgModule({
  declarations: [
    ProductsComponent,
    DetailsComponent,
    ListComponent,
    FormComponent,
    FormPageComponent,
    SelectProductComponent,
    ProductActionsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  exports: [
    SelectProductComponent,
    FormComponent,
    ListComponent
  ]
})
export class ProductsModule { }
