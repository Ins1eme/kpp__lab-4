import { Component, OnInit } from '@angular/core';
import {Observable } from 'rxjs/Rx';
import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'hm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  constructor(private billService: BillService) { }
 
  bill: Bill;
  currency: any;
  isLoad: boolean = false;
  ngOnInit() {
    Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe(data => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoad = true;
    })

  }

}
