import {Component, inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private authService = inject(AuthService);

  // constructor(private authService: AuthService) {
  // }
  registerEmail: string = '';
  registerPassword: string = '';
  loginEmail: string = '';
  loginPassword: string = '';

  register() {
    this.authService.signUp(this.registerEmail, this.registerPassword)
      .then(user => console.log('Registered:', user))
      .catch(err => console.error(err));
  }

  signIn() {
    this.authService.signIn(this.loginEmail, this.loginPassword)
      .then(user => console.log('Signed in:', user))
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
}
