export class TransactionDetailsObject {
  id!: string;
  product: string;
  product_name: string;
  quantity: number = 1;
  price: number;
  unit: string;
  label: string;
  code: string = "";
  cost_price: number;
  expiry: string;
  batch_number: string = "";

  total: number = 0;

  constructor(id: string, name: string, quantity: number = 0, price: number, unit: string,
    label: string, cost_price: number, expiry: string) {
    this.product = id;
    this.product_name = name;
    this.quantity = quantity;
    this.price = price;
    this.unit = unit;
    this.label = label;
    this.cost_price = cost_price;
    this.expiry = expiry
  }
}
