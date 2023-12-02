import { Customer } from "../../customers/models/customer.model";
import { TransactionDetailsObject } from "./transaction_details.model";
import { TransactionMetadataObject } from "./transaction_metadata.model";
import { TransactionPaymentObject } from "./transaction_payment.model";

export class TransactionObject {
  id!: string;
  customer: string = "";
  type: string = "sale";
  client_name: string = "";
  client_contact: string = "";
  client_address: string = "";
  user_name: string = "";
  code: string = "";
  created_by : string = "";
  created_on: string = "";
  discount: number = 0;
  tax: number = 0;
  shift: string = "";
  payments: TransactionPaymentObject[] = [];
  items: TransactionDetailsObject[] = [];
  metadata: TransactionMetadataObject[] = [];
  total_paid: number = 0;
  total_cost: number = 0;
  num_of_items: number = 0;
  total: number = 0;


  constructor() { }

  addItem(item: TransactionDetailsObject) {
    //make sure no duplicate items are added
    if (!this.itemExists(item.product)) {
      this.items.push(item)
    }
    else {
      throw "Item already exists"
    }

  }



  itemExists(item: string): boolean {
    if (this.items.length < 1) {
      return false;
    }
    let exists = false;
    for (let i = 0; i < this.items.length; i++){
      if (this.items[i].product === item) {
        exists = true;
        break;
      }
    }
    return exists;
  }

  removeItem(item: TransactionDetailsObject): void{
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product === item.product) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  setClient(client: Customer): void{
    this.client_address = client.location || '';
    this.client_name = client.name;
    this.client_contact = client.phone;
  }


  // getTotal() {
  //   let sum = 0;
  //   this.items.forEach(i => {
  //     sum += i.quantity * i.price;
  //   });
  //   this.total = sum;
  //   this.tax = this.tax / 100 * this.total
  //   this.discounted_total = sum + this.tax - this.discount;
  //   this.receipt_discount = this.discount - 0;
  //   this.receipt_discounted_total = sum + this.tax_amount - this.discount;

  // }

}
