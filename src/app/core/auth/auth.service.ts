import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { API_ADMIN_PATH, LOCAL_USER_ID, LOCAL_USER_KEY } from "src/app/shared/utils/constants";
import { User } from "../models/user.model";
import { HttpService } from "../services/http/http.service";
import { NotifyService } from "../services/notify/notify.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = new User();
  isLoggedIn$: Subject<boolean> = new Subject();
  constructor(private dbService: HttpService, private router: Router, private notifyService: NotifyService) {

  }

  /**
   * hasPermission
   */
  public hasPermission(permission: string): boolean {
    return this.currentUser.permissions.includes(permission);
  }

  public checkPermission(permission: string): void {
    if (!this.hasPermission(permission)) {
      this.goBackHome();
    }
  }
  public goBackHome() {
    this.notifyService.failNotification("Not permitted to view that page")
    this.router.navigate(['/']);

  }



  public logout(): void {
    localStorage.removeItem(LOCAL_USER_ID);
    localStorage.removeItem(LOCAL_USER_KEY);
  }


  setCookie(cname: string, cvalue: string) {
    localStorage.setItem(cname, cvalue);

  }

  checkLogin(url: string): boolean {
    const user = this.getCookie(LOCAL_USER_KEY);
    if (user) {
      this.currentUser = JSON.parse(user);

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  getCookie(cname: string) {
    return localStorage.getItem(cname);
  }

}
