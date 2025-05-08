import { Component, inject, Renderer2, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  render: Renderer2 = inject(Renderer2)
  element: ElementRef = inject(ElementRef)
  currenturl: ActivatedRoute = inject(ActivatedRoute)

  ActiveRoute: string;

  checked: boolean = false;
  user = JSON.parse(localStorage.getItem("User") || '{}');
  imageUrl = this.user.imageUrl;
  city = this.user?.state?.name;
  temperature!: number;
  tempUrl!: string;
  menuVisible: boolean = false

  apiKey = '3893beb75fa04eb6abe131727250105';
  url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}`;

  // private logoutTimer: any;
  // private timeoutDuration =  10000; 

  ngOnInit() {
    this.ActiveRoute = this.currenturl.snapshot.url[0].path
    this.http.get(this.url).subscribe((item: any) => {
      this.temperature = Math.ceil(item.current.temp_c);
      this.tempUrl = item.current.condition.icon;
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.checked = true;
      document.body.classList.add('dark-theme');
    }
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

  ngAfterViewInit() {
    
  }

  // resetTimer() {
  //   if (this.logoutTimer) clearTimeout(this.logoutTimer);
  //   this.logoutTimer = setTimeout(() => this.logout(), this.timeoutDuration);
  // }

  // @HostListener('document:mousemove')
  // @HostListener('document:keydown')
  // @HostListener('document:click')
  // @HostListener('document:scroll')
  // handleUserActivity() {
  //   this.resetTimer();
  // }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    const rightContainer = this.element.nativeElement.querySelector('.right-container');
    if (this.menuVisible) {
      rightContainer.classList.add('show');
    } else {
      rightContainer.classList.remove('show');
    }
  }

}
