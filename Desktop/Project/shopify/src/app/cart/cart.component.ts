import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  http: HttpClient = inject(HttpClient)
    item: any[] =[]
  
    ngOnInit() {
      this.http.get<any[]>('http://localhost:3000/products').subscribe((items) => {
        let filteredItems = items.filter((item) => item.quantity > 0)
        this.item = filteredItems
      })
    }
}
