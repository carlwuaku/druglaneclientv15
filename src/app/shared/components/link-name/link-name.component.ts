import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: 'app-link-name',
  templateUrl: './link-name.component.html',
  styleUrls: ['./link-name.component.scss']
})
export class LinkNameComponent {
  params:any;
  label!: string;

  link!: string;
  id!: string;
  expired!: string;
  near_max!: string;
  near_min!: string;
  out_of_stock!: string;
  deleted!: boolean;
  agInit(params:any): void {
    this.params = params;

    if (params.node.data.product_id != null && params.node.data.product_id != undefined) {
      this.id = this.params.node.data.product_id;
    }
    else {
      this.id = this.params.node.data.id;
    }

    this.label = this.params.node.data.name || null;

    this.expired = this.params.node.data.expired;
    this.near_min = this.params.node.data.near_min;
    this.near_max = this.params.node.data.near_max;
    this.out_of_stock = this.params.node.data.out_of_stock;
    this.deleted = this.params.node.data.status == '0';
  }



  ngOnDestroy() {
    // console.log(`Destroying LinkName Component`);
  }

  refresh(): boolean {
    return false;
  }
}
