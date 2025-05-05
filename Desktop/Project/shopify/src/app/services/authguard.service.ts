import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}

  setUser(user: any): void {
    localStorage.setItem('User', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  }

  clearUser(): void {
    localStorage.removeItem('User');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('User');
  }
}
