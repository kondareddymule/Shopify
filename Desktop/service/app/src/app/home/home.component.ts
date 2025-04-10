import { Component } from '@angular/core';
import {ServiceService} from '../services/service.service'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  clickme() {
    let button = new ServiceService;
    button.clickedme("Home")
  }
}
