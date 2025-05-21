import {Component, inject} from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router"
import {AuthService} from '../../core/services/auth.service';
import {SwitchComponent} from '../../shared/switch/switch.component';
import {ArrowButtonComponent} from '../../shared/arrow-button/arrow-button.component';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SwitchComponent, ArrowButtonComponent, NotificationComponent],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  signupForm: FormGroup
  submitted = false
  showPassword = false
  errorMessage: string = '';
  private authService = inject(AuthService)

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      acceptTerms: [false, Validators.requiredTrue],
    })
  }

  get form() {
    return this.signupForm.controls
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  goBack() {
    this.router.navigate(["/login"])
  }

  onSubmit() {
    this.submitted = true

    if (this.signupForm.invalid) {
      return
    }


    this.authService.register(this.form["email"].value, this.form["password"].value, this.form["username"].value)
      .then(user => {
        let usrObj = {
          uid: user.uid,
          email: user.email,
          name: user.email || "alex",
        };
        this.authService.registerBackend(usrObj).then(rb =>
          alert("User registered successfully")
        )
      })
      .catch(err => {
        console.error("Registration failed", err);
        this.errorMessage = '';  // Reset the error message
        setTimeout(() => {
          this.errorMessage = err.message || 'Registration failed. Please try again.';
        });
      });
  }
}
