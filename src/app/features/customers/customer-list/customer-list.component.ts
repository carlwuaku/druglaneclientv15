import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
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
          { label: "View", type: "link", link: `customers/details/${params.data.id}` },
          { label: "Edit", type: "link", link: `customers/form/${params.data.id}` },
          // { label: "Delete", type: "button", onClick: () => { this.delete(params.data.id) } },
        ]
      }),
      filter: true
    },
    {
      headerName: 'Name',
      field: 'name',
      cellRenderer: "LinkNameComponent",

      sortable: true, filter: true, cellClass: 'bordered'
    },
    {
      headerName: 'Type',
      field: 'type',
      sortable: true, filter: true, cellClass: 'bordered'
    },
    {
      headerName: 'Location',
      field: 'location',
      sortable: true, filter: true, cellClass: 'bordered'
    },

    { headerName: 'Phone', field: 'phone', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Email', field: 'email', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Total Credit', field: 'total_credit', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Total Paid', field: 'total_paid', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Balance', field: 'balance', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Category', field: 'category', sortable: true, filter: true, cellClass: 'bordered' },
    { headerName: 'Created on', field: 'created_on', sortable: true, filter: true, cellClass: 'bordered' },


  ];

  rowClassRules = {
    warning: 'data.type == "Company"',
    danger: 'data.expired && data.stock > 0',
  };
}
