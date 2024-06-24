import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoginView: boolean = true;

  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: '',
  };

  userLogin: any = {
    userName: '',
    password: '',
  };

  registerErrors: any = {
    userName: '',
    emailId: '',
    password: '',
  };

  loginErrors: any = {
    userName: '',
    password: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  validateRegister(): boolean {
    let isValid = true;
    this.registerErrors = { userName: '', emailId: '', password: '' };

    if (!this.userRegisterObj.userName) {
      this.registerErrors.userName = 'Username is required';
      isValid = false;
    }
    if (!this.userRegisterObj.emailId || !/^\S+@\S+\.\S+$/.test(this.userRegisterObj.emailId)) {
      this.registerErrors.emailId = 'Valid email is required';
      isValid = false;
    }
    if (!this.userRegisterObj.password) {
      this.registerErrors.password = 'Password is required';
      isValid = false;
    }

    return isValid;
  }

  validateLogin(): boolean {
    let isValid = true;
    this.loginErrors = { userName: '', password: '' };

    if (!this.userLogin.userName) {
      this.loginErrors.userName = 'Username is required';
      isValid = false;
    }
    if (!this.userLogin.password) {
      this.loginErrors.password = 'Password is required';
      isValid = false;
    }

    return isValid;
  }

  onRegister() {
    if (this.validateRegister()) {
      let users = localStorage.getItem('angular18Local') ? JSON.parse(localStorage.getItem('angular18Local')!) : [];
      users.push(this.userRegisterObj);
      localStorage.setItem('angular18Local', JSON.stringify(users));
      alert('User Registered Successfully');
    }
  }

  onLogin() {
    if (this.validateLogin()) {
      const loggedIn = this.authService.login(this.userLogin.userName, this.userLogin.password);
      if (loggedIn) {
        this.router.navigateByUrl('dashboard');
      } else {
        alert('User name or password is wrong');
      }
    }
  }
}
