import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { NotifyService } from 'src/app/core/services/notify/notify.service';
import { extractKeys, getLabelFromKey } from '../../utils/helper';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnChanges{
  @Input() object: any;
  @Input() exclusion_keys: string[] = ["_id", "picture", "thumbnail", "__v"];
  @Input() url: string = "";
  error: boolean = false
  loading: boolean = true;
  isLoaded: boolean = false;
  new_picture: string = "";
  errorMessage: string = "";
  can_edit: boolean = true;
  @Input() keyLabels:{key:string, label:string}[] = []

  constructor(private dbService: HttpService) {


  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.object) {
      this.getData();
    }
    else {
      this.prepData();
    }
  }

  ngOnInit() {

  }

  getData() {
    this.loading = true;

    this.dbService.get<any>(this.url).pipe(take(1))
      .subscribe({
        next: (data: any) => {
          //console.log(data.records);
          //in some rare cases the data is returned as the result, not in the data prop
          this.object = data.data || data;
          this.prepData();
          this.isLoaded = true;
          this.error = false;
          this.loading = false;
        },
        error: (err) => {
          this.error = true;
          this.isLoaded = false;
          this.errorMessage = err;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }



  prepData() {

    if (this.keyLabels.length < 1) {

      // console.log(this.objects)
      //extract the keys
      let keys = extractKeys(this.object, this.exclusion_keys);
      keys.forEach(key => {
        let label = getLabelFromKey(key);
        this.keyLabels.push(
          { label: label, key: key },

        )


      });

    }
  }
}
