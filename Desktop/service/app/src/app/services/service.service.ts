import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  clickedme(title: string) {
    alert('Hello, Welcome to '+title+' page')
  }
}
