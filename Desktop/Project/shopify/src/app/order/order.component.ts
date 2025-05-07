import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {


  http: HttpClient = inject(HttpClient)
  messageService: MessageService = inject(MessageService)
  items: any[] =[]

    hoveredItemId: number | null = null;

    username = JSON.parse(localStorage.getItem("User") || '{}');

    viewItem: boolean = false
  
    ngOnInit() {
      this.http.get<any[]>('http://localhost:3000/orders').subscribe((items) => {
        items.filter((item) => {if(item.username === this.username.username) {
          this.items.push(item)
      }})
      })
    }

    
    visible: boolean = false;

    DeleteShow: boolean = false

    selectedOrder: any = null;

    showDialog(item: any) {
      this.selectedOrder = item;
      this.visible = true;
    }

    showDelete(item: any) {
      this.selectedOrder = item;
      this.DeleteShow = true;
    }

    cancelButton() {
      this.DeleteShow = false
    }

    deleteOrder() {
      if (this.selectedOrder) {
        this.http.delete(`http://localhost:3000/orders/${this.selectedOrder.id}`).subscribe(() => {
          this.items = this.items.filter(item => item.id !== this.selectedOrder.id);
          
          this.DeleteShow = false;
          this.selectedOrder = null;
    
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Order deleted successfully' });
        }, error => {
          console.error('Error deleting order:', error);
        });
      }
    }


    currentPage: number = 1;
    pageSize: number = 10;

    get paginatedOrders() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.items.slice(startIndex, startIndex + this.pageSize);
    }

    get totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
    }
    
}
