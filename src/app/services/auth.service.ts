import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() { }

  login(userName: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('angular18Local') || '[]');
    const user = users.find((u: any) => u.userName === userName && u.password === password);
    if (user) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
