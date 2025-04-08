import { Component } from '@angular/core';
import {ChildComponent} from './child/child.component'


@Component({
  selector: 'app-root',
  imports: [ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  parentMessage = 'Hello from Parent!';
  recieve:string = ""

  recieved(message:string) {
    this.recieve = message;
  }
}
