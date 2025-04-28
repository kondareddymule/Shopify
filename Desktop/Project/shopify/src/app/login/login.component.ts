import { Component, inject } from '@angular/core';
import { FormdatacollectionService } from '../services/formdatacollection.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string;
    password: string;

    checkData : FormdatacollectionService = inject(FormdatacollectionService)
    messageService: MessageService = inject(MessageService)
    router: Router = inject(Router)
    loginform() {
      if(!this.email || !this.password) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Both the fileds Required"
        })
        return
      }
      this.checkData.http.get<any[]>(this.checkData.apiUrl).subscribe((users) => {
        const user = users.find((person) => person.email === this.email && person.password === this.password)

        if (user) {
          console.log(user)
          localStorage.setItem("User", JSON.stringify(user))
          if (user.admin) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          alert('Invalid credentials');
        }
      });
      }

      singuppage() {
        this.router.navigate(['/signup'])
      }
}

