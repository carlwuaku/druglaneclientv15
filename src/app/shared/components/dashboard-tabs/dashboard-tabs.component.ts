import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { setDates } from 'src/app/shared/utils/dateHelper';
import { SearchQuery } from 'src/app/shared/utils/types';


@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.scss']
})
export class DashboardTabsComponent {
  can_view_accounts: boolean = false;
  can_view_inventory: boolean = false;
  refills: any[] = [];
  this_month = setDates("this_month");
  next_month = setDates("next_month");
  stockOutQuery: SearchQuery[] = [
    { field: "current_stock", operator: "less_than", param: '1' }];

  public stockOutQueryString: string = JSON.stringify(this.stockOutQuery);

  public expiryThisMonthQuery: SearchQuery[] = [
    { field: "expiry", operator: "dates_between", param: [this.this_month.startDate, this.this_month.endDate] }];

  public nextMonthQuery: SearchQuery[] = [
    { field: "expiry", operator: "dates_between", param: [this.next_month.startDate, this.next_month.endDate] }];

  public expiryThisMonthQueryString: string = JSON.stringify(this.expiryThisMonthQuery);
  public expiryNextMonthQueryString: string = JSON.stringify(this.nextMonthQuery);

  constructor(public authService: AuthService, public dbService: HttpService) {
    this.can_view_accounts = this.authService.currentUser.permissions.indexOf('View Accounts') != -1
    this.can_view_inventory = this.authService.currentUser.permissions.indexOf('View Inventory') != -1
    console.log('next', this.expiryNextMonthQueryString);
    console.log('this', this.expiryThisMonthQueryString)
  }
}
