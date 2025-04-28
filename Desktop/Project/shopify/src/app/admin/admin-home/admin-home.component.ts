import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  http: HttpClient = inject(HttpClient)
      item: any[] =[]
      showDeleteAndViewIcon: boolean = false
      ngOnInit() {
        this.http.get<any[]>('http://localhost:3000/orders').subscribe((items) => {
          this.item = items
          console.log(this.item)
        })
      }

      visible: boolean = false;
      showDialog() {
        this.visible = true
      }
      handleDeleteandView(itemId: any) {
        this.showDeleteAndViewIcon = true
      }
}
