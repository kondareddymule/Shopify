import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  ngOnInit() {
    console.log(this.activeRoute.snapshot.paramMap.get('id'))
    
  }
}
