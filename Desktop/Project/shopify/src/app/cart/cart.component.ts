import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)
    items: any[] =[]
    username = JSON.parse(localStorage.getItem("User")).username
    status = "pending";
    date = formatDate(new Date(), 'dd/MM/yyyy hh:mm a', 'en-US')
    inOrderList: boolean = false;
    searchText: string = '';

    filter;

    loadCartItems() {
      this.http.get<any[]>('http://localhost:3000/products').subscribe((items) => {
        const orderedItems = items.filter(item => item.quantity > 0);
        this.items = orderedItems;
        this.filter = { orderedItems };  // Keep your filter structure
      });
    }
    
  
    ngOnInit() {
      this.loadCartItems()
    }

    filteredItems() {
      return this.items.filter(item =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    sumbitCartDetails() {
      this.http.post('http://localhost:3000/orders', {'username': this.username, "status": this.status, "date": this.date, ...this.filter}).subscribe((item) => console.log(item))
      this.router.navigate(['/order'])
      for (let item of this.items) {
          const updatedItem = { ...item, quantity: 0 };
          this.http.put(`http://localhost:3000/products/${item.id}`, updatedItem).subscribe(() => {
            console.log('Quantity updated successfully')
          })
      }
    }

    backtoproductpage() {
      this.router.navigate(['/products'])
    }


    decreaseQuantity(id: number) {
      const item = this.items.find((item) => item.id === id);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        this.http.put(`http://localhost:3000/products/${id}`, item).subscribe(() => {
          this.loadCartItems()
        }
        );
      }
    }
  
    increaseQuantity(id: number) {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
        this.http.put(`http://localhost:3000/products/${id}`, item).subscribe(() => {
          this.loadCartItems()
        }
        );
      }
    }

}
