import {Component, EventEmitter, inject, Output} from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {Router, RouterLink} from "@angular/router"
import {AuthService} from '../../core/services/auth.service';
import {routes} from '../../app.routes';

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup
  submitted = false
  showPassword = false
  authService = inject(AuthService)

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  get form() {
    return this.loginForm.controls
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  // Login
  onSubmit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    this.authService.logIn(this.form["email"].value, this.form["password"].value)
      .then(response => {
        console.log('Firebase login successful:', response)
        localStorage.setItem('name', response.user.displayName || response.user.email?.split("@")[0] || 'Unknown');
        localStorage.setItem('email', response.user.email || 'Unknown');
        localStorage.setItem('pfp', response.user.photoURL || 'Unknown');
        this.router.navigate(['/dashboard'])
      })
      .catch(err => console.error("Login failed", err));
  }

  LoginGoogle() {
    this.authService.LogInWithGoogle()
      .then(response => {
        this.router.navigate(['/dashboard'])
        localStorage.setItem('name', response.user.displayName || response.user.email?.split("@")[0] || 'Unknown');
        localStorage.setItem('email', response.user.email || 'Unknown');
        localStorage.setItem('pfp', response.user.photoURL || 'Unknown');
        this.router.navigate(['/dashboard'])
        console.log('Google Log-in:', response)
      })
      .catch(err => console.error(err));
  }
}
