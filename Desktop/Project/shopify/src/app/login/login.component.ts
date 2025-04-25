import { Component, inject } from '@angular/core';
import { FormdatacollectionService } from '../services/formdatacollection.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string;
    password: string;

    checkData : FormdatacollectionService = inject(FormdatacollectionService)
    router: Router = inject(Router)


    loginform() {
      this.checkData.http.get<any[]>(this.checkData.apiUrl).subscribe((users) => {
        const user = users.find((person) => person.email === this.email && person.password === this.password)
        if (user) {
          if (user.admin) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/header']);
          }
        } else {
          alert('Invalid credentials');
        }
      });
      }

      singuppage() {
        this.router.navigate(['/login'])
      }
}

