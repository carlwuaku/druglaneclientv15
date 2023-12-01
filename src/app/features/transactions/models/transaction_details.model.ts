import { ProductObject } from "../../products/models/productModel";

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
  current_stock: number;
  related: ProductObject[] = []
  expired: boolean = false;
  refill_date: string = "";

  constructor(id: string, name: string, quantity: number = 0, price: number, unit: string,
    label: string, cost_price: number, expiry: string, current_stock: number) {
    this.product = id;
    this.product_name = name;
    this.quantity = quantity;
    this.price = price;
    this.unit = unit;
    this.label = label;
    this.cost_price = cost_price;
    this.expiry = expiry;
    this.current_stock = 0;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    this.quantity--;
  }

  removeRefill() {
    this.refill_date = "";
  }
}
