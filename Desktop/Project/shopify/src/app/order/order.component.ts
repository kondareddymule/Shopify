import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {


  http: HttpClient = inject(HttpClient)
    item: any[] =[]
  
    ngOnInit() {
      this.http.get<any[]>('http://localhost:3000/products').subscribe((items) => {
        this.item = items
        console.log(this.item)
      })
    }
}
