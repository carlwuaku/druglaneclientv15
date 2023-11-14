export class TransactionPaymentObject {
  id!: string;
  payment_date: string = "";
  amount: number = 0;
  code: string = "";
  payer: string = "";
  payment_method: string = "";
  notes: string = "";
  created_by: string = "";
  created_on: string = "";

  constructor() { }
}
