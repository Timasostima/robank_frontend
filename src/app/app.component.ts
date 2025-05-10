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
  private authService = inject(AuthService);

  registerEmail: string = '';
  registerPassword: string = '';
  loginEmail: string = '';
  loginPassword: string = '';
  title: string = 'robankWeb';

  register() {
    this.authService.signUp(this.registerEmail, this.registerPassword)
      .then(user => {
        console.log('succesfuly registered in firebase:', user);
        let usrObj = {
          uid: user.user.uid,
          email: user.user.email,
          name: user.user.displayName || "alex",
        };
        return this.authService.registerBackend(usrObj);
      })
      .catch(err => console.error(err));
  }

  signIn() {
    this.authService.signIn(this.loginEmail, this.loginPassword)
      .then(user => {
        console.log('Signed in:', user);
      })
      .catch(err => console.error(err));
  }

  signOut() {
    this.authService.signOut().then(() => console.log('Signed out'));
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(user => console.log('Google sign-in:', user))
      .catch(err => console.error(err));
  }

  goToPrivateInfo() {
    this.authService.getProfile().subscribe(
      res => console.log('Private info:', res),
      err => console.error(err)
    );
  }
}
