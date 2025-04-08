import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Input() message!: string;

  @Output() ParentMessage = new EventEmitter<string>();

  SendMessage() {
    this.ParentMessage.emit("Hello I'm Son")
  }
}
