import { NgModule } from '@angular/core';
import { PrimeNgUiComponentsModule } from './prime-ng-ui-components/prime-ng-ui-components.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoxamDatePipe } from './pipes/date/loxam-date.pipe';
import { RemoteDataModule } from 'ngx-remotedata';
import { ClipboardCopyDirective } from "./directives/clipboard-copy.directive";
import { TranslateModule } from "@ngx-translate/core";
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { PreviousUrlDirective } from './directives/previous-url.directive';
import { RefreshPageDirective } from './directives/refresh-page.directive';
import { AssetImageComponent } from './components/asset-image/asset-image.component';
import { LvisUTCDatePipe } from './pipes/date/lvis-utc-date.pipe';
import { ApiCountComponent } from './components/api-count/api-count.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LogoComponent } from './components/logo/logo.component';
import { LoadDataListComponent } from './components/load-data-list/load-data-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { ExportTableComponent } from './components/export-table/export-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { JsonDisplayComponent } from './components/json-display/json-display.component';
import { ArrayLinksComponent } from './components/array-links/array-links.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PrepMessagingComponent } from './components/prep-messaging/prep-messaging.component';
import { LinkNameComponent } from './components/link-name/link-name.component';
import { SelectObjectComponent } from './components/select-object/select-object.component';
import { DataListMenuButtonComponent } from './components/data-list-menu-button/data-list-menu-button.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { DetailsComponent } from './components/details/details.component';
import { DashboardTabsComponent } from './components/dashboard-tabs/dashboard-tabs.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    LoxamDatePipe,
    ClipboardCopyDirective,
    DialogComponent,
    PreviousUrlDirective,
    RefreshPageDirective,
    AssetImageComponent,
    LvisUTCDatePipe,
    ApiCountComponent,
    LoadingComponent,
    LogoComponent,
    LoadDataListComponent,
    ExportTableComponent,
    PaginationComponent,
    JsonDisplayComponent,
    ArrayLinksComponent,
    SidebarComponent,
    PrepMessagingComponent,
    LinkNameComponent,
    SelectObjectComponent,
    DataListMenuButtonComponent,
    FormGeneratorComponent,
    DetailsComponent,
    DashboardTabsComponent,
    FormDialogComponent
  ],
  imports: [
    PrimeNgUiComponentsModule,
    RemoteDataModule,
    TranslateModule,
    DialogModule,
    MaterialComponentsModule,
    AgGridModule,
    ReactiveFormsModule
  ],
  exports: [
    PrimeNgUiComponentsModule,
    NavbarComponent,
    TranslateModule,
    MaterialComponentsModule,
    ClipboardCopyDirective,
    LoxamDatePipe,
    DialogComponent,
    PreviousUrlDirective,
    RefreshPageDirective,
    AssetImageComponent,
    LvisUTCDatePipe,
    AgGridModule,
    ExportTableComponent,
    PaginationComponent,
    JsonDisplayComponent,
    ArrayLinksComponent,
    LoadingComponent,
    LogoComponent,
    SidebarComponent,
    ApiCountComponent,
    PrepMessagingComponent,
    LoadDataListComponent,
    SelectObjectComponent,
    FormGeneratorComponent,
    DetailsComponent,
    DashboardTabsComponent,
    FormDialogComponent,
    ReactiveFormsModule
  ],
  providers: [
    ClipboardCopyDirective
  ]
})
export class SharedModule {}
