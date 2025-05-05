import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/authguard.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard {

  authService: AuthService = inject(AuthService)
  router: Router = inject(Router)

  canActivate(): boolean {
    const user = this.authService.getUser();

    if (user) {
      if (user.admin) {
        this.router.navigate(['/admin/home']);
      } else {
        this.router.navigate(['/user/home']);
      }
      return false;
    }

    return true;
  }
  
}
