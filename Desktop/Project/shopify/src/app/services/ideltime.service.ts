import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdeltimeService {

  private timeoutId: any;
  private readonly timeoutMs = 1 * 60 * 1000;

  constructor(private router: Router, private ngZone: NgZone) {
    this.startWatching();
  }

  private resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.logout(), this.timeoutMs);
  }

  private logout() {
    this.ngZone.run(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  private startWatching() {
    this.ngZone.runOutsideAngular(() => {
      ['click', 'mousemove', 'keydown', 'scroll', 'touchstart']
        .forEach(event => window.addEventListener(event, () => this.resetTimer()));
    });

    this.resetTimer();
  }

}
