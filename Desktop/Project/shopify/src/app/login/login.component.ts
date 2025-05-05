import { Component, inject } from '@angular/core';
import { FormdatacollectionService } from '../services/formdatacollection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  checkData: FormdatacollectionService = inject(FormdatacollectionService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  authService : AuthService = inject(AuthService)

  ngOnInit() {
    const user = this.authService.getUser();
    
    if (user) {
      if (user.admin) {
        this.router.navigate(['/admin/home']);
      } else {
        this.router.navigate(['/user/home']);
      }
      return;
    }
  
    this.route.queryParams.subscribe(params => {
      if (params['unauthorized']) {
        this.messageService.add({
          severity: 'error',
          summary: 'Unauthorized Access',
          detail: 'You do not have permission to access this page.'
        });
      }
    });
  }
  

  loginform() {
    if (!this.email || !this.password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Both fields are required'
      });
      return;
    }
  
    this.checkData.http.get<any[]>(this.checkData.apiUrl).subscribe((users) => {
      const user = users.find((person) => person.email === this.email && person.password === this.password);
  
      if (user) {
        this.authService.setUser(user);
  
        if (user.admin) {
          this.router.navigate(['/admin/home']);
        } else {
          this.router.navigate(['/user/home']);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Incorrect login details.'
        });
      }
    });
  }

  singuppage() {
    this.router.navigate(['/signup']);
  }
}
