import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-api-count',
  templateUrl: './api-count.component.html',
  styleUrls: ['./api-count.component.scss']
})
export class ApiCountComponent implements OnInit {
  @Input() url: string = '';
  @Input() module: string = '';
  count: any = '...';
  loading: boolean = false;
  // the name of the property containing the data from the api
  @Input() property: string = 'count';
  //a type provided for use with the commonly used urls below
  @Input() type: string = '';
  constructor(private httpService: HttpService) {

  }

  ngOnInit(): void {
    this.getCount();
  }

  getCount(): void {
    this.loading = true;

    this.httpService.get<any>(this.url || this.commonUrls[this.type]).pipe(take(1)).subscribe(data => {
      this.loading = false;
      this.count = data
    })
  }

  //list of common urls that can be reused by specifying the type
  commonUrls: { [key: string]: any } =
    {
    }



}
