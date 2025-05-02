import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  http: HttpClient = inject(HttpClient)
      items: any[] =[]
      showDeleteAndViewIcon: boolean = false

      selectedItem: number| null = null

      ngOnInit() {
        this.http.get<any[]>('http://localhost:3000/orders').subscribe((items) => {
          this.items = items
        })
      }

      visible: boolean = false;
      showDialog() {
        this.visible = true
      }

      handleDeleteandView(itemId: any) {
        this.showDeleteAndViewIcon = true
        this.selectedItem = itemId.id
      }

      updateStatus(item: any) {
        const items = this.items.find((item) => item.id === item.id);
    if (items && item.status === 'pending') {
      item.status = "Delivered";
      this.http.put(`http://localhost:3000/orders/${item.id}`, item).subscribe(
        () => console.log('status updated successfully')
      );
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
