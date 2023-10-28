import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { take, takeUntil } from 'rxjs';
import { DateService } from 'src/app/core/date/date.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { API_ADMIN_PATH } from '../../utils/constants';
import { generateUniqueRandomString } from '../../utils/helper';
import { SelectObjectType } from '../form-generator/form-generator-interface';

@Component({
  selector: 'app-select-object',
  templateUrl: './select-object.component.html',
  styleUrls: ['./select-object.component.scss']
})
export class SelectObjectComponent implements OnInit, OnChanges{
  @Input() url: string = "";
  @Input() labelProperty: string = "name";
  @Input() keyProperty: string = "id";
  @Input() initialValue: string = "";
  @Input() type: SelectObjectType = "select";
  isLoaded: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  error_message: string = "";
  datalistKey: string = generateUniqueRandomString(5);

  objects: any[] = []
  selectedItem: string = ""
  @Input() timestamp: string = ""
  @Output() selectionChanged = new EventEmitter();

  @Input() selection_mode: "single" | "singles" | "multiple" = "single";
  search_param: string = "";


  constructor(private dbService: HttpService, private dateService:DateService) {
    console.log(this.datalistKey)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.type !== "search") {
      if (
        changes['url'] ||
        changes['module'] ||
        changes['type'] ||
        changes['timestamp']
      ) {
        this.getData();
      }
    }

  }
  ngOnInit(): void {
  }



  getData() {
    this.loading = true;

    this.dbService.get<any>(this.url).pipe(take(1))
      .subscribe({
        next: (data: any) => {
          //console.log(data.records);
          //in some rare cases the data is returned as the result, not in the data prop
          this.objects = data.data || data;
          if (this.initialValue) {
            this.selectedItem = this.initialValue
          }
          this.isLoaded = true;
            this.error = false;
          this.loading = false;
        },
        error: (err) => {
          this.error = true;
          this.isLoaded = false;
          this.error_message = err;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  selectionMade() {
    if (this.selectedItem) {
      const selected = this.objects.find((value) => value[this.keyProperty] === this.selectedItem);
      this.selectionChanged.emit(selected);
    }

  }

  datalistSelectionMade() {
    if (this.selectedItem) {
      this.selectionChanged.emit(this.selectedItem);
    }
  }


  search(event: AutoCompleteCompleteEvent) {
    this.loading = true;
    const searchUrl = this.url
    this.dbService.get<any>(this.url).pipe(take(1))
      .subscribe({
        next: (data: any) => {
          //in some rare cases the data is returned as the result, not in the data prop
          this.objects = data.data || data;
          if (this.initialValue) {
            this.selectedItem = this.initialValue
          }
          if (this.objects.length === 1) {
            this.selectionChanged.emit(this.objects[0])
          }
          this.isLoaded = true;
          this.error = false;
          this.loading = false;
        },
        error: (err) => {
          this.error = true;
          this.isLoaded = false;
          this.error_message = err;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
