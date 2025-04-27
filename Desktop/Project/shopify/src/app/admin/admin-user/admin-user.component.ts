import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {

  http: HttpClient = inject(HttpClient)
  users: any[] = []

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe((user) => {
      this.users = user
    })
  }

  calculate(dateOfBirth: any) {
    
    let date = String(dateOfBirth).split('/');
    let day = parseInt(date[0]);
    let month = parseInt(date[1]) - 1; 
    let year = parseInt(date[2]);
    let birthDate = new Date(year, month, day);
    let currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    let monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  
}
