import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'hm-bill-currency',
  templateUrl: './bill-currency.component.html',
  styleUrls: ['./bill-currency.component.scss']
})
export class BillCurrencyComponent implements OnInit {

  @Input() currency: any;
  
  currentDate: Date = new Date();
  dollar: any;
  euro: any;

  constructor() { }


  getSpecificCurrency(currency) {
    return this.currency.find(cur => cur.cc === currency);
  }

  ngOnInit() {
      this.dollar = this.getSpecificCurrency('USD');
      this.euro = this.getSpecificCurrency('EUR'); 
  }

}
