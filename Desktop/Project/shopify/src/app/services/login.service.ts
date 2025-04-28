import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  http: HttpClient = inject(HttpClient)

  getUser() {
    this.http.get('http://localhost:3000/users').subscribe((user) => {
      console.log(user)
    })
  }
}
