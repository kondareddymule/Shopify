import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {


  http: HttpClient = inject(HttpClient)
  item: any[] =[]

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe((items) => {
      this.item = items
    })
  }

  decreaseQuantity(id: any){
    this.http.get<any[]>('http://localhost:3000/products').subscribe((items) => {
      let selectedItem = items.find((item) => item.id === id)
      if(selectedItem) {
        console.log(selectedItem.quantity -= 1)
      }
    })
  }
}
