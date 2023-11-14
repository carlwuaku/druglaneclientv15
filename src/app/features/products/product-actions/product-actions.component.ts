import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductObject } from '../models/productModel';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss']
})
export class ProductActionsComponent implements OnInit {
  public title: string = "";
  public action: string;
  constructor(private ar: ActivatedRoute, private router:Router) {
    this.action = ar.snapshot.params['action'];
  }

  ngOnInit() {
    if (this.action === "edit") {
      this.title = "Edit Product";

    }

  }

  onSelect(args:ProductObject) {
    console.log(args)
    if (this.action === "edit") {
      this.router.navigate([`/products/form/${args.id}`])
    }
  }
}
