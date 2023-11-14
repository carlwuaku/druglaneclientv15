import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from 'src/app/core/date/date.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { NotifyService } from 'src/app/core/services/notify/notify.service';
import { IFormGenerator } from 'src/app/shared/components/form-generator/form-generator-interface';
import { ProductObject } from '../../products/models/productModel';
import { EnterQuantityComponent } from '../components/enter-quantity/enter-quantity.component';
import { TransactionObject } from '../models/transaction.model';
import { TransactionDetailsObject } from '../models/transaction_details.model';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent {
  object: TransactionObject = new TransactionObject();
  constructor(public dbService: HttpService,
    private notify: NotifyService,
    private dateService: DateService,
  private dialog: MatDialog) {

  }

  productSelected(args: ProductObject) {
    const item: TransactionDetailsObject = new TransactionDetailsObject(
      args.id, args.name, 1, args.price, args.unit, args.drug_info, args.cost_price,
      args.expiry);
    const enterQuantity = this.dialog.open(EnterQuantityComponent, {
    });
    enterQuantity.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    })
  }

}
