import { Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { take } from 'rxjs';
import { DateService } from 'src/app/core/date/date.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { generateUniqueRandomString } from '../../utils/helper';
import { SearchQuery } from '../../utils/types';
import { SelectObjectType } from '../form-generator/form-generator-interface';

@Component({
  selector: 'app-select-object',
  templateUrl: './select-object.component.html',
  styleUrls: ['./select-object.component.scss']
})
export class SelectObjectComponent implements OnInit, OnChanges {
  @Input() url: string = "";
  @Input() labelProperty: string = "name";
  @Input() keyProperty: string = "id";
  @Input() initialValue: string = "";
  /**something to lookup the initial value in case it's an object */
  @Input() initialValueKey: string = "id";
  @Input() type: SelectObjectType = "select";
  @Input() searchFields: string[] = [];
  isLoaded: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  error_message: string = "";
  datalistKey: string = "";

  objects: any[] = []
  selectedItem: any = null
  @Input() timestamp: string = ""
  @Output() selectionChanged = new EventEmitter();

  @Input() selection_mode: "single" | "singles" | "multiple" = "single";
  search_param: string = "";
  @ContentChild('customTemplate') customTemplate?: TemplateRef<any>;
  // @ContentChild('defaultTemplate') defaultTemplate!: TemplateRef<any>;
  constructor(private dbService: HttpService, private dateService: DateService) {
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
    if (this.type === "datalist") {
      this.datalistKey = generateUniqueRandomString(5)
    }

  }
  ngOnInit(): void {
    if (this.customTemplate) {
      console.log('custom')
    }
  }



  getData() {
    this.loading = true;

    this.dbService.get<any>(this.url).pipe(take(1))
      .subscribe({
        next: (data: any) => {
          //console.log(data.records);
          //in some rare cases the data is returned as the result, not in the data prop
          console.log(this.initialValue, this.initialValueKey);
          this.objects = data.data || data;
          if (this.initialValue) {
            if (this.initialValueKey) {
              this.selectedItem = this.objects.find(object => object[this.initialValueKey] === this.initialValue)
            console.log(this.selectedItem)
            }
            else {
              this.selectedItem = this.initialValue
            }

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
    this.selectionChanged.emit(this.selectedItem);
    this.selectedItem = null;
  }

  datalistSelectionMade() {
    if (this.selectedItem) {
      this.selectionChanged.emit(this.selectedItem);
    }
  }


  search(event: AutoCompleteCompleteEvent) {
    if (!event.query) {
      return;
    }
    this.loading = true;
    //create json search payload using the fields
    const payload: SearchQuery[] = [];
    this.searchFields.forEach(field => {
      payload.push({ field: field, operator: 'includes', param: event.query })
    })
    // { field: "current_stock", operator: "less_than_or_equal", param: 'min_stock' }
    const queryOperator = this.url.includes("?") ? "&" : "?"
    const searchUrl = this.url + `${queryOperator}param=${JSON.stringify(payload)}`
    this.dbService.get<any>(searchUrl).pipe(take(1))
      .subscribe({
        next: (data: any) => {
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
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
