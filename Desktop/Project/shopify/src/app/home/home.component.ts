import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  weeklyOrderData: any;
  productChartData: any;
  options: any;
  orders: any[] = [];

  weekLength: number;
  orderLength : number;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    const style = getComputedStyle(document.documentElement);
    const textColorSecondary = style.getPropertyValue('--text-color-secondary');
    const surfaceBorder = style.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: 
        
        {
          offset: true,
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder, drawBorder: false }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            stepSize: 1,
            callback: function (value: any) {
              return Number.isInteger(value) ? value : null;
            }
          },
          grid: { color: surfaceBorder, drawBorder: false }
        }
      }
    };

    const currentUser = JSON.parse(localStorage.getItem('User') || '{}');
    const currentUsername = currentUser.username;

    this.http.get<any[]>('http://localhost:3000/orders').subscribe(data => {
      this.orders = data.filter(order => order.username === currentUsername);
      this.prepareLineChart();
      this.prepareProductChart();
      this.orderLength = this.orders.length
      let array = this.weeklyOrderData.datasets[0].data.map((item: number) => {return item > 0})
      let somelength = array.find((item: boolean)=> {return item})
      this.weekLength = somelength
    });
  }

  prepareLineChart() {
    const orderCounts = [0, 0, 0, 0, 0, 0, 0]; 

      for (const order of this.orders) {
        const orderDate = DateTime.fromFormat(order.date, 'dd/MM/yyyy hh:mm a');
        
        if (orderDate.isValid) {
          const dayOfWeek = orderDate.weekday;
          orderCounts[dayOfWeek === 7 ? 0 : dayOfWeek]++;
        } else {
          console.warn(`Invalid date format in order: ${order.date}`);
        }

    }

    this.weeklyOrderData = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          data: orderCounts,
          fill: false,
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
          tension: 0.4
        }
      ]
    };
  }

  prepareProductChart() {
    const staticCategories = [
      "Clothes",
      "Shoes",
      "Utensils",
      "Watches",
      "Accessories",
      "Hats",
      "Electronics",
      "Bags",
      "Glasses"
    ];
  
    const productMap: { [category: string]: number } = {};
    staticCategories.forEach(category => productMap[category] = 0);
  
    for (const order of this.orders) {
      for (const item of order.orderedItems) {
        const category = item.category?.trim();
        const quantity = Math.floor(item.quantity) || 1;
  
        if (productMap.hasOwnProperty(category)) {
          productMap[category] += quantity;
        }
      }
    }
  
    const labels = staticCategories;
    const quantities = staticCategories.map(cat => productMap[cat]);
  
    this.productChartData = {
      labels: labels,
      datasets: [
        {
          data: quantities,
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500')
        }
      ]
    };
  }
  
}
