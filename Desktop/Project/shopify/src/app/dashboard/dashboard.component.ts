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
      let user = localStorage.getItem("User")
      user = JSON.parse(user)
      if(user['admin']) {
        this.items = [
          { label: 'Home', icon: 'pi pi-home', routerLink: '/admin/home' },
          { label: 'Products', icon: 'pi pi-chart-line', routerLink: '/products' },
          { label: 'Users', icon: 'pi pi-users', routerLink: '/admin/users' }
        ];

      } else {
        this.items = [
          { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
          { label: 'Products', icon: 'pi pi-chart-line', routerLink: '/products' },
          { label: 'Cart', icon: 'pi pi-shopping-cart', routerLink: '/cart' },
          { label: 'Order', icon: 'pi pi-shopping-bag', routerLink: '/order' }
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
