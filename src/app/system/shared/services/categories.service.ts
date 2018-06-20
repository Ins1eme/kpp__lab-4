import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";
import { Observable } from "rxjs/Rx"
import { Http } from "@angular/http";

@Injectable()

export class CategoriesService {

    constructor(private http: Http) {

    }
        
    addCategory(category: Category): Observable<Category> {
        return this.http.post(`http://localhost:3000/categories`, category)
            .map(response => response.json());
    }

    getCategories():Observable<Category[]> {
        return this.http.get(`http://localhost:3000/categories`)
            .map((response) => response.json());
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.put(`http://localhost:3000/categories/${category.id}`, category)
            .map((response) => response.json());
    }
}