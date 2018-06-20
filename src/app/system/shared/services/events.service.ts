import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { HMEvent } from "../models/event.model";

@Injectable()

export class EventService {

    constructor(private http: Http) {

    }

    addEvent(event: HMEvent): Observable<HMEvent> {
        return this.http.post(`http://localhost:3000/events`, event)
            .map((response) => response.json());
    }

    getEvents(): Observable<HMEvent[]> {
        return this.http.get(`http://localhost:3000/events`)
            .map((response) => response.json());    
    }

}