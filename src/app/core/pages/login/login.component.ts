import { Component, OnInit } from '@angular/core';
import { catchError, take } from 'rxjs';
import { API_ADMIN_PATH, LOCAL_USER_ID, LOCAL_USER_KEY, LOGIN_FLASH_MESSSAGE } from 'src/app/shared/utils/constants';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../models/user.model';
import { HttpService } from '../../services/http/http.service';
import { TitleService } from '../../services/title/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string = "";
  username!: string;
  password!: string;
  error: boolean = false;
  error_message: string = "";
  user!:IUser;
  loading: boolean = false;
  flash_message: string | null = "";
  appName = "Druglane POS Management System";


  constructor(public authService: AuthService,
    private dbService: HttpService, private titleService: TitleService) {
    // this.dbService.setTitle("Login");

  }

  ngOnInit() {
    this.authService.logout();
    this.flash_message = localStorage.getItem(LOGIN_FLASH_MESSSAGE)
    if (this.flash_message != null) {
      localStorage.removeItem(LOGIN_FLASH_MESSSAGE);
    }
    this.titleService.appName.subscribe(data => {
      this.appName = data;
    })

  }



  login() {
    this.loading = true;
    this.error = false;

    let data = {
      'username': this.username,
    'password': this.password
  }
    this.dbService.post<any>(`${API_ADMIN_PATH}/login`, data)
      .pipe(take(1))
      .subscribe({next: (data:any) => {
        this.authService.currentUser = data;

        this.authService.setCookie(LOCAL_USER_ID, data.id);

        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
        window.location.assign('/');

      },
      error: (err) => {
        this.loading = false;
        this.error = true;
        this.error_message = "Wrong combination. Try again";

      },});
  }

  logout() {
    this.authService.logout();
  }

  forgotPassword() {
    let input = window.prompt("Enter your username. If you have forgotten your username please contact the Registration Unit for assistance");

    if (input) {
      const reg = input.trim();
      let data = new FormData();
      data.append("username", reg)
      this.dbService.post < { message: string }>("send_reset_password_link_email",data).subscribe(data => {
        alert(data.message);


      });
    }
  }
}
