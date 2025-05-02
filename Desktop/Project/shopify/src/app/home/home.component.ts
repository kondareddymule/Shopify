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
        x: {
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
          label: 'Orders This Week',
          data: orderCounts,
          fill: false,
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
          tension: 0.4
        }
      ]
    };
  }

  prepareProductChart() {
    const productMap: { [category: string]: number } = {};

    for (const order of this.orders) {
      for (const item of order.orderedItems) {
        const category = item.category;
        const quantity = Math.floor(item.quantity) || 1;

        if (productMap[category]) {
          productMap[category] += quantity;
        } else {
          productMap[category] = quantity;
        }
      }
    }

    const labels = Object.keys(productMap);
    const quantities = Object.values(productMap);

    this.productChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Quantity Ordered',
          data: quantities,
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500')
        }
      ]
    };
  }
}
