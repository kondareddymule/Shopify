import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getUser();
    const expectedAdmin = route.data['admin'];
  
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
  
    if (expectedAdmin && !user.admin) {
      this.router.navigate(['/login'], { queryParams: { unauthorized: true } });
      return false;
    }
  
    return true;
  }
  
  
}
