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
      this.http.get<any[]>('http://localhost:3000/orders').subscribe((items) => {
        items.find((item) => {if(item.username === "Reddy") {
          this.item.push(item)
      }})
      })
    }
}
