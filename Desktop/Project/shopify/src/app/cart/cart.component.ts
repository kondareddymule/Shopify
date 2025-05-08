import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)
  messageService: MessageService = inject(MessageService)

    items: any[] =[]
    strogedUser = JSON.parse(localStorage.getItem("User") || '{}');
    username = this.strogedUser.username
    status = "pending";
    date = formatDate(new Date(), 'dd/MM/yyyy hh:mm a', 'en-US')
    inOrderList: boolean = false;
    searchText: string = '';
    deleteIcon: boolean = false
    selectedItem : string | null = null;
    deleteIconClick: boolean = false

    hoveredItem: any = null;
    dialogItem: any = null;

    filter;

    loadCartItems() {
      this.http.get<any[]>('http://localhost:3000/products').subscribe((items) => {
        const orderedItems = items.filter(item => item.quantity > 0);
        this.items = orderedItems;
        this.filter = { orderedItems };
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
      this.http.post('http://localhost:3000/orders', {'username': this.username, "status": this.status, "date": this.date, "deliveredDate": "Arriving soon", ...this.filter}).subscribe((item) => console.log(item))
      this.router.navigate(['/user/orders'])
      for (let item of this.items) {
          const updatedItem = { ...item, quantity: 0 };
          this.http.put(`http://localhost:3000/products/${item.id}`, updatedItem).subscribe()
      }
    }

    backtoproductpage() {
      this.router.navigate(['/user/products'])
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

    handleDelete(item: string) {
      this.deleteIcon = true
      this.selectedItem = item
    }

    openDeleteDialog(item: any) {
      this.dialogItem = item;
      this.deleteIconClick = true;
    }

    deleteProduct(item: number) {
      this.deleteIconClick = true
    }

    confirmDelete(id: number) {
      const item = this.items.find(i => i.id === id);
      if (item) {
        const updatedItem = { ...item, quantity: 0 };
        this.http.put(`http://localhost:3000/products/${id}`, updatedItem).subscribe(() => {
          this.loadCartItems();
          this.deleteIconClick = false;
          this.dialogItem = null;
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Order Removed successfully from Cart' });
        });
      }
    } 
    
}
