import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { NotifyService } from 'src/app/core/services/notify/notify.service';
import { ProductObject } from '../models/productModel';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  object: ProductObject;
  id: string | undefined = undefined;
  error: boolean = false;
  is_loading: boolean = true;
  is_loaded: boolean = false;
  @Output() onFinish = new EventEmitter();
  units: any[] = ['ampoule', 'bottle', 'box', 'capsule', "carton", 'glove', "inhaler", 'pack', 'pessary',
    'piece', 'roll', 'strip', "suppository", 'syringe', 'tablet', 'tube', 'vial'];
  unit_selected: string = ""
  category_selected: string = ""
  pic_location: string | undefined = undefined;
  uploadUrl: string = 'admin/uploadPicture';
  can_master_edit: boolean = true;
  can_edit: boolean = true;

  change_stock: boolean = false;
  change_unit: boolean = false;
  new_unit: string | undefined = undefined;
  conversion_quantity_current: number | undefined = undefined;
  conversion_quantity_new = 1
  adjusted_stock: number | undefined = undefined;
  adjusted_price: number | undefined = undefined;
  markup: any = 1.33
  adjusted_cost_price: number | undefined = undefined;
  is_pharmacy = true;
  selected_active_ingredients: string[] = []

  constructor(ar: ActivatedRoute,
    private dbService: HttpService, private socket: Socket,
    private notify: NotifyService) {
    this.object = new ProductObject();
    this.id = ar.snapshot.params['id'];
      console.log(this.id)

  }

  ngOnInit() {
    if (this.id) {
      this.getobject();
    }

  }

  ngOnChanges() {

  }




  getobject() {
    this.dbService.get<ProductObject>(`product/product/${this.id}`).subscribe({
      next: data => {
        //console.log(data.records);
        this.object = data;
        this.unit_selected = this.object.unit
        this.pic_location = this.object.picture

        if (this.object.picture != undefined) {
          //get the name of the file since the picture property only takes that and not the
          //whole path
          var picname = this.object.picture.split("/");
          //picnmame shd be an array of the various pieces of the path
          this.object.picture = picname.pop() || "";


        }


        this.is_loading = false;
        this.is_loaded = true;
        this.error = false;
      },
      error: error => {
        this.is_loading = false;
        this.error = true;
        this.is_loaded = false;
      }});
  }






  groupSelected(args:any) {
    this.object.description = args;
  }
  submit() {

    try {

      let data:{[key:string]: any} = {...this.object}


      data["change_stock"] = this.change_stock ? "yes" : "no";
      data["change_unit"] = this.change_unit ? "yes" : "no";
      data["new_unit"] = this.new_unit;

      // data.append("new_active_ingredients", active_ingredients.join("|||"))

      this.dbService.post<ProductObject>("product", data).subscribe({
        next: (response) => {
        // console.log(data);
        this.notify.hideLoading();

            if (this.id == undefined || this.id == null) {
            this.object.id = response.id;
          }

          this.notify.successNotification("Product saved successfully");
          this.socket.emit('product_update',{
            "message": `Product update received:  ${response.name}`,
            "product": this.object,
            "event": "product_update"
          })
          this.onFinish.emit(response)
          this.object = new ProductObject();



    },
    error: error => {
        this.notify.hideLoading();
        this.notify.noConnectionNotification();
        // console.log(error);

      }});
    } catch (error:any) {
      this.notify.failNotification(error)
    }
  }

  vendorSelected(args:any) {
    this.object.preferred_vendor = args.id;
  }

  categorySelected(args: any) {
    this.object.category = args;
  }





  unitConverter() {
    if (!this.conversion_quantity_current) {
      this.notify.failNotification("Conversion quantity is not set");
      return;
    }
    this.adjusted_stock = (this.conversion_quantity_new * this.object.current_stock) / this.conversion_quantity_current
    this.adjusted_price = (this.conversion_quantity_current * this.object.price) / this.conversion_quantity_new
    if (!this.object.cost_price || this.object.cost_price === 0) {
      this.object.cost_price = (this.object.price / this.object.markup).toFixed(2);

    }
    else {
      this.adjusted_cost_price = (this.conversion_quantity_current * this.object.cost_price) / this.conversion_quantity_new

    }

  }

  setSellingPrice() {

    if (this.object.markup && this.object.cost_price) {
      this.object.price = (this.object.cost_price * this.object.markup).toFixed(2)

    }
  }

  setMarkup() {
    if (this.object.price && this.object.cost_price) {

      this.object.markup = (this.object.price / parseFloat(this.object.cost_price)).toFixed(2);
    }
  }

  applyAdjusted() {
    this.object.current_stock = this.adjusted_stock;
    this.object.price = this.adjusted_price
    this.object.cost_price = this.adjusted_cost_price
    this.change_stock = true;
  }
}
