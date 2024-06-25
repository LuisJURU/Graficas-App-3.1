import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

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
      this.registerErrors.userName = 'Ingrese un usuario';
      isValid = false;
    }
    if (
      !this.userRegisterObj.emailId ||
      !/^\S+@\S+\.\S+$/.test(this.userRegisterObj.emailId)
    ) {
      this.registerErrors.emailId = 'Ingrese un correo válido';
      isValid = false;
    }
    // Verificación de la contraseña mejorada
    if (!this.userRegisterObj.password) {
      this.registerErrors.password = 'Ingrese una contraseña';
      isValid = false;
    } else if (this.userRegisterObj.password.length < 8) {
      this.registerErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(this.userRegisterObj.password)) {
      this.registerErrors.password = 'La contraseña debe incluir al menos un número, una letra mayúscula, una letra minúscula y un carácter especial';
      isValid = false;
    }
  
    if (!isValid) {
      setTimeout(() => {
        this.registerErrors = { userName: '', emailId: '', password: '' };
      }, 3000);
    }
  
    return isValid;
  }

  validateLogin(): boolean {
    let isValid = true;
    this.loginErrors = { userName: '', password: '' };

    if (!this.userLogin.userName) {
      this.loginErrors.userName = 'Ingrese su usuario';
      isValid = false;
    }
    if (!this.userLogin.password) {
      this.loginErrors.password = 'Ingrese su contraseña';
      isValid = false;
    }

    if (!isValid) {
      setTimeout(() => {
        this.loginErrors = { userName: '', password: '' };
      }, 1500);
    }

    return isValid;
  }

  onRegister() {
    if (this.validateRegister()) {
      let users = localStorage.getItem('angular18Local')
        ? JSON.parse(localStorage.getItem('angular18Local')!)
        : [];
      const userExists = users.some(
        (user: { userName: any; emailId: any }) =>
          user.userName === this.userRegisterObj.userName ||
          user.emailId === this.userRegisterObj.emailId
      );
      if (userExists) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ah Ocurrido un error.',
        });
        return;
      }
      users.push(this.userRegisterObj);
      localStorage.setItem('angular18Local', JSON.stringify(users));
      Swal.fire(
        '¡Buen trabajo!',
        'Usuario registrado con éxito',
        'success'
      );
      this.isLoginView = true;
    }
  }

  onLogin() {
    if (this.validateLogin()) {
      const loggedIn = this.authService.login(
        this.userLogin.userName,
        this.userLogin.password
      );
      if (loggedIn) {
        this.router.navigateByUrl('dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal, intente de nuevo.',
        });
      }
    }
  }
}
