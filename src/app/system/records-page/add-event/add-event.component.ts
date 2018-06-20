import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { HMEvent } from '../../shared/models/event.model';
import { EventService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'hm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];

  types = [
    {type: "income", label: 'Доход'},
    {type: "outcome", label: 'Расход'}
  ];

  defaultRadio: string = 'outcome';

  constructor(private eventService: EventService, private billService: BillService) { }

  ngOnInit() {

  }
  onChangeValue() {
    (this.defaultRadio === 'outcome') ? this.defaultRadio = 'income' : this.defaultRadio = 'outcome';
  }


  onSubmit(form: NgForm) {
    let {amount, category, type} = form.value;
    if(amount < 0) amount *= -1;

    const event = new HMEvent(
      type, amount, +category
    );
    this.billService.getBill().subscribe((bill: Bill) => {
      let value: number = 0;
      if(type === 'outcome') {
        if(amount > bill.value) {
          //error
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      } 

      this.billService.updateBill({value, currency: bill.currency})
        .mergeMap(() => this.eventService.addEvent(event))
        .subscribe(() => {
          form.setValue({
            amount: 0,
            category: 1,
            type: 'outcome'
          })
        })
    });
    // this.eventService.addEvent(event)
  }
}
