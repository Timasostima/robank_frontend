import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
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
export class AppComponent implements OnInit {
  title: string = 'robankWeb';

  ngOnInit(): void {
    const storedTheme = localStorage.getItem('isdarktheme');
    if (storedTheme === 'true') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }
}
