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
}
