import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {


  http: HttpClient = inject(HttpClient)
    items: any[] =[]

    selectedItemId: number | null = null;



    username = JSON.parse(localStorage.getItem("User")).username

    showDeleteAndViewIcon: boolean = false
    viewItem: boolean = false
  
    ngOnInit() {
      this.http.get<any[]>('http://localhost:3000/orders').subscribe((items) => {
        items.find((item) => {if(item.username === this.username) {
          this.items.push(item)
      }})
      })
    }

    handleDeleteandView(item: any) {
       this.selectedItemId = item.id;
    }


    viewDetails(item: any) {
      this.viewItem = true
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
          this.selectedItemId = null;
    
          console.log('Order deleted successfully');
        }, error => {
          console.error('Error deleting order:', error);
        });
      }
    }
    
}
