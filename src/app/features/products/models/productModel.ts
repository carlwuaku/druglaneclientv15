export class ProductObject {
  id!: string;
  name!: string;
  price: any;
  category!: string;
  current_stock: any;
  unit!: string;
  _id!: string;
  picture!: string;
  thumbnail!: string;
  createdAt!: string;
  notes!: string;
  min_stock!: string;
  max_stock!: string;
  expiry!: string;
  barcode!: string;
  link!: string;
  expired!: boolean;
  near_min!: boolean;
  near_max!: boolean;
  product_id: any;
  cost_price: any;
  size: any;
  shelf: any;
  active_ingredients: any = ""
  stock_value: any;
  this_month_quantity: any;
  this_month_amount: any;
  last_month_quantity: any;
  last_month_amount: any;
  description: any;
  related: any;
  batches!: any[];
  preferred_vendor!: string;
  markup: any;
  drug_info: string = "";
  quantity_expired: any;
  quantity_damaged: any;
  constructor() { }
}
