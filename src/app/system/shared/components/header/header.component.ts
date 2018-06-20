import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date | Observable<Date> = new Date();
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.date = new Observable((observer) => {
        setInterval(() => {
            observer.next(new Date());
        }, 1000)
    })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
