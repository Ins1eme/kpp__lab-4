import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { SystemRoutingModule } from "./system-routing.module";
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemComponent } from "./system.component";
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from "./shared/directives/dropdown.directive";
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { BillCurrencyComponent } from './bill-page/bill-currency/bill-currency.component';
import { HttpModule } from "@angular/http";
import { BillService } from "./shared/services/bill.service";
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { CategoriesService } from "./shared/services/categories.service";
import { EventService } from "./shared/services/events.service";

@NgModule({
    imports: [
        CommonModule, 
        SharedModule,
        SystemRoutingModule,
        HttpModule
    ],
    declarations: [
        BillPageComponent, 
        HistoryPageComponent, 
        PlanningPageComponent, 
        RecordsPageComponent,
        SystemComponent,
        SidebarComponent,
        HeaderComponent,
        DropdownDirective,
        BillCardComponent,
        BillCurrencyComponent,
        AddEventComponent,
        AddCategoryComponent,
        EditCategoryComponent
    ],
    providers: [ 
        BillService, 
        CategoriesService,
        EventService
    ]
})

export class SystemModule {}