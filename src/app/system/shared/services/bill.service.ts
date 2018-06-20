import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx"
import { Bill } from "../models/bill.model";

@Injectable()

export class BillService {

    constructor(private http: Http) {

    }


    getBill(): Observable<Bill> {
        return this.http.get(`http://localhost:3000/bill`)
            .map((response) => response.json());
    }

    getCurrency() {
        return this.http.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
            .map((response) => response.json());
    }

    updateBill(bill:Bill): Observable<Bill> {
        return this.http.put(`http://localhost:3000/bill`, bill)
            .map((response) => response.json());
    }

    // getCertainCurrency(currency) {
    //     return this.http.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
    //         .map((response) => {
    //             response.find(cur =>{ 
    //                 if(cur.cc === currency){
    //                     console.log(cur.rate.toFixed(2));
    //                     return cur.rate.toFixed(2);
    //             }
    //         })
    //     });
    //   }
    
}