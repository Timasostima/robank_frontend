import {Component, EventEmitter, inject, Output} from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router"
import {AuthService} from '../../core/services/auth.service';

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

  onSubmit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    }

    this.authService.logIn(this.form["email"].value, this.form["password"].value)
      .then(user => {
        console.log('Logged in:', user);
      })
      .catch(err => console.error("Login failed", err));
  }

  LoginGoogle() {
    this.authService.signInWithGoogle()
      .then(user => console.log('Google Log-in:', user))
      .catch(err => console.error(err));
  }
}
