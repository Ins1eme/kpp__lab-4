import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;
  constructor (
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email' : new FormControl(null, [Validators.email, Validators.required]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
 
  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    },5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if(user) {
          if(user.password === formData.password) {
            this.message.text = '';
            this.authService.login();
            window.localStorage.setItem('user', JSON.stringify(user))
            this.router.navigate(['./system/bill']);
          } else {
            this.showMessage('Пароль не верный');
          }
        } else {
          this.showMessage('Такого пользователя не существует')
        }
      }, 
      (error) => {
        console.log(error);
      })
  }

}
