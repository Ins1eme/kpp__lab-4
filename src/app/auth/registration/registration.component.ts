import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'hm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(null, [Validators.requiredTrue])
    })
  }

  onSubmit() {
    const {email,password,name} = this.form.value;
    const user = new User(email,password,name);
    console.log(user);
    this.userService.createNewUser(user) 
      .subscribe((user: User) => {
        console.log(user);
        this.router.navigate(['login/'])
      });
  }


  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if(user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        })
    })
  }

}
