import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component'
import {ProductComponent} from './product/product.component'
import {StyleDirective} from './Directive/style.directive'

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ProductComponent, StyleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'Ecart';
}
