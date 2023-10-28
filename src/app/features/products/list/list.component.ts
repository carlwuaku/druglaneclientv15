import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  columnDefs = [
    {
      headerName: '#',
      valueGetter: "node.rowIndex + 1",
      width: 80,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: 'Menu',
      sortable: true, cellClass: 'bordered',
      cellRenderer: 'DataListMenuButtonComponent',
      cellRendererParams: (params: ICellRendererParams) => ({
        actions: [
          { label: "View", type: "link", link: `products/details/${params.data.id}` },
          { label: "Edit", type: "link", link: `products/form/${params.data.id}` },
          // { label: "Delete", type: "button", onClick: () => { this.delete(params.data.id) } },
        ]
      }),
      filter: true
    },
    {
      headerName: 'Product',
      field: 'name',
      cellRenderer: "LinkNameComponent",

      sortable: true, filter: true, cellClass: 'bordered'
    },
    { headerName: 'Price', field: 'price', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Closest Expiry', field: 'expiry', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Current Stock', field: 'stock', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Current Stock Value', field: 'stock_value', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Unit', field: 'unit', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Category', field: 'category', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Markup', field: 'markup', sortable: true, filter: true, cellClass: 'bordered' },

    { headerName: 'Shelf', field: 'shelf', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Functional Group', field: 'description', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Active Ingredients', field: 'active_ingredients', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Drug Info', field: 'drug_info', sortable: true, filter: true, cellClass: 'bordered' },

    { headerName: 'Min Stock', field: 'min_stock', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Max Stock', field: 'max_stock', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Barcode', field: 'barcode', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Preferred Vendor', field: 'preferred_vendor_name', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Top Vendor', field: 'highest_vendor_name', sortable: true, filter: true, cellClass: 'bordered' },

    // {headerName: 'Sold This Month', field: 'this_month_quantity', sortable: true, filter: true, cellClass: 'bordered'},
    { headerName: 'Total Amt. Sold', field: 'total_amount_sold', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Total Qtt. Sold', field: 'total_quantity_sold', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Total Amt. Sold Last 6 Months', field: 'six_months_amount_sold', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Total Qtt. Sold Last 6 Months', field: 'six_months_quantity_sold', sortable: true, filter: true, cellClass: 'bordered' },



  ];
}
