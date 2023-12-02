import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DateService } from 'src/app/core/date/date.service';
import { SettingsTransfer } from 'src/app/core/models/settingsInterface';
import { HttpService } from 'src/app/core/services/http/http.service';
import { NotifyService } from 'src/app/core/services/notify/notify.service';
import { IFormGenerator } from 'src/app/shared/components/form-generator/form-generator-interface';
import { PRINT_SETTINGS, LABEL_PRINT_SETTINGS, NO_PRINT, PRINT_ALWAYS, SAVE_AND_PRINT, SAVE_ONLY } from 'src/app/shared/utils/constants';
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
export class NewTransactionComponent implements OnInit {
  object: TransactionObject = new TransactionObject();
  shift: string = "";
  shifts: string[] = [];
  payment_methods: string[] = [];
  public isEmpty = isEmpty;

  print_settings: string = "save_print"
  label_print_settings: string = "print_always";
  can_give_discount = true
  tax = 0
  tax_amount = 0
  print_drug_info: boolean = false;//used to set if drug info shd be printed after the invoice if
  can_view_end_of_day = true;
  systemSettings: SettingsTransfer | undefined;
  constructor(public dbService: HttpService,
    private notify: NotifyService,
    private dateService: DateService,
    private dialog: MatDialog, private authService: AuthService) {
    if (this.authService.currentUser.permissions.indexOf('Give Discount') == -1) {
      this.can_give_discount = false;
    }
    if (this.authService.currentUser.permissions.indexOf('View End Of Day Report') == -1) {
      this.can_view_end_of_day = false;
    }
  }
  ngOnInit(): void {
    //the print receipt settings
    let print_settings_query = localStorage.getItem(PRINT_SETTINGS);
    switch (print_settings_query) {
      case SAVE_ONLY:
        this.print_settings = SAVE_ONLY
        break;

      default:
        this.print_settings = SAVE_AND_PRINT
        break;
    }

    //the label printign settings
    let label_print_settings_query = localStorage.getItem(LABEL_PRINT_SETTINGS);
    switch (label_print_settings_query) {
      case NO_PRINT:
        this.label_print_settings = NO_PRINT
        break;

      default:
        this.label_print_settings = PRINT_ALWAYS
        break;
    }
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


  cancel() { }

  saveLocalItems() { }


  setPrintSettings() {
    localStorage.setItem(PRINT_SETTINGS, this.print_settings)
  }

  setLabelPrintSettings() {
    localStorage.setItem(LABEL_PRINT_SETTINGS, this.label_print_settings)
  }


  getSettings() {


    this.dbService.get<SettingsTransfer>('admin/settings').pipe(take(1)).subscribe({
      next: data => {
        this.systemSettings = data;


      },
      error: () => {
        // this.notify.failNotification('Unable to get shifts. Check connection');
      }
    })


  }
}
