import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './core/services/auth.service';
import {FooterComponent} from './shared/footer/footer.component';
import {NavbarComponent} from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title: string = 'robankWeb';
}
