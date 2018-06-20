import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { Bill } from '../shared/models/bill.model';
import { HMEvent } from '../shared/models/event.model';

@Component({
  selector: 'hm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy{

  isLoaded: boolean = false;
  bill: Bill;
  categories: Category[] = [];
  events: HMEvent[] = [];
  recordsData: Subscription;

  constructor(
    private billService: BillService,
    private caregoriesService: CategoriesService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.recordsData = Observable.combineLatest(
      this.billService.getBill(),
      this.caregoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    })
  }

  ngOnDestroy() {
    this.recordsData.unsubscribe();
  }
  

  getCategoryCost(category: Category): number {
    const categoryEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome')
    return categoryEvents.reduce( (total, e) => {
      debugger;
      total += e.amount;
      return total
    },0);
  }

  setProcent(category: Category):string {
    const procent =  this.getCategoryCost(category) * 100 / category.capacity;
    return procent + '%';
  }


}
