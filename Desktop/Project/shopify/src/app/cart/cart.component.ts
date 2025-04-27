import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  http: HttpClient = inject(HttpClient)
    item: any[] =[]
    username = "Reddy";
    status = "pending";
    date = formatDate(new Date(), 'dd/MM/yyyy hh:mm a', 'en-US')
    inOrderList: boolean = false;

    filter;
  
    ngOnInit() {
      this.http.get<any[]>('http://localhost:3000/products').subscribe((items) => {
        let orderedItems = items.filter((item) => item.quantity > 0)
        this.filter = {orderedItems}
        this.item = orderedItems
        console.log(this.date)
      })
    }


    sumbitCartDetails() {

      this.http.post('http://localhost:3000/orders', {'username': this.username, "status": this.status, "date": this.date, ...this.filter}).subscribe((item) => console.log(item))
    }

}
