import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from 'src/app/core/date/date.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { NotifyService } from 'src/app/core/services/notify/notify.service';
import { IFormGenerator } from 'src/app/shared/components/form-generator/form-generator-interface';
import { isEmpty } from 'src/app/shared/utils/helper';
import { Customer } from '../../customers/models/customer.model';
import { ProductObject } from '../../products/models/productModel';
import { EnterQuantityComponent } from '../components/enter-quantity/enter-quantity.component';
import { IEnterQuantity } from '../models/enter_quantity.model';
import { TransactionObject } from '../models/transaction.model';
import { TransactionDetailsObject } from '../models/transaction_details.model';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent {
  object: TransactionObject = new TransactionObject();
  shift: string = "";
  shifts: string[] = [];
  payment_methods: string[] = [];
  public isEmpty = isEmpty;
  constructor(public dbService: HttpService,
    private notify: NotifyService,
    private dateService: DateService,
    private dialog: MatDialog) {

  }

  productSelected(args: ProductObject) {
    if (this.object.itemExists(args.id)) {
      this.notify.failNotification("Item already exists");
      return;
    }
    const enterQuantity = this.dialog.open<EnterQuantityComponent, any, IEnterQuantity>(EnterQuantityComponent, {
      maxHeight: '80vh',
      minHeight: '300px',
      minWidth: '300px',
      maxWidth: '80vw',
      data: { product: args }
    });

    enterQuantity.afterClosed().subscribe(result => {
      if (result) {
        try {
          const item: TransactionDetailsObject = new TransactionDetailsObject(
            args.id, args.name, result.quantity, args.price, args.unit, args.drug_info, args.cost_price,
            args.expiry, args.current_stock);

          this.object.addItem(item)
          console.log(result)
        } catch (error) {
          if (typeof (error) === "string") {
            this.notify.failNotification(error)
          }

        }

      }
    })
  }

  customerSelected(args: Customer) {
    this.object.setClient(args);
  }

  shiftChanged(args: string) {
    sessionStorage.setItem("shift", args);
    this.object.shift = this.shift = args
  }

  showRelated(item: TransactionDetailsObject) { }


  editItem(item: TransactionDetailsObject) { }



}
