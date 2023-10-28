import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleTagManagerService } from "angular-google-tag-manager";
import { AnalyticsService } from "./core/services/analytics/analytics.service";
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { HttpService } from './core/services/http/http.service';
import { API_ADMIN_PATH } from './shared/utils/constants';
import { TitleService } from './core/services/title/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //check the injector for ProductService when implement api call
  providers: [GoogleTagManagerService],
})
export class AppComponent implements OnInit {
  title = 'MDC Management System';
  isLoggedIn: boolean;
  constructor(
    private dbService: HttpService,
    private titleService: TitleService,
  private authService: AuthService) {
    this.isLoggedIn = this.authService.checkLogin("")
  }

  ngOnInit(): void {
    this.dbService.get<any>(`${API_ADMIN_PATH}/getAppName`).subscribe({
      next: (data) => {
        this.titleService.appName.next(data.long_name);
        this.titleService.appShortName.next(data.name)
      },
      error: (error) => {

      }
    })

    // this.analyticsService.startGoogleAnalytics();

    // this.router.events.subscribe((item) => {
    //   if (item instanceof NavigationEnd) {
    //     const gtmTag = { event: 'page', pageName: item.url };
    //     this.gtmService.pushTag(gtmTag).then(() => { }).catch(error => { });
    //   }
    // });
    // this.analyticsService.trackPages(this.router);
  }

}
