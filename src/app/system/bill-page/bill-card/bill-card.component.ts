import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'hm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    this.dollar = +(this.bill.value / this.getSpecificCurrency("USD").rate).toFixed(2);
    this.euro = +(this.bill.value / this.getSpecificCurrency("EUR").rate).toFixed(2);
  }

  getSpecificCurrency(currency) {
    return this.currency.find(cur => cur.cc === currency);
  }
  
}
