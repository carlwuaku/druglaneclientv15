import { Component } from '@angular/core';
import { setDates } from 'src/app/shared/utils/dateHelper';
import { SearchQuery } from 'src/app/shared/utils/types';
import { AuthService } from '../../auth/auth.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  refills: any[] = [];


  constructor(public authService: AuthService, public dbService: HttpService) {

  }

  getRefillCount() {
    let dates = setDates("this_week")
    this.dbService.get<any>(
      "customer/findRefillBetweenDates?start_date=" + dates.startDate + "&end_date=" + dates.endDate).subscribe({
        next: (data) => {
          this.refills = data.data;

        }

      });
  }


}
