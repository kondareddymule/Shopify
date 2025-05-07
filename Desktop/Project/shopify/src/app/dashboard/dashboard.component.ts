import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  router : Router = inject(Router)
  items: MenuItem[] | undefined;

    ngOnInit() {
      let user = JSON.parse(localStorage.getItem("User") || '{}');
      if(user['admin']) {
        this.items = [
          { label: 'Home', icon: 'pi pi-home', routerLink: '/admin/home' },
          { label: 'Products', icon: 'pi pi-chart-line', routerLink: '/admin/products' },
          { label: 'Users', icon: 'pi pi-users', routerLink: '/admin/users' }
        ];

      } else {
        this.items = [
          { label: 'Home', icon: 'pi pi-home', routerLink: '/user/home' },
          { label: 'Products', icon: 'pi pi-chart-line', routerLink: '/user/products' },
          { label: 'Cart', icon: 'pi pi-shopping-cart', routerLink: '/user/cart' },
          { label: 'Order', icon: 'pi pi-shopping-bag', routerLink: '/user/orders' }
        ];
      }
    }
  // router: Router = inject(Router)
  // gotoHomepage() {
  //   this.router.navigate(['/home'])
  // }

  // gotoProductPage() {
  //   this.router.navigate(['/products'])
  // }

  // gotoCartPage() {
  //   this.router.navigate(['/cart'])
  // }

  // gotoOrderPage() {
  //   this.router.navigate(['/order'])
  // }
}
