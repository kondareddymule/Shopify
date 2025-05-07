import { Component, inject} from '@angular/core';
import { IdeltimeService } from './services/ideltime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopify';

  ideltime: IdeltimeService = inject(IdeltimeService)

}
