import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component'
import { ProductObject } from '../models/productModel';
@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent {
  public searchFields: string[] = ["name"];
  @Output() onSelect: EventEmitter<ProductObject> = new EventEmitter()
  constructor(private dialog: MatDialog) { }

  public addProduct() {
    this.dialog.open(FormComponent, {
      width: '80vw',
      height: '80vh'
    });
  }

  public selectionMade(args: ProductObject) {
    this.onSelect.emit(args)
  }
}
