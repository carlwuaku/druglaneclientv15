import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SearchQuery } from 'src/app/shared/utils/types';
import { FormComponent } from '../form/form.component'
import { ProductObject } from '../models/productModel';
@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent {
  public searchFields: string[] = ["name"];
  @Output() onSelect: EventEmitter<ProductObject> = new EventEmitter();
  isLoaded: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  error_message: string = "";
  objects: ProductObject[] = []
  selectedItem: any = null
  constructor(private dialog: MatDialog, private dbService: HttpService) { }

  public addProduct() {
    this.dialog.open(FormComponent, {
      width: '80vw',
      height: '80vh'
    });
  }

  public selectionMade(args: ProductObject) {
    this.onSelect.emit(args);
    this.selectedItem = null;
  }

  search(event: AutoCompleteCompleteEvent) {
    // if (!event.query) {
    //   return;
    // }
    this.loading = true;
    //create json search payload using the fields
    const payload: SearchQuery[] = [];
    this.searchFields.forEach(field => {
      payload.push({ field: field, operator: 'includes', param: event.query })
    })
    // { field: "current_stock", operator: "less_than_or_equal", param: 'min_stock' }
    const searchUrl = `product?param=${JSON.stringify(payload)}`
    this.dbService.get<any>(searchUrl).pipe(take(1))
      .subscribe({
        next: (data: any) => {
          //in some rare cases the data is returned as the result, not in the data prop
          this.objects = data.data || data;

          this.isLoaded = true;
          this.error = false;
          this.loading = false;
        },
        error: (err) => {
          this.error = true;
          this.isLoaded = false;
          this.error_message = err;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
