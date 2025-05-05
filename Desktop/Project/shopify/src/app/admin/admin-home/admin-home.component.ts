import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  http: HttpClient = inject(HttpClient)
      items: any[] = []

      selectedItem: number| null = null
      date = formatDate(new Date(), 'dd/MM/yyyy hh:mm a', 'en-US')

      username = JSON.parse(localStorage.getItem('User'))

      ngOnInit() {
        this.http.get<any[]>('http://localhost:3000/orders').subscribe((items) => {
          this.items = items
        })
      }

      viewItems : any | null = null;
      visible: boolean = false;
      showDialog(item: string) {
        this.visible = true
        this.viewItems = item
      }



      updateStatus(item: any) {

       if (item && item.status === 'pending') {
        item.status = "Delivered";
        item.deliveredDate = this.date
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
