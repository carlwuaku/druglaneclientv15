import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PERMISSION_VIEW_INVENTORY } from 'src/app/core/models/permissions';
import { HttpService } from 'src/app/core/services/http/http.service';
import { NotifyService } from 'src/app/core/services/notify/notify.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  id: string = "";
  url: string = "";
  keyLabels: { key: string, label: string }[] = [
    {label: "Name", key: "name"},
    { label: "Category", key: "category"},
    { label: "Current Stock", key: "stock"},
    { label: "Selling Price", key: "price"},
    { label: "Unit", key: "unit"},
    { label: "Cost Price", key: "cost_price"},
    { label: "Expiry Date", key: "expiry"},
    { label: "Notes", key: "notes"},
    { label: "Size", key: "size"},
    { label: "Shelf/Location", key: "shelf"},
    { label: "Active Ingredients", key: "active_ingredients"},
    { label: "Drug Information", key: "drug_info"},
    { label: "Barcode", key: "barcode"},
  ]
  constructor(ar: ActivatedRoute, private dbService: HttpService,
    private notify: NotifyService, private authService: AuthService) {
    this.authService.checkPermission(PERMISSION_VIEW_INVENTORY);

    this.id = ar.snapshot.params['id'];
    this.url = "product/product/"+this.id
  }
}
