import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TitleService } from 'src/app/core/services/title/title.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  current_url: string = "/dashboard";
  is_connected: boolean = false;
  menu_items = [
    {
      title: "Dashboard",
      has_children: false,
      admin_available: true,
      url: "/dashboard",
      icon: "fa fa-home",
      children: []
    },

    {
      title: "Sales",
      has_children: true,
      active_children: false,
      admin_available: true,

      url: "",
      icon: "fa fa-print",
      children: [
        {
          title: "Start Sales",
          url: "/transactions/start",
          admin_available: false,

        },
        {
          title: "Sales History",
          admin_available: true,

          url: "/sales"
        },
        {
          title: "Sales Reports",
          admin_available: true,

          url: "/sales_statistics"
        },
        {
          title: "End Of Day",
          admin_available: true,

          url: "/sales_reports"
        },
        {
          title: "Payment Reports",
          admin_available: true,

          url: "/payments"
        },
        {
          title: "Receive Credit Payment",
          admin_available: false,

          url: "/receive_payment"
        },
        {
          title: "View Arrears",
          admin_available: false,

          url: "/arrears"
        },
        {
          title: "View Credit Payment History",
          admin_available: false,

          url: "/incomingPaymentHistory"
        }
      ]
    },
    {
      title: "Inventory",
      has_children: true,
      admin_available: true,

      active_children: false,
      url: "",
      icon: "fa fa-database",
      children: [
        {
          title: "Add New Product",
          admin_available: false,

          url: "/products/form"
        },
        {
          title: "Edit Products",
          admin_available: false,

          url: "/products/actions/edit"
        },
        {
          title: "View/Search Inventory",
          admin_available: true,

          url: "/products"
        },
        {
          title: "View Product History",
          admin_available: true,

          url: "/product_history"
        }, {
          title: "View Product Consumption",
          admin_available: true,

          url: "/product_consumption"
        },
        {
          title: "Stock Value Report",
          admin_available: true,

          url: "/stock_report"
        },
        {
          title: "View Expired Items",
          admin_available: true,

          url: "/expiry/all"
        },
        {
          title: "View Out-Of-Stock",
          admin_available: true,

          url: "/stockout"
        },
        {
          title: "Near Maximum Stock",
          admin_available: true,

          url: "/near_max"
        }
        ,
        {
          title: "Near Minimum Stock",
          admin_available: true,

          url: "/near_min"
        },
        {
          title: "Duplicates",
          admin_available: true,

          url: "/db_issues"
        },
        {
          title: "Upload Product List",
          admin_available: false,

          url: "/stock_taking_upload"
        }
      ]
    },
    {
      title: "Accounts",
      has_children: true,
      admin_available: true,

      active_children: false,
      url: "",
      icon: "fa fa-dollar",
      children: [
        {
          title: "Add Expense",
          admin_available: false,

          url: "/add_expense"
        },
        {
          title: "Expense History",
          admin_available: true,

          url: "/expense_history"
        },
        {
          title: "Accounts Report",
          admin_available: true,

          url: "/account_report"
        }
      ]
    },
    {
      title: "Stock Adjustment",
      has_children: true,
      admin_available: false,

      active_children: false,
      url: "",
      icon: "fa fa-refresh",
      children: [
        {
          title: "Start Stock Taking",
          admin_available: false,

          url: "/stockTaking"
        },

        {
          title: "Remote Client Stock",
          admin_available: false,

          url: "/client_stock"
        },
        {
          title: "Stock Adj. Report-Session",
          admin_available: true,

          url: "/stockSessionReport"
        },
        {
          title: "Stock Adj. Report - Date",
          admin_available: true,

          url: "/stockAdjustmentReport"
        }
      ]
    }
    ,
    {
      title: "Diagnostics",
      has_children: true,
      active_children: false,
      url: "",
      icon: "fa fa-stethoscope",
      children: [
        {
          title: "Add New Result",
          admin_available: false,

          url: "/diagnostics"
        },
        {
          title: "View Diagnostics By Date",
          admin_available: true,

          url: "/viewDiagnostics"
        },
        {
          title: "View Diagnostics By Client",
          admin_available: true,

          url: "/viewclientdiagnostics"
        }
      ]
    },//diagnostics
    {
      title: "Customers",
      has_children: true,
      admin_available: true,

      active_children: false,
      url: "",
      icon: "fa fa-users",
      children: [
        {
          title: "Add Customer",
          admin_available: false,

          url: "/customers/form"
        },
        {
          title: "View/Manage Customers",
          admin_available: true,

          url: "/customers"
        },
        {
          title: "Refills",
          admin_available: true,

          url: "/refills"
        }
      ]
    },
    {
      title: "Purchases",
      has_children: true,
      admin_available: true,

      active_children: false,
      url: "",
      icon: "fa fa-truck",
      children: [
        {
          title: "Add Purchases",
          admin_available: false,

          url: "/add_purchase"
        },
        // {
        //   title: "Remote Purchases",
        //   admin_available: true,

        //   url: "/remote_purchase"
        // },
        {
          title: "Purchase History",
          admin_available: true,

          url: "/purchases"
        },


        {
          title: "Manage Vendors",
          admin_available: true,

          url: "/vendors"
        },
        {
          title: "Make Payment",
          admin_available: false,

          url: "/add_purchase_payment"
        },
        {
          title: "Payment History",
          admin_available: true,

          url: "/purchase_payment_history"
        }
      ]
    },
    {
      title: "Transfers",
      has_children: true,
      admin_available: false,

      active_children: false,
      url: "",
      icon: "fa fa-motorcycle",
      children: [
        {
          title: "Transfer Items",
          admin_available: false,

          url: "/add_transfer"
        },
        {
          title: "Receive Transfers",
          admin_available: false,

          url: "/receiveTransfersOffline"
        },
        {
          title: "Incoming Transfer History",
          admin_available: true,

          url: "/transfers"
        },
        {
          title: "Outgoing Transfer History",
          admin_available: true,

          url: "/outgoing_transfers"
        }
      ]
    },
    {
      title: "User Management",
      has_children: true,
      admin_available: false,

      active_children: false,
      url: "",
      icon: "fa fa-cogs",
      children: [
        {
          title: "New User",
          admin_available: false,

          url: "/add_user"
        },
        {
          title: "Manage Users",
          admin_available: true,

          url: "/users"
        },
        {
          title: "Manage User Permissions",
          admin_available: false,

          url: "/roles"
        },
        {
          title: "View User Activities",
          admin_available: true,

          url: "/view_activities"
        }
      ]
    }
  ]
  appName: string = "";
  constructor(private socket: Socket, public authService: AuthService, public titleService: TitleService) {
    this.socket.on('connect', () => {
      this.is_connected = true;
    });
    this.socket.on('disconnect', () => {
      this.is_connected = false;
    });

    this.titleService.appShortName.subscribe(data => {
      this.appName = data;
    })
  }
}
