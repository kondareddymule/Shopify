import { Component, inject, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  
  checked: boolean = false;
  user = JSON.parse(localStorage.getItem("User") || '{}');
  imageUrl = this.user.imageUrl;
  city = this.user?.state?.name;
  temperature!: number;
  tempUrl!: string;

  apiKey = '3893beb75fa04eb6abe131727250105';
  url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}`;

  private logoutTimer: any;
  private timeoutDuration = 10 * 60 * 1000; 

  ngOnInit() {
    this.http.get(this.url).subscribe((item: any) => {
      this.temperature = Math.ceil(item.current.temp_c);
      this.tempUrl = item.current.condition.icon;
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.checked = true;
      document.body.classList.add('dark-theme');
    }

    this.resetTimer();
  }

  toggleTheme() {
    if (this.checked) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  resetTimer() {
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    this.logoutTimer = setTimeout(() => this.logout(), this.timeoutDuration);
  }

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  @HostListener('document:scroll')
  handleUserActivity() {
    this.resetTimer();
  }
}
