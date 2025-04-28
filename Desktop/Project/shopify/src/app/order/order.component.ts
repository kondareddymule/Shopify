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

    showDeleteAndViewIcon: boolean = false
    viewItem: boolean = false
  
    ngOnInit() {
      this.http.get<any[]>('http://localhost:3000/orders').subscribe((items) => {
        items.find((item) => {if(item.username === "Reddy") {
          this.item.push(item)
      }})
      })
    }

    handleDeleteandView(itemId: any) {
      this.showDeleteAndViewIcon = true
    }

    viewDetails(item: any) {
      this.viewItem = true
    }

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    DeleteShow: boolean = false

    showDelete() {
      this.DeleteShow = true
    }

    cancelButton() {
      this.DeleteShow = false
    }
    
}
