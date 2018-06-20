import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user.model"; 

@Injectable()

export class UserService {
    constructor(private http: Http) {

    }

    getUserByEmail(email: string) : Observable<User> {
        return this.http.get(`http://localhost:3000/users?email=${email}`)
            .map((response) => response.json())
            .map((user: User[]) => (user) ? user[0] : undefined); 
    }

    createNewUser(user: User) : Observable<User> {
        return this.http.post('http://localhost:3000/users', user)
            .map((response) => response.json());
    }
}