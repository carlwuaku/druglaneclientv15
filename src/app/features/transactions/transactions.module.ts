import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { EnterQuantityComponent } from './components/enter-quantity/enter-quantity.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    TransactionsComponent,
    NewTransactionComponent,
    EnterQuantityComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule,
    ProductsModule
  ]
})
export class TransactionsModule { }
