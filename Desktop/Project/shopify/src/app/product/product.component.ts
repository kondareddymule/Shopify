import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {


  http: HttpClient = inject(HttpClient)
  items: any[] =[]
  visible: boolean = false;
  searchText: string = '';


    showDialog() {
        this.visible = true;
    }

    filteredItems() {
      return this.items.filter(item =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    IsAdmin = JSON.parse(localStorage.getItem('User')).admin


  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe((item) => {
      this.items = item
    })
  }

  decreaseQuantity(id: number) {
    const item = this.items.find((item) => item.id === id);
    if (item && item.quantity > 0) {
      item.quantity -= 1;
      this.http.put(`http://localhost:3000/products/${id}`, item).subscribe(
        () => console.log('Quantity updated successfully')
      );
    }
  }

  increaseQuantity(id: number) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity += 1;
      this.http.put(`http://localhost:3000/products/${id}`, item).subscribe(
        () => console.log('Quantity updated successfully')
      );
    }
  }
}
